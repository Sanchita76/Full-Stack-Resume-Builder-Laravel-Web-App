// import React, { useState, useEffect } from 'react';
// import Input from "../../components/Inputs/Input";
// import { validateEmail } from "../../utils/helper";
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPaths';
// import { LuCheck, LuClock, LuMail } from 'react-icons/lu';

// const ForgotPassword = ({ onBackToLogin }) => {
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP Verification
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   // Timer state
//   const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
//   const [canResend, setCanResend] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);

//   // Countdown timer
//   useEffect(() => {
//     if (step === 2 && timeRemaining > 0 && !otpVerified) {
//       const timer = setInterval(() => {
//         setTimeRemaining((prev) => {
//           if (prev <= 1) {
//             setCanResend(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [step, timeRemaining, otpVerified]);

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Handle Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
//         email,
//       });

//       setSuccess(response.data.message);
//       setStep(2);
//       setTimeRemaining(600); // Reset timer
//       setCanResend(false);
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Failed to send OTP. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!otp || otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, {
//         email,
//         otp,
//       });

//       setSuccess(response.data.message);
//       setOtpVerified(true);

//       // Redirect to login after 2 seconds
//       setTimeout(() => {
//         onBackToLogin();
//       }, 2000);
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Failed to verify OTP. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Resend OTP
//   const handleResendOtp = async () => {
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, {
//         email,
//       });

//       setSuccess("OTP resent successfully!");
//       setTimeRemaining(600);
//       setCanResend(false);
//       setOtp(""); // Clear OTP input
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Failed to resend OTP. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
//       {/* Step 1: Enter Email */}
//       {step === 1 && (
//         <>
//           <div className="flex items-center gap-2 mb-2">
//             <LuMail className="text-2xl text-purple-600" />
//             <h3 className="text-lg font-semibold text-black">Forgot Password</h3>
//           </div>
//           <p className="text-xs text-slate-700 mt-[5px] mb-6">
//             Enter your registered email address to receive a password reset OTP
//           </p>

//           <form onSubmit={handleSendOtp}>
//             <Input
//               value={email}
//               onChange={({ target }) => setEmail(target.value)}
//               label="Email Address"
//               placeholder="your-email@gmail.com"
//               type="text"
//             />

//             {error && (
//               <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">
//                 {error}
//               </p>
//             )}

//             {success && (
//               <p className="text-green-500 text-xs mt-2 bg-green-50 p-2 rounded">
//                 {success}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
//                          text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4
//                          transition-all duration-200"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>

//             <button
//               type="button"
//               onClick={onBackToLogin}
//               className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-3 w-full"
//             >
//               ← Back to Login
//             </button>
//           </form>
//         </>
//       )}

//       {/* Step 2: Verify OTP */}
//       {step === 2 && (
//         <>
//           <div className="flex items-center gap-2 mb-2">
//             <LuClock className="text-2xl text-purple-600" />
//             <h3 className="text-lg font-semibold text-black">Verify OTP</h3>
//           </div>
//           <p className="text-xs text-slate-700 mt-[5px] mb-2">
//             Enter the 6-digit OTP sent to <strong>{email}</strong>
//           </p>

//           {/* Timer Display */}
//           <div className="bg-slate-100 rounded-lg p-3 mb-4 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <LuClock className="text-slate-600" />
//               <span className="text-sm text-slate-700">Time remaining:</span>
//             </div>
//             <span className={`text-sm font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-slate-900'}`}>
//               {formatTime(timeRemaining)}
//             </span>
//           </div>

//           <form onSubmit={handleVerifyOtp}>
//             <div className="mb-4">
//               <label className="text-sm font-medium text-slate-700 block mb-2">
//                 Enter OTP
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={({ target }) => {
//                     // Only allow numbers and max 6 digits
//                     const value = target.value.replace(/\D/g, '').slice(0, 6);
//                     setOtp(value);
//                   }}
//                   placeholder="000000"
//                   maxLength={6}
//                   className="w-full px-4 py-3 rounded-lg border border-slate-300 
//                              text-center text-2xl tracking-widest font-mono
//                              focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//                 {otpVerified && (
//                   <LuCheck className="absolute right-3 top-1/2 -translate-y-1/2 
//                                       text-2xl text-green-600" />
//                 )}
//               </div>
//             </div>

//             {error && (
//               <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">
//                 {error}
//               </p>
//             )}

//             {success && (
//               <p className="text-green-500 text-xs mt-2 bg-green-50 p-2 rounded flex items-center gap-2">
//                 <LuCheck className="text-green-600" />
//                 {success}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={loading || otpVerified || otp.length !== 6}
//               className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
//                          text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4
//                          transition-all duration-200 flex items-center justify-center gap-2"
//             >
//               {loading ? "Verifying..." : otpVerified ? "Verified ✓" : "Verify OTP"}
//             </button>

//             {/* Resend OTP Button */}
//             <button
//               type="button"
//               onClick={handleResendOtp}
//               disabled={!canResend || loading}
//               className="text-purple-600 hover:text-purple-700 disabled:text-gray-400 
//                          disabled:cursor-not-allowed text-sm font-medium mt-3 w-full"
//             >
//               {canResend ? "Resend OTP" : `Resend available in ${formatTime(timeRemaining)}`}
//             </button>

//             <button
//               type="button"
//               onClick={onBackToLogin}
//               className="text-slate-600 hover:text-slate-700 text-sm font-medium mt-2 w-full"
//             >
//               ← Back to Login
//             </button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;










import React, { useState, useEffect } from 'react';
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuCheck, LuClock, LuMail, LuLock } from 'react-icons/lu';

const ForgotPassword = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState(""); // ✅ Store token from OTP verification
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (step === 2 && timeRemaining > 0 && !otpVerified) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, timeRemaining, otpVerified]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
        email,
      });

      setSuccess(response.data.message);
      setStep(2);
      setTimeRemaining(600);
      setCanResend(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, {
        email,
        otp,
      });

      setSuccess(response.data.message);
      setOtpVerified(true);
      setResetToken(response.data.resetToken); // ✅ Store the reset token

      // Move to password reset step after 1 second
      setTimeout(() => {
        setStep(3);
        setSuccess(null);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        email,
        token: resetToken,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setSuccess(response.data.message);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onBackToLogin();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, {
        email,
      });

      setSuccess("OTP resent successfully!");
      setTimeRemaining(600);
      setCanResend(false);
      setOtp("");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      {/* Step 1: Enter Email */}
      {step === 1 && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <LuMail className="text-2xl text-purple-600" />
            <h3 className="text-lg font-semibold text-black">Forgot Password</h3>
        
          </div>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Enter your registered email address to receive a password reset OTP
          </p>

          <form onSubmit={handleSendOtp}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="your-email@gmail.com"
              type="text"
            />

            {error && (
              <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-500 text-xs mt-2 bg-green-50 p-2 rounded">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                         text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4
                         transition-all duration-200"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              onClick={onBackToLogin}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-3 w-full"
            >
              ← Back to Login
            </button>
          </form>
        </>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <LuClock className="text-2xl text-purple-600" />
            <h3 className="text-lg font-semibold text-black">Verify OTP</h3>
          </div>
          <p className="text-xs text-slate-700 mt-[5px] mb-2">
            Enter the 6-digit OTP sent to <strong>{email}</strong>
          </p>

          <div className="bg-slate-100 rounded-lg p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuClock className="text-slate-600" />
              <span className="text-sm text-slate-700">Time remaining:</span>
            </div>
            <span className={`text-sm font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-slate-900'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={({ target }) => {
                    const value = target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 
                             text-center text-2xl tracking-widest font-mono
                             focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {otpVerified && (
                  <LuCheck className="absolute right-3 top-1/2 -translate-y-1/2 
                                      text-2xl text-green-600" />
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-500 text-xs mt-2 bg-green-50 p-2 rounded flex items-center gap-2">
                <LuCheck className="text-green-600" />
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || otpVerified || otp.length !== 6}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                         text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4
                         transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? "Verifying..." : otpVerified ? "Verified ✓" : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend || loading}
              className="text-purple-600 hover:text-purple-700 disabled:text-gray-400 
                         disabled:cursor-not-allowed text-sm font-medium mt-3 w-full"
            >
              {canResend ? "Resend OTP" : `Resend available in ${formatTime(timeRemaining)}`}
            </button>

            <button
              type="button"
              onClick={onBackToLogin}
              className="text-slate-600 hover:text-slate-700 text-sm font-medium mt-2 w-full"
            >
              ← Back to Login
            </button>
          </form>
        </>
      )}

      {/* ✅ NEW: Step 3: Reset Password */}
      {step === 3 && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <LuLock className="text-2xl text-purple-600" />
            <h3 className="text-lg font-semibold text-black">Create New Password</h3>
          </div>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Enter your new password. Make sure both passwords match.
          </p>

          <form onSubmit={handleResetPassword}>
            <Input
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
              label="New Password"
              placeholder="Min 6 characters"
              type="password"
            />

            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Re-enter password"
              type="password"
            />

            {/* Password Match Indicator */}
            {newPassword && confirmPassword && (
              <div className={`text-xs mt-2 p-2 rounded flex items-center gap-2 
                ${newPassword === confirmPassword ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {newPassword === confirmPassword ? (
                  <>
                    <LuCheck className="text-green-600" />
                    Passwords match
                  </>
                ) : (
                  <>
                    ✕ Passwords do not match
                  </>
                )}
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-500 text-xs mt-2 bg-green-50 p-2 rounded flex items-center gap-2">
                <LuCheck className="text-green-600" />
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                         text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4
                         transition-all duration-200"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={onBackToLogin}
              className="text-slate-600 hover:text-slate-700 text-sm font-medium mt-3 w-full"
            >
              ← Back to Login
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;