<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminUserController extends Controller
{
    /**
     * Get all users with pagination
     * 
     * @route GET /api/admin/users
     * @access Admin only
     */
    public function getAllUsers(Request $request)
    {
        try {
            $perPage = $request->query('per_page', 15); // Default 15 users per page
            $search = $request->query('search', '');

            $query = User::query();

            // Search functionality
            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            }

            // Order by newest first
            $query->orderBy('created_at', 'desc');

            // Paginate
            $users = $query->paginate($perPage);

            // Format response
            $formattedUsers = $users->map(function ($user) {
                return [
                    '_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'profileImageUrl' => $user->profile_image_url,
                    'profile_image_url' => $user->profile_image_url, // ✅ ALSO INCLUDE SNAKE_CASE FOR COMPATIBILITY
                    'resumeCount' => $user->resumes()->count(),
                    'createdAt' => $user->created_at,
                    'updatedAt' => $user->updated_at,
                    'resumeCount' => $user->resumes()->count(), // Count of resumes
                ];
            });

            return response()->json([
                'users' => $formattedUsers,
                'pagination' => [
                    'total' => $users->total(),
                    'perPage' => $users->perPage(),
                    'currentPage' => $users->currentPage(),
                    'lastPage' => $users->lastPage(),
                    'from' => $users->firstItem(),
                    'to' => $users->lastItem(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single user by ID
     * 
     * @route GET /api/admin/users/{id}
     * @access Admin only
     */
    public function getUserById($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                '_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'profileImageUrl' => $user->profile_image_url,
                'createdAt' => $user->created_at,
                'updatedAt' => $user->updated_at,
                'resumeCount' => $user->resumes()->count(),
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create new user (for customer support)
     * 
     * @route POST /api/admin/users
     * @access Admin only
     */
    public function createUser(Request $request)
    {
        try {
            // Validation
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'role' => 'nullable|in:user,admin',
                'profileImageUrl' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first()
                ], 400);
            }

            // Check if user already exists
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json([
                    'message' => 'User already exists.'
                ], 400);
            }

            // Fix profile image URL
            $profileImageUrl = $request->profileImageUrl;
            if ($profileImageUrl && !str_starts_with($profileImageUrl, 'http')) {
                $profileImageUrl = config('app.url') . $profileImageUrl;
            }

            // Create new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Hash password
                'role' => $request->role ?? 'user',
                'profile_image_url' => $profileImageUrl,
            ]);

            return response()->json([
                'message' => 'User created successfully',
                'user' => [
                    '_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'profileImageUrl' => $user->profile_image_url,
                    'createdAt' => $user->created_at,
                    'updatedAt' => $user->updated_at,
                ],
                'tempPassword' => $request->password, // Return password to show admin once
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user details
     * 
     * @route PUT /api/admin/users/{id}
     * @access Admin only
     */
    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            // Validation
            $validator = Validator::make($request->all(), [
                'name' => 'nullable|string|max:255',
                'email' => 'nullable|string|email|max:255|unique:users,email,' . $id,
                'password' => 'nullable|string|min:6',
                'profileImageUrl' => 'nullable|string',
                // Note: role, created_at, updated_at are NOT editable
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first()
                ], 400);
            }

            // Update only allowed fields
            if ($request->has('name')) {
                $user->name = $request->name;
            }

            if ($request->has('email')) {
                $user->email = $request->email;
            }

            if ($request->has('password') && !empty($request->password)) {
                $user->password = Hash::make($request->password); // Auto-hash password
            }

            if ($request->has('profileImageUrl')) {
                $profileImageUrl = $request->profileImageUrl;
                if ($profileImageUrl && !str_starts_with($profileImageUrl, 'http')) {
                    $profileImageUrl = config('app.url') . $profileImageUrl;
                }
                $user->profile_image_url = $profileImageUrl;
            }

            $user->save();

            return response()->json([
                'message' => 'User updated successfully',
                'user' => [
                    '_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'profileImageUrl' => $user->profile_image_url,
                    'createdAt' => $user->created_at,
                    'updatedAt' => $user->updated_at,
                ],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user and all their resumes (cascade)
     * 
     * @route DELETE /api/admin/users/{id}
     * @access Admin only
     */
    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            // Get resume count before deletion
            $resumeCount = $user->resumes()->count();

            // Delete user (resumes will cascade delete due to foreign key)
            $user->delete();

            return response()->json([
                'message' => 'User deleted successfully',
                'deletedUser' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'deletedResumes' => $resumeCount,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /*For Promotion Demotion Admin<->User*/
    /**
    * Toggle user role between 'user' and 'admin'
    * 
    * @route PUT /api/admin/users/{id}/toggle-role
    * @access Admin only
    */
    public function toggleUserRole($id)
    {
        try {
            $userToUpdate = User::find($id);

            if (!$userToUpdate) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            // ✅ Toggle the role
            $newRole = $userToUpdate->role === 'admin' ? 'user' : 'admin';
            $userToUpdate->role = $newRole;
            $userToUpdate->save();

            return response()->json([
                'message' => 'Role updated successfully',
                'user' => [
                    '_id' => $userToUpdate->id,
                    'name' => $userToUpdate->name,
                    'email' => $userToUpdate->email,
                    'role' => $userToUpdate->role,
                ],
                'newRole' => $newRole,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update role',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics for admin dashboard
     * 
     * @route GET /api/admin/stats
     * @access Admin only
     */
    public function getStats()
    {
        try {
            $totalUsers = User::where('role', 'user')->count();
            $totalAdmins = User::where('role', 'admin')->count();
            $totalResumes = Resume::count();
            $recentUsers = User::where('role', 'user')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get(['id', 'name', 'email', 'created_at']);

            return response()->json([
                'totalUsers' => $totalUsers,
                'totalAdmins' => $totalAdmins,
                'totalResumes' => $totalResumes,
                'recentUsers' => $recentUsers,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}