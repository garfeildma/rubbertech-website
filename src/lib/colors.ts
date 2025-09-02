// RubberTech 绿色主题颜色配置
export const colors = {
  // 主要绿色系
  primary: {
    50: '#f0fdf4',   // 极浅绿
    100: '#dcfce7',  // 很浅绿
    200: '#bbf7d0',  // 浅绿
    300: '#86efac',  // 淡绿
    400: '#4ade80',  // 中等绿
    500: '#22c55e',  // 标准绿 (主色)
    600: '#16a34a',  // 深绿
    700: '#15803d',  // 更深绿
    800: '#166534',  // 很深绿
    900: '#14532d',  // 极深绿
  },
  
  // 辅助绿色 (偏黄绿色，与logo匹配)
  accent: {
    50: '#f7fee7',   // 极浅黄绿
    100: '#ecfccb',  // 很浅黄绿
    200: '#d9f99d',  // 浅黄绿
    300: '#bef264',  // 淡黄绿
    400: '#a3e635',  // 中等黄绿
    500: '#84cc16',  // 标准黄绿 (辅助色)
    600: '#65a30d',  // 深黄绿
    700: '#4d7c0f',  // 更深黄绿
    800: '#3f6212',  // 很深黄绿
    900: '#365314',  // 极深黄绿
  },

  // 中性色保持不变
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
};

// CSS变量映射
export const cssVariables = {
  '--color-primary-50': colors.primary[50],
  '--color-primary-100': colors.primary[100],
  '--color-primary-200': colors.primary[200],
  '--color-primary-300': colors.primary[300],
  '--color-primary-400': colors.primary[400],
  '--color-primary-500': colors.primary[500],
  '--color-primary-600': colors.primary[600],
  '--color-primary-700': colors.primary[700],
  '--color-primary-800': colors.primary[800],
  '--color-primary-900': colors.primary[900],
  
  '--color-accent-50': colors.accent[50],
  '--color-accent-100': colors.accent[100],
  '--color-accent-200': colors.accent[200],
  '--color-accent-300': colors.accent[300],
  '--color-accent-400': colors.accent[400],
  '--color-accent-500': colors.accent[500],
  '--color-accent-600': colors.accent[600],
  '--color-accent-700': colors.accent[700],
  '--color-accent-800': colors.accent[800],
  '--color-accent-900': colors.accent[900],
};