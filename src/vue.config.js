const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8888/",
          changeOrigin: true,
          ws: true,
        },
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
};