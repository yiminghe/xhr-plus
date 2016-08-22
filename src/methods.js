import assign from 'object-assign';
import IO from './base';
import url from 'modulex-url/lib/url';
import { OK_CODE, MULTIPLE_CHOICES, NOT_MODIFIED } from './constants';
// get individual response header from response header str
const HEADER_REG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;

function handleResponseData(io) {
  // text xml 是否原生转化支持
  const text = io.responseText;
  const xml = io.responseXML;
  const c = io.config;
  const converts = c.converters;
  let type;
  let contentType;
  let responseData;
  const contents = c.contents;
  const dataType = c.dataType;

  // 例如 script 直接是js引擎执行，没有返回值，不需要自己处理初始返回值
  // jsonp 时还需要把 script 转换成 json，后面还得自己来
  if (text || xml) {
    contentType = io.mimeType || io.getResponseHeader('Content-Type');

    // 去除无用的通用格式
    while (dataType[0] === '*') {
      dataType.shift();
    }

    if (!dataType.length) {
      // 获取源数据格式，放在第一个
      for (type in contents) {
        if (contents.hasOwnProperty(type) &&
          contents[type].test(contentType)) {
          if (dataType[0] !== type) {
            dataType.unshift(type);
          }
          break;
        }
      }
    }

    // 服务器端没有告知（并且客户端没有 mime type ）默认 text 类型
    dataType[0] = dataType[0] || 'text';

    // 获得合适的初始数据
    for (let dataTypeIndex = 0; dataTypeIndex < dataType.length; dataTypeIndex++) {
      if (dataType[dataTypeIndex] === 'text' && text !== undefined) {
        responseData = text;
        break;
      } else if (dataType[dataTypeIndex] === 'xml' && xml !== undefined) {
        // 有 xml 值才直接取，否则可能还要从 xml 转
        responseData = xml;
        break;
      }
    }

    if (!responseData) {
      const rawData = { text, xml };
      // 看能否从 text xml 转换到合适数据，并设置起始类型为 text/xml
      ['text', 'xml'].forEach((prevType) => {
        const type0 = dataType[0];
        const converter = converts[prevType] && converts[prevType][type0];
        if (converter && rawData[prevType]) {
          dataType.unshift(prevType);
          responseData = prevType === 'text' ? text : xml;
          return false;
        }
        return undefined;
      });
    }
  }
  let prevType = dataType[0];

  // 按照转化链把初始数据转换成我们想要的数据类型
  for (let i = 1; i < dataType.length; i++) {
    type = dataType[i];

    const converter = converts[prevType] && converts[prevType][type];

    if (!converter) {
      throw new Error(`no covert for ${prevType} => ${type}`);
    }
    responseData = converter(responseData);

    prevType = type;
  }

  io.responseData = responseData;
}

assign(IO.prototype,
  {
    // Caches the header
    setRequestHeader(name, value) {
      this.requestHeaders[name] = value;
      return this;
    },

    /**
     * get all response headers as string after request is completed.
     * @member IO
     * @return {String}
     */
    getAllResponseHeaders() {
      return this.state === 2 ? this.responseHeadersString : null;
    },

    /**
     * get header value in response to specified header name
     * @param {String} name header name
     * @return {String} header value
     * @member IO
     */
    getResponseHeader(name) {
      let match;
      let responseHeaders;
      // ie8 will be lowercase for content-type
      name = name.toLowerCase();
      if (this.state === 2) {
        responseHeaders = this.responseHeaders;
        if (!responseHeaders) {
          responseHeaders = this.responseHeaders = {};
          match = HEADER_REG.exec(this.responseHeadersString);
          while (match) {
            responseHeaders[match[1].toLowerCase()] = match[2];
            match = HEADER_REG.exec(this.responseHeadersString);
          }
        }
        match = responseHeaders[name];
      }
      return match === undefined ? null : match;
    },

    // Overrides response content-type header
    overrideMimeType(type) {
      if (!this.state) {
        this.mimeType = type;
      }
      return this;
    },

    /**
     * cancel this request
     * @member IO
     * @param {String} [statusText=abort] error reason as current request object's statusText
     * @chainable
     */
    abort(statusText) {
      statusText = statusText || 'abort';
      if (this.transport) {
        this.transport.abort(statusText);
      }
      this._ioReady(0, statusText);
      return this;
    },

    /**
     * get native XMLHttpRequest
     * @member IO
     * @return {XMLHttpRequest}
     */
    getNativeXhr() {
      const transport = this.transport;
      if (transport) {
        return transport.nativeXhr;
      }
      return null;
    },

    _ioReady(status, statusText) {
      // 只能执行一次，防止重复执行
      // 例如完成后，调用 abort

      // 到这要么成功，调用success
      // 要么失败，调用 error
      // 最终都会调用 complete
      if (this.state === 2) {
        return;
      }
      this.state = 2;
      this.readyState = 4;
      let isSuccess;
      if (status >= OK_CODE && status < MULTIPLE_CHOICES || status === NOT_MODIFIED) {
        // note: not same with nativeStatusText, such as 'OK'/'Not Modified'
        // 为了整个框架的和谐以及兼容性，用小写，并改变写法
        if (status === NOT_MODIFIED) {
          statusText = 'not modified';
          isSuccess = true;
        } else {
          try {
            handleResponseData(this);
            statusText = 'success';
            isSuccess = true;
          } catch (e) {
            console.error(e.stack || e);
            setTimeout(() => {
              throw e;
            }, 0);
            statusText = e.message || 'parser error';
          }
        }
      } else {
        if (status < 0) {
          status = 0;
        }
      }

      this.status = status;
      this.statusText = statusText;

      const config = this.config;
      const timeoutTimer = this.timeoutTimer;
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
        this.timeoutTimer = 0;
      }
      /**
       * fired after request completes (success or error)
       * @event complete
       * @member IO
       * @static
       * @param {Event.CustomEvent.Object} e
       * @param {IO} e.io current io
       */

      /**
       * fired after request succeeds
       * @event success
       * @member IO
       * @static
       * @param {Event.CustomEvent.Object} e
       * @param {IO} e.io current io
       */

      /**
       * fired after request occurs error
       * @event error
       * @member IO
       * @static
       * @param {Event.CustomEvent.Object} e
       * @param {IO} e.io current io
       */
      const handler = isSuccess ? 'success' : 'error';
      let h = config[handler];
      const v = [this.responseData, statusText, this];
      const context = config.context;
      const eventObject = {
        io: this,
      };
      if (h) {
        h.apply(context, v);
      }
      h = config.complete;
      if (h) {
        h.apply(context, v);
      }
      IO.fire(handler, eventObject);
      IO.fire('complete', eventObject);
      this.getPromise();
      this[isSuccess ? '__resolve' : '__reject'](v);
    },

    _getUrlForSend() {
      // for compatible, some server does not decode query
      // uri will encode query
      // x.html?t=1,2
      // =>
      // x.html?t=1%3c2
      // so trim original query when process other query
      // and append when send
      const c = this.config;
      const uri = c.uri;
      let search = uri.search || '';
      delete uri.search;
      if (search && Object.keys(uri.query).length) {
        search = `&${search.substring(1)}`;
      }
      return url.stringify(uri, c.serializeArray) + search;
    },
  }
);
