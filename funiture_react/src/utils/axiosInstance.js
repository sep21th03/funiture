import axios from 'axios';
import { refreshUserToken } from '@/services/auth';
import { store } from '@/store/store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý token hết hạn
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi 401 (Unauthorized) và chưa thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Thử refresh token
      const refreshed = await refreshUserToken(store.dispatch);
      
      if (refreshed) {
        // Lấy token mới từ localStorage
        const newToken = localStorage.getItem('access_token');
        // Cập nhật token trong header
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        // Thử lại request ban đầu
        return axiosInstance(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;