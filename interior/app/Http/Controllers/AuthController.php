<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Laravel\Sanctum\TransientToken;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Requests\Api\Auth\ChangePasswordRequest;
use Illuminate\Support\Str;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    private $jwtKey;
    private $tokenExpiry;

    public function __construct()
    {
        $this->jwtKey = env('JWT_SECRET', 'sep21th03');
        $this->tokenExpiry = 60 * 60 * 24;
    }

    private function generateToken($user)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + $this->tokenExpiry;

        $payload = [
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'sub' => $user->id,
            'user' => [
                'email' => $user->email,
                'name' => $user->name,
                'avatar' => $user->avt_url,
                'id' => $user->id,
            ]
        ];

        return JWT::encode($payload, $this->jwtKey, 'HS256');
    }

    private function validateToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key($this->jwtKey, 'HS256'));
            return $decoded;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function login(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:8',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Thông tin đăng nhập không chính xác',
                ], 401);
            }

            $token = $this->generateToken($user);
            $refreshToken = bin2hex(random_bytes(32));
            $user->remember_token = $refreshToken;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Đăng nhập thành công',
                'access_token' => $token,
                'refresh_token' => $refreshToken,
                'token_type' => 'Bearer',
                'expires_in' => $this->tokenExpiry,
            ]);

        } catch (ValidationException $validationException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Xác thực thất bại',
                'errors' => $validationException->errors()
            ], 422);
        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đã có lỗi xảy ra',
                'errors' => ['message' => $error->getMessage()]
            ], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|unique:users,email',
                'password' => 'required|min:8',
                'repassword' => 'required|min:8',
                'name' => 'required',
                'phone' => 'required|unique:users',
                'address' => 'required',
            ]);

            if (User::checkUsername($request->email)) {
                throw ValidationException::withMessages([
                    'email' => ['Email đã tồn tại'],
                ]);
            }

            if ($request->password != $request->repassword) {
                throw ValidationException::withMessages([
                    'password' => ['Password không giống nhau'],
                ]);
            }

            $avatarUrl = 'https://ui-avatars.com/api/?name=' . urlencode($request->name) . '&background=random';

            $user = User::createUser(
                $request->email,
                $request->name,
                Hash::make($request->password),
                $request->address,
                $request->phone,
                $avatarUrl
            );

            $user->assignRole('member');

            // Tạo JWT token
            $token = $this->generateToken($user);

            // Lưu refresh token
            $refreshToken = bin2hex(random_bytes(32));
            $user->remember_token = $refreshToken;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Đăng ký thành công',
                'access_token' => $token,
                'refresh_token' => $refreshToken,
                'token_type' => 'Bearer',
                'expires_in' => $this->tokenExpiry,
            ]);

        } catch (ValidationException $validationException) {
            return response()->json([
                'status' => 'error',
                'message' => 'Xác thực thất bại',
                'errors' => $validationException->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Có lỗi xảy ra',
                'errors' => ['message' => $e->getMessage()]
            ], 401);
        }
    }

    public function logoutUser(Request $request)
    {
        try {
            $user = auth()->user();
            if ($user) {
                $user->remember_token = null;
                $user->save();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Đăng xuất thành công'
            ]);

        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể đăng xuất',
                'errors' => ['message' => $error->getMessage()]
            ], 500);
        }
    }

    public function refresh(Request $request)
    {
        try {
            $refreshToken = $request->refresh_token;

            if (!$refreshToken) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Refresh token không được cung cấp'
                ], 401);
            }

            $user = User::where('remember_token', $refreshToken)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Refresh token không hợp lệ'
                ], 401);
            }

            // Tạo token mới
            $token = $this->generateToken($user);

            // Tạo refresh token mới
            $newRefreshToken = bin2hex(random_bytes(32));
            $user->remember_token = $newRefreshToken;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Làm mới token thành công',
                'access_token' => $token,
                'refresh_token' => $newRefreshToken,
                'token_type' => 'Bearer',
                'expires_in' => $this->tokenExpiry
            ]);

        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể làm mới token',
                'errors' => ['message' => $error->getMessage()]
            ], 500);
        }
    }

    public function me(Request $request)
    {
        try {
            $user = auth()->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy thông tin người dùng'
                ], 401);
            }

            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);

        } catch (\Exception $error) {
            return response()->json([
                'status' => 'error',
                'message' => 'Có lỗi xảy ra',
                'errors' => ['message' => $error->getMessage()]
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                if (Auth::guard('sanctum')->check()) {
                    $accessToken = $user->currentAccessToken();

                    if (!($accessToken instanceof TransientToken)) {
                        $accessToken->delete();
                    }
                } else {
                    Auth::logout();
                }

                $user->remember_token = null;
                $user->save();
            }

            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }

            return response()->json([
                'message' => 'Đã đăng xuất thành công',
                'redirect' => route('auth.login')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Có lỗi xảy ra khi đăng xuất', 'message' => $e->getMessage()], 500);
        }
    }

    public function sendResetPasswordEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không đúng định dạng.',
            'email.exists' => 'Email không tồn tại trong hệ thống.',
        ]);

        $user = User::where('email', $request->email)->first();

        $newPassword = Str::random(8);

        $user->password = Hash::make($newPassword);
        $user->save();

        Mail::to($user->email)->send(new \App\Mail\ResetPasswordMail($user, $newPassword));

        return response()->json([
            'status' => 'success',
            'message' => 'Mật khẩu mới đã được gửi đến email của bạn.',
        ]);
    }
}
