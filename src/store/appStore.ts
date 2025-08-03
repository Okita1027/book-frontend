// 应用全局状态管理
import { create } from "zustand";

// 应用状态接口
interface AppState {
  // UI状态
  loading: boolean;
  sidebarCollapsed: boolean;

  // 操作方法
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// 创建应用store
export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  loading: false,
  sidebarCollapsed: false,

  // 设置加载状态
  setLoading: (loading: boolean) => {
    set({ loading });
  },

  // 切换侧边栏折叠状态
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  // 设置侧边栏折叠状态
  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },
}));
