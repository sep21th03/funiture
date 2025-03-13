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

    public function redirectToGoogle()
    {
        try {
            return Socialite::driver('google')
                ->redirect();
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'Không thể kết nối với Google. Vui lòng thử lại sau.');
        }
    }



    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]
            );

            if (!$user->google_id) {
                $user->google_id = $googleUser->getId();
                $user->save();
            }

            // Đăng nhập user
            Auth::login($user, true);

            return redirect()->intended('/dashboard')
                ->with('success', 'Đăng nhập thành công!');
        } catch (\Exception $e) {
            return redirect()->route('login')
                ->with('error', 'Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.');
        }
    }


    public function changePassword(ChangePasswordRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();
        if (!Hash::check($data['current_password'], $user->password)) {
            return jsonResponse(2, message: "Mật khẩu cũ không chính xác.");
        }
        $user->update(['password' => Hash::make($data['password'])]);
        if ($user) {
            $user->tokens()->delete();
            return jsonResponse(0, message: "Thay đổi mật khẩu thành công.");
        } else {
            return jsonResponse(2, message: "Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    }
    function sendResetLinkEmail(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $data['email'])->first();
        if (!$user) {
            return jsonResponse(1, message: "Không tìm thấy người dùng");
        }
        $status = Password::sendResetLink([
            'email' => $user->email,
        ]);
        \Log::info($status);

        if ($status == Password::RESET_LINK_SENT) {
            return jsonResponse(0, message: "Yêu cầu đã được gửi");
        }
    }
    function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
            'token' => 'required',
            "password_confirmation" => 'required|min:6',
        ]);
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );
        return jsonResponse($status === Password::PASSWORD_RESET ? 0 : 1, $status);
    }
}
