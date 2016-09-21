/* eslint no-console:0 */

import utils from './utils';
import querystring from 'modulex-querystring';
import urlUtils from 'modulex-url';
import IO from './base';
import assign from 'object-assign';
import { OK_CODE, NO_CONTENT_CODE, NOT_FOUND_CODE, NO_CONTENT_CODE2 } from './constants';
// http://msdn.microsoft.com/en-us/library/cc288060(v=vs.85).aspx
const XDomainRequest_ = utils.ieMode > 7 && window.XDomainRequest;
const XhrTransportBase = {
  proto: {},
};
const lastModifiedCached = {};
const eTagCached = {};


IO.__lastModifiedCached = lastModifiedCached;
IO.__eTagCached = eTagCached;

function createStandardXHR(_, refWin) {
  try {
    return new (refWin || window).XMLHttpRequest();
  } catch (e) {
    // empty
  }
  return undefined;
}

const supportCORS = XhrTransportBase.supportCORS =
  typeof window !== undefined && ('withCredentials' in (createStandardXHR() || {}));

function createActiveXHR(_, refWin) {
  try {
    return new (refWin || window).ActiveXObject('Microsoft.XMLHTTP');
  } catch (e) {
    // empty
  }
  return undefined;
}

XhrTransportBase.nativeXhr = typeof window !== undefined && window.ActiveXObject ?
  (crossDomain, refWin) => {
    // consider ie10
    if (!supportCORS && crossDomain && XDomainRequest_) {
      return new XDomainRequest_();
    }
    // ie7 XMLHttpRequest 不能访问本地文件
    return !IO.isLocal && createStandardXHR(crossDomain, refWin) ||
      createActiveXHR(crossDomain, refWin);
  } : createStandardXHR;


XhrTransportBase.XDomainRequest_ = XDomainRequest_;

function isInstanceOfXDomainRequest(xhr) {
  return XDomainRequest_ && (xhr instanceof XDomainRequest_);
}

function getIfModifiedKey(c) {
  const ifModified = c.ifModified;
  let ifModifiedKey;
  if (ifModified) {
    ifModifiedKey = c.uri;
    if (c.cache === false) {
      ifModifiedKey = utils.clone(ifModifiedKey);
      // remove random timestamp
      // random timestamp is forced to fetch code file from server
      delete ifModifiedKey.query._ksTS;
    }
    ifModifiedKey = urlUtils.stringify(ifModifiedKey);
  }
  return ifModifiedKey;
}

assign(XhrTransportBase.proto, {
  sendInternal() {
    const io = this.io;
    const c = io.config;
    if (c.beforeSendInternal) {
      c.beforeSendInternal.call(c.context, this, c);
    }
    const nativeXhr = this.nativeXhr;
    const files = c.files;
    const method = files ? 'post' : c.method;
    const async = c.async;
    let username;
    const mimeType = io.mimeType;
    const requestHeaders = io.requestHeaders || {};
    const url = io._getUrlForSend();
    let xhrFields;
    const ifModifiedKey = getIfModifiedKey(c);
    let cacheValue;
    let i;

    if (ifModifiedKey) {
      // if io want a conditional load
      // (response status is 304 and responseText is null)
      // u need to set if-modified-since manually!
      // or else
      // u will always get response status 200 and full responseText
      // which is also conditional load but process transparently by browser
      cacheValue = lastModifiedCached[ifModifiedKey];
      if (cacheValue) {
        requestHeaders['If-Modified-Since'] = cacheValue;
      }
      cacheValue = eTagCached[ifModifiedKey];
      if (cacheValue) {
        requestHeaders['If-None-Match'] = cacheValue;
      }
    }
    username = c.username;
    if (username) {
      nativeXhr.open(method, url, async, username, c.password);
    } else {
      nativeXhr.open(method, url, async);
    }

    xhrFields = c.xhrFields || {};

    if (c.withCredentials) {
      xhrFields.withCredentials = c.withCredentials;
    }

    if ('withCredentials' in xhrFields) {
      if (!supportCORS) {
        delete xhrFields.withCredentials;
      }
    }

    for (i in xhrFields) {
      if (xhrFields.hasOwnProperty(i)) {
        try {
          nativeXhr[i] = xhrFields[i];
        } catch (e) {
          // empty
        }
      }
    }
    // Override mime type if supported
    if (mimeType && nativeXhr.overrideMimeType) {
      nativeXhr.overrideMimeType(mimeType);
    }

    const xRequestHeader = requestHeaders['X-Requested-With'];

    if (xRequestHeader === false) {
      delete requestHeaders['X-Requested-With'];
    }

    // ie<10 XDomainRequest does not support setRequestHeader
    if (typeof nativeXhr.setRequestHeader !== 'undefined') {
      for (i in requestHeaders) {
        if (requestHeaders.hasOwnProperty(i)) {
          nativeXhr.setRequestHeader(i, requestHeaders[i]);
        }
      }
    }

    let sendContent = c.hasContent && c.data || null;

    // support html5 file upload api
    if (files) {
      const originalSentContent = sendContent;
      let data = {};
      if (originalSentContent) {
        data = querystring.parse(originalSentContent);
      }
      assign(data, files);
      sendContent = new FormData();
      utils.each(data, (vs, k) => {
        if (Array.isArray(vs)) {
          utils.each(vs, (v) => {
            sendContent.append(k + (c.traditional ? '' : '[]'), v);
          });
        } else {
          sendContent.append(k, vs);
        }
      });
    }

    nativeXhr.send(sendContent);

    if (!async || nativeXhr.readyState === 4) {
      this._callback();
    } else {
      // XDomainRequest_ 单独的回调机制
      if (isInstanceOfXDomainRequest(nativeXhr)) {
        nativeXhr.onload = () => {
          nativeXhr.readyState = 4;
          nativeXhr.status = 200;
          this._callback();
        };
        nativeXhr.onerror = () => {
          nativeXhr.readyState = 4;
          nativeXhr.status = 500;
          this._callback();
        };
      } else {
        nativeXhr.onreadystatechange = () => {
          this._callback();
        };
      }
    }
  },
  // 由 io.abort 调用，自己不可以调用 io.abort
  abort() {
    this._callback(0, 1);
  },

  _callback(event, abort) {
    // Firefox throws exceptions when accessing properties
    // of an xhr when a network error occurred
    // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
    const nativeXhr = this.nativeXhr;
    const io = this.io;
    let ifModifiedKey;
    let lastModified;
    let eTag;
    let statusText;
    let xml;
    const c = io.config;
    try {
      // abort or complete
      if (abort || nativeXhr.readyState === 4) {
        // ie6 ActiveObject 设置不恰当属性导致出错
        if (isInstanceOfXDomainRequest(nativeXhr)) {
          nativeXhr.onerror = utils.noop;
          nativeXhr.onload = utils.noop;
        } else {
          // ie6 ActiveObject 只能设置，不能读取这个属性，否则出错！
          nativeXhr.onreadystatechange = utils.noop;
        }

        if (abort) {
          // 完成以后 abort 不要调用
          if (nativeXhr.readyState !== 4) {
            nativeXhr.abort();
          }
        } else {
          ifModifiedKey = getIfModifiedKey(c);

          let status = nativeXhr.status;

          // XDomainRequest_ 不能获取响应头
          if (!isInstanceOfXDomainRequest(nativeXhr)) {
            io.responseHeadersString = nativeXhr.getAllResponseHeaders();
          }

          if (ifModifiedKey) {
            lastModified = nativeXhr.getResponseHeader('Last-Modified');
            eTag = nativeXhr.getResponseHeader('ETag');
            // if u want to set if-modified-since manually
            // u need to save last-modified after the first request
            if (lastModified) {
              lastModifiedCached[ifModifiedKey] = lastModified;
            }
            if (eTag) {
              eTagCached[eTag] = eTag;
            }
          }

          xml = nativeXhr.responseXML;

          // Construct response list
          if (xml && xml.documentElement) {
            io.responseXML = xml;
          }

          let text = io.responseText = nativeXhr.responseText;

          // same with old-ie iframe-upload
          if (c.files && text) {
            const bodyIndex = text.indexOf('<body>');
            let lastBodyIndex;
            if (bodyIndex !== -1) {
              lastBodyIndex = text.lastIndexOf('</body>');
              if (lastBodyIndex === -1) {
                lastBodyIndex = text.length;
              }
              text = text.slice(bodyIndex + 6, lastBodyIndex);
            }
            // same with old-ie logic
            io.responseText = utils.unEscapeHtml(text);
          }

          // Firefox throws an exception when accessing
          // statusText for faulty cross-domain requests
          try {
            statusText = nativeXhr.statusText;
          } catch (e) {
            // We normalize with Webkit giving an empty statusText
            statusText = '';
          }

          // Filter status for non standard behaviors
          // If the request is local and we have data: assume a success
          // (success with no data won't get notified, that's the best we
          // can do given current implementations)
          if (!status && IO.isLocal && !c.crossDomain) {
            status = io.responseText ? OK_CODE : NOT_FOUND_CODE;
            // IE - #1450: sometimes returns 1223 when it should be 204
          } else if (status === NO_CONTENT_CODE2) {
            status = NO_CONTENT_CODE;
          }
          io._ioReady(status, statusText);
        }
      }
    } catch (e) {
      console.error(e.stack || e);
      setTimeout(() => {
        throw e;
      }, 0);
      nativeXhr.onreadystatechange = utils.noop;
      if (!abort) {
        io._ioReady(-1, e.message || 'process error');
      }
    }
  },
});

export default XhrTransportBase;
