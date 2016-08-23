import { Promise } from 'es6-promise';
import io from '../../../index';
import expect from 'expect.js';
import isPhantomjs from '../isPhantomjs';

const mUrl = '/tests/specs/promise/gen-json.jss';

describe('IO as a promise', () => {
  it('context should works as before', (done) => {
    const c = {};
    io({
      url: mUrl,
      context: c,
      data: {
        x: 99,
      },
      type: 'json',
      success(d) {
        expect(d.x).to.be('99');
        expect(this).to.be(c);
        done();
      },
    });
  });

  it('should support then differently', (done) => {
    const r = io({
      url: mUrl,
      data: {
        x: 99,
      },
      type: 'json',
    });
    r.then((v) => {
      expect(v.x).to.be('99');
    });
    r.always((v) => {
      expect(v.x).to.be('99');
      done();
    });
  });

  if (!isPhantomjs) {
    it('should support fail differently', (done) => {
      const r = io({
        url: '404',
        context: {},
        data: {
          x: 99,
        },
        type: 'json',
      });
      r.then(() => {
      }, (v) => {
        expect(v.message).to.be('Not Found');
      });
      r.fail((v) => {
        expect(v.message).to.be('Not Found');
      });
      r.always((v) => {
        expect(v.message).to.be('Not Found');
        done();
      });
    });
  }

  it('should support chained value', (done) => {
    const r = io({
      url: mUrl,
      context: {},
      data: {
        x: 99,
      },
      type: 'json',
    });

    r.then((v) => {
      return Number(v.x) + 1;
    }).then((v) => {
      expect(v).to.be(100);
      done();
    });
  });

  it('should support nested promise', (done) => {
    const r = io({
      url: mUrl,
      context: {},
      data: {
        x: 99,
      },
      type: 'json',
    });

    r.then((v) => {
      expect(v.x).to.be('99');
      return io({
        url: mUrl,
        context: {},
        data: {
          x: 101,
        },
        type: 'json',
      });
    }).then((v) => {
      expect(v.x).to.be('101');
      done();
    });
  });

  it('then will catch then error', (done) => {
    io({
      url: mUrl,
      data: {
        x: 99,
      },
      type: 'json',
    }).then(() => {
      throw new Error('haha');
    }).then(() => {
    }, (e) => {
      expect(e.message).to.be('haha');
      done();
    });
  });

  it('should support Promise.all', (done) => {
    const r = io({
      url: mUrl,
      context: {},
      data: {
        x: 99,
      },
      type: 'json',
    });

    const r2 = io({
      url: mUrl,
      context: {},
      data: {
        x: 101,
      },
      type: 'json',
    });

    Promise.all([r, r2]).then((vs) => {
      expect(vs[0].x).to.be('99');
      expect(vs[1].x).to.be('101');
      done();
    });
  });
});
