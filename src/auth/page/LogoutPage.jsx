// Option 1: Proper LogoutPage Component
import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FloatingShape from '../authenticationCompo/FloatingShape';
import { useAuthStore } from '../authStore';

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logout, isLoading, error, user } = useAuthStore();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout. Please try again.");
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

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
  
                <div className='mb-6 p-4 bg-red-500 bg-opacity-20 rounded-full'>
                    <FiLogOut className='text-red-400 text-4xl' />
                </div>


                <h2 className='text-3xl font-bold text-white mb-2 text-center'>
                    Logout
                </h2>

        
                {user && (
                    <p className='text-gray-300 mb-6 text-center'>
                        Are you sure you want to logout, {user.name}?
                    </p>
                )}

          
                <p className='text-gray-400 mb-8 text-center text-sm'>
                    You will be signed out of your account and redirected to the login page.
                </p>

                {error && (
                    <div className='mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-sm text-center'>
                        {error}
                    </div>
                )}

     
                <div className='flex gap-4 w-full'>
              
                    <button 
                        onClick={handleCancel}
                        className="flex-1 py-3 px-4 border-2 border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 text-gray-300 hover:text-white transition duration-300 ease-in-out font-medium"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>

                    <button 
                        onClick={handleLogout}
                        className="flex-1 py-3 px-4 border-2 border-red-600 bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 hover:border-red-700 text-white transition duration-300 ease-in-out font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <FiLoader className='animate-spin mx-auto' size={20}/>
                        ) : (
                            "Logout"
                        )}
                    </button>
                    
                </div>
            </motion.div>
        </div>
    );
};

export default LogoutPage;

