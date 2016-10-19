import utils from './utils';
import assign from 'object-assign';
import IO from './base';
import { OK_CODE, ERROR_CODE } from './constants';
import sendMixin from './send-mixin';

IO.ajaxSetup({
  accepts: {
    script: `text/javascript,\
application/javascript,\
application/ecmascript,\
application/x-ecmascript`,
  },
  contents: {
    script: /javascript|ecmascript/,
  },
  converters: {
    text: {
      // 如果以 xhr+eval 需要下面的，
      // 否则直接 script node 不需要，引擎自己执行了，
      // 不需要手动 eval
      script(text) {
        utils.globalEval(text);
        return text;
      },
    },
  },
});

const jsOnLoadCallbacks = {};

function getScript(uri, success, charset) {
  const config = success;
  let error;
  let callbacks;
  if (typeof config === 'object') {
    success = config.success;
    error = config.error;
    charset = config.charset;
  }
  callbacks = jsOnLoadCallbacks[uri] = jsOnLoadCallbacks[uri] || [];
  callbacks.push([success, error]);
  if (callbacks.length > 1) {
    return callbacks.node;
  }
  const node = document.createElement('script');
  if (charset) {
    node.charset = charset;
  }

  node.src = uri;
  node.async = true;

  callbacks.node = node;

  function end(callbackIndex) {
    utils.each(jsOnLoadCallbacks[uri], (callback) => {
      const fn = callback[callbackIndex];
      if (fn) {
        fn.call(node);
      }
    });
    delete jsOnLoadCallbacks[uri];
  }

  function onload() {
    const readyState = node.readyState;
    if (!readyState ||
      readyState === 'loaded' ||
      readyState === 'complete') {
      node.onreadystatechange = node.onload = null;
      end(0);
    }
  }

  node.onload = onload;
  node.onerror = () => {
    node.onerror = null;
    end(1);
  };

  // can use js in head
  document.documentElement.insertBefore(node, document.documentElement.firstChild);
  return node;
}

function ScriptTransport(io) {
  const config = io.config;
  // 优先使用 xhr+eval 来执行脚本, 可以探测到（更多）失败状态
  if (!config.crossDomain) {
    return new (IO.getTransport('*'))(io);
  }
  this.io = io;
  return this;
}

assign(ScriptTransport.prototype, sendMixin, {
  send() {
    const self = this;
    self.callBeforeSendInternal();
    const io = self.io;
    const c = io.config;
    self.script = getScript(io._getUrlForSend(), {
      charset: c.scriptCharset,
      success() {
        self._callback('success');
      },
      error() {
        self._callback('error');
      },
    });
  },

  _callback(event, abort) {
    const { script, io } = this;
    // 防止重复调用,成功后 abort
    if (!script) {
      return;
    }
    this.script = undefined;
    if (abort) {
      return;
    }
    // Callback if not abort
    if (event !== 'error') {
      io._ioReady(OK_CODE, 'success');
    } else if (event === 'error') {
      // 非 ie<9 可以判断出来
      io._ioReady(ERROR_CODE, 'script error');
    }
  },
});

IO.setupTransport('script', ScriptTransport);
