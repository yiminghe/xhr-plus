const path = require('path');

function CustomMiddlewareFactory() {
  return function (request, response, next) {
    if (path.extname(this.path) === '.jss') {
      require(path.resolve(__dirname, request.path.substring(1)))(request, response, next);
    } else {
      next();
    }
  };
}

module.exports = {
  common(config) {
    config.middleware = config.middleware || [];
    config.middleware.push('custom');
    config.plugins.push({ 'middleware:custom': ['factory', CustomMiddlewareFactory] });
    return config;
  },
};
