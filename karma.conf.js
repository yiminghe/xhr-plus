const path = require('path');
const co = require('co');
const koa = require('koa');
const koaBody = require('koa-body');
const bodify = (koaBody({ formidable: { uploadDir: path.join(process.cwd(), 'tmp') }, multipart: true }));
const koaCompose = require('koa-compose');

function XhrPlus() {
  return function (request, response, next) {
    var app = koa();
    var context = app.createContext(request, response);
    if (path.extname(context.path) === '.jss') {
      const my = require(path.resolve(__dirname, context.path.substring(1)));
      const fn = co.wrap(koaCompose([bodify, my]));
      fn.call(context).then(()=> {
        response.end(context.body || '');
      });
    } else {
      next();
    }
  };
}

module.exports = {
  common(config) {
    config.middleware = config.middleware || [];
    config.middleware.push('xhr-plus');
    config.plugins.push({ 'middleware:xhr-plus': ['factory', XhrPlus] });
    return config;
  },
};
