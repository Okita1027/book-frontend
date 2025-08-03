// 认证状态管理
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponseDTO } from "@/types";

// 认证状态接口
interface AuthState {
  // 状态
  token: string | null;
  user: {
    name: string;
    role: string;
    expiresAt: string;
  } | null;
  isAuthenticated: boolean;

  // 操作方法
  login: (authData: AuthResponseDTO) => void;
  logout: () => void;
  checkTokenExpiry: () => boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
}

// 创建认证store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始状态
      token: null,
      user: null,
      isAuthenticated: false,

      // 登录方法
      login: (authData: AuthResponseDTO) => {
        console.log("authStore.login 收到的数据:", authData);
        const { token, name, role, expiresAt } = authData;

        const newState = {
          token: token || null,
          user: {
            name: name || "",
            role: role || "",
            expiresAt: expiresAt,
          },
          isAuthenticated: true,
        };

        console.log("authStore.login 设置的状态:", newState);
        set(newState);
      },

      // 登出方法
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });

      },

      // 检查token是否过期
      checkTokenExpiry: () => {
        const { user } = get();
        console.log("checkTokenExpiry - user:", user);

        if (!user || !user.expiresAt) {
          console.log("checkTokenExpiry - 没有用户信息或过期时间");
          return false;
        }

        const expiryTime = new Date(user.expiresAt).getTime();
        const currentTime = new Date().getTime();

        console.log(
          "checkTokenExpiry - 过期时间:",
          user.expiresAt,
          "转换后:",
          expiryTime
        );
        console.log(
          "checkTokenExpiry - 当前时间:",
          new Date().toISOString(),
          "转换后:",
          currentTime
        );
        console.log("checkTokenExpiry - 是否过期:", currentTime >= expiryTime);

        if (currentTime >= expiryTime) {
          // token已过期，清除数据
          console.log("checkTokenExpiry - token已过期，执行登出");
          get().logout();
          return false;
        }

        return true;
      },

      // 判断是否为管理员
      isAdmin: () => {
        const { user, isAuthenticated } = get();
        if (!isAuthenticated || !user) {
          return false;
        }
        return user.role === "Admin";
      },

      // 判断是否为普通用户
      isUser: () => {
        const { user, isAuthenticated } = get();
        if (!isAuthenticated || !user) {
          return false;
        }
        return user.role === "Member";
      },
    }),
    {
      name: "auth-storage", // 本地存储的key名称
      // 持久化登录状态
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
