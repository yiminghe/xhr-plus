module.exports = function*() {
  this.type = 'js';
  var x = this.query.x || '1';
  this.body = this.query.callback + '({x:' + x + '})';
};