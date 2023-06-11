const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
   lintOnSave: false,  
   configureWebpack:{
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