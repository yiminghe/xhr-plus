/* eslint no-nested-ternary:0, no-use-before-define:0 */
import assign from 'object-assign';
const CLONE_MARKER = '__~ks_cloned';
const MIX_CIRCULAR_DETECTION = '__MIX_CIRCULAR';
let guid = 0;
const EMPTY = '';
const RE_NOT_WHITESPACE = /\S/;

function isValidParamValue(val) {
  const t = typeof val;
  // If the type of val is null, undefined, number, string, boolean, return TRUE.
  return (
    val === null || val === undefined || (t !== 'object' && t !== 'function')
  );
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function _mix(p, r, s, ov, wl, deep, cache, structured) {
  // 要求覆盖
  // 或者目的不存在
  // 或者深度mix
  if (ov || !(p in r) || deep) {
    const target = r[p];
    let src = s[p];
    // prevent never-end loop
    if (target === src) {
      if (target === undefined) {
        r[p] = target;
      }
      return;
    }
    if (wl) {
      src = wl.call(s, p, src);
    }
    // 来源是数组和对象，并且要求深度 mix
    if (deep && src && (Array.isArray(src) || isObject(src))) {
      if (structured && src[MIX_CIRCULAR_DETECTION]) {
        r[p] = src[MIX_CIRCULAR_DETECTION];
      } else {
        // 目标值为对象或数组，直接 mix
        // 否则 新建一个和源值类型一样的空数组/对象，递归 mix
        const clone =
          target && (Array.isArray(target) || isObject(target))
            ? target
            : Array.isArray(src)
            ? []
            : {};
        r[p] = clone;
        mixInternal(clone, src, ov, wl, true, cache, structured);
      }
    } else if (src !== undefined && (ov || !(p in r))) {
      r[p] = src;
    }
  }
}

function mixInternal(r, s, ov, wl, deep, cache, structured) {
  if (!s || !r) {
    return r;
  }
  let i;
  let p;
  let keys;
  let len;

  // 记录循环标志
  s[MIX_CIRCULAR_DETECTION] = r;

  // 记录被记录了循环标志的对像
  cache.push(s);

  // mix all properties
  keys = Object.keys(s);
  len = keys.length;
  for (i = 0; i < len; i++) {
    p = keys[i];
    if (p !== MIX_CIRCULAR_DETECTION) {
      // no hasOwnProperty judge!
      _mix(p, r, s, ov, wl, deep, cache, structured);
    }
  }

  return r;
}

function cloneInternal(input, f, memory, structured) {
  let destination = input;
  const isArray = Array.isArray(input);
  let k;
  let stamp;

  if (!input) {
    return destination;
  }

  // If input is the source object of a pair of objects in memory,
  // then return the destination object in that pair of objects .
  // and abort these steps.
  if (structured && input[CLONE_MARKER]) {
    // 对应的克隆后对象
    return memory[input[CLONE_MARKER]].destination;
  } else if (isObject(input)) {
    // 引用类型要先记录
    const Constructor = input.constructor;
    if ([Boolean, String, Number, Date, RegExp].indexOf(Constructor) !== -1) {
      destination = new Constructor(input.valueOf());
    } else if (isArray) {
      // ImageData , File, Blob , FileList .. etc
      destination = f ? input.filter(f) : input.concat();
    } else {
      destination = {};
    }
    if (structured) {
      // Add a mapping from input (the source object)
      // to output (the destination object) to memory.
      // 做标记
      // stamp can not be
      input[CLONE_MARKER] = stamp = utils.guid('c');
      // 存储源对象以及克隆后的对象
      memory[stamp] = { destination, input };
    }
  }
  // If input is an Array object or an Object object,
  // then, for each enumerable property in input,
  // add a new property to output having the same name,
  // and having a value created from invoking the internal structured cloning algorithm recursively
  // with the value of the property as the 'input' argument and memory as the 'memory' argument.
  // The order of the properties in the input and output objects must be the same.

  // clone it
  if (isArray) {
    for (let i = 0; i < destination.length; i++) {
      destination[i] = cloneInternal(destination[i], f, memory, structured);
    }
  } else if (isObject(input)) {
    for (k in input) {
      if (
        k !== CLONE_MARKER &&
        (!f || f.call(input, input[k], k, input) !== false)
      ) {
        destination[k] = cloneInternal(input[k], f, memory, structured);
      }
    }
  }

  return destination;
}

// http://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
// http://wonko.com/post/html-escaping
const htmlEntities = {
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&#x60;': '`',
  '&#x2F;': '/',
  '&quot;': '"',
  '&#x27;': `'`,
};
const reverseEntities = {};
let escapeHtmlReg;
let unEscapeHtmlReg;
const possibleEscapeHtmlReg = /[&<>"'`]/;
// - # $ ^ * ( ) + [ ] { } | \ , . ?
const escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;

for (const k in htmlEntities) {
  if (htmlEntities.hasOwnProperty(k)) {
    reverseEntities[htmlEntities[k]] = k;
  }
}

escapeHtmlReg = getEscapeReg();
unEscapeHtmlReg = getUnEscapeReg();

function getEscapeReg() {
  let str = EMPTY;
  for (const e in htmlEntities) {
    if (htmlEntities.hasOwnProperty(e)) {
      str += `${htmlEntities[e]}|`;
    }
  }
  str = str.slice(0, -1);
  escapeHtmlReg = new RegExp(str, 'g');
  return escapeHtmlReg;
}

function getUnEscapeReg() {
  let str = EMPTY;
  for (const e in reverseEntities) {
    if (reverseEntities.hasOwnProperty(e)) {
      str += `${reverseEntities[e]}|`;
    }
  }
  str += '&#(\\d{1,5});';
  unEscapeHtmlReg = new RegExp(str, 'g');
  return unEscapeHtmlReg;
}

const utils = {
  addEvent(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, false);
    } else if (el.attachEvent) {
      el.attachEvent(`on${type}`, callback);
    }
  },
  removeEvent(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, false);
    } else if (el.detachEvent) {
      el.detachEvent(`on${type}`, callback);
    }
  },
  parseXml(data) {
    // already a xml
    if (data.documentElement) {
      return data;
    }
    let xml;
    // Standard
    if (window.DOMParser) {
      xml = new DOMParser().parseFromString(data, 'text/xml');
    } else {
      // IE
      xml = new window.ActiveXObject('Microsoft.XMLDOM');
      xml.async = false;
      xml.loadXML(data);
    }
    if (
      !xml ||
      !xml.documentElement ||
      xml.getElementsByTagName('parsererror').length
    ) {
      throw new Error(`Invalid XML: ${data}`);
    }
    return xml;
  },
  mix(r, s, ov, wl, deep) {
    let structured;
    if (typeof ov === 'object') {
      wl = ov.whitelist;
      deep = ov.deep;
      structured = ov.structured;
      ov = ov.overwrite;
    }

    if (wl && typeof wl !== 'function') {
      const originalWl = wl;
      wl = (name, val) => {
        return originalWl.indexOf(name) !== -1 ? val : undefined;
      };
    }

    if (ov === undefined) {
      ov = true;
    }

    if (structured === undefined) {
      structured = true;
    }

    const cache = [];
    let i = 0;
    let c;
    mixInternal(r, s, ov, wl, deep, cache, structured);
    /* eslint no-cond-assign:0 */
    while ((c = cache[i++])) {
      delete c[MIX_CIRCULAR_DETECTION];
    }
    return r;
  },
  /**
   * Creates a deep copy of a plain object or array. Others are returned untouched.
   * @param input
   * @member utils
   * @param {Function} [filter] filter function
   * @return {Object} the new cloned object
   * refer: http://www.w3.org/TR/html5/common-dom-interfaces.html#safe-passing-of-structured-data
   */
  clone(input, filter) {
    // 稍微改改就和规范一样了 :)
    // Let memory be an association list of pairs of objects,
    // initially empty. This is used to handle duplicate references.
    // In each pair of objects, one is called the source object
    // and the other the destination object.
    let structured;
    if (typeof filter === 'object') {
      structured = filter.structured;
      filter = filter.filter;
    }
    if (structured === undefined) {
      structured = true;
    }
    let memory;
    if (structured) {
      memory = {};
    }
    const ret = cloneInternal(input, filter, memory, structured);
    if (structured) {
      utils.each(memory, v_ => {
        // 清理在源对象上做的标记
        const v = v_.input;
        if (v[CLONE_MARKER]) {
          try {
            delete v[CLONE_MARKER];
          } catch (e) {
            v[CLONE_MARKER] = undefined;
          }
        }
      });
    }
    memory = null;
    return ret;
  },
  guid(pre) {
    return (pre || EMPTY) + guid++;
  },
  makeArray(o) {
    if (o === undefined || o === null) {
      return [];
    }
    if (Array.isArray(o)) {
      return o;
    }
    const lengthType = typeof o.length;
    const oType = typeof o;
    // The strings and functions also have 'length'
    if (
      lengthType !== 'number' ||
      // select element
      // https://github.com/kissyteam/kissy/issues/537
      typeof o.nodeName === 'string' ||
      // window
      (o !== null && o === o.window) ||
      oType === 'string' ||
      // https://github.com/ariya/phantomjs/issues/11478
      (oType === 'function' && !('item' in o && lengthType === 'number'))
    ) {
      return [o];
    }
    const ret = [];
    for (let i = 0, l = o.length; i < l; i++) {
      ret[i] = o[i];
    }
    return ret;
  },
  /**
   * test whether a string start with a specified substring
   * @param {String} str the whole string
   * @param {String} prefix a specified substring
   * @return {Boolean} whether str start with prefix
   * @member utils
   */
  startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  },

  /**
   * test whether a string end with a specified substring
   * @param {String} str the whole string
   * @param {String} suffix a specified substring
   * @return {Boolean} whether str end with suffix
   * @member utils
   */
  endsWith(str, suffix) {
    const ind = str.length - suffix.length;
    return ind >= 0 && str.indexOf(suffix, ind) === ind;
  },
  /**
   * get escaped string from html.
   * only escape
   *      & > < ` / " '
   * refer:
   *
   * [http://yiminghe.javaeye.com/blog/788929](http://yiminghe.javaeye.com/blog/788929)
   *
   * [http://wonko.com/post/html-escaping](http://wonko.com/post/html-escaping)
   * @param str {string} text2html show
   * @member utils
   * @return {String} escaped html
   */
  escapeHtml(str) {
    if (!str && str !== 0) {
      return '';
    }
    str = String(str);
    if (!possibleEscapeHtmlReg.test(str)) {
      return str;
    }
    return str.replace(escapeHtmlReg, m => {
      return reverseEntities[m];
    });
  },

  /**
   * get escaped regexp string for construct regexp.
   * @param str
   * @member utils
   * @return {String} escaped regexp
   */
  escapeRegExp(str) {
    return str.replace(escapeRegExp, '\\$&');
  },

  /**
   * un-escape html to string.
   * only unescape
   *      &amp; &lt; &gt; &#x60; &#x2F; &quot; &#x27; &#\d{1,5}
   * @param str {string} html2text
   * @member utils
   * @return {String} un-escaped html
   */
  unEscapeHtml(str) {
    return str.replace(unEscapeHtmlReg, (m, n) => {
      return htmlEntities[m] || String.fromCharCode(+n);
    });
  },

  extend(Child, Parent, members) {
    function Noop() {}

    Noop.prototype = Parent.prototype;
    Child.prototype = new Noop();
    Child.prototype.constructor = Child;
    assign(Child.prototype, members);
  },
  globalEval(data) {
    if (data && RE_NOT_WHITESPACE.test(data)) {
      // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
      // http://msdn.microsoft.com/en-us/library/ie/ms536420(v=vs.85).aspx always return null
      if (window.execScript) {
        window.execScript(data);
      } else {
        (d => {
          window.eval.call(window, d);
        })(data);
      }
    }
  },
  noop() {},
  isEmptyObject(obj) {
    return !obj || !Object.keys(obj).length;
  },
  inArray(needle, arr) {
    return arr.indexOf(needle) !== -1;
  },
  formatQuery(o, sep, eq, serializeArray) {
    sep = sep || '&';
    eq = eq || '=';
    if (serializeArray === undefined) {
      serializeArray = true;
    }
    const buf = [];
    let key;
    let i;
    let v;
    let len;
    let val;
    for (key in o) {
      if (o.hasOwnProperty(key)) {
        val = o[key];
        const originalKey = key;
        key = encodeURIComponent(key);

        // val is valid non-array value
        if (isValidParamValue(val)) {
          buf.push(key);
          if (val !== undefined) {
            buf.push(eq, encodeURIComponent(val + EMPTY));
          }
          buf.push(sep);
        } else if (Array.isArray(val)) {
          // val is not empty array
          for (i = 0, len = val.length; i < len; ++i) {
            v = val[i];
            if (isValidParamValue(v)) {
              buf.push(
                key,
                serializeArray && originalKey.slice(0 - 2) !== '[]'
                  ? encodeURIComponent('[]')
                  : EMPTY,
              );
              if (v !== undefined) {
                buf.push(eq, encodeURIComponent(v + EMPTY));
              }
              buf.push(sep);
            }
          }
        }
      }
    }
    buf.pop();
    return buf.join(EMPTY);
  },
  each(obj, callback) {
    if (Array.isArray(obj)) {
      obj.forEach(callback);
    } else {
      Object.keys(obj).forEach(k => {
        callback(obj[k], k);
      });
    }
  },
};

function numberify(s) {
  let c = 0;
  // convert '1.2.3.4' to 1.234
  return parseFloat(
    s.replace(/\./g, () => {
      return c++ === 0 ? '.' : '';
    }),
  );
}

let m;
let v;
const ua = (window.navigator || {}).userAgent || '';
if (
  (m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&
  (v = m[1] || m[2])
) {
  utils.ie = numberify(v);
  utils.ieMode = document.documentMode || utils.ie;
}

export default utils;
