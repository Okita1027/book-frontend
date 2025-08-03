// API基础配置
import axios from 'axios';

// 自定义Axios实例
export const apiClient = axios.create({
    baseURL: '/api', // 通过Vite代理转发到后端服务
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 从zustand persist存储中获取token
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            try {
                const authData = JSON.parse(authStorage);
                const token = authData.state?.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('解析认证数据失败:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // 统一错误处理
        if (error.response?.status === 401) {
            // 处理未授权错误
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);