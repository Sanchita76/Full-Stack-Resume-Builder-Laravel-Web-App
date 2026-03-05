import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import Input from "../../components/Inputs/Input";
import {validateEmail} from "../../utils/helper";
import {UserContext} from "../../context/userContext";
import { useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPaths';

const Login =({setCurrentPage,onSwitchToForgotPassword }) => { //✅ ADD onSwitchToForgotPassword prop
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role, setRole] = useState("user"); // ✅ ADD THIS (optional)
  const [error,setError]=useState(null);

  const {updateUser}=useContext(UserContext);

  const navigate=useNavigate();

  //Handle Login Form Submit
  const handleLogin=async(e)=>{
    e.preventDefault();
    
    if (!validateEmail(email)){
      setError("Please enter a valid email address!");
      return;
    }// const errorMessage = validateEmail(email);
    //  if (errorMessage) { setError(errorMessage);
    // return;}

    if(!password){
      setError("Please enter the password!");
      return;
    }

    setError("");

    //Login API Call
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
        role, // ✅ ADD THIS LINE
      });

      const {token}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        // navigate("/dashboard");
        // ✅ Redirect based on role
          if (response.data.role === 'admin') {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
  <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
  
    <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">
      Please enter your details to log in
    </p>

    <form onSubmit={handleLogin}>

      {/* ✅ ADD THIS ROLE SELECT (OPTIONAL) */}
        {/* <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-slate-700">
            Login as
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-box px-4 py-2.5 rounded-lg border border-slate-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}



        <div className="flex flex-col gap-2 mb-4 w-full">
  <label className="text-sm font-semibold text-slate-600 tracking-wide">
    Login as
  </label>

  <div className="relative">
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full appearance-none bg-slate-50
                 px-4 py-3 pr-12
                 rounded-xl border border-slate-300
                 text-sm text-slate-700
                 shadow-sm
                 hover:border-slate-400
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 transition-all duration-200 ease-in-out"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    {/* Custom Dropdown Icon */}
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>



      
      <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="mehulibiswas16@gmail.com"
        type="text"
      />

      {/* You might want to add a password input field */}
      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 characters"
        type="password"
      />


       {/* ✅ NEW: Forgot Password Link */}
        <div className="flex justify-end mb-2">
          {/* <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline"
          >
            Forgot Password?
          </button> */}
          <button
  type="button"
  onClick={onSwitchToForgotPassword}
  className="flex w-full items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-purple-600 transition-all duration-200 bg-white border border-purple-200 rounded-md hover:bg-purple-50 hover:border-purple-400 hover:text-purple-700 active:bg-purple-100 active:scale-[0.98] shadow-sm hover:shadow-md"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
  Forgot Password?
</button>
        </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        // className="bg-black text-white w-full py-2.5 rounded-lg text-sm font-semibold mt-4"
        className="btn-primary">
        LOGIN
      </button>
      <p className="text-[13px] text-slate-800 mt-3">
  Don't have an account?{" "}
  <button
  type="button"
  className="font-medium text-blue-500 cursor-pointer"
  style={{ textDecoration: "underline" }}
  onClick={() => setCurrentPage("signup")}
>
  Sign Up
</button>

</p>
    </form>
  </div>
  );
}
export default Login;
