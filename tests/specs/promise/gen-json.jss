module.exports = function* () {
    this.type = 'json';
    this.body = {
        x: this.query.x
    };
};