import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://168.231.101.215:8005/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: التعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('غير مصرح، برجاء تسجيل الدخول مجددًا');
      // تقدر تعمل logout أو redirect هنا لو حبيت
    }
    return Promise.reject(error);
  }
);

export default api;
