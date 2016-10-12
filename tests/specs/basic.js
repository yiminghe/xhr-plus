/**
 * basic test cases for kissy io
 */

import expect from 'expect.js';
import io from '../../index';
import utils from '../../src/utils';
import isPhantomjs from './isPhantomjs';

describe('basic', () => {
  describe('404/301', () => {
    it('301 get success', (done) => {
      io({
        url: '/tests/data/301.jss',
        cache: false,
        success(p) {
          expect(p.name).to.be('xhr-plus');
          done();
        },
      });
    });

    it('301 post success', (done) => {
      io({
        url: '/tests/data/301.jss',
        cache: false,
        method: 'post',
        success(p) {
          expect(p.name).to.be('xhr-plus');
          done();
        },
      });
    });
    if (!isPhantomjs) {
      it('404 get error', (done) => {
        io({
          url: '/tests/data/404',
          cache: false,
          error() {
            done();
          },
        });
      });

      it('404 post error', (done) => {
        io({
          url: '/tests/data/404',
          method: 'post',
          cache: false,
          error() {
            done();
          },
        });
      });

      it('404 jsonp does not call success', (done) => {
        io({
          url: '/tests/data/404',
          type: 'jsonp',
          error(e) {
            expect(e.message).to.be('Not Found');
            done();
          },
        });
      });

      it('404 cross domain jsonp does not call success', (done) => {
        try {
          io({
            url: '/tests/data/404',
            type: 'jsonp',
            crossDomain: true,
            error(e) {
              const status = e.message;
              if (status.indexOf('not call jsonpCallback') !== -1) {
                // empty
              } else {
                expect(utils.inArray(status, [
                  'script error',
                  'parser error',
                ]))
                  .to.be(true);
              }
              done();
            },
          });
        } catch (e) {
          // empty
        }
      });
    }
  });

  describe('jsonp', () => {
    it('custom callback', (done) => {
      window.customCallback = (data) => {
        expect(typeof data).to.be('object');
        expect(data.callback).to.be('customCallback');
        try {
          delete window.customCallback;
        } catch (e) {
          window.customCallback = undefined;
        }
        done();
      };
      io({
        url: '/tests/data/interface.jss?callback=customCallback',
        type: 'script',
        crossDomain: true,
      });
    });

    it('does not have content-type', (done) => {
      io({
        url: '/tests/data/interface.jss?t=get',
        success(data) {
          expect(data.contentType).to.be('');
          done();
        },
        type: 'jsonp',
      });
    });

    it('custom callbackName', (done) => {
      io({
        url: '/tests/data/interface.jss?t=get',
        success(data) {
          expect(typeof data).to.be('object');
          done();
        },
        type: 'jsonp',
        jsonpCallback: 'customCallback',
      });
    });

    it('jsonp without params', (done) => {
      io({
        url: '/tests/data/interface.jss',
        type: 'jsonp',
        success(data) {
          expect(typeof data).to.be('object');
          done();
        },
      });
    });

    it('jsonp with params', (done) => {
      io({
        url: '/tests/data/interface.jss?sleep=0',
        type: 'jsonp',
        data: {
          myParam: 'taobao',
        },
        success(data) {
          expect(typeof data).to.be('object');
          expect(data).not.to.be(undefined);
          expect(data.myParam).to.be('taobao');
          done();
        },
      });
    });

    // https://github.com/kissyteam/kissy/issues/187
    it('can ignore protocol', (done) => {
      io({
        url: '/tests/data/interface.jss',
        type: 'jsonp',
        data: {
          myParam: 'taobao',
        },
        crossDomain: true,
        success(data) {
          expect(typeof data).to.be('object');
          expect(data).not.to.be(undefined);
          expect(data.myParam).to.be('taobao');
          done();
        },
      });
    });
  });

  describe('sync test case', () => {
    it('get sync', () => {
      let d = 0;
      io({
        method: 'get',
        // 根据 content-type 自动 parse
        url: '/tests/data/interface.jss?sleep=1&contentType=text/json',
        async: false,
        success(o) {
          d = o;
        },
      });
      expect(d.name).to.be('test');
    });

    it('post sync', () => {
      let d = 0;
      io({
        method: 'post',
        url: '/tests/data/interface.jss?sleep=1&contentType=text/json',
        async: false,
        success(o) {
          d = o;
        },
      });
      expect(d.name).to.be('test');
    });
  });

  describe('post', () => {
    it('post get text/json data', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?t=post&contentType=text/json',
        success(data) {
          expect(typeof data).to.be('object');
          expect(data).not.to.be(undefined);
          expect(data.name).to.be('test');
          done();
        },
      });
    });

    it('post get string data', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?t=post',
        success(data, status, xhr) {
          expect(typeof data).to.be('string');
          const o = JSON.parse(data);
          expect(o).not.to.be(undefined);
          expect(o.name).to.be('test');
          expect(xhr.responseText).to.be(data);
          done();
        },
      });
    });

    it('post get json data', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?t=post',
        data: {
          method: 'post',
          name: 'test',
          company: 'www.taobao.com',
          exp: '>,?/%."`~',
        },
        success(data, status, xhr) {
          const o = JSON.parse(data);
          expect(o).not.to.be(undefined);
          expect(o.name).to.be('test');
          expect(o.company).to.be('www.taobao.com');
          expect(xhr.responseText).to.be(data);
          done();
        },
      });
    });

    it('post get string data', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?t=post',
        data: `name=test&company=www.taobao.com&exp=${encodeURIComponent('>,?/\\%."`~')}`,
        success(data, status, xhr) {
          const o = JSON.parse(data);
          expect(o).not.to.be(undefined);
          expect(o.name).to.be('test');
          expect(o.company).to.be('www.taobao.com');
          expect(status).to.be('success');
          expect(xhr.responseText).to.be(data);
          done();
        },
      });
    });

    it('dataType json', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?contentType=text/json',
        type: 'json',
        success(data) {
          expect(typeof data).to.be('object');
          expect(data.name).to.be('test');
          done();
        },
      });
    });

    it('data override url', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?foo=sk1',
        data: {
          foo: 'sk2',
        },
        type: 'json',
        success(data) {
          expect(typeof data).to.be('object');
          expect(data.foo).to.be('sk2');
          done();
        },
      });
    });

    it('dataType jsonp', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss',
        type: 'jsonp',
        success(data) {
          expect(typeof data).to.be('object');
          expect(data.name).to.be('test');
          done();
        },
      });
    });

    it('dataType script', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss?type=post&dataType=script',
        type: 'script',
        success(data) {
          expect(data).to.be('window.globalScriptTest = 500;');
          expect(window.globalScriptTest).to.be(500);
          try {
            delete window.globalScriptTest;
          } catch (e) {
            window.globalScriptTest = undefined;
          }
          done();
        },
      });
    });

    it('type script', (done) => {
      // 这里和get的处理一致

      io({
        method: 'post',
        url: '/tests/data/interface.jss?type=post' +
        '&dataType=script' +
        '&contentType=text/javascript',
        success(data) {
          expect(data).to.be('window.globalScriptTest = 500;');
          expect(window.globalScriptTest).to.be(500);
          try {
            delete window.globalScriptTest;
          } catch (e) {
            window.globalScriptTest = undefined;
          }
          done();
        },
      });
    });

    it('datatype xml', (done) => {
      // 这里'xml'的参数可以省略
      io({
        url: '/tests/data/xml.jss',
        method: 'post',
        success(data) {
          expect(data.childNodes.length > 0).to.be(true);
          done();
        },
        type: 'xml',
      });
    });

    it('dataType xml but return data format json', (done) => {
      // 可以么？ content-type 为 xml
      // 但实际内容也为 json  需要自动转换成 json
      io({
        url: '/tests/data/xml-json.jss',
        method: 'post',
        type: 'json',
        success(data) {
          expect(data.x).to.be(1);
          done();
        },
      });
    });

    it('post context', (done) => {
      io({
        method: 'post',
        url: '/tests/data/interface.jss',
        success() {
          expect(this.method).to.be('POST');
          done();
        },
      });
    });
  });

  describe('get', () => {
    it('datatype html text', (done) => {
      io({
        url: '/tests/data/html.jss',
        success(data) {
          expect(data.toLowerCase().indexOf('<html')).to.be(0);
          done();
        },
      });
    });

    it('get callback params', (done) => {
      io({
        url: '/tests/data/interface.jss?t=get',
        success(data, textStatus, xhr) {
          const o = JSON.parse(data);
          expect(o).not.to.be(undefined);
          expect(o.t).to.be('get');
          expect(o.name).to.be('test');
          expect(o.birth).to.be('2010/11/23');
          expect(textStatus).to.be('success');
          expect(xhr.responseText).to.be(data);
          done();
        },
      });
    });

    it('data works', (done) => {
      io({
        url: '/tests/data/interface.jss?t=get',
        data: {
          data: 'hello',
        },
        success(data) {
          const o = JSON.parse(data);
          expect(o.data).to.be('hello');
          done();
        },
      });
    });

    it('dataType json', (done) => {
      // io.get('http://test.com/tests/interface.jss?t=get', function(data) {
      // test.com -> 127.0.0.1
      // jQuery 里 当跨域时 dataType 为 json 时 依旧会调用 xhr. KISSY 处理逻辑与 jQuery 一致。
      io({
        url: '/tests/data/interface.jss?t=get',
        type: 'json',
        success(data) {
          expect(typeof data).to.be('object');
          expect(data.name).to.be('test');
          done();
        },
      });
      // 注意：在 jQuery 里 当 dataType 为 json, 但 url 里有 callback=? 时 会自动转换到 jsonp 模式
      // KISSY 里去掉了以上自动转换。用户必须显式指定 dataType 为 jsonp
      // 这样的好处是去除了 callback=? 约定 用户使用上也更清晰（指定 dataType 为 jsonp 比用 callback=? 切换到 jsonp 更简单）
      // API 的一个原则：让用户方便 但也不能宠坏用户（以某种看似简单的约定让用户继续糊涂）
    });

    it('dataType jsonp', (done) => {
      // 注：此处的处理方式和 jQuery 不同
      // 不跨域时 jQuery 会依旧调用 xhr 处理 得到结果后 再通过 globalEval 执行
      // KISSY 里 无论跨不跨域 只要 dataType 为 jsonp, 都用 getScript 处理
      // 1.2 修正 和 jquery 保持一致 ie 下可以有出错处理 也方便 abort
      // io.get('http://test.com/tests/interface.jss?t=get', function(data) {
      io({
        url: '/tests/data/interface.jss?t=get',
        type: 'jsonp',
        success(data) {
          expect(typeof data).to.be('object');
          expect(data.name).to.be('test');
          done();
        },
      });
    });

    it('dataType script', (done) => {
      io({
        url: '/tests/data/interface.jss?t=get&dataType=script',
        type: 'script',
        success(d) {
          expect(window.globalScriptTest).to.be(200);
          expect(d).to.be('window.globalScriptTest = 200;');
          done();
        },
      });
    });

    it('dataType xml', (done) => {
      io({
        url: '/tests/data/xml.jss',
        success(data) {
          expect(data.childNodes.length > 0).to.be(true);
          done();
        },
      });
    });
  });

  describe('events', () => {
    it('start/send/success/complete/end event', (done) => {
      const called = [];
      utils.each(['start', 'send', 'success', 'complete'], (type) => {
        io.on(type, function attach(ev) {
          io.detach(type, attach);
          called.push(ev.type);
          expect(ev.io.config).not.to.be(undefined);
          expect(ev.type).to.be(type);
        });
      });
      io({
        url: `/tests/data/interface.jss?t=${+new Date()}`,
        success() {
          setTimeout(() => {
            expect(called).to.eql(['start', 'send', 'success', 'complete']);
            done();
          }, 10);
        },
      });
    });

    if (!isPhantomjs) {
      it('stop/error event', (done) => {
        io.on('error', function x(ev) {
          // ie<9 bug x!==arguments.callee
          io.detach('error', x);
          expect(ev.io.config).not.to.be(undefined);
          expect(ev.type).to.be('error');
          done();
        });
        io({ url: `/tests/data/404?t=${+new Date()}` });
      });
    }
  });

  describe('decode', () => {
    it('does not encode url query and encode data query', (done) => {
      const p = '/tests/specs/decode/t.jss';
      io({
        url: `${p}?t=1,2`,
        data: {
          y: '3,4',
        },
        // type:'json',
        success(data) {
          expect(data.originalUrl.toLowerCase())
            .to.be('/tests/specs/decode/t.jss?y=3%2c4&t=1,2');
          expect(data.t).to.be('1,2');
          expect(data.y).to.be('3,4');
          done();
        },
      });
    });
  });
});
