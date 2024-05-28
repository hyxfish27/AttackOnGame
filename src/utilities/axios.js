import axios from 'axios';
import cookie from '@/utilities/cookie/cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
});
console.log(import.meta.env.VITE_API_URL);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookie.get('AttackOnGameJWT');

        const authConfig = config;

        if (token) {
            authConfig.headers.Authorization = `Bearer ${token}`;
        }

        return authConfig;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
