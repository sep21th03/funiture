<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminController extends Controller
{
    public function login()
    {
        return view('auth.login');
    }

    public function postlogin(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Thông tin đăng nhập không chính xác',
            ]);
        }

        $user = User::getByUsername($validatedData['email']);
        if (!Hash::check($validatedData['password'], $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mật khẩu không hợp lệ',
            ]);
        }

        $existingToken = $user->tokens->first();
        $check_token = User::getByUsername($validatedData['email']);
        if ($existingToken && $check_token->remember_token != null) {
            $get_user = User::getByUsername($validatedData['email']);
            $tokenResult = $get_user->remember_token;
        } else {
            $tokenResult = $user->createToken('authToken')->plainTextToken;
            $save_token = User::updateToken($validatedData['email'], $tokenResult);
            if (!$save_token) {
                throw new \Exception('Lỗi truy vấn cơ sở dữ liệu');
            }
        }
        Auth::login($user);
        $request->session()->regenerate();
        return redirect('/admin');
    }
}
