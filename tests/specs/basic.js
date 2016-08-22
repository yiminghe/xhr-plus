/**
 * basic test cases for kissy io
 */

var io = require('io');
var UA = require('ua');
var util = require('util');
/*jshint quotmark:false*/
describe('basic', function () {
    describe('404/301', function () {
        it('404 get error', function (done) {
            io({
                url: '/tests/browser/data/404',
                cache: false,
                error: function () {
                    done();
                }
            });
        });

        it('301 get success', function (done) {
            io({
                url: '/tests/browser/data/301.jss',
                cache: false,
                success: function (p) {
                    //var args = util.makeArray(arguments);
                    expect(p.name).to.be('modulex-io');
                    done();
                }
            });
        });

        it('404 post error', function (done) {
            io({
                url: '/tests/browser/data/404',
                type: 'post',
                cache: false,
                error: function () {
                    done();
                }
            });
        });

        it('301 post success', function (done) {
            io({
                url: '/tests/browser/data/301.jss',
                cache: false,
                type: 'post',
                success: function (p) {
                    //var args = util.makeArray(arguments);
                    expect(p.name).to.be('modulex-io');
                    done();
                }
            });
        });

        it('404 jsonp does not call success', function (done) {
            io({
                url: '/tests/browser/data/404',
                dataType: 'jsonp',
                error: function () {
                    var args = util.makeArray(arguments);
                    expect(args[1]).to.be("Not Found");
                    done();
                }
            });
        });

        it('404 cross domain jsonp does not call success', function (done) {
            try {
                io({
                    url: '/tests/browser/data/404',
                    dataType: 'jsonp',
                    crossDomain: true,
                    error: function () {
                        var args = util.makeArray(arguments);
                        if (args[1].indexOf('not call jsonpCallback') !== -1) {

                        } else {
                            expect(util.inArray(args[1], [
                                "script error",
                                "parser error"
                            ]))
                                .to.be(true);
                        }
                        done();
                    }
                });
            } catch (e) {
            }
        });
    });

    describe('jsonp', function () {
        it('custom callback', function (done) {
            window.customCallback = function (data) {
                expect(typeof data).to.be('object');
                expect(data.callback).to.be('customCallback');
                try {
                    delete window.customCallback;
                } catch (e) {
                    window.customCallback = undefined;
                }
                done();
            };
            io.getScript('/tests/browser/data/interface.jss?callback=customCallback');
        });

        it('does not have content-type', function (done) {
            io({
                url: '/tests/browser/data/interface.jss?t=get',
                success: function (data) {
                    expect(data.contentType).to.be(undefined);
                    done();
                },
                dataType: 'jsonp'
            });
        });

        it('custom callbackName', function (done) {
            io({
                url: '/tests/browser/data/interface.jss?t=get',
                success: function (data) {
                    expect(typeof data).to.be('object');
                    done();
                },
                dataType: 'jsonp',
                jsonp: 'customCallback'
            });
        });

        it('jsonp without params', function (done) {
            io.jsonp('/tests/browser/data/interface.jss', function (data) {
                ok = true;
                expect(typeof data).to.be('object');
                done();
            });
        });

        it('jsonp with params', function (done) {
            io.jsonp('/tests/browser/data/interface.jss?sleep=0', {
                myParam: 'taobao'
            }, function (data) {
                expect(typeof data).to.be('object');
                expect(data).not.to.be(undefined);
                expect(data.myParam).to.be('taobao');
                done();
            });
        });

        // https://github.com/kissyteam/kissy/issues/187
        it("can ignore protocol", function (done) {
            var url = location.hostname;
            url += ':' + window.SERVER_CONFIG.ports[1];
            io.jsonp('//' + url + '/tests/browser/data/interface.jss', {
                myParam: 'taobao'
            }, function (data) {
                expect(typeof data).to.be('object');
                expect(data).not.to.be(undefined);
                expect(data.myParam).to.be('taobao');
                done();
            });
        });
    });

    describe('sync test case', function () {
        it('get sync', function () {
            var d = 0;
            io({
                type: 'get',
                // 根据 content-type 自动 parse
                url: '/tests/browser/data/interface.jss?sleep=1&contentType=text/json',
                async: false,
                success: function (o) {
                    d = o;
                }
            });
            expect(d.name).to.be('test');
        });

        it('post sync', function () {
            var d = 0;
            io({
                type: 'post',
                url: '/tests/browser/data/interface.jss?sleep=1&contentType=text/json',
                async: false,
                success: function (o) {
                    d = o;
                }
            });
            expect(d.name).to.be('test');
        });
    });

    describe('post', function () {
        it('post get text/json data', function (done) {
            io.post('/tests/browser/data/interface.jss?t=post&contentType=text/json', function (data) {
                ok = true;
                expect(typeof data).to.be('object');
                expect(data).not.to.be(undefined);
                expect(data.name).to.be('test');
                done();
            });
        });

        it('post get string data', function (done) {
            io.post('/tests/browser/data/interface.jss?t=post', function (data, status, xhr) {
                expect(typeof data).to.be('string');
                var o = util.parseJson(data);
                expect(o).not.to.be(undefined);
                expect(o.name).to.be('test');
                expect(xhr.responseText).to.be(data);
                done();
            });
        });

        it('post get json data', function (done) {
            io.post('/tests/browser/data/interface.jss?t=post', {
                type: 'post',
                name: 'test',
                company: 'www.taobao.com',
                exp: '>,?/%."`~'
            }, function (data, textStatus, xhr) {
                var o = util.parseJson(data);
                expect(o).not.to.be(undefined);
                expect(o.name).to.be('test');
                expect(o.company).to.be('www.taobao.com');

                expect(textStatus).to.be('success');
                expect(xhr.responseText).to.be(data);
                done();
            });
        });

        it('post get string data', function (done) {
            io.post('/tests/browser/data/interface.jss?t=post',
                    'name=test&company=www.taobao.com&exp=' +
                    encodeURIComponent('>,?/\\%."`~'),
                function (data, textStatus, xhr) {
                    var o = util.parseJson(data);
                    expect(o).not.to.be(undefined);
                    expect(o.name).to.be('test');
                    expect(o.company).to.be('www.taobao.com');
                    expect(textStatus).to.be('success');
                    expect(xhr.responseText).to.be(data);
                    done();
                });
        });

        it('dataType json', function (done) {
            io.post('/tests/browser/data/interface.jss?contentType=text/json',
                function (data) {
                    expect(typeof data).to.be('object');
                    expect(data.name).to.be('test');
                    done();
                }, 'json');
        });

        it('data override url', function (done) {
            io.post('/tests/browser/data/interface.jss?foo=sk1', {
                foo: 'sk2'
            }, function (data) {
                expect(typeof data).to.be('object');
                expect(data.foo).to.be('sk2');
                done();
            }, 'json');
        });

        it('dataType jsonp', function (done) {

            io.post('/tests/browser/data/interface.jss', function (data) {
                expect(typeof data).to.be('object');
                expect(data.name).to.be('test');
                done();
            }, 'jsonp');
        });

        it('dataType script', function (done) {
            // 这里和get的处理一致
            io.post('/tests/browser/data/interface.jss?type=post&dataType=script',
                function (data) {
                    ok = true;
                    expect(data).to.be("var globalScriptTest = 500;");
                    expect(window.globalScriptTest).to.be(500);
                    try {
                        delete window.globalScriptTest;
                    } catch (e) {
                        window.globalScriptTest = undefined;
                    }
                    done();
                }, 'script');
        });

        it('data type script', function (done) {
            // 这里和get的处理一致
            io.post('/tests/browser/data/interface.jss?type=post' +
                    '&dataType=script' +
                    '&contentType=text/javascript',
                function (data) {
                    ok = true;
                    expect(data).to.be("var globalScriptTest = 500;");
                    expect(window.globalScriptTest).to.be(500);
                    try {
                        delete window.globalScriptTest;
                    } catch (e) {
                        window.globalScriptTest = undefined;
                    }
                    done();
                });
        });

        it('datatype xml', function (done) {
            //这里'xml'的参数可以省略
            io.post('/tests/browser/data/xml.jss', function (data) {
                expect(data.childNodes.length > 0).to.be(true);
                done();
            }, 'xml');
        });

        it('dataType xml but return data format json', function (done) {
            // 可以么？ content-type 为 xml
            // 但实际内容也为 json  需要自动转换成 json
            io.post('/tests/browser/data/xml-json.jss', function (data) {
                expect(data.x).to.be(1);
                done();
            }, 'json');
        });

        if (!window.callPhantom) {
            it('cross domain post', function (done) {
                // get post
                // chrome/ff send 不报异常 status 0 statusText ''
                // ie7 send 不报异常 status 0 statusText Security Violation
                // ie 9 10 send 报异常 error: 未指明错误
                // ch
                io({
                    url: 'http://www.alibaba.com/',
                    type: 'post',
                    error: function () {
                        var args = util.makeArray(arguments);
                        expect(args[2].status || 500).to.be(500);
                        done();
                    }
                });
            });
        }

        if (!UA.phantomjs) {
            it('cross domain get', function (done) {
                io({
                    url: 'http://www.alibaba.com/',
                    type: 'get',
                    error: function () {
                        var args = util.makeArray(arguments);
                        // chrome status 0
                        // security error
                        // ie10 throw error when send status 未指明的错误
                        expect(args[2].status || 500).to.be(500);
                        done();
                    }
                });
            });
        }

        it('post context', function (done) {
            io.post('/tests/browser/data/interface.jss', function () {
                expect(this.type).to.be('POST');
                done();
            });
        });
        it('getScript context', function (done) {
            io.post('/tests/browser/data/interface.jss?t=get&dataType=script', function () {
                expect(this.type).to.be('POST');
                done();
            }, 'script');
        });
        it('return value', function () {
            var xhr = io.post('/tests/browser/data/interface.jss');
            expect('abort' in xhr).to.be(true);
            // 注：jQuery 里 不跨域时 jsonp 返回 xhr. 跨域时 返回 void
            xhr = io.jsonp('/tests/browser/data/interface.jss');
            expect('abort' in xhr).to.be(true);
        });
    });

    describe('get', function () {
        it('datatype html text', function (done) {
            ok = false;
            io.get('/tests/browser/data/html.jss', function (data) {
                expect(data.toLowerCase().indexOf('<html')).to.be(0);
                done();
            });
        });

        it('get callback params', function (done) {
            io.get('/tests/browser/data/interface.jss?t=get', function (data, textStatus, xhr) {
                var o = util.parseJson(data);
                expect(o).not.to.be(undefined);
                expect(o.t).to.be('get');
                expect(o.name).to.be('test');
                expect(o.birth).to.be('2010/11/23');

                expect(textStatus).to.be('success');
                expect(xhr.responseText).to.be(data);
                done();
            });
        });

        it('data works', function (done) {
            io.get('/tests/browser/data/interface.jss?t=get', {'data': 'hello'}, function (data) {
                var o = util.parseJson(data);
                expect(o.data).to.be('hello');
                done();
            });
        });

        it('dataType json', function (done) {
            //io.get('http://test.com/tests/browser/interface.jss?t=get', function(data) {
            // test.com -> 127.0.0.1
            // jQuery 里 当跨域时 dataType 为 json 时 依旧会调用 xhr. KISSY 处理逻辑与 jQuery 一致。
            io.get('/tests/browser/data/interface.jss?t=get', function (data) {
                expect(typeof data).to.be('object');
                expect(data.name).to.be('test');
                done();
            }, 'json');

            // 注意：在 jQuery 里 当 dataType 为 json, 但 url 里有 callback=? 时 会自动转换到 jsonp 模式
            // KISSY 里去掉了以上自动转换。用户必须显式指定 dataType 为 jsonp
            // 这样的好处是去除了 callback=? 约定 用户使用上也更清晰（指定 dataType 为 jsonp 比用 callback=? 切换到 jsonp 更简单）
            // API 的一个原则：让用户方便 但也不能宠坏用户（以某种看似简单的约定让用户继续糊涂）
        });

        it('dataType jsonp', function (done) {
            // 注：此处的处理方式和 jQuery 不同
            // 不跨域时 jQuery 会依旧调用 xhr 处理 得到结果后 再通过 globalEval 执行
            // KISSY 里 无论跨不跨域 只要 dataType 为 jsonp, 都用 getScript 处理
            // 1.2 修正 和 jquery 保持一致 ie 下可以有出错处理 也方便 abort
            //io.get('http://test.com/tests/browser/interface.jss?t=get', function(data) {
            io.get('/tests/browser/data/interface.jss?t=get', function (data) {
                expect(typeof data).to.be('object');
                expect(data.name).to.be('test');
                done();
            }, 'jsonp');
        });

        it('dataType script', function (done) {
            io.get('/tests/browser/data/interface.jss?t=get&dataType=script', function (d) {
                expect(window.globalScriptTest).to.be(200);
                expect(d).to.be("var globalScriptTest = 200;");
                done();
            }, 'script');
        });

        it('dataType xml', function (done) {
            io.get('/tests/browser/data/xml.jss', function (data) {
                expect(data.childNodes.length > 0).to.be(true);
                done();
            });
        });

        it('xhr this', function (done) {
            io.get('/tests/browser/data/interface.jss?t=get', function () {
                ok = true;
                expect(this.type).to.be('GET');
                done();
            });
        });

        it('getScript this', function (done) {
            io.get('/tests/browser/data/interface.jss?t=get&dataType=script', function () {
                expect(this.type).to.be('GET');
                done();
            }, 'script');
        });
    });

    describe('events', function () {
        it('start/send/success/complete/end event', function (done) {
            var called = [];
            util.each(['start', 'send', 'success', 'complete'], function (type) {
                io.on(type, function (ev) {
                    io.detach(type, arguments.callee);
                    called.push(ev.type);
                    expect(ev.io.config).not.to.be(undefined);
                    expect(ev.type).to.be(type);
                });
            });
            io.get('/tests/browser/data/interface.jss?t=' + (+new Date()), function () {
                setTimeout(function () {
                    expect(called).to.eql(['start', 'send', 'success', 'complete']);
                    done();
                }, 10);
            });
        });

        it('stop/error event', function (done) {
            io.on('error', function x(ev) {
                // ie<9 bug x!==arguments.callee
                io.detach('error', arguments.callee);
                expect(ev.io.config).not.to.be(undefined);
                expect(ev.type).to.be('error');
                done();
            });
            io.get('/tests/browser/data/404?t=' + (+new Date()));
        });
    });

    describe('decode', function () {
        it('does not encode url query and encode data query', function (done) {
            var p = '/tests/browser/specs/decode/t.jss';
            io({
                url: p + '?t=1,2',
                data: {
                    y: '3,4'
                },
                // dataType:'json',
                success: function (data) {
                    expect(data.originalUrl.toLowerCase())
                        .to.be('/tests/browser/specs/decode/t.jss?y=3%2c4&t=1,2');
                    expect(data.t).to.be('1,2');
                    expect(data.y).to.be('3,4');
                    done();
                }
            });
        });
    });
});