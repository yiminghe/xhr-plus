module.exports = function* () {
    this.redirect('../ok.jss?callback=' + this.query.callback);
};