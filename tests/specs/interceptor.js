import expect from 'expect.js';
import io from '../../index';

describe('interceptor', () => {
  it('can intercept config', (done) => {
    const i1 = io.interceptors.request.use((c) => {
      c.data.x++;
      return c;
    });
    const i2 = io.interceptors.request.use((c) => {
      c.data.x *= 3;
      return c;
    });
    io({
      url: '/tests/data/receive-json.jss',
      data: {
        x: 1,
      },
      cache: false,
      method: 'post',
      type: 'json',
      success(p) {
        expect(p.x).to.be('6');
        io.interceptors.request.eject(i1);
        io.interceptors.request.eject(i2);
        done();
      },
    });
  });

  it('can intercept response success', (done) => {
    const i1 = io.interceptors.response.use((data) => {
      data.x = parseInt(data.x, 10);
      data.x++;
      return data;
    });
    const i2 = io.interceptors.response.use((data) => {
      data.x *= 3;
      return data;
    });
    io({
      url: '/tests/data/receive-json.jss',
      data: {
        x: 1,
      },
      cache: false,
      method: 'post',
      type: 'json',
      success(p) {
        expect(p.x).to.be(6);
        io.interceptors.response.eject(i1);
        io.interceptors.response.eject(i2);
        done();
      },
    });
  });

  it('can turn response to error', (done) => {
    const i1 = io.interceptors.response.use((data) => {
      data.x = parseInt(data.x, 10);
      data.x++;
      return data;
    });
    const i2 = io.interceptors.response.use((data) => {
      expect(data.x).to.be(2);
      return Promise.reject('ooo');
    });
    io({
      url: '/tests/data/receive-json.jss',
      data: {
        x: 1,
      },
      cache: false,
      method: 'post',
      type: 'json',
      error(e) {
        expect(e.message).to.be('ooo');
        io.interceptors.response.eject(i1);
        io.interceptors.response.eject(i2);
        done();
      },
    });
  });
});
