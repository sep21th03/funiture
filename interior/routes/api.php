<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [AdminController::class, 'postlogin'])->name('api.postlogin');
Route::get('/admin/login', [AdminController::class, 'login'])->name('api.login');
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

Route::middleware('jwt.auth')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logoutUser']);
    Route::post('auth/refresh', [AuthController::class, 'refresh']);
    Route::get('auth/me', [AuthController::class, 'me']);
});

// Route::middleware(['web'])->group(function () {
//     Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
//     Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
// });
Route::middleware('jwt.auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('cart', [CartController::class, 'getMyCart']);
    Route::post('cart/update', [CartController::class, 'updateMyCart']);
    Route::post('cart/add', [CartController::class, 'addMyCart']);
    Route::post('cart/delete', [CartController::class, 'deleteMyCart']);

    Route::post('product-detail/review', [ProductController::class, 'storeProductReview']);

    Route::get('order', [OrderController::class, 'getListByUser']);
    Route::get('order/detail/{id}', [OrderController::class,'getDetailOrder']);
    Route::post('order/store', [OrderController::class,'store']);
    Route::post('order/update/{id}', [OrderController::class,'update']);
    Route::post('order/delete/{id}', [OrderController::class,'delete']);
    Route::post('order/vnpay_payment', [OrderController::class,'vnpayPayment']);

    Route::get('/user-id/{id}', [UserController::class, 'getUserId']);
    Route::get('/user', [UserController::class, 'getUsers']);
    Route::post('/getUserbyEmail', [UserController::class, 'getUserbyEmail']);
    Route::post('/user/update-address', [UserController::class, 'updateAddress']);
    Route::post('/user/change-password', [UserController::class, 'changePassword']);
});

Route::post('send-reset-link', [AuthController::class, 'sendResetLinkEmail']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

Route::get('category', [CategoryController::class, 'index']);
Route::get('product-list', [ProductController::class, 'index']);
Route::get('product-detail/{id}', [ProductController::class, 'show']);
Route::get('product-related/{id}', [ProductController::class, 'getProductsByCategory']);


Route::get('reviews', [ProductController::class, 'getReviews']);
Route::get('review/{id}', [ProductController::class, 'getReviewByProduct']);
Route::get('reviewsall', [ProductController::class, 'getReviewsAll']);

Route::post('/some-endpoint', [Controller::class, 'someFunction']);
