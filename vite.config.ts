import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 添加 ESLint 插件配置
    eslintPlugin({
      include: [
        "src/**/*.js",
        "src/*.js",
        "src/**/*.ts",
        "src/*.ts",
        "src/**/*.vue",
        "src/*.vue",
      ],
    }),
  ],
  server: {
    open: true, // 是否自动打开浏览器
    proxy: {
      "/api": {
        // 匹配请求路径，
        target: "http://127.0.0.1:3001", // 代理的目标地址
        // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      //define global scss
      scss: {
        javascriptEnabled: true,
        additionalData: `
          @use "@/styles/global.scss" as *;
        `,
      },
    },
  },
  resolve: {
    // 路径别名
    alias: {
      "@": resolve(__dirname, "./src"), // __dirname 可能会报错，需要安装 npm install @types/node
      "@c": resolve(__dirname, "./src/components"),
    },
    // 导入时想要省略的扩展名列表
    extensions: [".vue", ".ts", ".json"],
  },
  // 打包配置
  build: {},
});
