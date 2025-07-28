
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FloatingShape from '../authenticationCompo/FloatingShape';
import Input from '../authenticationCompo/Input';
import { CiMail } from 'react-icons/ci';
import { useAuthStore } from '../authStore';

const ForgotPswPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const { forgotPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
    }
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-gradient-to-br flex relative overflow-hidden w-full justify-center items-center top-[-44px]'>
        <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
        <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={2}/>
        <FloatingShape color="bg-green-400" size="w-32 h-32" top="40%" left="-10%" delay={4}/>
        
        <motion.div 
          className='flex flex-col justify-center items-center p-8 px-12 border-2 border-gray-700 rounded-[10px] bg-black bg-opacity-80 backdrop-blur-md shadow-2xl max-w-md w-full mx-4'
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <div className='mb-6 p-4 bg-green-500 bg-opacity-20 rounded-full'>
            <FiCheck className='text-green-400 text-4xl' />
          </div>

          {/* Title */}
          <h2 className='text-3xl font-bold text-white mb-4 text-center'>
            Email Sent!
          </h2>

          {/* Message */}
          <p className='text-gray-300 mb-6 text-center'>
            We've sent a password reset link to <span className='text-green-400 font-semibold'>{email}</span>
          </p>

          <p className='text-gray-400 mb-8 text-center text-sm'>
            Please check your email and follow the instructions to reset your password. 
            Don't forget to check your spam folder!
          </p>

          {/* Back to Login */}
          <Link 
            to="/login"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-center"
          >
            Back to Login
          </Link>

          {/* Resend email option */}
          <button 
            onClick={() => setIsSubmitted(false)}
            className='mt-4 text-green-400 hover:text-green-300 text-sm underline'
          >
            Didn't receive the email? Try again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br flex relative overflow-hidden w-full justify-center items-center top-[-44px]'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={2}/>
      <FloatingShape color="bg-green-400" size="w-32 h-32" top="40%" left="-10%" delay={4}/>
      
      <motion.div 
        className='flex flex-col justify-center items-center p-8 px-12 border-2 border-gray-700 rounded-[10px] bg-black bg-opacity-80 backdrop-blur-md shadow-2xl max-w-md w-full mx-4'
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
        <h2 className='text-3xl font-bold text-white mb-2 text-center'>
          Forgot Password?
        </h2>

        {/* Subtitle */}
        <p className='text-gray-300 mb-8 text-center'>
          No worries! Enter your email address and we'll send you a reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='w-full'>
          {/* Email Input */}
          <div className='mb-6'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-2'>
              Email Address
            </label>
            <div className='relative'>
              <FiMail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400' />
              <Input 
                placeholder="Email Address"
                type="email"
                icon={CiMail}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-sm text-center'>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Remember Password */}
        <div className='mt-6 text-center'>
          <span className='text-gray-400 text-sm'>
            Remember your password?{' '}
            <Link to="/login" className='text-green-400 hover:text-green-300 hover:underline'>
              Sign in here
            </Link>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPswPage;
