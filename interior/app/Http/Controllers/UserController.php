<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Services\RoleService;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\User\UpdateUserRequest;
class UserController extends Controller
{
    protected $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function index()
    {
        $result = $this->userService->getAllUsersWithRoles();
        
        return $result
            ? jsonResponse('success', 'Danh sách người dùng', $result)
            : jsonResponse('error', 'Không tìm thấy danh sách người dùng!');
    }
    public function update(UpdateUserRequest $request)
    {
        $data = $request->validated();
        $result = $this->userService->update($data['id'], $data);

        if ($result) {
            $updatedUser = $this->userService->getAllUsersWithRoles()->where('id', $data['id'])->first();
            return jsonResponse('success', 'Người dùng đã được cập nhật thành công', $updatedUser);
        } else {
            return jsonResponse('error', 'Cập nhật người dùng thất bại!');
        }
    }
    public function destroy(Request $request)
    {
        $result = $this->userService->delete($request->id);

        return $result
            ? jsonResponse('success', 'Người dùng đã được xóa thành công')
            : jsonResponse('error', 'Xóa người dùng thất bại!');
    }
    public function roleService()
    {
        return app(RoleService::class);
    }


    public function getUsers()
    {
        $result = $this->userService->getCurrentUser();
        return $result 
            ? jsonResponse('success', 'Thông tin người dùng', ['user' => $result] )
            : jsonResponse('error', 'Không tìm thấy người dùng!');
    }

    public function getUserId($id)
    {
        $result = $this->userService->getUserId($id);
        return $result 
            ? jsonResponse('success', 'id người dùng', ['id' => $result] )
            : jsonResponse('error', 'Không tìm thấy người dùng!');
    }
    public function getUserbyEmail(Request $request)
    {
        $email = $request->email;
        $user = $this->userService->getUserbyEmail($email);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'avt_url' => $user->avt_url,
            'address' => $user->address,
        ]);
    }
    public function updateAddress(Request $request)
    {
        $data = $this->validate($request, [
            'id' => 'required|integer',
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);
        $user = $this->userService->updateAddress($data);
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'avt_url' => $user->avt_url,
            'address' => $user->address,
        ]);
    }
    public function changePassword(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);
        $user = $this->userService->changePassword($data);
        return $user;
    }
}
