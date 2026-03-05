import React, { useState} from 'react';
import Reviews from './Reviews';
import HERO_IMG from '../assets/hero-img.jpg'
import {useNavigate} from 'react-router-dom';
import Login from './Auth/Login';
import TemplateCarousel from "../components/TemplateCarousel";
import SignUp from './Auth/SignUp';
import Modal from "../components/Modal";
// import { useContext } from 'react';
import {UserContext} from "../context/userContext";
import { useContext } from 'react';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import Footer from './Footer';
import Design from './Design';
import ForgotPassword from './Auth/ForgotPassword'; // ✅ NEW

 // ✅ This one is only for template carousel (not related to main CTA)
  const handleTemplateTry = (templateId) => {
    console.log("Template selected:", templateId);
    // we’ll handle navigation inside TemplateCarousel itself
  };

const LandingPage=() => {
    const {user} =useContext(UserContext);
    const navigate =useNavigate();

    const [openAuthModal, setOpenAuthModal]=useState(false);
    const [currentPage,setCurrentPage]=useState("login");

    const handleCTA=()=>{
        if(!user){
            setOpenAuthModal(true);
        }else{
            // navigate("/dashboard");
            // ✅ Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        }
    }; 


    // ✅ Independent callback for template selection
  const handleTemplateSelect = (templateId) => {
    console.log("Template selected:", templateId);
    // optional tracking / analytics
  };
    return (
        <div className='w-full min-h-full bg-white'>
           <div className="container mx-auto px-4 py-6">
               {/*Header*/}
               <header className="flex justify-between items-center mb-16">
                <div className="text-xl font-bold pl-0" style={{fontFamily: "cursive",color:"blue",fontSize:"1.7rem"}}>IntelliResume</div>
                {user ? <ProfileInfoCard/> : <button 
                className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition colors cursor-pointer"
                onClick={()=>setOpenAuthModal(true)}
                >
                    Login/Sign Up
                </button>}
               </header>

               

               {/*Hero Content*/}
               <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Build Your{""}
                        <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                            &nbsp;Resume Effortlessly 
                        </span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Craft a job-winning , ATS-friendly resume in minutes with our smart AI-powered resume builder. Choose from modern templates and download your professional CV instantly!
                        </p>
                    <div className="flex flex-wrap items-center">
                        <button 
                        className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
                        onClick={handleCTA}
                        >
                        Get Started!
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button 
                        className="bg-purple-700 text-sm font-semibold text-white px-5 py-3 rounded-lg hover:bg-pink-800 transition-colors cursor-pointer whitespace-nowrap"
                        onClick={handleCTA}
                        >
                            AI Resume Analyzer
                        </button>&nbsp;
                        <br className="hidden md:block" />
                        <div className="flex flex-wrap gap-4 mt-4 md:mt-0 items-center">
                            <div className="flex items-center mr-4 ml-3"><br className="hidden md:block" /><br/>
                               <span className="text-purple-600 text-lg font-bold">↑</span>
                               <span className="text-purple-600 text-lg font-bold ml-1">38%</span>
                               <span className="text-purple-600 text-sm ml-1">more interviews</span>
                            </div>
                            <div className="flex items-center border-l border-purple-600 pl-3">
                                <span className="text-purple-600 text-lg font-bold">↑</span>
                                <span className="text-purple-600 text-lg font-bold ml-1">23%</span>
                                <span className="text-purple-600 text-sm ml-1">more likely to get a job offer</span>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="w-full md:w-1/2">
                    <img src={HERO_IMG} 
                    alt="Hero Image" 
                    className="w-full rounded-lg" 
                    />
               </div>
           </div>
            
           <br/><br/>
           {/* Template Carousel Section */}
        <TemplateCarousel onTemplateSelect={handleTemplateSelect} />
        <br/><br/>
           <Design/>
           <br/><br/>
           <Reviews/>
           <br/><br/>
           {/* Template Carousel Section
        <TemplateCarousel onTemplateSelect={handleTemplateSelect} /> */}
           </div>

           <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">⚠️⚠️The names and logos of the companies referred to above are all trademarks of their respective holders.⚠️⚠️<br/>
            Unless specifically stated otherwise, such references are not intended to imply any 
            affiliation or association with ResumeBuilder.com. <br/>
            Made with ❤︎.... Happy Coding!
           </div>

           {/* <Modal  forgot password
           isOpen={openAuthModal}
           onClose={()=>{
            setOpenAuthModal(false);
            setCurrentPage("login");
           }}
           hideHeader
           >
            <div >
                {currentPage==="login" && <Login setCurrentPage={setCurrentPage}/>}
                {currentPage==="signup" && (
                    <SignUp setCurrentPage={setCurrentPage}/>
                )}
            </div>
           </Modal> */}

           {/* ✅ UPDATED: Auth Modal with Forgot Password */}
            <Modal 
                isOpen={openAuthModal} 
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login"); // Reset to login when closing
                }}
                title={
                    currentPage === "login" ? "Login" : 
                    currentPage === "signup" ? "Sign Up" : 
                    "Forgot Password"
                }
            >
                
                {/* {currentPage === "login" ? (
                    <Login 
                        setCurrentPage={setCurrentPage}
                        onSwitchToForgotPassword={() => setCurrentPage("forgot")} // ✅ NEW
                    />
                ) : currentPage === "signup" ? (
                    <SignUp 
                        setCurrentPage={setCurrentPage}
                    />
                ) : (
                    <ForgotPassword 
                        onBackToLogin={() => setCurrentPage("login")} // ✅ NEW
                    />
                )} */}
                <div className="w-full max-w-sm mx-auto p-2"> 
    <div className="flex flex-col gap-3"> {/* Use a small gap to reduce vertical height */}
        {currentPage === "login" ? (
            <Login 
                setCurrentPage={setCurrentPage}
                onSwitchToForgotPassword={() => setCurrentPage("forgot")} 
            />
        ) : currentPage === "signup" ? (
            <SignUp 
                setCurrentPage={setCurrentPage}
            />
        ) : (
            <ForgotPassword 
                onBackToLogin={() => setCurrentPage("login")} 
            />
        )}
    </div>
</div>
            </Modal>


              <Footer/>
        </div>
    );
};

export default LandingPage;