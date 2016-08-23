'use strict';

const app = require('rc-tools/lib/server/')();

const path = require('path');

app.all('*', function *(next) {
  if (path.extname(this.path) === '.jss') {
    var func = require(path.resolve(__dirname, this.path.substring(1))).call(this);
    yield *func;
  } else {
    yield *next;
  }
});

const port = process.env.npm_package_config_port;
app.listen(port);
console.log('listen at ' + port);
