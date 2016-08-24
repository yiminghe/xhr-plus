/* eslint no-console:0 */

import io from 'xhr-plus';

const a = 0;

if (!a) {
  io({
    url: './data/res.json',
    success(...args) {
      console.log('xhr success', args);
    },
    error(...args) {
      console.log('xhr error', args);
    },
  });
}

io({
  url: './data/error.json',
  success(...args) {
    console.log('xhr error success', args);
  },
  error(...args) {
    console.log('xhr error error', args);
  },
});

io({
  type: 'jsonp',
  jsonpCallback: 'ok',
  url: './data/res.js',
  success(...args) {
    console.log('jsonp success', args);
  },
  error(...args) {
    console.log('jsonp error', args);
  },
});


io({
  type: 'jsonp',
  jsonpCallback: 'ok2',
  crossDomain: true,
  url: './data/res2.js',
  success(...args) {
    console.log('jsonp2 success', args);
  },
  error(...args) {
    console.log('jsonp2 error', args);
  },
});
