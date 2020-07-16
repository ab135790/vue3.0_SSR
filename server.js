/*
 * @Author: your name
 * @Date: 2020-07-14 20:59:02
 * @LastEditTime: 2020-07-14 22:56:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ssr\server.js
 */
const Vue = require('vue');
const path = require('path');
const app = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';
const createRenderer = (bundle, options) => {
  return createBundleRenderer(bundle, Object.assign(options, {
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
};
let renderer;
let readyPromise;
const templatePath = resolve('./src/index.template.html');
if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  const template = fs.readFileSync(templatePath, 'utf-8');
  renderer = createRenderer(bundle, {
    template, // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
  })
} else {
  // 开发模式
  // 1. server -> bundle
  // 2. client -> manifest
  // 3.等待编译完成，就可以调用createBundleRenderer -> renderer -> rederToString -> Promise
  // 1.2 -> setupServer -> webpack -> readyPromise -> 调用createRender -》 创建render实例
  readyPromise = require('./config/setup-dev-server')(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

const render = (req, res) => {
  const context = {
    title: 'hello ssr with webpack',
    meta: `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `,
    url: req.url
  };
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
};




// 在服务器处理函数中……
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
});

app.listen(8081);
