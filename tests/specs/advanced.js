/**
 * advanced io tc
 * @author yiminghe@gmail.com
 **/
import $ from 'jquery';
import io from '../../index';
import utils from '../../src/utils';
import expect from 'expect.js';
import isPhantomjs from './isPhantomjs';

const url = io.url;

describe('Advanced IO', () => {
  it('support custom contentType', (done) => {
    io({
      url: '/tests/data/receive-json.jss',
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: '{"x":1}',
      success(t) {
        expect(t.x).to.be(1);
        done();
      },
    });
  });

  it('should support last-modified from server', (done) => {
    io({
      url: '/tests/data/ifModified.jss',
      type: 'text',
      success(data2, status2, xhr2) {
        expect(data2).to.be('haha');
        expect(status2).to.be('success');
        expect(xhr2.status).to.be(200);
        setTimeout(() => {
          io({
            url: '/tests/data/ifModified.jss',
            type: 'text',
            success(data, status, xhr) {
              expect(data).to.be('haha');
              expect(status).to.be('success');
              expect(xhr.status).to.be(200);
              expect(utils.isEmptyObject(
                io.__lastModifiedCached)).to.be(true);
              done();
            },
          });
        }, 500);
      },
    });
  });

  it('should support ifModified config', (done) => {
    io({
      url: '/tests/data/ifModified.jss',
      type: 'text',
      cache: false,
      ifModified: true,
      success(data2, status2, xhr2) {
        expect(data2).to.be('haha');
        expect(status2).to.be('success');
        expect(xhr2.status).to.be(200);

        setTimeout(() => {
          io({
            url: '/tests/data/ifModified.jss',
            type: 'text',
            cache: false,
            ifModified: true,
            success(data, status, xhr) {
              if (status === 'not modified') {
                expect(data).to.be(null);
                expect(xhr.status).to.be(304);
                expect(status).to.be('not modified');

                expect(io.__lastModifiedCached[
                  io.url.resolve(location.href, '/tests/data/ifModified.jss')
                  ])
                  .to.be('Thu, 18 Jul 2002 15:48:32 GMT');
              }
              done();
            },
          });
        }, 500);
      },
    });
  });

  if (!isPhantomjs) {
    it('should support ifModified config for form', (done) => {
      const form = $("<form><input name='t' value='t'/></form>").appendTo('body');

      io({
        url: '/tests/data/ifModified.jss',
        type: 'text',
        cache: false,
        ifModified: true,
        form: form[0],
        traditional: true,
        success(data2, status2, xhr2) {
          expect(data2).to.be('haha');
          expect(status2).to.be('success');
          expect(xhr2.status).to.be(200);

          setTimeout(() => {
            io({
              url: '/tests/data/ifModified.jss',
              type: 'text',
              cache: false,
              form: form[0],
              traditional: true,
              ifModified: true,
              success(data, status, xhr) {
                if (status === 'not modified') {
                  expect(data).to.be(null);
                  expect(xhr.status).to.be(304);
                  expect(status).to.be('not modified');

                  const uri = url.parse(url.resolve(location.href, '/tests/data/ifModified.jss'));
                  uri.query = {
                    t: 't',
                  };

                  expect(io.__lastModifiedCached[
                    url.stringify(uri)
                    ]).to.be('Thu, 18 Jul 2002 15:48:32 GMT');
                }
                form.remove();
                done();
              },
            });
          }, 500);
        },
      });
    });
  }

  it('should jsonp with array arguments', (done) => {
    io({
      type: 'jsonp',
      url: '/tests/data/jsonp-array.jss',
      success(d) {
        expect(d.join(',')).to.be([1, 2].join(','));
        done();
      },
    });
  });

  if (isPhantomjs) {
    return;
  }

  it('should abort for xhr', (done) => {
    const ret = [];
    const xhr = io({
      url: '/tests/data/io.jss',
      cache: false,
      success(data, status) {
        ret.push(status);
      },
      error(e) {
        ret.push(e.message);
      },
      complete(data, status) {
        ret.push(status);
      },
    });

    xhr.abort();

    setTimeout(() => {
      expect(ret.toString()).to.be(['abort', 'abort'].toString());
      done();
    }, 100);
  });


  it('nothing happens if abort xhr after complete', (done) => {
    const ret = [];
    const xhr = io({
      url: '/tests/data/io.jss',
      cache: false,
      success(data, status) {
        ret.push(status);
        setTimeout(() => {
          xhr.abort();
          expect(ret.toString()).to.be(['success', 'success'].toString());
          done();
        }, 0);
      },
      error(e) {
        ret.push(e.message);
      },
      complete(data, status) {
        ret.push(status);
      },
    });
  });

  it('should abort for jsonp', (done) => {
    const ret = [];

    const xhr = io({
      forceScript: utils.ie !== 6,
      type: 'jsonp',
      url: '/tests/data/jsonp.jss',
      cache: false,
      success(data, status) {
        ret.push(status);
      },
      error(e) {
        ret.push(e.message);
      },
      complete(data, status) {
        ret.push(status);
      },
    });

    xhr.abort();

    setTimeout(() => {
      expect(ret.toString()).to.be(['abort', 'abort'].toString());
      done();
    }, 100);
  });


  it('nothing happens if abort jsonp after complete', (done) => {
    const ret = [];

    const xhr = io({
      forceScript: utils.ie !== 6,
      url: '/tests/data/io.jss',
      cache: false,
      success(data, status) {
        ret.push(status);
        setTimeout(() => {
          // 成功后 abort 无影响
          xhr.abort();
          expect(ret.toString()).to.be(['success', 'success'].toString());
          done();
        }, 10);
      },
      error(e) {
        ret.push(e.message);
      },
      complete(data, status) {
        ret.push(status);
      },
    });
  });

  it('timeout should work for xhr', (done) => {
    const ret = [];
    io({
      url: '/tests/data/io.jss',
      // ie 默认会缓存，可能直接触发 success
      // fiddler 看不到请求，自带网络捕获为 304
      cache: false,
      type: 'json',
      timeout: 0.01,
      success(d, status) {
        ret.push(status);
      },
      error(e) {
        ret.push(e.message);
      },
      complete(data, status) {
        ret.push(status);
        expect(ret.toString()).to.be(['timeout', 'timeout'].toString());
        done();
      },
    });
  });

  if (!isPhantomjs) {
    if (!utils.ie || utils.ie > 7) {
      it('should works for form file upload', (done) => {
        const f = $('<form>' +
          '<input name="test4" value="t6"/>' +
          '<input name="test5" value="t8"/>' +
          '<input name="testFile" type="file"/>' +
          '<select name="test">' +
          '<option value="t1" selected>v</option>' +
          '<option value="t2">v2</option>' +
          '</select>' +
          '</form>').appendTo('body');

        io({
          url: '/tests/data/upload.jss',
          form: f[0],
          method: 'post',
          type: 'json',
          data: {
            test2: ['t2', 't3'],
            test3: 't4',
          },
          traditional: true,
          complete(data) {
            expect(data.test).to.eql('t1');
            expect(data.test4).to.eql('t6');
            expect(data.test2).to.eql(['t2', 't3']);
            expect(data.test3).to.eql('t4');
            expect(data.test5).to.eql('t8');
            f.remove();
            done();
          },
        });
      });
    }

    it('should works for common form', (done) => {
      const f = $('<form>' +
        '<input name="test4" value="t6"/>' +
        '<input name="test4" value="t7"/>' +
        '<input name="test5" value="t8"/>' +
        '<select name="test">' +
        '<option value="t1" selected>v</option>' +
        '<option value="t2">v2</option>' +
        '</select>' +
        '</form>').appendTo('body');

      let d;
      io({
        url: '/tests/data/upload.jss',
        form: f[0],
        method: 'post',
        type: 'json',
        traditional: true,
        data: {
          test2: ['t2', 't3'],
          test3: 't4',
        },
        success(data) {
          d = data;
        },
        complete() {
          expect(d.test).to.be('t1');
          expect(d.test4).to.eql(['t6', 't7']);
          expect(d.test2).to.eql(['t2', 't3']);
          expect(d.test3).to.eql('t4');
          expect(d.test5).to.eql('t8');
          f.remove();
          done();
        },
      });
    });
  }
});
