module.exports = function*() {
  this.set('ContentType', 'application/json');
  this.body = JSON.stringify({
    x: this.query.x
  });
};