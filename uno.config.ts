import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetWind3()],
  rules: [
    // 自定义规则
  ],
  shortcuts: {
    // 管理页面容器
    'admin-container': 'p-6 bg-gray-50 min-h-screen',
    'admin-card': 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
    
    // 按钮样式
    'btn-primary': 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200',
    'btn-secondary': 'bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200',
    'btn-danger': 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200',
    'btn-success': 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200',
    
    // 表格样式
    'table-header': 'bg-gray-50 border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700',
    'table-cell': 'px-4 py-3 text-sm text-gray-900 border-b border-gray-100',
    'table-row': 'hover:bg-gray-50 transition-colors duration-150',
    
    // 表单样式
    'form-label': 'block text-sm font-medium text-gray-700 mb-2',
    'form-input': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'form-textarea': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical',
    
    // 布局样式
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-start': 'flex items-center justify-start',
    
    // 文本样式
    'text-title': 'text-xl font-semibold text-gray-900',
    'text-subtitle': 'text-lg font-medium text-gray-800',
    'text-body': 'text-sm text-gray-600',
    'text-muted': 'text-xs text-gray-500',
  },
  // 限制文件扫描范围，避免EMFILE错误
  content: {
    filesystem: [
      'src/**/*.{html,js,ts,jsx,tsx,vue,svelte}',
      'index.html'
    ]
  }
});
