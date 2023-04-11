import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': { // 匹配请求路径，
        target: 'http://xxx.xxx.xxx/', // 代理的目标地址
        // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // 路径别名
    alias: {
      "@": resolve(__dirname, "./src"), // __dirname 可能会报错，需要安装 npm install @types/node
      "@@": resolve(__dirname, "./src/components"),
    }
  }
})
