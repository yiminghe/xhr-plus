var Promise = require('promise');
var io = require('io');

var mUrl = '/tests/browser/specs/promise/gen-json.jss';

describe('S.IO as a promise', function () {
    it('context should works as before', function (done) {
        var c = {};
        io({
            url: mUrl,
            context: c,
            data: {
                x: 99
            },
            dataType: 'json',
            success: function (d) {
                expect(d.x).to.be('99');
                expect(this).to.be(c);
                done();
            }
        });
    });

    it('should support then differently', function (done) {
        var r = io({
            url: mUrl,
            context: {},
            data: {
                x: 99
            },
            dataType: 'json'
        });
        r.then(function (v) {
            expect(v[0].x).to.be('99');
            expect(this).to.be(window);
        });
        r.fin(function (v, ret) {
            expect(ret).to.be(true);
            expect(v[0].x).to.be('99');
            expect(this).to.be(window);
            done();
        });
    });

    it('should support fail differently', function (done) {
        var r = io({
            url: '404',
            context: {},
            data: {
                x: 99
            },
            dataType: 'json'
        });
        r.then(function () {
        }, function (v) {
            expect(v[1]).to.be('Not Found');
        });
        r.fail(function (v) {
            expect(v[1]).to.be('Not Found');
        });
        r.fin(function (v, ret) {
            expect(v[1]).to.be('Not Found');
            expect(ret).to.be(false);
            done();
        });
    });

    it('should support chained value', function (done) {
        var r = io({
            url: mUrl,
            context: {},
            data: {
                x: 99
            },
            dataType: 'json'
        });

        r.then(
            function (v) {
                return Number(v[0].x) + 1;
            }).then(function (v) {
                expect(v).to.be(100);
                done();
            });
    });

    it('should support nested promise', function (done) {
        var r = io({
            url: mUrl,
            context: {},
            data: {
                x: 99
            },
            dataType: 'json'
        });

        r.then(function (v) {
            expect(v[0].x).to.be('99');
            return io({
                url: mUrl,
                context: {},
                data: {
                    x: 101
                },
                dataType: 'json'
            });
        }).then(function (v) {
            expect(v[0].x).to.be('101');
            done();
        });
    });

    it('then will catch then error', function (done) {
        io({
            url: mUrl,
            data: {
                x: 99
            },
            dataType: 'json'
        }).then(function () {
            throw new Error('haha');
        }).then(function () {
        }, function (e) {
            expect(e.message).to.be('haha');
            done();
        });
    });

    it('then will not catch success config error', function (done) {
        io({
            url: mUrl,
            data: {
                x: 99
            },
            dataType: 'json',
            success: function () {
                throw new Error('haha');
            }
        }).then(function () {
        }, function (e) {
            expect(e.message).to.be('');
            done();
        });
    });

    it('should support Promise.all', function (done) {
        var r = io({
            url: mUrl,
            context: {},
            data: {
                x: 99
            },
            dataType: 'json'
        });

        var r2 = io({
            url: mUrl,
            context: {},
            data: {
                x: 101
            },
            dataType: 'json'
        });

        var ret;

        Promise.all([r, r2]).then(function (vs) {
            expect(vs[0][0].x).to.be('99');
            expect(vs[1][0].x).to.be('101');
            done();
        });
    });
});