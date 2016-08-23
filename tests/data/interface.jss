'use strict';

function timeout(ms) {
  return (done) => {
    setTimeout(done, ms);
  };
}
module.exports = function*() {
  const query = this.query;
  const contentType = query.contentType;
  let sleep;
  if (contentType) {
    this.set('Content-Type', contentType);
  }

  sleep = query.sleep;

  function merge() {
    const ret = {};
    for (let i = 0; i < arguments.length; i++) {
      const from = arguments[i];
      for (const j in from) {
        if (from.hasOwnProperty(j)) {
          ret[j] = from[j];
        }
      }
    }
    return ret;
  }

  function run() {
    const data = merge({
      contentType: this.get('content-type'),
      name: 'test',
      birth: '2010/11/23',
      email: 'test@gmail.com',
    }, query, this.request.body && this.request.body.fields || this.request.body);
    let dataStr = JSON.stringify(data);
    const t = (query.customCallback || query.callback);

    if (t) {
      dataStr = `${t}(${dataStr});`;
    } else if (this.method === 'POST' && query.dataType === 'script') {
      dataStr = 'const globalScriptTest = 500;';
    } else if (query.dataType === 'script') {
      dataStr = 'const globalScriptTest = 200;';
    }

    this.body = (dataStr);
  }

  if (sleep) {
    yield timeout(sleep);
    run.call(this);
  } else {
    run.call(this);
  }
};
