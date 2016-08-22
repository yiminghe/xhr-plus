/**
 * test cases for cross domain io
 * @author yiminghe@gmail.com
 */

var io = require('io');
var UA = require('ua');
var ports = window.SERVER_CONFIG.ports;
/*jshint quotmark:false*/
var host = location.hostname;
var url = host;
url += ':' + ports[1];
var testUrl = 'http://' + url + '/tests/browser/others/xdr/xdr.jss';

describe('Xdr IO', function () {
    it('support ignore X-Requested-With for one request', function (done) {
        io({
            headers: {
                'X-Requested-With': false
            },
            cache: false,
            dataType: 'json',
            url: testUrl,
            xhrFields: {
                withCredentials: true
            },
            xdr: {
                // force to use native xhr no sub domain proxy
                subDomain: {
                    proxy: false
                }
            },
            success: function (d) {
                expect('X-Requested-With' in d).to.be(false);
                done();
            }
        });
    });

    it('support ignore X-Requested-With for all request', function (done) {
        io.setupConfig({
            headers: {
                'X-Requested-With': false
            }
        });

        io({
            cache: false,
            dataType: 'json',
            url: testUrl,
            xhrFields: {
                withCredentials: true
            },
            xdr: {
                // force to use native xhr no sub domain proxy
                subDomain: {
                    proxy: false
                }
            },
            success: function (d) {
                expect('X-Requested-With' in d).to.be(false);
                io.setupConfig({
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                done();
            }
        });
    });

    describe('set domain', function () {
        // ie6 不能设置和 hostname 一致。。。
        try {
            document.domain = host.split('.').slice(0 - 3).join('.');
        } catch (e) {
            // localhost error in ie8
            return;
        }
        it("should works for any domain", function (done) {
            var iframe = $('<iframe></iframe>');
            iframe.on('load', function () {
                io({
                    headers: {
                        // cross domain 设置 header ie 无效
                        // 原生 chrome.firefox 可行
                        yiminghe: 'oo'
                    },
                    cache: false,
                    dataType: 'json',
                    url: testUrl,
                    xhrFields: {
                        // Cannot use wildcard in Access-Control-Allow-Origin
                        // when credentials flag is true.
                        // Access-Control-Allow-Origin:http://localhost
                        // 必须设置完全 hostname 匹配

                        // firefox , chrome 携带 cookie
                        withCredentials: true
                    },
                    xdr: {
                        // 强制用 flash，ie 可携带cookie
                        // use: 'flash',
                        // force to use native xhr no sub domain proxy
                        subDomain: {
                            proxy: false
                        }
                    },
                    data: {
                        action: 'x'
                    },
                    success: function (d, s, r) {
                        // body 都可读
                        expect(d.action).to.be('x');

                        // ie6-7 flash 不可读
                        // ie8-9 XDomainRequest 不可读
                        // header ie10 ,chrome, firefox 可读
                        if (UA.ie && UA.ie < 10) {
                            expect(typeof  d.yiminghe).to.be('undefined');
                            expect(typeof  d['X-Requested-With']).to.be('undefined');
                        } else {
                            expect(d.yiminghe).to.be('oo');
                            expect(d['X-Requested-With']).to.be('XMLHttpRequest');
                        }

                        // ie8-9 XDomainRequest 不可读
                        // header ie10 ,chrome, firefox 可读
                        // ie6-7 flash 可读
                        if (UA.ie && UA.ie >= 8 && UA.ie <= 9) {
                            expect(typeof d.cors).to.be('undefined');
                        } else {
                            expect(d.cors).to.be('ok');
                        }

                        // 原生 chrome.firefox 响应头不能读
                        // ie6-7 flash 不可读
                        // ie8-9 XDomainRequest 不可读
                        // ie10 可以读
                        if (UA.ie >= 10) {
                            expect(r.getResponseHeader("X-Powered-By")).to.be('Express');
                        } else {
                            expect(r.getResponseHeader("X-Powered-By")).to.be(null);
                        }

                        iframe.remove();
                        done();
                    }
                });
            });

            iframe[0].src = 'http://' + url + '/tests/browser/others/xdr/set-cookie.html';
            iframe.appendTo('body');
        });

        it("should works for subdomain", function (done) {
            var ret = [];

            io({
                url: 'http://' + url + '/tests/browser/data/io.jss',
                xdr: {
                    subDomain: {
                        proxy: "/tests/browser/others/subdomain/proxy.html"
                    }
                },
                success: function () {
                    ret.push('s');
                    //S.log("success");
                },
                error: function () {
                    ret.push('e');
                    //S.log(s || "error");
                },
                complete: function () {
                    ret.push('c');
                    expect(ret).to.eql(['s', 'c']);
                    done();
                }
            });
        });

        it("should support cross subdomain fileupload", function (done) {
            var form = $('<form>' +
                '<input name="test" value=\'1\'/>' +
                '<input name="test2" value=\'2\'/>' +
                '<input type="file" name="testFile"/>' +
                '</form>').appendTo('body');

            io({
                type: 'post',
                form: form[0],
                dataType: 'json',
                url: 'http://' + url + '/tests/browser/others/subdomain/upload.jss',
                success: function (data) {
                    expect(data.test).to.be('1');
                    expect(data.test2).to.be('2');
                    form.remove();
                    done();
                }
            });
        });
    });
});