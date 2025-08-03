// API基础配置
import axios from "axios";
import toast from "react-hot-toast";

// 自定义Axios实例
export const apiClient = axios.create({
  baseURL: "/api", // 通过Vite代理转发到后端服务
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const authData = JSON.parse(authStorage);
        const token = authData.state?.token;
        if (token) {
            // 添加JWT认证方式：在请求头中添加Authorization字段
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        toast.error("认证数据解析错误" + error);
        console.error("认证数据解析错误:" + error);
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
    if (error.response?.status === 401) {
      // 处理未授权错误
      toast.error("未授权，请重新登录")
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
