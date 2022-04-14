const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://ktc-test.local'
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../public',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/admin/index.blade.php'
    : 'index.html',

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/sass/index.sass";
            `
      },
    },
  },

  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
