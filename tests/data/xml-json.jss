module.exports = function* () {
    this.set('Content-Type', 'text/xml');
    this.body = ('{"x":1}');
};