module.exports = function* () {
    var callback = this.query.callback;
    this.set('Content-Type', 'text/javascript');
    this.body = (callback + '({ok:1});');
};