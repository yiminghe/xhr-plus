import utils from './utils';
import querystring from 'modulex-querystring';
import IO from './base';
import assign from 'object-assign';
import { OK_CODE, ERROR_CODE } from './constants';
const BREATH_INTERVAL = 30;
const iframeConverter = utils.clone(IO.getConfig().converters.text);

// https://github.com/kissyteam/kissy/issues/304
// returned data must be escaped by server for json type
// as data
// eg:
// <body>
// {
//    "&lt;a&gt;xx&lt;/a&gt;"
// }
// </body>
// text or html type is of same effect.
// same as normal ajax or html5 FileData
iframeConverter.json = str => {
  return JSON.parse(utils.unEscapeHtml(str));
};

// iframe 内的内容就是 body.innerText
IO.ajaxSetup({
  converters: {
    // iframe 到其他类型的转化和 text 一样
    iframe: iframeConverter,
    text: {
      // fake type, just mirror
      iframe(text) {
        return text;
      },
    },
    xml: {
      // fake type, just mirror
      iframe(xml) {
        return xml;
      },
    },
  },
});

/**
 * Whether has been set a custom domain.
 * Note not perfect: localhost:8888, domain='localhost'
 * @param {Window} [win] Test window. Default current window.
 * @return {Boolean}
 */
function isCustomDomain() {
  const domain = document.domain;
  const hostname = location.hostname;
  return domain !== hostname && domain !== `[${hostname}]`; // IPv6 IP support
}

/**
 * Get appropriate src for new empty iframe.
 * Consider custom domain.
 * @param {Window} [win] Window new iframe will be inserted into.
 * @return {String} Src for iframe.
 */
function getEmptyIframeSrc(win) {
  if (utils.ie && isCustomDomain()) {
    return `javascript:void(function(){
${encodeURIComponent(
  `document.open();\
document.domain="${win.document.domain}";\
document.close();`,
)}
        }())`;
  }
  return '';
}

function createIframe(xhr) {
  const id = utils.guid('io-iframe');
  // empty src, so no history
  const src = getEmptyIframeSrc();
  const iframe = (xhr.iframe = document.createElement('iframe'));
  iframe.src = src;
  iframe.name = iframe.id = id;
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.bottom = 0;
  iframe.style.width = 0;
  iframe.style.height = 0;
  iframe.style.visibility = 'hidden';
  document.documentElement.insertBefore(iframe, null);
  return iframe;
}

function addDataToForm(query, form, serializeArray) {
  const ret = [];
  let isArray;
  let i;
  let e;
  utils.each(query, (data, k) => {
    isArray = Array.isArray(data);
    if (!isArray) {
      data = [data];
    }
    // 数组和原生一样对待，创建多个同名输入域
    for (i = 0; i < data.length; i++) {
      e = document.createElement('input');
      e.type = 'hidden';
      e.name = k + (isArray && serializeArray ? '[]' : '');
      e.value = data[i];
      form.appendChild(e);
      ret.push(e);
    }
  });
  return ret;
}

function removeFieldsFromData(fields) {
  if (fields) {
    fields.forEach(f => {
      f.parentNode.removeChild(f);
    });
  }
}

function setAttrs(form, attrs) {
  for (const a in attrs) {
    if (attrs.hasOwnProperty(a)) {
      form.setAttribute(a, attrs[a]);
    }
  }
}

function callback(event) {
  const form = this.form;
  const io = this.io;
  const eventType = event.type;
  let iframeDoc;
  const iframe = io.iframe;

  // 防止重复调用 , 成功后 abort
  if (!iframe) {
    return;
  }

  // ie6 立即设置 action 设置为空导致白屏
  if (eventType === 'abort' && utils.ie === 6) {
    setTimeout(() => {
      setAttrs(form, this.attrs);
    }, 0);
  } else {
    setAttrs(form, this.attrs);
  }

  removeFieldsFromData(this.fields);

  utils.removeEvent(iframe, 'load', this._callback);
  utils.removeEvent(iframe, 'error', this._callback);

  setTimeout(() => {
    // firefox will keep loading if not set timeout
    iframe.parentNode.removeChild(iframe);
  }, BREATH_INTERVAL);

  // nullify to prevent memory leak?
  io.iframe = null;

  if (eventType === 'load') {
    try {
      iframeDoc = iframe.contentWindow.document;
      // ie<9
      if (iframeDoc && iframeDoc.body) {
        // https://github.com/kissyteam/kissy/issues/304
        io.responseText = iframeDoc.body.innerHTML;
        // ie still can retrieve xml 's responseText
        if (utils.startsWith(io.responseText, '<?xml')) {
          io.responseText = undefined;
        }
      }
      // ie<9
      // http://help.dottoro.com/ljbcjfot.php
      // http://msdn.microsoft.com/en-us/library/windows/desktop/ms766512(v=vs.85).aspx
      /*
       In Internet Explorer,
       XML documents can also be embedded into
       HTML documents with the xml HTML elements.
       To get an XMLDocument object
       that represents the embedded XML data island,
       use the XMLDocument property of the xml element.
       Note that the support for
       the XMLDocument property has been removed in Internet Explorer 9.
       */
      if (iframeDoc && iframeDoc.XMLDocument) {
        io.responseXML = iframeDoc.XMLDocument;
      } else {
        // ie9 firefox chrome
        io.responseXML = iframeDoc;
      }
      if (iframeDoc) {
        io._ioReady(OK_CODE, 'success');
      } else {
        // chrome does not throw exception:
        // Unsafe JavaScript attempt to access frame with URL upload.jss
        // from frame with URL test.html.
        // Domains, protocols and ports must match.
        // chrome will get iframeDoc to null
        // so this error is parser error to normalize all browsers
        io._ioReady(ERROR_CODE, 'parser error');
      }
    } catch (e) {
      // #245 submit to a  cross domain page except chrome
      io._ioReady(ERROR_CODE, 'parser error');
    }
  } else if (eventType === 'error') {
    io._ioReady(ERROR_CODE, 'error');
  }
}

function IframeTransport(io) {
  this.io = io;
  this._callback = callback.bind(this);
}

assign(IframeTransport.prototype, {
  send() {
    this.callBeforeSendInternal();
    const io = this.io;
    const c = io.config;
    let fields;
    let iframe;
    let query;
    const data = c.data;
    const form = c.form;

    this.attrs = {
      target: form.getAttribute('target') || '',
      action: form.getAttribute('action') || '',
      // enctype 区分 iframe 与 serialize
      encoding: form.getAttribute('encoding'),
      enctype: form.getAttribute('enctype'),
      method: form.getAttribute('method'),
    };
    this.form = form;

    iframe = createIframe(io);

    // set target to iframe to avoid main page refresh
    setAttrs(form, {
      target: iframe.id,
      action: io._getUrlForSend(),
      method: 'post',
      enctype: 'multipart/form-data',
      encoding: 'multipart/form-data',
    });

    // unparam to kv map
    if (data) {
      query = querystring.parse(data);
    }

    if (query) {
      fields = addDataToForm(query, form, !c.traditional);
    }

    this.fields = fields;

    const go = () => {
      utils.addEvent(iframe, 'load', this._callback);
      utils.addEvent(iframe, 'error', this._callback);
      form.submit();
    };

    // ie6 need a breath
    if (utils.ie === 6) {
      setTimeout(go, 0);
    } else {
      // can not setTimeout or else chrome will submit to top window
      go();
    }
  },

  abort() {
    this._callback({
      type: 'abort',
    });
  },
});

IO.setupTransport('iframe', IframeTransport);
