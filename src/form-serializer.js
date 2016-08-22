import utils from './utils';
import querystring from 'modulex-querystring/lib/querystring';
const rselectTextarea = /^(?:select|textarea)/i;
const rCRLF = /\r?\n/g;
/* eslint max-len:0 */
const rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;

function normalizeCRLF(v) {
  return v.replace(rCRLF, '\r\n');
}

// do not pass form.elements to S.makeArray ie678 bug
function elementsToArray(elements) {
  const ret = [];
  for (let i = 0; i < elements.length; i++) {
    ret.push(elements[i]);
  }
  return ret;
}

const FormSerializer = {
  /**
   * form serialization
   * @method
   * @param {HTMLElement[]|HTMLElement|Node} forms form elements
   * @return {String} serialized string represent form elements
   * @param {Boolean}[serializeArray=false]
   * @member IO
   * @static
   */
  serialize(forms, serializeArray) {
    // 名值键值对序列化,数组元素名字前不加 []
    return querystring.stringify(FormSerializer.getFormData(forms), undefined, undefined,
      serializeArray || false);
  },

  getFormData(forms) {
    let elements = [];
    const data = {};
    forms.forEach((el) => {
      // form 取其表单元素集合
      // 其他直接取自身
      const subs = el.elements ? elementsToArray(el.elements) : [el];
      elements.push.apply(elements, subs);
    });
    // 对表单元素进行过滤，具备有效值的才保留
    elements = elements.filter((el) => {
      // 有名字
      return el.name &&
        // 不被禁用
        !el.disabled &&
        (
          // radio,checkbox 被选择了
          el.checked ||
          // select 或者 textarea
          rselectTextarea.test(el.nodeName) ||
          // input 类型
          rinput.test(el.type)
        );

      // 这样子才取值
    });
    elements.forEach((el) => {
      let val = el.value;
      let vs;

      // <select></select> select nothing!
      // #297
      if (val === null) {
        return;
      }

      // 字符串换行平台归一化
      if (Array.isArray(val)) {
        val = val.map(normalizeCRLF);
      } else {
        val = normalizeCRLF(val);
      }

      vs = data[el.name];
      if (vs === undefined) {
        data[el.name] = val;
        return;
      }
      if (!Array.isArray(vs)) {
        // 多个元素重名时搞成数组
        vs = data[el.name] = [vs];
      }
      vs.push.apply(vs, utils.makeArray(val));
    });
    return data;
  },
};

module.exports = FormSerializer;
