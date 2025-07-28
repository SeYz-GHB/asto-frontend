import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FloatingShape from '../authenticationCompo/FloatingShape';

import toast from 'react-hot-toast';
import { useAuthStore } from '../authStore';



const EmailVerificationPage = () => {
    const [code, setCode] = useState(["","","","","",""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const {error,isLoading,verifyEmail} = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];
        //handle pasted content
        if(value.maxLength>1){
            const pastedCode = value.slice(0,6).split('');
            for(let i= 0; i<6; i++){
                newCode[i] = pastedCode[i] || "";

            }
            setCode(newCode)

            // focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex(digit => digit !== "");
            const focusIndex = lastFilledIndex <5 ? lastFilledIndex + 1: 5;
            inputRefs.current[focusIndex].focus();           
        }else{
            newCode[index] = value;
            setCode(newCode);
            if(value && index<5){
                inputRefs.current[index + 1].focus();
            }

            
        }
    }
    const handleKeyDown = (index,e) =>{
        if(e.key === "Backspace" && !code[index] && index>0){
            inputRefs.current[index -1].focus();
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try{
            await verifyEmail(verificationCode);
            navigate("/");
             console.log("Verification successful, navigating to home...");
            toast.success("Email verified successfully")
        }catch(error){
            console.log(error);
        }
    }
    // auto submit when all fields are filled
   /*  useEffect(() => {
        if(code.every(digit =>digit !== "")){
            handleSubmit(new Event('submit'));
        }
    }) */

    return (
        <div className='min-h-screen bg-gradient-to-br flex relative overflow-hidden w-full justify-center items-center top-[-44px]'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={2}/>
      <FloatingShape color="bg-green-400" size="w-32 h-32" top="40%" left="-10%" delay={4}/>
      
      {/* Your login form content would go here */}
      <motion.div className=' flex flex-col justify-center p-8 border-2 rounded-[10px]  bg-black text-white'
      initial = {{opacity : 0, y : 20}} 
      animate = {{opacity : 1, y : 0}} 
      transition={{duration : 0.5}}>
        <h2 className='font-bold mb-6 text-center animatText'>
            Verify Your Email
        </h2>
        <p>Enter the 6-digit code sent to your email address.</p>
        <form onSubmit={handleSubmit}>
            <div className='flex justify-between py-6'>
              {code.map((digit, index) => (
            <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-700 rounded-lg focus:border-green-500 focus:outline-none'
            />
            ))}
  
            </div>
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 
                        rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
                        disabled:opacity-50"
            >
            {isLoading ? "Verifying..." : "Verify Email"}
            </motion.button>


        </form>
        
        
      </motion.div>
    </div>
    )
}

export default EmailVerificationPage
