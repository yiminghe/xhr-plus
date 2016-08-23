import utils from './utils';
import IO from './base';
IO.ajaxSetup({
  jsonp: 'callback',
  jsonpCallback() {
    // 不使用 now() ，极端情况下可能重复
    return utils.guid('jsonp');
  },
});
IO.addPreprocessor('start', (e) => {
  const io = e.io;
  const c = io.config;
  const type = c.type;
  if (type[0] === 'jsonp') {
    // jsonp does not need contentType.
    // https://github.com/kissyteam/kissy/issues/394
    delete c.contentType;
    let response;
    const cJsonpCallback = c.jsonpCallback;
    let converters;
    const jsonpCallback = typeof cJsonpCallback === 'function' ?
      cJsonpCallback() :
      cJsonpCallback;
    const previous = window[jsonpCallback];

    c.uri.query[c.jsonp] = jsonpCallback;

    // build temporary JSONP function
    window[jsonpCallback] = (...args) => {
      // 使用数组，区别：故意调用了 jsonpCallback(undefined) 与 根本没有调用
      // jsonp 返回了数组
      let r = args;
      if (args.length <= 1) {
        r = args[0];
      }
      // 先存在内存里, onload 后再读出来处理
      response = [r];
    };

    // cleanup whether success or failure
    io.always(() => {
      window[jsonpCallback] = previous;
      if (previous === undefined) {
        try {
          delete window[jsonpCallback];
        } catch (ee) {
          // empty
        }
      } else if (response) {
        // after io success handler called
        // then call original existed jsonpcallback
        previous(response[0]);
      }
    });

    converters = c.converters;
    converters.script = converters.script || {};

    // script -> jsonp ,jsonp need to see json not as script
    // if ie onload a 404/500 file or all browsers onload an invalid script
    // 404/invalid will be caught here
    // because response is undefined( jsonp callback is never called)
    // error throwed will be caught in conversion step
    // and will notify user by error callback
    converters.script.json = () => {
      if (!response) {
        // notify event on production mode
        throw new Error(`not call jsonpCallback: ${jsonpCallback}`);
      }
      return response[0];
    };

    type.length = 2;
    // 利用 script transport 发送 script 请求
    type[0] = 'script';
    type[1] = 'json';
  }
});
