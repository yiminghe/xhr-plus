function timeout(ms) {
    return (done) => {
        setTimeout(done, ms);
    };
}
module.exports = function* () {
    yield timeout(10);
    this.type = 'json';
    this.set('Expires', 'Mon, 26 Jul 1997 05:00:00 GMT');
    this.set('Cache-Control', 'no-cache');
    this.set('Pragma', 'no-cache');
    this.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.set('Access-Control-Allow-Credentials', 'true');
    this.set('Access-Control-Allow-Origin', this.get('origin'));
    this.set('Access-Control-Allow-Headers', 'origin, x-requested-with, yiminghe, content-type, accept, *');
    const ret = {
        yiminghe: this.get('yiminghe'),
        action: this.query.action,
        cors: this.cookies.get('cors')
    };
    if (this.get('X-Requested-With')) {
        ret['X-Requested-With'] = this.get('X-Requested-With');
    }
    this.body = JSON.stringify(ret);
};