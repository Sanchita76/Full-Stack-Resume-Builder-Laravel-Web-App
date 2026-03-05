// export const BASE_URL="https://resume-builder-ujy5.onrender.com";


// export const BASE_URL="http://localhost:8000";


//utils/apiPaths.js


// export const API_PATHS={
//     AUTH:{
//         REGISTER:"/api/auth/register",//Signup
//         LOGIN:"/api/auth/login",//Authenticate user 7 return JWT token
//         GET_PROFILE:"/api/auth/profile",//Get logged-in user details

//     },
     
//     RESUME:{
//         CREATE:"/api/resume",//POST - Create a new resume
//         GET_ALL:"/api/resume",//GET - Get all resumes of logged-in user
//         GET_BY_ID:(id)=>`/api/resume/${id}`,//GET - Get resume by ID
//         UPDATE :(id)=>`/api/resume/${id}`,//PUT - Update resume by ID
//         DELETE:(id)=>`/api/resume/${id}`,//DELETE - Delete resume by ID
//         UPLOAD_IMAGES:(id)=>`/api/resume/${id}/upload-images` //PUT - Upload thumbnail & resume profile images
//      },

//      IMAGE:{
//         UPLOAD_IMAGE:"api/auth/upload-image",
//      }
// };
 






// Change this line:
export const BASE_URL = "http://localhost:8000";

// Keep all API paths the same - they're compatible!
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
        // ✅ ADD THIS LINE
        FORGOT_PASSWORD: "/api/auth/forgot-password", // ✅ NEW
        VERIFY_OTP: "/api/auth/verify-otp", // ✅ NEW
        RESEND_OTP: "/api/auth/resend-otp", // ✅ NEW
        RESET_PASSWORD: "/api/auth/reset-password", // ✅ NEW
    },
    RESUME: {
        CREATE: "/api/resume",
        GET_ALL: "/api/resume",
        GET_BY_ID: (id) => `/api/resume/${id}`,
        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },
    // ✅ ADD ADMIN PATHS
    ADMIN: {
        GET_ALL_USERS: "/api/admin/users",
        GET_USER_BY_ID: (id) => `/api/admin/users/${id}`,
        CREATE_USER: "/api/admin/users",
        UPDATE_USER: (id) => `/api/admin/users/${id}`,
        DELETE_USER: (id) => `/api/admin/users/${id}`,
        TOGGLE_ROLE: (id) => `/api/admin/users/${id}/toggle-role`, // ✅ NEW
        GET_STATS: "/api/admin/stats",
        GET_USER_RESUMES: (userId) => `/api/admin/users/${userId}/resumes`,
        CREATE_USER_RESUME: (userId) => `/api/admin/users/${userId}/resumes`,
        GET_RESUME: (id) => `/api/admin/resumes/${id}`,
        UPDATE_RESUME: (id) => `/api/admin/resumes/${id}`,
        DELETE_RESUME: (id) => `/api/admin/resumes/${id}`,
        // ✅ ADD THIS LINE
    UPLOAD_RESUME_IMAGES: (id) => `/api/admin/resumes/${id}/upload-images`,
    }
};