import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/performance-comparison', component: 'performance-comparison' },
    { path: '/css-performance', component: 'css-performance' },
    { path: '/styled-performance', component: 'styled-performance' },
    { path: 'tailwind', component: 'template/tailwind' },
    { path: 'css-module', component: 'template/css-module' },
    { path: 'BEM', component: 'template/BEM' },
    { path: 'tailwind+css', component: 'template/tailwind-css' },
  ],

  npmClient: 'pnpm',
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/tailwindcss'],

  // GitHub Pages 部署配置
  publicPath: process.env.NODE_ENV === 'production' ? '/css-compare/' : '/',
  base: process.env.NODE_ENV === 'production' ? '/css-compare/' : '/',
});
