function timeout(ms) {
    return function (done) {
        setTimeout(done, ms);
    };
}
module.exports = function* () {
    yield timeout(10);
    this.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.set('Access-Control-Allow-Credentials', 'true');
    this.set('Access-Control-Allow-Origin', this.get('origin'));
    this.set('Access-Control-Allow-Headers', 'origin, x-requested-with, yiminghe, content-type, accept, *');
    if (this.method.toLowerCase() === 'options') {
        this.body = '1';
        return;
    }
    var t = {}, query = this.request.body&&this.request.body.fields ||this.request.body;
    if (query.test) {
        t.test = query.test;
    }
    if (query.test2) {
        t.test2 = query.test2;
    }
    if (query.test3) {
        t.test3 = query.test3;
    }
    if (query.test4) {
        t.test4 = query.test4;
    }
    if (query.test5) {
        t.test5 = query.test5;
    }
    var data = '<!doctype html><html><head>' +
        '<script>document.domain=window.location.hostname.split(".").slice(0 - 3).join(".");</script>' +
        '</head><body>';
    data += '<b>html</b>';
    data += '</body></html>';
    this.set('Expires', 'Mon, 26 Jul 1997 05:00:00 GMT');
    this.set('Cache-Control', 'no-cache');
    this.set('Pragma', 'no-cache');
    this.type = 'html';
    this.body = (data);
};