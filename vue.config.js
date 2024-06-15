const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // 代理请求之后的请求地址
        target: "https://api.imooc-front.lgdsunday.club/",
        // 跨域
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      // 设置路径别名
      alias: {
        "@": path.join(__dirname, "./src"),
      },
    },
  },
});
