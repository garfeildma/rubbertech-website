/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 自定义绿色主题 - 与 RubberTech logo 匹配
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

        // 为了兼容现有代码，将绿色也映射到常用的颜色名称
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}