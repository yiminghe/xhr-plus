module.exports = function* () {
    this.type='js';
    this.body = this.query.callback+'({x:1})';
};