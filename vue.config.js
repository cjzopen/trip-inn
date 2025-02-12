const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    // 確認這裡沒有禁用 vue-meta
  }
})
