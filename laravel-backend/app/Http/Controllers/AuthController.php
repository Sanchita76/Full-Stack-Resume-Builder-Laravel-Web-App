<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\PasswordResetOtp;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register a new user (User or Admin)
     * 
     * @route POST /api/auth/register
     * @access Public
     */
    public function register(Request $request)
    {
        try {
            // Validation
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'role' => 'nullable|in:user,admin', // ✅ Accept role during registration
                'profileImageUrl' => 'nullable|string',
                'passkey' => 'required_if:role,admin|string', // ✅ Required if role is admin
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first()
                ], 400);
            }

            // ✅ Validate admin passkey
        if ($request->role === 'admin') {
            $adminPasskey = 'CODECLOUDS'; // The secret passkey
            
            if (!$request->has('passkey') || $request->passkey !== $adminPasskey) {
                return response()->json([
                    'message' => 'Invalid admin passkey. Access denied.'
                ], 403);
            }
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
                'password' => Hash::make($request->password),
                'role' => $request->role ?? 'user', // ✅ Default to 'user' if not provided
                'profile_image_url' => $profileImageUrl,
            ]);

            // Generate token with 7 days expiry
            $token = $user->createToken('auth_token', ['*'], now()->addDays(7))->plainTextToken;

            // Return user data with token
            return response()->json([
                '_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // ✅ Include role in response
                'profileImageUrl' => $user->profile_image_url,
                'token' => $token,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user (User or Admin)
     * 
     * @route POST /api/auth/login
     * @access Public
     */
    public function login(Request $request)
    {
        try {
            // Validation
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
                'role' => 'nullable|in:user,admin', // ✅ Optional role filter
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first()
                ], 400);
            }

            // Find user by email
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid email or password'
                ], 401);
            }

            // ✅ Check if role matches (if role is provided)
            if ($request->has('role') && $user->role !== $request->role) {
                return response()->json([
                    'message' => 'Invalid email or password'
                ], 401);
            }

            // Check password
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid email or password'
                ], 401);
            }

            // Generate token with 7 days expiry
            $token = $user->createToken('auth_token', ['*'], now()->addDays(7))->plainTextToken;

            // Return user data with token
            return response()->json([
                '_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // ✅ Include role in response
                'profileImageUrl' => $user->profile_image_url,
                'token' => $token,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user profile
     * 
     * @route GET /api/auth/profile
     * @access Private (Requires JWT)
     */
    public function getProfile(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                '_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // ✅ Include role
                'profileImageUrl' => $user->profile_image_url,
                'createdAt' => $user->created_at,
                'updatedAt' => $user->updated_at,
                '__v' => 0, // For MongoDB compatibility
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload profile image
     * 
     * @route POST /api/auth/upload-image
     * @access Private
     */
    public function uploadImage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first()
                ], 400);
            }

            if (!$request->hasFile('image')) {
                return response()->json([
                    'message' => 'No file uploaded'
                ], 400);
            }

            // Store image in public/uploads directory
            $image = $request->file('image');
            $filename = time() . '-' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $filename);

            // Generate URL
            $baseUrl = config('app.url');
            $imageUrl = $baseUrl . '/uploads/' . $filename;

            return response()->json([
                'imageUrl' => $imageUrl
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to upload image',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    //for password reset, we will generate OTP and send it to user's email

// ... existing methods ...

/**
 * Send OTP to email for password reset
 * 
 * @route POST /api/auth/forgot-password
 * @access Public
 */
public function sendOtp(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 400);
        }

        // Check if user exists and is NOT an admin
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'No account found with this email address.'
            ], 404);
        }

        // ✅ Block admins from using forgot password
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Password reset is not available for admin accounts. Please contact support.'
            ], 403);
        }

        // Generate 6-digit OTP
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Delete any existing OTPs for this email
        PasswordResetOtp::where('email', $request->email)->delete();

        // Create new OTP (valid for 10 minutes)
        PasswordResetOtp::create([
            'email' => $request->email,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(10),
        ]);

        // Send email
        Mail::raw(
            "Your password reset OTP is: {$otp}\n\n" .
            "This OTP is valid for 10 minutes.\n\n" .
            "If you didn't request this, please ignore this email.\n\n" .
            "Best regards,\n" .
            config('app.name'),
            function ($message) use ($request) {
                $message->to($request->email)
                    ->subject('Password Reset OTP - ' . config('app.name'));
            }
        );

        return response()->json([
            'message' => 'OTP sent successfully! Please check your email.',
            'expiresIn' => 600, // 10 minutes in seconds
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to send OTP. Please try again.',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Verify OTP
 * 
 * @route POST /api/auth/verify-otp
 * @access Public
 */
public function verifyOtp(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 400);
        }

        // Find the OTP
        $otpRecord = PasswordResetOtp::where('email', $request->email)
            ->where('otp', $request->otp)
            ->where('is_used', false)
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$otpRecord) {
            return response()->json([
                'message' => 'Invalid OTP. Please try again.'
            ], 400);
        }

        // Check if expired
        if ($otpRecord->expires_at->isPast()) {
            return response()->json([
                'message' => 'OTP has expired. Please request a new one.'
            ], 400);
        }

        // Mark as used
        $otpRecord->markAsUsed();

        // Generate a reset token (valid for 15 minutes)
        $resetToken = Str::random(64);
        
        // Store in password_reset_tokens table
        \DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($resetToken),
                'created_at' => now()
            ]
        );

        return response()->json([
            'message' => 'OTP verified successfully!',
            'resetToken' => $resetToken,
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to verify OTP.',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Resend OTP
 * 
 * @route POST /api/auth/resend-otp
 * @access Public
 */
public function resendOtp(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 400);
        }

        // Check if there's a recent OTP (less than 10 minutes old)
        $recentOtp = PasswordResetOtp::where('email', $request->email)
            ->where('created_at', '>', now()->subMinutes(10))
            ->orderBy('created_at', 'desc')
            ->first();

        if ($recentOtp && !$recentOtp->is_used) {
            $remainingSeconds = now()->diffInSeconds($recentOtp->created_at->addMinutes(10));
            
            return response()->json([
                'message' => 'Please wait before requesting a new OTP.',
                'remainingSeconds' => $remainingSeconds,
            ], 429); // Too Many Requests
        }

        // Use the same logic as sendOtp
        return $this->sendOtp($request);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to resend OTP.',
            'error' => $e->getMessage()
        ], 500);
    }
}

/**
 * Reset password with token
 * 
 * @route POST /api/auth/reset-password
 * @access Public
 */
public function resetPassword(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first()
            ], 400);
        }

        // Find reset token
        $resetRecord = \DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'message' => 'Invalid reset token.'
            ], 400);
        }

        // Verify token
        if (!Hash::check($request->token, $resetRecord->token)) {
            return response()->json([
                'message' => 'Invalid reset token.'
            ], 400);
        }

        // Check if token is expired (15 minutes)
        if (now()->diffInMinutes($resetRecord->created_at) > 15) {
            return response()->json([
                'message' => 'Reset token has expired.'
            ], 400);
        }

        // Update password
        $user = User::where('email', $request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        // Delete the reset token
        \DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Password reset successfully! You can now login with your new password.'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to reset password.',
            'error' => $e->getMessage()
        ], 500);
    }
}
}





