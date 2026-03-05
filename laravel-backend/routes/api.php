<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\ResumeController;
// use App\Http\Controllers\Admin\AdminUserController;
// use App\Http\Controllers\Admin\AdminResumeController;

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

// ========================================
// AUTH ROUTES (Public)
// ========================================
// Route::prefix('auth')->group(function () {
//     Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/login', [AuthController::class, 'login']);
//     // Route::post('/upload-image', [AuthController::class, 'uploadImage'])->middleware('auth:sanctum');
//     Route::post('/upload-image', [AuthController::class, 'uploadImage']); // commented later

    
//     // Protected route
//     Route::middleware('auth:sanctum')->group(function () {
//         Route::get('/profile', [AuthController::class, 'getProfile']);
//     });
// });

// ========================================
// RESUME ROUTES (Protected - User)
// ========================================
// Route::middleware('auth:sanctum')->prefix('resume')->group(function () {
//     Route::post('/', [ResumeController::class, 'createResume']);
//     Route::get('/', [ResumeController::class, 'getUserResumes']);
//     Route::get('/{id}', [ResumeController::class, 'getResumeById']);
//     Route::put('/{id}', [ResumeController::class, 'updateResume']);
//     Route::delete('/{id}', [ResumeController::class, 'deleteResume']);
//     Route::put('/{id}/upload-images', [ResumeController::class, 'uploadResumeImages']);
// });





use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminResumeController;

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

// ========================================
// AUTH ROUTES (Public)
// ========================================
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/upload-image', [AuthController::class, 'uploadImage']);


    // ✅ NEW: Forgot Password routes
    Route::post('/forgot-password', [AuthController::class, 'sendOtp']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    
    // Protected route
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [AuthController::class, 'getProfile']);
    });
});

// ========================================
// RESUME ROUTES (Protected - User)
// ========================================
Route::middleware('auth:sanctum')->prefix('resume')->group(function () {
    Route::post('/', [ResumeController::class, 'createResume']);
    Route::get('/', [ResumeController::class, 'getUserResumes']);
    Route::get('/{id}', [ResumeController::class, 'getResumeById']);
    Route::put('/{id}', [ResumeController::class, 'updateResume']);
    Route::delete('/{id}', [ResumeController::class, 'deleteResume']);
    // Route::put('/{id}/upload-images', [ResumeController::class, 'uploadResumeImages']); changing to fix thumbnail
    Route::post('/{id}/upload-images', [ResumeController::class, 'uploadResumeImages']);
    // // ✅ ADD THIS LINE
    // Route::put('/resumes/{id}/upload-images', [AdminResumeController::class, 'uploadResumeImages']);
});

// ========================================
// ADMIN ROUTES (Protected - Admin Only)
// ========================================
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    
    // Admin Dashboard Stats
    Route::get('/stats', [AdminUserController::class, 'getStats']);
    
    // User Management
    Route::get('/users', [AdminUserController::class, 'getAllUsers']);
    Route::get('/users/{id}', [AdminUserController::class, 'getUserById']);
    Route::post('/users', [AdminUserController::class, 'createUser']);
    Route::put('/users/{id}', [AdminUserController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminUserController::class, 'deleteUser']);
    Route::put('/users/{id}/toggle-role', [AdminUserController::class, 'toggleUserRole']); // ✅ NEW
    
    // Resume Management (Admin accessing user resumes)
    Route::get('/users/{userId}/resumes', [AdminResumeController::class, 'getUserResumes']);
    Route::post('/users/{userId}/resumes', [AdminResumeController::class, 'createResumeForUser']);
    Route::get('/resumes/{id}', [AdminResumeController::class, 'getResumeById']);
    Route::put('/resumes/{id}', [AdminResumeController::class, 'updateResume']);
    Route::delete('/resumes/{id}', [AdminResumeController::class, 'deleteResume']);
    // ✅ ADD THIS LINE - Admin upload images
    // Route::put('/resumes/{id}/upload-images', [AdminResumeController::class, 'uploadResumeImages']); fixing thumbnail
    Route::post('/resumes/{id}/upload-images', [AdminResumeController::class, 'uploadResumeImages']);
});

Route::get('/test',function(){
    return response()->json(['message'=>'API is working']);
    return response()->json(['message'=>'API is working']);
    console.log('API is working');
});