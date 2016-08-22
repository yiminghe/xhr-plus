module.exports = function *() {
    this.status =301;
    this.set('Location', 'http://' + this.host + '/package.json');
};