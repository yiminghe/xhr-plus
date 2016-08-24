import IO from './base';
import querystring from 'modulex-querystring';
import assign from 'object-assign';
import FormSerializer from './form-serializer';

const slice = Array.prototype.slice;

IO.addPreprocessor('start', (e) => {
  const { FormData } = window;
  const io = e.io;
  let d;
  let type;
  let formParam;
  let data;
  const c = io.config;
  const form = c.form;
  const useIframeUpload = c.useIframeUpload || !FormData;

  // serialize form if needed
  if (form) {
    data = c.data;
    let isUpload = false;
    const files = {};
    const inputs = form.getElementsByTagName('input');
    for (let i = 0, l = inputs.length; i < l; i++) {
      const input = inputs[i];
      if (input.type.toLowerCase() === 'file') {
        isUpload = true;
        if (useIframeUpload) {
          break;
        }
        const selected = slice.call(input.files, 0);
        files[input.getAttribute('name')] = selected.length > 1 ? selected : (selected[0] || null);
      }
    }

    if (isUpload && !useIframeUpload) {
      c.files = c.files || {};
      assign(c.files, files);
      // browser set contentType automatically for FileData
      delete c.contentType;
    }
    // 上传有其他方法
    if (!isUpload || !useIframeUpload) {
      // when get need encode
      // when FormData exists, only collect non-file type input
      formParam = FormSerializer.getFormData(form);
      if (c.hasContent) {
        formParam = querystring.stringify(formParam, undefined, undefined, !c.traditional);
        if (data) {
          c.data += `&${formParam}`;
        } else {
          c.data = formParam;
        }
      } else {
        // get 直接加到 url
        assign(c.uri.query, formParam);
      }
    } else {
      // for old-ie
      type = c.type;
      d = type[0];
      if (d === '*') {
        d = 'text';
      }
      type.length = 2;
      type[0] = 'iframe';
      type[1] = d;
    }
  }
});
