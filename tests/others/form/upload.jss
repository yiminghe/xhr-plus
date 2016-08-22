module.exports = function* () {
    var t = {},
        query = this.request.body && this.request.body.fields || this.request.body || {};
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
    this.type = 'html';
    this.body = (JSON.stringify(t));
};