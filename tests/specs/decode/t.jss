module.exports = function* () {
    this.set('content-type','application/json');
    this.body = JSON.stringify({
        url:this.url,
        originalUrl:this.originalUrl,
        t:this.query.t,
        y:this.query.y
    });
};
