// frontend/Store/authStore.js
import axios from 'axios';
import { create } from 'zustand';


const API_URL = "/api/auth"; // ✅ Because axios.js already has /api



// Configure axios to always send cookies
axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        email, password, name
      });

      set({
        user: res.data.user,
        isAuthenticated: false, // not verified yet
        isLoading: false
      });

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false
      });
      throw error;
    }
  },

  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve,2000))
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email, password
      });
      
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false
      });

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false
      });
      throw error;
    }
  },
  
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve,2000))
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging out",
        isLoading: false
      });
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = get(); // get current user to fetch email
      const res = await axios.post(`${API_URL}/verify-email`, {
        email: user.email,
        code
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false
      });
      
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message ?? "Error verifying email",
        isLoading: false
      });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/check-auth`);
      set({
        user: res.data.user,
        isAuthenticated: true,
        isCheckingAuth: false
      });
    } catch (error) {
      set({
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false
        
      });
    }
  },
  forgotPassword: async(email) => {
    set({isLoading : true, error : null});
    try{
      const res = await axios.post(`${API_URL}/forgot-password`,{email,});
      set({
        
      })
      
    }catch(error){
      set({
        error: err.response?.data?.message??"error fogot password"
      })
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ 
        isLoading: false,
        error: null 
      });
      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
        isLoading: false
      });
      throw error;
    }
  },

}));