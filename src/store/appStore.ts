import { create } from "zustand";

// 应用状态接口
interface AppState {
  // UI状态
  sidebarCollapsed: boolean;

  // 操作方法
  toggleSidebar: () => void;
}

// 创建应用store
export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  sidebarCollapsed: false,

  // 切换侧边栏折叠状态
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

}));
