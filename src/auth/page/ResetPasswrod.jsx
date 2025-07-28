import React, { useState } from 'react'
import FloatingShape from '../authenticationCompo/FloatingShape'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import Input from '../authenticationCompo/Input'
import { Link, replace, useNavigate, useParams } from 'react-router-dom'
import { CiLock, CiMail } from 'react-icons/ci'

import toast from 'react-hot-toast'
import { useAuthStore } from '../authStore'

const ResetPassswod = () => {

  const{ token} = useParams();
  const navigate = useNavigate();


  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {resetPassword, isLoading, error} = useAuthStore(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!newPassword || !confirmPassword){
      return toast.error("Both fileds are require");

    }
    if(newPassword != confirmPassword){
      return toast.error("Passwords don't match");

    }

    try{
      await resetPassword(token,newPassword);
      toast.success("Pasword reset! please log in.");
      navigate("/login", replace)
    }
    catch(error){
       throw error;
    }

  }

  return (
    <div className='min-h-screen bg-gradient-to-br flex relative overflow-hidden w-full justify-center items-center top-[-44px]'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={2}/>
      <FloatingShape color="bg-green-400" size="w-32 h-32" top="40%" left="-10%" delay={4}/>
      
      <motion.div 
        className='flex flex-col justify-center items-center p-8 px-12 border-2 border-gray-700 rounded-[10px] bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-2xl max-w-md w-full mx-4'
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <div className='w-full mb-4'>
          <Link 
            to="/login"
            className='flex items-center text-green-400 hover:text-green-300 transition-colors duration-200'
          >
            <FiArrowLeft className='mr-2' />
            Back to Login
          </Link>
        </div>

        {/* Icon */}
        <div className='mb-6 p-4 bg-green-500 bg-opacity-20 rounded-full'>
          <FiMail className='text-green-400 text-4xl' />
        </div>

        {/* Title */}
        <h2 className='text-3xl font-bold text-white text-center mb-10'>
          Reset Password
        </h2>

      

        {/* Form */}
        <form onSubmit={handleSubmit} className='w-full'>
          {/* Email Input */}
          <div className='mb-6'>

              <Input 
                placeholder="New Password"
                type="password"
                icon={CiLock}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
                <Input 
                  placeholder="Confirm Password"
                  type="password"
                  icon={CiLock}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
              />
           
          </div>
          {error && <p className='text-red-500'>{error}</p>}

          {/* Error Message */}
          {/* {error && (
            <div className='mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-sm text-center'>
              {error}
            </div>
          )}
 */}
          {/* Submit Button */}
           <button 

            className="mt-2 w-full py-3 px-4 bg-green-600 hover:bg-green-700 
              border-2 border-green-500 rounded-[10px] cursor-pointer 
              text-white transition duration-300 ease-in-out
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center hover:border-green-700"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <FiLoader className='animate-spin' size={20}/>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Remember Password */}
        <div className='mt-6 text-center'>
          <span className='text-red-500 text-sm'>
            Don't reuse old passwords!
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPassswod
