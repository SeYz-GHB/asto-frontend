import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

import { FiLoader } from "react-icons/fi";
import Input from '../authenticationCompo/Input';
import FloatingShape from '../authenticationCompo/FloatingShape';
import PasswordStrengthMeter from '../authenticationCompo/PasswordStrengthMeter';
import { useAuthStore } from '../authStore';

const SignupPage = () => {


  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {signup,error, isLoading} = useAuthStore();
  
  const hanldeSignUp = async(e) => {
    e.preventDefault();
    try{
      await signup(email,password,name);
      navigate("/verify-email")
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <motion.div className='min-h-screen bg-gradient-to-br flex relative overflow-hidden w-full justify-center items-center top-[-44px]'
      
    
    >
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={2}/>
      <FloatingShape color="bg-green-400" size="w-32 h-32" top="40%" left="-10%" delay={4}/>
      
      <motion.div className=' flex flex-col justify-center p-8 px-12 border-2 rounded-[10px] bg-black '
      initial = {{opacity : 0, y : 20}} 
      animate = {{opacity : 1, y : 0}} 
      transition={{duration : 0.5}}
      >
        <h2 className='font-bold mb-6 text-center animatText'>
            Create Account
        </h2>
          <form onSubmit={hanldeSignUp}>
            <Input 
              icon = {CiUser}
              type = 'text'
              placeholder = "Full Name"
              value = {name}
              onChange = {(e) => setName(e.target.value)}
            />
            <Input 
              icon = {CiMail}
              type = 'email'
              placeholder = "Email Address"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
            />
            <Input 
              icon = {IoLockClosedOutline}
              type = 'password'
              placeholder = "Password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            <button className="mt-5 w-full py-2 px-4 
            border-b-2  border-2 rounded-[10px] cursor-pointer hover:bg-black text-white transition duration-700 ease-in "
            type='submit'
            disabled = {isLoading}
  >
              {isLoading ? <FiLoader className='animate-spin mx-auto' size={24}/> : "Sign Up"}

            </button>
          </form>
          {error && <p className='text-red-500 font-semibold mt-2' >{error}</p>}
          <PasswordStrengthMeter password={password} />
          <div className=' mt-2 text-white text-center'>
            <p className=' '> Alrady have an account? {" "} <Link to={"/login"} className='border-b-2 text-green-500 ' > Login</Link></p>

          </div>
           

      </motion.div>
      
    </motion.div>
  )
}

export default SignupPage
