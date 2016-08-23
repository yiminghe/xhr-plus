/**
 * test cases for cross domain io
 * @author yiminghe@gmail.com
 */
import $ from 'jquery';
import io from '../../index';
import utils from '../../src/utils';
import expect from 'expect.js';

const testHost = `//local2.alipay.com:${location.port}`;
const testUrl = `${testHost}/tests/page/xdr/xdr.jss`;

if (location.hostname === 'local.alipay.com') {
  describe('Xdr IO', () => {
    it('support ignore X-Requested-With for one request', (done) => {
      io({
        headers: {
          'X-Requested-With': false,
        },
        cache: false,
        type: 'json',
        url: testUrl,
        withCredentials: true,
        success(d) {
          expect('X-Requested-With' in d).to.be(false);
          done();
        },
      });
    });

    it('support ignore X-Requested-With for all request', (done) => {
      io.ajaxSetup({
        headers: {
          'X-Requested-With': false,
        },
      });

      io({
        cache: false,
        type: 'json',
        url: testUrl,
        xhrFields: {
          withCredentials: true,
        },
        success(d) {
          expect('X-Requested-With' in d).to.be(false);
          io.ajaxSetup({
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          });
          done();
        },
      });
    });

    describe('set domain', () => {
      // noinspection JSAnnotator
      document.domain = 'alipay.com';
      it('should works for any domain', (done) => {
        const iframe = document.createElement('iframe');
        iframe.onload = () => {
          io({
            headers: {
              // cross domain 设置 header ie 无效
              // 原生 chrome.firefox 可行
              yiminghe: 'oo',
            },
            cache: false,
            type: 'json',
            url: testUrl,

            // Cannot use wildcard in Access-Control-Allow-Origin
            // when credentials flag is true.
            // Access-Control-Allow-Origin:http://localhost
            // 必须设置完全 hostname 匹配

            // firefox , chrome 携带 cookie
            withCredentials: true,
            data: {
              action: 'x',
            },
            success(d) {
              // body 都可读
              expect(d.action).to.be('x');

              // ie6-7 flash 不可读
              // ie8-9 XDomainRequest 不可读
              // header ie10 ,chrome, firefox 可读
              if (utils.ie && utils.ie < 10) {
                expect(typeof d.yiminghe).to.be('undefined');
                expect(typeof d['X-Requested-With']).to.be('undefined');
              } else {
                expect(d.yiminghe).to.be('oo');
                expect(d['X-Requested-With']).to.be('XMLHttpRequest');
              }

              // ie8-9 XDomainRequest 不可读
              // header ie10 ,chrome, firefox 可读
              // ie6-7 flash 可读
              if (utils.ie && utils.ie >= 8 && utils.ie <= 9) {
                expect(typeof d.cors).to.be('undefined');
              } else {
                expect(d.cors).to.be('ok');
              }

              iframe.remove();
              done();
            },
          });
        };

        iframe.src = `${testHost}/tests/page/xdr/set-cookie.jss`;
        document.documentElement.insertBefore(iframe, null);
      });

      it('should works for subdomain', (done) => {
        const ret = [];

        io({
          url: `${testHost}/tests/data/io.jss`,
          subDomainProxyUrl: '/tests/page/subdomain/proxy.html',
          success() {
            ret.push('s');
          },
          error() {
            ret.push('e');
          },
          complete() {
            ret.push('c');
            expect(ret).to.eql(['s', 'c']);
            done();
          },
        });
      });

      it('should support cross subdomain fileupload', (done) => {
        const form = $('<form>' +
          '<input name="test" value=\'1\'/>' +
          '<input name="test2" value=\'2\'/>' +
          '<input type="file" name="testFile"/>' +
          '</form>').appendTo('body');

        io({
          method: 'post',
          form: form[0],
          type: 'json',
          url: `${testHost}/tests/page/subdomain/upload.jss`,
          success(data) {
            expect(data.test).to.be('1');
            expect(data.test2).to.be('2');
            form.remove();
            done();
          },
        });
      });
    });
  });
}
