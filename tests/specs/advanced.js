/**
 * advanced io tc
 * @author yiminghe@gmail.com
 **/
var io = require('io');
var util = require('util');
var UA = require('ua');
var url = require('url');
/*jshint quotmark:false*/
describe("Advanced IO", function () {
    it('support custom contentType', function (done) {
        io({
            url: '/tests/browser/data/receive-json.jss',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: '{"x":1}',
            success: function (t) {
                expect(t.x).to.be(1);
                done();
            }
        });
    });

    it("should support last-modified from server", function (done) {
        io({
            url: '/tests/browser/data/ifModified.jss',
            dataType: "text",
            success: function (data, status, xhr) {
                expect(data).to.be("haha");
                expect(status).to.be("success");
                expect(xhr.status).to.be(200);
                io({
                    url: '/tests/browser/data/ifModified.jss',
                    dataType: "text",
                    success: function (data, status, xhr) {
                        expect(data).to.be("haha");
                        expect(status).to.be("success");
                        expect(xhr.status).to.be(200);


                        expect(util.isEmptyObject(
                            io.__lastModifiedCached)).to.be(true);

                        done();
                    }
                });
            }
        });
    });

    it("should support ifModified config", function (done) {
        io({
            url: '/tests/browser/data/ifModified.jss',
            dataType: "text",
            cache: false,
            ifModified: true,
            success: function (data, status, xhr) {
                expect(data).to.be("haha");
                expect(status).to.be("success");
                expect(xhr.status).to.be(200);
                io({
                    url: '/tests/browser/data/ifModified.jss',
                    dataType: "text",
                    cache: false,
                    ifModified: true,
                    success: function (data, status, xhr) {
                        if (status === 'not modified') {
                            expect(data).to.be(null);
                            expect(xhr.status).to.be(304);
                            expect(status).to.be("not modified");

                            expect(io.__lastModifiedCached[
                                url.resolve(location.href, '/tests/browser/data/ifModified.jss')
                                ])
                                .to.be('Thu, 18 Jul 2002 15:48:32 GMT');
                        }
                        done();
                    }
                });
            }
        });
    });

    it("should support ifModified config for form", function (done) {
        var form = $("<form><input name='t' value='t'/></form>").appendTo('body');

        io({
            url: '/tests/browser/data/ifModified.jss',
            dataType: "text",
            cache: false,
            ifModified: true,
            form: form[0],
            serializeArray: false,
            success: function (data, status, xhr) {
                expect(data).to.be("haha");
                expect(status).to.be("success");
                expect(xhr.status).to.be(200);
                io({
                    url: '/tests/browser/data/ifModified.jss',
                    dataType: "text",
                    cache: false,
                    form: form[0],
                    serializeArray: false,
                    ifModified: true,
                    success: function (data, status, xhr) {
                        if (status === 'not modified') {
                            expect(data).to.be(null);
                            expect(xhr.status).to.be(304);
                            expect(status).to.be("not modified");

                            var uri = url.parse(url.resolve(location.href, '/tests/browser/data/ifModified.jss'));
                            uri.query = {
                                t: 't'
                            };

                            expect(io.__lastModifiedCached[
                                url.stringify(uri)
                                ]).to.be('Thu, 18 Jul 2002 15:48:32 GMT');
                        }
                        form.remove();
                        done();
                    }
                });
            }
        });
    });

    it("should jsonp with array arguments", function (done) {
        io.jsonp("/tests/browser/data/jsonp-array.jss", function (d) {
            expect(d.join(",")).to.be([1, 2].join(","));
            done();
        });
    });

    it("should abort for xhr", function (done) {
        var ret = [];
        var xhr = io({
            url: '/tests/browser/data/io.jss',
            cache: false,
            success: function (data, status) {
                ret.push(status);
            },
            error: function (data, status) {
                ret.push(status);
            },
            complete: function (data, status) {
                ret.push(status);
            }
        });

        xhr.abort();

        setTimeout(function () {
            expect(ret.toString()).to.be(["abort", "abort"].toString());
            done();
        }, 100);
    });


    it("nothing happens if abort xhr after complete", function (done) {
        var ret = [];
        var xhr = io({
            url: '/tests/browser/data/io.jss',
            cache: false,
            success: function (data, status) {
                ret.push(status);
                setTimeout(function () {
                    xhr.abort();
                    expect(ret.toString()).to.be(["success", "success"].toString());
                    done();
                }, 0);
            },
            error: function (data, status) {
                ret.push(status);
            },
            complete: function (data, status) {
                ret.push(status);
            }
        });
    });

    it("should abort for jsonp", function (done) {
        var ret = [];

        var xhr = io({
            forceScript: UA.ie !== 6,
            dataType: 'jsonp',
            url: '/tests/browser/data/jsonp.jss',
            cache: false,
            success: function (data, status) {
                ret.push(status);
            },
            error: function (data, status) {
                ret.push(status);
            },
            complete: function (data, status) {
                ret.push(status);
            }
        });

        xhr.abort();

        setTimeout(function () {
            expect(ret.toString()).to.be(["abort", "abort"].toString());
            done();
        }, 100);
    });


    it("nothing happens if abort jsonp after complete", function (done) {
        var ret = [];

        var xhr = io({
            forceScript: UA.ie !== 6,
            url: '/tests/browser/data/io.jss',
            cache: false,
            success: function (data, status) {
                ret.push(status);
                setTimeout(function () {
                    // 成功后 abort 无影响
                    xhr.abort();
                    expect(ret.toString()).to.be(["success", "success"].toString());
                    done();
                }, 10);
            },
            error: function (data, status) {
                ret.push(status);
            },
            complete: function (data, status) {
                ret.push(status);
            }
        });
    });

    it("timeout should work for xhr", function (done) {
        var ret = [];
        io({
            url: '/tests/browser/data/io.jss',
            // ie 默认会缓存，可能直接触发 success
            // fiddler 看不到请求，自带网络捕获为 304
            cache: false,
            dataType: 'json',
            timeout: 0.01,
            success: function (d, status) {
                ret.push(status);
            },
            error: function (data, status) {
                ret.push(status);
            },
            complete: function (data, status) {
                ret.push(status);
                expect(ret.toString()).to.be(["timeout", "timeout"].toString());
                done();
            }
        });
    });

    if (!UA.ie || UA.ie > 7) {
        it("should works for form file upload", function (done) {
            var f = $('<form>' +
                '<input name="test4" value="t6"/>' +
                //'<input name="test4" value="t7"/>' +
                '<input name="test5" value="t8"/>' +
                '<input name="testFile" type="file"/>' +
                '<select name="test">' +
                '<option value="t1" selected>v</option>' +
                '<option value="t2">v2</option>' +
                '</select>' +
                '</form>').appendTo('body');

            io({
                url: '/tests/browser/others/form/upload.jss',
                form: f[0],
                type: 'post',
                dataType: 'json',
                data: {
                    "test2": ["t2"],
                    "test3": "t4"
                },
                serializeArray: false,
                complete: function (data) {
                    expect(data.test + "").to.be(["t1"] + "");
                    expect(data.test4 + "").to.be(["t6"] + "");
                    expect(data.test2 + "").to.be(["t2"] + "");
                    expect(data.test3 + "").to.be("t4");
                    expect(data.test5 + "").to.be("t8");
                    f.remove();
                    done();
                }
            });
        });
    }

    it("should works for common form", function (done) {
        var f = $('<form>' +
            '<input name="test4" value="t6"/>' +
            '<input name="test4" value="t7"/>' +
            '<input name="test5" value="t8"/>' +
            '<select name="test" multiple>' +
            '<option value="t1" selected>v</option>' +
            '<option value="t2" selected>v2</option>' +
            '</select>' +
            '</form>').appendTo('body');

        var d;
        io({
            url: '/tests/browser/others/form/upload.jss',
            form: f[0],
            type: 'post',
            dataType: 'json',
            serializeArray: false,
            data: {
                "test2": ["t2", "t3"],
                "test3": "t4"
            },
            success: function (data) {
                d = data;
            },
            complete: function () {
                expect(d.test + "").to.be(["t1", "t2"] + "");
                expect(d.test4 + "").to.be(["t6", "t7"] + "");
                expect(d.test2 + "").to.be(["t2", "t3"] + "");
                expect(d.test3 + "").to.be("t4");
                expect(d.test5 + "").to.be("t8");
                f.remove();
                done();
            }
        });
    });
});