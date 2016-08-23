/**
 * advanced io tc
 * @author yiminghe@gmail.com
 **/

import $ from 'jquery';
import io from '../../index';
import utils from '../../src/utils';
import expect from 'expect.js';
import isPhantomjs from './isPhantomjs';

if (!isPhantomjs) {
  describe('io upload', () => {
    this.timeout(5000);

    it('should abort for form file upload', (done) => {
      const f = $('<form>' +
        '<input name="testFile" type="file"/>' +
        '<select name="test" multiple>' +
        '<option value="t1" selected>v</option>' +
        '<option value="t2" selected>v2</option>' +
        '</select>' +
        '</form>').appendTo('body');

      const ret = [];

      const xhr = io({
        url: '/tests/data/upload.jss',
        form: f[0],
        method: 'post',
        type: 'json',
        data: {
          test2: 't2',
        },
        traditional: true,
        error(e) {
          ret.push(e.message);
        },
        success(data, s) {
          ret.push(s);
        },
        complete(d, s) {
          ret.push(s);
          expect(ret).to.eql(['abort', 'abort']);
          setTimeout(() => {
            f.remove();
            done();
          }, 1000);
        },
      });

      xhr.abort();
    });

    if (!utils.ie || utils.ie > 7) {
      it('nothing happens if abort after form file upload', (done) => {
        // error !
        const f = $('<form action="http://www.alibaba.com">' +
          '<input name="testFile" type="file"/>' +
          '<select name="test" multiple>' +
          '<option value="t1" selected>v</option>' +
          '<option value="t2" selected>v2</option>' +
          '</select>' +
          '</form>').appendTo('body');

        const ret = [];

        const xhr = io({
          url: '/tests/data/upload.jss',
          form: f[0],
          method: 'post',
          type: 'json',
          traditional: true,
          data: {
            test2: ['t2', 't3'],
          },
          error(e) {
            ret.push(e.message);
          },
          success(data, s) {
            ret.push(s);
          },
          complete(d, s) {
            ret.push(s);
            setTimeout(() => {
              xhr.abort();
              expect(ret.join(',')).to.be(['success', 'success'].join(','));
              f.remove();
              setTimeout(done, 100);
            }, 100);
          },
        });
      });

      it('fileupload support xml return data', (done) => {
        const form = $('<form>' +
          '<input name="test" value=\'1\'/>' +
          '<input name="test2" value=\'2\'/>' +
          '<input name="testFile" type="file"/>' +
          '</form>').appendTo('body');

        io({
          method: 'post',
          form: form[0],
          type: 'xml',
          traditional: true,
          url: '/tests/data/xml.jss',
          success(data) {
            expect(data.nodeType).to.be(9);
            expect(data.documentElement.nodeType).to.be(1);
            form.remove();
            setTimeout(done, 100);
          },
        });
      });

      it('fileupload support html return data', (done) => {
        const form = $('<form>' +
          '<input name="test" value=\'1\'/>' +
          '<input name="test2" value=\'2\'/>' +
          '<input name="testFile" type="file"/>' +
          '</form>').appendTo('body');

        io({
          method: 'post',
          form: form[0],
          type: 'html',
          traditional: true,
          url: '/tests/data/html.jss',
          success(data) {
            expect(data.toLowerCase()).to.be('<b>html</b>');
            form.remove();
            setTimeout(done, 100);
          },
        });
      });

      // same with html
      it('fileupload support text return data', (done) => {
        const form = $('<form>' +
          '<input name="test" value=\'1\'/>' +
          '<input name="test2" value=\'2\'/>' +
          '<input name="testFile" type="file"/>' +
          '</form>').appendTo('body');

        io({
          method: 'post',
          form: form[0],
          type: 'text',
          traditional: true,
          url: '/tests/data/html.jss',
          success(data) {
            expect(data.toLowerCase()).to.be('<b>html</b>');
            form.remove();
            setTimeout(done, 100);
          },
        });
      });

      it('should error when upload to a cross domain page', (done) => {
        const form = $('<form>' +
          '<input name="test" value=\'1\'/>' +
          '<input name="test2" value=\'2\'/>' +
          '<input name="test3" type=\'file\'/>' +
          '</form>').appendTo('body');

        // ie upload-domain.jss 必须设置 domain
        // 否则 localhost:8888 和 localhost:9999 默认可以通信...

        // 标准浏览器是 cors 关系
        const uploadRc = '//local2.alipay.com/tests/data/upload.jss';

        window.ioDEBUG = 1;

        io({
          method: 'post',
          form: form[0],
          type: 'json',
          traditional: true,
          url: uploadRc,
          error(e) {
            // cors 无出错信息
            expect(e.message || 'parser error').to.be('parser error');
          },
          complete() {
            form.remove();
            setTimeout(done, 100);
          },
        });
      });
    }
  });
}
