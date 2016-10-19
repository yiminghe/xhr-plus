'use strict';

module.exports = function*() {
  let data = {};
  data = this.request.body && this.request.body.fields || this.request.body;
  if (!Object.keys(data).length) {
    data = this.query;
  }
  this.set('Content-Type', 'application/json');
  this.body = (JSON.stringify(data));
};
