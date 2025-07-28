import React, { useState } from 'react'
import FloatingShape from '../authenticationCompo/FloatingShape'
import Input from '../authenticationCompo/Input'
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuthStore } from '../authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();
  
  const [submitting, setSubmitting] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  if (submitting || isLoading) return;

  setSubmitting(true);
  try {
    await login(email, password);
    navigate("/");
  } catch (error) {
    console.log("Login error:", error);
  } finally {
    setSubmitting(false); // always reset
  }
};


  return (
    <div className='min-h-screen bg-gradient-to-br flex relative overflow-hidden w-full justify-center items-center top-[-44px]'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={2}/>
      <FloatingShape color="bg-green-400" size="w-32 h-32" top="40%" left="-10%" delay={4}/>
      
      <motion.div 
        className='flex flex-col justify-center p-8 px-12 border-2 rounded-[10px] bg-black'
        initial={{opacity: 0, y: 20}} 
        animate={{opacity: 1, y: 0}} 
        transition={{duration: 0.5}}
      >
        <h2 className='font-bold mb-6 text-center text-white text-2xl'>Welcome Back!</h2>
        
        {/* Display error message if exists */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <Input 
            placeholder="Email Address"
            type="email"
            icon={CiMail}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input 
            placeholder="Password"
            type="password"
            icon={IoLockClosedOutline}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-end mb-4">
            <Link to="/forgot-password" className="text-green-500 underline italic text-sm">
              Forgot Password?
            </Link>
          </div>

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
              "Login"
            )}
          </button>
        </form>

        <div className='mt-4 text-white text-center'>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className='text-green-500 hover:text-green-400 underline'>
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage