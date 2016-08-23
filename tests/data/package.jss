module.exports = function* () {
  this.set('Content-Type', 'application/json');
  this.body = ('{"name":"xhr-plus"}');
};