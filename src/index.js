import io from './base';
import './xhr-transport';
import './script-transport';
import './jsonp';
import './form';
import './iframe-transport';
import './methods';
import FormSerializer from './form-serializer';
import url from 'modulex-url';
import querystring from 'modulex-querystring';

io.serialize = FormSerializer.serialize;
io.getFormData = FormSerializer.getFormData;
io.url = url;
io.querystring = querystring;

export default io;
