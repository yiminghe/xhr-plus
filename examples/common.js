/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		3:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"export","1":"proxy","2":"simple"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	__webpack_require__(11);
	
	__webpack_require__(15);
	
	__webpack_require__(16);
	
	__webpack_require__(17);
	
	__webpack_require__(19);
	
	__webpack_require__(20);
	
	var _formSerializer = __webpack_require__(18);
	
	var _formSerializer2 = _interopRequireDefault(_formSerializer);
	
	var _modulexUrl = __webpack_require__(8);
	
	var _modulexUrl2 = _interopRequireDefault(_modulexUrl);
	
	var _modulexQuerystring = __webpack_require__(7);
	
	var _modulexQuerystring2 = _interopRequireDefault(_modulexQuerystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_base2.default.serialize = _formSerializer2.default.serialize;
	_base2.default.getFormData = _formSerializer2.default.getFormData;
	_base2.default.url = _modulexUrl2.default;
	_base2.default.querystring = _modulexQuerystring2.default;
	
	exports.default = _base2.default;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint no-console:0 */
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _modulexQuerystring = __webpack_require__(7);
	
	var _modulexQuerystring2 = _interopRequireDefault(_modulexQuerystring);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _modulexUrl = __webpack_require__(8);
	
	var _modulexUrl2 = _interopRequireDefault(_modulexUrl);
	
	var _chainPromise = __webpack_require__(10);
	
	var _chainPromise2 = _interopRequireDefault(_chainPromise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/;
	var rspace = /\s+/;
	function mirror(s) {
	  return s;
	}
	var rnoContent = /^(?:GET|HEAD)$/;
	var locationHref = (typeof location === 'undefined' ? 'undefined' : _typeof(location)) !== undefined ? location.href : null;
	var locationUrl = locationHref && _modulexUrl2.default.parse(locationHref);
	var isLocal = rlocalProtocol.test(locationUrl.protocol);
	var transports = {};
	var defaultConfig = {
	  method: 'GET',
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	  async: true,
	  traditional: false,
	  processData: true,
	  accepts: {
	    xml: 'application/xml, text/xml',
	    html: 'text/html',
	    text: 'text/plain',
	    json: 'application/json, text/javascript',
	    '*': '*/*'
	  },
	  converters: {
	    text: {
	      json: JSON.parse,
	      html: mirror,
	      text: mirror,
	      xml: _utils2.default.parseXML
	    }
	  },
	  headers: {
	    'X-Requested-With': 'XMLHttpRequest'
	  },
	  contents: {
	    xml: /xml/,
	    html: /html/,
	    json: /json/
	  }
	};
	
	defaultConfig.converters.html = defaultConfig.converters.text;
	
	function ajaxSetup(c) {
	  // deep mix,exclude context!
	  var context = c.context;
	  delete c.context;
	  c = _utils2.default.mix(_utils2.default.clone(defaultConfig), c, {
	    deep: true
	  });
	  c.context = context || c;
	
	  var data = c.data;
	  var uri = void 0;
	  var method = c.method;
	  var type = c.type;
	
	  uri = c.uri = _modulexUrl2.default.parse(_modulexUrl2.default.resolve(locationHref, c.url), true);
	
	  // see method _getUrlForSend
	  uri.query = {};
	
	  if (!('crossDomain' in c)) {
	    c.crossDomain = !(uri.protocol === locationUrl.protocol && uri.host === locationUrl.host);
	  }
	
	  method = c.method = method.toUpperCase();
	  c.hasContent = !rnoContent.test(method);
	
	  if (c.processData && typeof data !== 'string') {
	    // normalize to string
	    c.data = _modulexQuerystring2.default.stringify(data, undefined, undefined, !c.traditional);
	  }
	
	  // 数据类型处理链，一步步将前面的数据类型转化成最后一个
	  type = c.type = (type || '*').trim().split(rspace);
	
	  if (!('cache' in c) && ['script', 'jsonp'].indexOf(type[0]) !== -1) {
	    c.cache = false;
	  }
	
	  if (!c.hasContent) {
	    if (c.data) {
	      (0, _objectAssign2.default)(uri.query, _modulexQuerystring2.default.parse(c.data));
	    }
	    if (c.cache === false) {
	      uri.query._ksTS = Date.now() + '_' + _utils2.default.guid();
	    }
	  }
	  return c;
	}
	
	var requestInterceptors = [];
	var responseInterceptors = [];
	
	function useRequest(config, error) {
	  var interceptor = {
	    config: config,
	    error: error
	  };
	  requestInterceptors.push(interceptor);
	  return interceptor;
	}
	
	function useResponse(success, error) {
	  var interceptor = {
	    success: success,
	    error: error
	  };
	  responseInterceptors.push(interceptor);
	  return interceptor;
	}
	
	function ejectRequest(interceptor) {
	  var index = requestInterceptors.indexOf(interceptor);
	  if (index !== -1) {
	    requestInterceptors.splice(index, 1);
	  }
	}
	
	function ejectResponse(interceptor) {
	  var index = responseInterceptors.indexOf(interceptor);
	  if (index !== -1) {
	    responseInterceptors.splice(index, 1);
	  }
	}
	
	/**
	 *
	 * @cfg {String} url
	 * request destination
	 *
	 * @cfg {String} method request method.
	 * eg: 'get','post'
	 * Default to: 'get'
	 *
	 * @cfg {String} contentType
	 * Default to: 'application/x-www-form-urlencoded; charset=UTF-8'
	 * Data will always be transmitted to the server using UTF-8 charset
	 *
	 * @cfg {Object} accepts
	 * Default to: depends on type.
	 * The content type sent in request header that tells the server
	 * what kind of response it will accept in return.
	 * It is recommended to do so once in the {@link IO#method-ajaxSetup}
	 *
	 * @cfg {Boolean} async
	 * Default to: true
	 * whether request is sent asynchronously
	 *
	 * @cfg {Boolean} cache
	 * Default to: true ,false for type 'script' and 'jsonp'
	 * if set false,will append _ksTs=Date.now() to url automatically
	 *
	 * @cfg {Object} contents
	 * a name-regexp map to determine request data's type
	 * It is recommended to do so once in the {@link IO#method-ajaxSetup}
	 *
	 * @cfg {Object} context
	 * specify the context of this request 's callback (success,error,complete)
	 *
	 * @cfg {Object} converters
	 * Default to: {text:{json:Json.parse,html:mirror,text:mirror,xml:parseXML}}
	 * specified how to transform one type to another type
	 * It is recommended to do so once in the {@link IO#method-ajaxSetup}
	 *
	 * @cfg {Boolean} crossDomain
	 * Default to: false for same-domain request,true for cross-domain request
	 * if server-side jsonp redirect to another domain, you should set this to true.
	 * if you want use script for jsonp for same domain request, you should set this to true.
	 *
	 * @cfg {Object} data
	 * Data sent to server.if processData is true,data will be serialized to String type.
	 * if value is an Array, serialization will be based on traditional.
	 *
	 * @cfg {String} type
	 * return data as a specified type
	 * Default to: Based on server contentType header
	 * 'xml' : a XML document
	 * 'text'/'html': raw server data
	 * 'script': evaluate the return data as script
	 * 'json': parse the return data as json and return the result as final data
	 * 'jsonp': load json data via jsonp
	 *
	 * @cfg {Object} headers
	 * additional name-value header to send along with this request.
	 *
	 * @cfg {String} jsonp
	 * Default to: 'callback'
	 * Override the callback function name in a jsonp request. eg:
	 * set 'callback2' , then jsonp url will append  'callback2=?'.
	 *
	 * @cfg {String} jsonpCallback
	 * Specify the callback function name for a jsonp request.
	 * set this value will replace the auto generated function name.
	 * eg:
	 * set 'customCall' , then jsonp url will append 'callback=customCall'
	 *
	 * @cfg {String} mimeType
	 * override xhr 's mime type
	 *
	 * @cfg {String} ifModified
	 * whether enter if modified mode.
	 * Defaults to false.
	 *
	 * @cfg {Boolean} processData
	 * Default to: true
	 * whether data will be serialized as String
	 *
	 * @cfg {String} scriptCharset
	 * only for type 'jsonp' and 'script' and 'get' type.
	 * force the script to certain charset.
	 *
	 * @cfg {Function} beforeSend
	 * beforeSend(io,config)
	 * callback function called before the request is sent.this function has 2 arguments
	 *
	 * 1. current io object
	 *
	 * 2. current io config
	 *
	 * note: can be used for add progress event listener for native xhr's upload attribute
	 * see <a href='http://www.w3.org/TR/XMLHttpRequest/#event-xhr-progress'>XMLHttpRequest2</a>
	 *
	 * @cfg {Function} success
	 * success(data,textStatus,xhr)
	 * callback function called if the request succeeds.this function has 3 arguments
	 *
	 * 1. data returned from this request with type specified by type
	 *
	 * 2. status of this request with type String
	 *
	 * 3. io object of this request , for details {@link IO}
	 *
	 * @cfg {Function} error
	 * success(data,textStatus,xhr)
	 * callback function called if the request occurs error.this function has 3 arguments
	 *
	 * 1. null value
	 *
	 * 2. status of this request with type String,such as 'timeout','Not Found','parsererror:...'
	 *
	 * 3. io object of this request , for details {@link IO}
	 *
	 * @cfg {Function} complete
	 * success(data,textStatus,xhr)
	 * callback function called if the request finished(success or error).this function has 3 arguments
	 *
	 * 1. null value if error occurs or data returned from server
	 *
	 * 2. status of this request with type String,such as success:'ok',
	 * error:'timeout','Not Found','parsererror:...'
	 *
	 * 3. io object of this request , for details {@link IO}
	 *
	 * @cfg {Number} timeout
	 * Set a timeout(in seconds) for this request.if will call error when timeout
	 *
	 * @cfg {Boolean} traditional
	 * whether not to add [] to data's name when data's value is array in serialization
	 *
	 * @cfg {Object} xhrFields
	 * name-value to set to native xhr.set as xhrFields:{withCredentials:true}
	 * note: withCredentials defaults to true.
	 *
	 * @cfg {String} username
	 * a username tobe used in response to HTTP access authentication request
	 *
	 * @cfg {String} password
	 * a password tobe used in response to HTTP access authentication request
	 *
	 * @cfg {String} subDomainProxy
	 * 'force': use proxy for sub domain request even browser supports cors
	 * 'auto': only use proxy for sub domain request browser does not support cors.
	 * default to '': do not use.
	 *
	 * @cfg {String} subDomainProxyUrl
	 * proxy page, eg:
	 * a.t.cn/a.htm send request to b.t.cn/b.htm:
	 *
	 * 1. a.htm set <code> document.domain='t.cn' </code>
	 *
	 * 2. b.t.cn/proxy.htm 's content is <code> &lt;script>document.domain='t.cn'&lt;/script> </code>
	 *
	 * 3. in a.htm , call <code> IO({xdr:{subDomain:{proxy:'/proxy.htm'}}}) </code>
	 *
	 */
	function IO(config) {
	  var _this = this;
	
	  if (!(this instanceof IO)) {
	    return new IO(config);
	  }
	
	  (0, _chainPromise2.default)(requestInterceptors.map(function (interceptor) {
	    return interceptor.config;
	  }), config, function (_, c) {
	    _this.userConfig = c;
	
	    c = ajaxSetup(c);
	
	    (0, _objectAssign2.default)(_this, {
	      // 结构化数据，如 json
	      responseData: null,
	      /**
	       * config of current IO instance.
	       * @member IO
	       * @property config
	       * @type Object
	       */
	      config: c || {},
	      timeoutTimer: null,
	
	      /**
	       * String typed data returned from server
	       * @type String
	       */
	      responseText: null,
	      /**
	       * xml typed data returned from server
	       * @type String
	       */
	      responseXML: null,
	      responseHeadersString: '',
	      responseHeaders: null,
	      requestHeaders: {},
	      /**
	       * readyState of current request
	       * 0: initialized
	       * 1: send
	       * 4: completed
	       * @type Number
	       */
	      readyState: 0,
	      state: 0,
	      /**
	       * HTTP statusText of current request
	       * @type String
	       */
	      statusText: null,
	      /**
	       * HTTP Status Code of current request
	       * eg:
	       * 200: ok
	       * 404: Not Found
	       * 500: Server Error
	       * @type String
	       */
	      status: 0,
	      transport: null
	    });
	
	    var TransportConstructor = void 0;
	    var transport = void 0;
	
	    /**
	     * fired before generating request object
	     * @event start
	     * @member IO
	     * @static
	     * @param {IO} e.io current io
	     */
	    IO.callPreprocessors('start', {
	      io: _this
	    });
	    IO.fire('start', {
	      io: _this
	    });
	
	    TransportConstructor = transports[c.type[0]] || transports['*'];
	    transport = new TransportConstructor(_this);
	
	    _this.transport = transport;
	
	    if (c.contentType) {
	      _this.setRequestHeader('Content-Type', c.contentType);
	    }
	
	    var type = c.type[0];
	    var i = void 0;
	    var timeout = c.timeout;
	    var context = c.context;
	    var headers = c.headers;
	    var accepts = c.accepts;
	
	    // Set the Accepts header for the server, depending on the type
	    _this.setRequestHeader('Accept', type && accepts[type] ? accepts[type] + (type === '*' ? '' : ', */*; q=0.01') : accepts['*']);
	
	    // Check for headers option
	    for (i in headers) {
	      if (headers.hasOwnProperty(i)) {
	        _this.setRequestHeader(i, headers[i]);
	      }
	    }
	
	    // allow setup native listener
	    // such as xhr.upload.addEventListener('progress', function (ev) {})
	    if (c.beforeSend && c.beforeSend.call(context, _this, c) === false) {
	      return _this;
	    }
	
	    _this.readyState = 1;
	
	    /**
	     * fired before sending request
	     * @event send
	     * @member IO
	     * @static
	     * @param {IO} e.io current io
	     */
	    IO.callPreprocessors('send', {
	      io: _this
	    });
	    IO.fire('send', {
	      io: _this
	    });
	
	    // Timeout
	    if (c.async && timeout > 0) {
	      _this.timeoutTimer = setTimeout(function () {
	        _this.abort('timeout');
	      }, timeout * 1000);
	    }
	
	    try {
	      // flag as sending
	      _this.state = 1;
	      transport.send();
	    } catch (error) {
	      (0, _chainPromise2.default)(requestInterceptors.map(function (interceptor) {
	        return interceptor.error;
	      }), error, function (e) {
	        console.error(e.stack || e);
	        setTimeout(function () {
	          throw e;
	        }, 0);
	        // Propagate exception as error if not done
	        if (_this.state < 2) {
	          _this._ioReady(-1, e.message || 'send error');
	          // Simply rethrow otherwise
	        }
	      }, false);
	    }
	
	    return _this;
	  });
	}
	
	(0, _objectAssign2.default)(IO.prototype, {
	  getPromise: function getPromise() {
	    var _this2 = this;
	
	    if (typeof Promise === 'undefined') {
	      throw new Error('xhr-plus needs Promise polyfill in global namespace!');
	    }
	    if (!this.promise) {
	      this.promise = new Promise(function (resolve, reject) {
	        _this2.__resolve = resolve;
	        _this2.__reject = reject;
	      });
	    }
	    return this.promise;
	  },
	  then: function then(success, fail) {
	    return this.getPromise().then(success, fail);
	  },
	  always: function always(fn) {
	    return this.getPromise().then(fn, fn);
	  },
	  fail: function fail(fn) {
	    return this.getPromise().then(undefined, fn);
	  },
	  'catch': function _catch(fn) {
	    return this.fail(fn);
	  }
	});
	
	var preprocessors = {};
	var events = {};
	
	(0, _objectAssign2.default)(IO, {
	  interceptors: {
	    request: {
	      use: useRequest,
	      eject: ejectRequest
	    },
	    response: {
	      use: useResponse,
	      eject: ejectResponse
	    }
	  },
	
	  _responseInterceptors: responseInterceptors,
	
	  preprocessors: preprocessors,
	
	  events: events,
	
	  addPreprocessor: function addPreprocessor(type, callback) {
	    var callbacks = preprocessors[type] = preprocessors[type] || [];
	    callbacks.push(callback);
	    return IO;
	  },
	  callPreprocessors: function callPreprocessors(type, info) {
	    var callbacks = (preprocessors[type] || []).concat();
	    for (var i = 0, l = callbacks.length; i < l; i++) {
	      callbacks[i].call(IO, info);
	    }
	  },
	  on: function on(type, callback) {
	    var callbacks = events[type] = events[type] || [];
	    callbacks.push(callback);
	    return IO;
	  },
	  detach: function detach(type, callback) {
	    if (callback) {
	      var list = events[type];
	      if (list) {
	        var index = list.indexOf(callback);
	        if (index !== -1) {
	          list.splice(index, 1);
	        }
	      }
	    } else {
	      events[type] = [];
	    }
	  },
	  fire: function fire(type, info) {
	    var callbacks = (events[type] || []).concat();
	    info = info || {};
	    info.type = type;
	    info.target = info.currentTarget = IO;
	    for (var i = 0, l = callbacks.length; i < l; i++) {
	      callbacks[i].call(IO, info);
	    }
	  },
	
	
	  /**
	   * whether current application is a local application
	   * (protocol is file://,widget://,about://)
	   * @type {Boolean}
	   * @member IO
	   * @static
	   */
	  isLocal: isLocal,
	  /**
	   * name-value object that set default config value for io class
	   * @param {Object} setting
	   * @member IO
	   * @static
	   */
	  ajaxSetup: function ajaxSetup(setting) {
	    _utils2.default.mix(defaultConfig, setting, {
	      deep: true
	    });
	  },
	
	  /**
	   * @private
	   * @member IO
	   * @static
	   */
	  setupTransport: function setupTransport(name, fn) {
	    transports[name] = fn;
	  },
	
	  /**
	   * @private
	   * @member IO
	   * @static
	   */
	  getTransport: function getTransport(name) {
	    return transports[name];
	  },
	
	  /**
	   * get default config value for io request
	   * @return {Object}
	   * @member IO
	   * @static
	   */
	  getConfig: function getConfig() {
	    return defaultConfig;
	  }
	});
	
	exports.default = IO;
	
	/*
	 // !TODO
	 // 去除 event/custom 依赖，用户不载入就不能监听
	 // 载入后通过 custom.on(IO,type) 监听

	 2014-06-09 yiminghe@gmail.com
	 - refactor by url module

	 2012-08-16
	 - transform IO to class, remove XhrObject class.
	 - support ifModified
	 - http://bugs.jquery.com/ticket/8394
	 - http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	 - https://github.com/kissyteam/kissy/issues/203

	 2012-07-18 yiminghe@gmail.com
	 - refactor by Uri

	 2012-2-07 yiminghe@gmail.com
	 - 返回 Promise 类型对象，可以链式操作啦！

	 2011 yiminghe@gmail.com
	 - 借鉴 jquery，优化减少闭包使用
	 */

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint no-nested-ternary:0, no-use-before-define:0 */
	
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CLONE_MARKER = '__~ks_cloned';
	var MIX_CIRCULAR_DETECTION = '__MIX_CIRCULAR';
	var _guid = 0;
	var EMPTY = '';
	var RE_NOT_WHITESPACE = /\S/;
	
	function isValidParamValue(val) {
	  var t = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	  // If the type of val is null, undefined, number, string, boolean, return TRUE.
	  return val === null || val === undefined || t !== 'object' && t !== 'function';
	}
	
	function isObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	function _mix(p, r, s, ov, wl, deep, cache, structured) {
	  // 要求覆盖
	  // 或者目的不存在
	  // 或者深度mix
	  if (ov || !(p in r) || deep) {
	    var target = r[p];
	    var src = s[p];
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
	        var clone = target && (Array.isArray(target) || isObject(target)) ? target : Array.isArray(src) ? [] : {};
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
	  var i = void 0;
	  var p = void 0;
	  var keys = void 0;
	  var len = void 0;
	
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
	  var destination = input;
	  var isArray = Array.isArray(input);
	  var k = void 0;
	  var stamp = void 0;
	
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
	    var Constructor = input.constructor;
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
	      memory[stamp] = { destination: destination, input: input };
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
	    for (var i = 0; i < destination.length; i++) {
	      destination[i] = cloneInternal(destination[i], f, memory, structured);
	    }
	  } else if (isObject(input)) {
	    for (k in input) {
	      if (k !== CLONE_MARKER && (!f || f.call(input, input[k], k, input) !== false)) {
	        destination[k] = cloneInternal(input[k], f, memory, structured);
	      }
	    }
	  }
	
	  return destination;
	}
	
	// http://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
	// http://wonko.com/post/html-escaping
	var htmlEntities = {
	  '&amp;': '&',
	  '&gt;': '>',
	  '&lt;': '<',
	  '&#x60;': '`',
	  '&#x2F;': '/',
	  '&quot;': '"',
	  '&#x27;': '\''
	};
	var reverseEntities = {};
	var escapeHtmlReg = void 0;
	var unEscapeHtmlReg = void 0;
	var possibleEscapeHtmlReg = /[&<>"'`]/;
	// - # $ ^ * ( ) + [ ] { } | \ , . ?
	var _escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
	
	for (var k in htmlEntities) {
	  if (htmlEntities.hasOwnProperty(k)) {
	    reverseEntities[htmlEntities[k]] = k;
	  }
	}
	
	escapeHtmlReg = getEscapeReg();
	unEscapeHtmlReg = getUnEscapeReg();
	
	function getEscapeReg() {
	  var str = EMPTY;
	  for (var e in htmlEntities) {
	    if (htmlEntities.hasOwnProperty(e)) {
	      str += htmlEntities[e] + '|';
	    }
	  }
	  str = str.slice(0, -1);
	  escapeHtmlReg = new RegExp(str, 'g');
	  return escapeHtmlReg;
	}
	
	function getUnEscapeReg() {
	  var str = EMPTY;
	  for (var e in reverseEntities) {
	    if (reverseEntities.hasOwnProperty(e)) {
	      str += reverseEntities[e] + '|';
	    }
	  }
	  str += '&#(\\d{1,5});';
	  unEscapeHtmlReg = new RegExp(str, 'g');
	  return unEscapeHtmlReg;
	}
	
	var utils = {
	  addEvent: function addEvent(el, type, callback) {
	    if (el.addEventListener) {
	      el.addEventListener(type, callback, false);
	    } else if (el.attachEvent) {
	      el.attachEvent('on' + type, callback);
	    }
	  },
	  removeEvent: function removeEvent(el, type, callback) {
	    if (el.removeEventListener) {
	      el.removeEventListener(type, callback, false);
	    } else if (el.detachEvent) {
	      el.detachEvent('on' + type, callback);
	    }
	  },
	  parseXml: function parseXml(data) {
	    // already a xml
	    if (data.documentElement) {
	      return data;
	    }
	    var xml = void 0;
	    // Standard
	    if (window.DOMParser) {
	      xml = new DOMParser().parseFromString(data, 'text/xml');
	    } else {
	      // IE
	      xml = new window.ActiveXObject('Microsoft.XMLDOM');
	      xml.async = false;
	      xml.loadXML(data);
	    }
	    if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
	      throw new Error('Invalid XML: ' + data);
	    }
	    return xml;
	  },
	  mix: function mix(r, s, ov, wl, deep) {
	    var structured = void 0;
	    if ((typeof ov === 'undefined' ? 'undefined' : _typeof(ov)) === 'object') {
	      wl = ov.whitelist;
	      deep = ov.deep;
	      structured = ov.structured;
	      ov = ov.overwrite;
	    }
	
	    if (wl && typeof wl !== 'function') {
	      (function () {
	        var originalWl = wl;
	        wl = function wl(name, val) {
	          return originalWl.indexOf(name) !== -1 ? val : undefined;
	        };
	      })();
	    }
	
	    if (ov === undefined) {
	      ov = true;
	    }
	
	    if (structured === undefined) {
	      structured = true;
	    }
	
	    var cache = [];
	    var i = 0;
	    var c = void 0;
	    mixInternal(r, s, ov, wl, deep, cache, structured);
	    /* eslint no-cond-assign:0 */
	    while (c = cache[i++]) {
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
	  clone: function clone(input, filter) {
	    // 稍微改改就和规范一样了 :)
	    // Let memory be an association list of pairs of objects,
	    // initially empty. This is used to handle duplicate references.
	    // In each pair of objects, one is called the source object
	    // and the other the destination object.
	    var structured = void 0;
	    if ((typeof filter === 'undefined' ? 'undefined' : _typeof(filter)) === 'object') {
	      structured = filter.structured;
	      filter = filter.filter;
	    }
	    if (structured === undefined) {
	      structured = true;
	    }
	    var memory = void 0;
	    if (structured) {
	      memory = {};
	    }
	    var ret = cloneInternal(input, filter, memory, structured);
	    if (structured) {
	      utils.each(memory, function (v_) {
	        // 清理在源对象上做的标记
	        var v = v_.input;
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
	  guid: function guid(pre) {
	    return (pre || EMPTY) + _guid++;
	  },
	  makeArray: function makeArray(o) {
	    if (o === undefined || o === null) {
	      return [];
	    }
	    if (Array.isArray(o)) {
	      return o;
	    }
	    var lengthType = _typeof(o.length);
	    var oType = typeof o === 'undefined' ? 'undefined' : _typeof(o);
	    // The strings and functions also have 'length'
	    if (lengthType !== 'number' ||
	    // select element
	    // https://github.com/kissyteam/kissy/issues/537
	    typeof o.nodeName === 'string' ||
	    // window
	    o !== null && o === o.window || oType === 'string' ||
	    // https://github.com/ariya/phantomjs/issues/11478
	    oType === 'function' && !('item' in o && lengthType === 'number')) {
	      return [o];
	    }
	    var ret = [];
	    for (var i = 0, l = o.length; i < l; i++) {
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
	  startsWith: function startsWith(str, prefix) {
	    return str.lastIndexOf(prefix, 0) === 0;
	  },
	
	
	  /**
	   * test whether a string end with a specified substring
	   * @param {String} str the whole string
	   * @param {String} suffix a specified substring
	   * @return {Boolean} whether str end with suffix
	   * @member utils
	   */
	  endsWith: function endsWith(str, suffix) {
	    var ind = str.length - suffix.length;
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
	  escapeHtml: function escapeHtml(str) {
	    if (!str && str !== 0) {
	      return '';
	    }
	    str = String(str);
	    if (!possibleEscapeHtmlReg.test(str)) {
	      return str;
	    }
	    return str.replace(escapeHtmlReg, function (m) {
	      return reverseEntities[m];
	    });
	  },
	
	
	  /**
	   * get escaped regexp string for construct regexp.
	   * @param str
	   * @member utils
	   * @return {String} escaped regexp
	   */
	  escapeRegExp: function escapeRegExp(str) {
	    return str.replace(_escapeRegExp, '\\$&');
	  },
	
	
	  /**
	   * un-escape html to string.
	   * only unescape
	   *      &amp; &lt; &gt; &#x60; &#x2F; &quot; &#x27; &#\d{1,5}
	   * @param str {string} html2text
	   * @member utils
	   * @return {String} un-escaped html
	   */
	  unEscapeHtml: function unEscapeHtml(str) {
	    return str.replace(unEscapeHtmlReg, function (m, n) {
	      return htmlEntities[m] || String.fromCharCode(+n);
	    });
	  },
	  extend: function extend(Child, Parent, members) {
	    function Noop() {}
	
	    Noop.prototype = Parent.prototype;
	    Child.prototype = new Noop();
	    Child.prototype.constructor = Child;
	    (0, _objectAssign2.default)(Child.prototype, members);
	  },
	  globalEval: function globalEval(data) {
	    if (data && RE_NOT_WHITESPACE.test(data)) {
	      // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	      // http://msdn.microsoft.com/en-us/library/ie/ms536420(v=vs.85).aspx always return null
	      if (window.execScript) {
	        window.execScript(data);
	      } else {
	        (function (d) {
	          window.eval.call(window, d);
	        })(data);
	      }
	    }
	  },
	  noop: function noop() {},
	  isEmptyObject: function isEmptyObject(obj) {
	    return !obj || !Object.keys(obj).length;
	  },
	  inArray: function inArray(needle, arr) {
	    return arr.indexOf(needle) !== -1;
	  },
	  formatQuery: function formatQuery(o, sep, eq, serializeArray) {
	    sep = sep || '&';
	    eq = eq || '=';
	    if (serializeArray === undefined) {
	      serializeArray = true;
	    }
	    var buf = [];
	    var key = void 0;
	    var i = void 0;
	    var v = void 0;
	    var len = void 0;
	    var val = void 0;
	    for (key in o) {
	      if (o.hasOwnProperty(key)) {
	        val = o[key];
	        var originalKey = key;
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
	              buf.push(key, serializeArray && originalKey.slice(0 - 2) !== '[]' ? encodeURIComponent('[]') : EMPTY);
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
	  each: function each(obj, callback) {
	    if (Array.isArray(obj)) {
	      obj.forEach(callback);
	    } else {
	      Object.keys(obj).forEach(function (k) {
	        callback(obj[k], k);
	      });
	    }
	  }
	};
	
	function numberify(s) {
	  var c = 0;
	  // convert '1.2.3.4' to 1.234
	  return parseFloat(s.replace(/\./g, function () {
	    return c++ === 0 ? '.' : '';
	  }));
	}
	
	var m = void 0;
	var v = void 0;
	var ua = (window.navigator || {}).userAgent || '';
	if ((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (v = m[1] || m[2])) {
	  utils.ie = numberify(v);
	  utils.ieMode = document.documentMode || utils.ie;
	}
	
	exports.default = utils;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * utilities for dealing with query strings.
	 * conforms to nodejs api.
	 * @author yiminghe@gmail.com
	 */
	var SEP = '&',
	    EMPTY = '',
	    undef,
	    urlEncode = encodeURIComponent,
	    toString = ({}).toString,
	    EQ = '=';
	
	function isValidParamValue(val) {
	    var t = typeof val;
	    // If the type of val is null, undef, number, string, boolean, return TRUE.
	    return val == null || (t !== 'object' && t !== 'function');
	}
	
	function isArray(o) {
	    return toString.apply(o) === '[object Array]';
	}
	
	function urlDecode(s) {
	    return decodeURIComponent(s.replace(/\+/g, ' '));
	}
	
	module.exports = {
	    version: '@VERSION@',
	
	    _debug: '@DEBUG@',
	
	    /**
	     * Creates a serialized string of an array or object.
	     *
	     * for example:
	     *     @example
	     *     {foo: 1, bar: 2}    // -> 'foo=1&bar=2'
	     *     {foo: 1, bar: [2, 3]}    // -> 'foo=1&bar=2&bar=3'
	     *     {foo: '', bar: 2}    // -> 'foo=&bar=2'
	     *     {foo: undef, bar: 2}    // -> 'foo=undef&bar=2'
	     *     {foo: TRUE, bar: 2}    // -> 'foo=TRUE&bar=2'
	     *
	     * @param {Object} o json data
	     * @param {String} [sep='&'] separator between each pair of data
	     * @param {String} [eq='='] separator between key and value of data
	     * @param {Boolean} [serializeArray=true] whether add '[]' to array key of data
	     * @return {String}
	     * @member KISSY
	     */
	    stringify: function (o, sep, eq, serializeArray) {
	        sep = sep || SEP;
	        eq = eq || EQ;
	        if (serializeArray === undef) {
	            serializeArray = true;
	        }
	        var buf = [],
	            key, i, v, len, val;
	        for (key in o) {
	            val = o[key];
	            var originalKey = key;
	            key = urlEncode(key);
	
	            // val is valid non-array value
	            if (isValidParamValue(val)) {
	                buf.push(key);
	                if (val !== undef) {
	                    buf.push(eq, urlEncode(val + EMPTY));
	                }
	                buf.push(sep);
	            } else if (isArray(val)) {
	                // val is not empty array
	                for (i = 0, len = val.length; i < len; ++i) {
	                    v = val[i];
	                    if (isValidParamValue(v)) {
	                        buf.push(key, (serializeArray && (originalKey.slice(0 - 2) !== '[]') ? urlEncode('[]') : EMPTY));
	                        if (v !== undef) {
	                            buf.push(eq, urlEncode(v + EMPTY));
	                        }
	                        buf.push(sep);
	                    }
	                }
	            }
	            // ignore other cases, including empty array, Function, RegExp, Date etc.
	        }
	        buf.pop();
	        return buf.join(EMPTY);
	    },
	
	    /**
	     * Parses a URI-like query string and returns an object composed of parameter/value pairs.
	     *
	     * for example:
	     *      @example
	     *      'section=blog&id=45'        // -> {section: 'blog', id: '45'}
	     *      'section=blog&tag=js&tag=doc' // -> {section: 'blog', tag: ['js', 'doc']}
	     *      'tag=ruby%20on%20rails'        // -> {tag: 'ruby on rails'}
	     *      'id=45&raw'        // -> {id: '45', raw: ''}
	     * @param {String} str param string
	     * @param {String} [sep='&'] separator between each pair of data
	     * @param {String} [eq='='] separator between key and value of data
	     * @return {Object} json data
	     * @member KISSY
	     */
	    parse: function (str, sep, eq) {
	        sep = sep || SEP;
	        eq = eq || EQ;
	        var ret = {},
	            eqIndex, key, val,
	            pairs = str.split(sep),
	            i = 0, len = pairs.length;
	
	        for (; i < len; ++i) {
	            eqIndex = pairs[i].indexOf(eq);
	            if (eqIndex === -1) {
	                key = urlDecode(pairs[i]);
	                val = undef;
	            } else {
	                // remember to decode key!
	                key = urlDecode(pairs[i].substring(0, eqIndex));
	                val = pairs[i].substring(eqIndex + 1);
	                try {
	                    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
	                    val = urlDecode(val);
	                } catch (e) {
	                    console.error('decodeURIComponent error : ' + val);
	                    console.error(e);
	                }
	
	                if (key.slice(0 - 2) === '[]') {
	                    key = key.slice(0, 0 - 2);
	                }
	            }
	            if (key in ret) {
	                if (isArray(ret[key])) {
	                    ret[key].push(val);
	                } else {
	                    ret[key] = [ret[key], val];
	                }
	            } else {
	                ret[key] = val;
	            }
	        }
	        return ret;
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * url utilities
	 * @author yiminghe@gmail.com
	 */
	var querystring = __webpack_require__(7);
	var undef;
	var Path = __webpack_require__(9);
	var reDisallowedInProtocolOrAuth = /[#\/\?@]/g,
	    reDisallowedInPathName = /[#\?]/g,
	    reDisallowedInHash = /#/g,
	    URI_SPLIT_REG = new RegExp(
	            '^' +
	            /*
	             Scheme names consist of a sequence of characters beginning with a
	             letter and followed by any combination of letters, digits, plus
	             ('+'), period ('.'), or hyphen ('-').
	             */
	            '([\\w\\d+.-]+:)?' + // protocol
	
	            '(?://' +
	            /*
	             The authority component is preceded by a double slash ('//') and is
	             terminated by the next slash ('/'), question mark ('?'), or number
	             sign ('#') character, or by the end of the URI.
	             */
	            '(?:([^/?#@]*)@)?' + // auth
	
	            '(' +
	            '[\\w\\d\\-\\u0100-\\uffff.+%]*' +
	            '|' +
	            // ipv6
	            '\\[[^\\]]+\\]' +
	            ')' + // hostname - restrict to letters,
	            // digits, dashes, dots, percent
	            // escapes, and unicode characters.
	            '(?::([0-9]+))?' + // port
	            ')?' +
	            /*
	             The path is terminated
	             by the first question mark ('?') or number sign ('#') character, or
	             by the end of the URI.
	             */
	            '([^?#]+)?' + // pathname. hierarchical part
	            /*
	             The query component is indicated by the first question
	             mark ('?') character and terminated by a number sign ('#') character
	             or by the end of the URI.
	             */
	            '(\\?[^#]*)?' + // search. non-hierarchical data
	            /*
	             The hash identifier component of a URI allows indirect
	             identification of a secondary resource by reference to a primary
	             resource and additional identifying information.
	
	             A
	             hash identifier component is indicated by the presence of a
	             number sign ('#') character and terminated by the end of the URI.
	             */
	            '(#.*)?' + // hash
	            '$'),
	
	    REG_INFO = {
	        protocol: 1,
	        auth: 2,
	        hostname: 3,
	        port: 4,
	        pathname: 5,
	        search: 6,
	        hash: 7
	    };
	
	function needDoubleSlash(str) {
	    if (str.slice(0 - 1) === ':') {
	        str = str.slice(0, -1);
	    }
	    return str === 'http' ||
	        str === 'https' ||
	        str === 'ftp' ||
	        str === 'gopher' ||
	        str === 'file';
	}
	
	function padding2(str) {
	    return str.length === 1 ? '0' + str : str;
	}
	
	// www.ta#bao.com // => www.ta.com/#bao.com
	// www.ta%23bao.com
	// Percent-Encoding
	function encodeSpecialChars(str, specialCharsReg) {
	    // encodeURI( ) is intended to encode complete URIs,
	    // the following ASCII punctuation characters,
	    // which have special meaning in URIs, are not escaped either:
	    // ; / ? : @ & = + $ , #
	    return encodeURI(str).replace(specialCharsReg, function (m) {
	        return '%' + padding2(m.charCodeAt(0).toString(16));
	    });
	}
	
	var url = {
	    version: '@VERSION@',
	    
	    /**
	     * parse a url to a structured object
	     * @param {String} str url string
	     * @param {Boolean} [parseQueryString] whether parse query string to structured object
	     * @return {Object}
	     */
	    parse: function (str, parseQueryString) {
	        var m = str.match(URI_SPLIT_REG) || [],
	            ret = {};
	
	        // old ie 7:  return "" for unmatched regexp ...
	
	        for (var part in REG_INFO) {
	            ret[part] = m[REG_INFO[part]];
	        }
	
	        if (ret.protocol) {
	            ret.protocol = ret.protocol.toLowerCase();
	        }
	
	        if (ret.hostname) {
	            ret.hostname = ret.hostname.toLowerCase();
	        }
	
	        var protocol = ret.protocol;
	
	        if (protocol) {
	            ret.slashes = str.lastIndexOf(protocol + '//') !== -1;
	        }
	
	        // mailto: yiminghe@gmail.com
	        if (protocol && !needDoubleSlash(protocol.slice(0, -1))) {
	            if (!ret.slashes) {
	                str = str.slice(0, protocol.length) + '//' + str.slice(protocol.length);
	                ret = url.parse(str, parseQueryString);
	                ret.slashes = null;
	                return ret;
	            }
	        } else {
	            // http://www.g.cn
	            // pathname => /
	            if (ret.hostname && !ret.pathname) {
	                ret.pathname = '/';
	            }
	        }
	
	        ret.path = ret.pathname;
	        if (ret.search) {
	            ret.path += ret.search;
	        }
	        ret.host = ret.hostname;
	        if (ret.port) {
	            ret.host = ret.hostname + ':' + ret.port;
	        }
	        if (ret.search) {
	            ret.query = ret.search.substring(1);
	        }
	        if (parseQueryString && ret.query) {
	            ret.query = querystring.parse(ret.query);
	        }
	        ret.href = url.format(ret);
	        return ret;
	    },
	
	    /**
	     * Take a parsed URL object, and return a formatted URL string.
	     * @param {Object} url parsed from url.parse
	     * @param {Boolean} [serializeArray=true] whether add '[]' to array key of query data
	     */
	    format: function (url, serializeArray) {
	        var host = url.host;
	        if (host === undef && url.hostname) {
	            host = encodeURIComponent(url.hostname);
	            if (url.port) {
	                host += ':' + url.port;
	            }
	        }
	
	        var search = url.search;
	        var query = url.query;
	        if (search === undef && query !== undef) {
	            if (typeof query !== 'string') {
	                query = querystring.stringify(query, undef, undef, serializeArray);
	            }
	            if (query) {
	                search = '?' + query;
	            }
	        }
	
	        if (search && search.charAt(0) !== '?') {
	            search = '?' + search;
	        }
	
	        var hash = url.hash || '';
	        if (hash && hash.charAt(0) !== '#') {
	            hash = '#' + hash;
	        }
	
	        var pathname = url.pathname || '';
	
	        var out = [],
	            protocol, auth;
	
	        if ((protocol = url.protocol)) {
	            if (protocol.slice(0 - 1) !== ':') {
	                protocol += ':';
	            }
	
	            out.push(encodeSpecialChars(protocol, reDisallowedInProtocolOrAuth));
	        }
	
	        if (host !== undef) {
	            if (this.slashes || protocol && needDoubleSlash(protocol)) {
	                out.push('//');
	            }
	            if ((auth = url.auth)) {
	                out.push(encodeSpecialChars(auth, reDisallowedInProtocolOrAuth));
	                out.push('@');
	            }
	            out.push(host);
	        }
	
	        if (pathname) {
	            out.push(encodeSpecialChars(pathname, reDisallowedInPathName));
	        }
	
	        if (search) {
	            out.push(search);
	        }
	
	        if (hash) {
	            out.push('#' + encodeSpecialChars(hash.substring(1), reDisallowedInHash));
	        }
	
	        return out.join('');
	    },
	
	    resolve: function (from, to) {
	        var override = 0,
	            lastSlashIndex,
	            order = ['protocol', 'auth', 'host', 'pathname', 'search', 'hash'],
	            target = {};
	
	        from = url.parse(from);
	        to = url.parse(to);
	
	        for (var i = 0; i < order.length; i++) {
	            var o = order[i];
	
	            if (override) {
	                target[o] = to[o];
	                continue;
	            } else {
	                target[o] = from[o];
	            }
	
	            if (o === 'pathname') {
	                // relativeUri does not set for scheme/userInfo/hostname/port
	                var pathname = to.pathname;
	                if (pathname) {
	                    // force to override target 's query with relative
	                    override = 1;
	                    if (pathname.charAt(0) !== '/') {
	                        if (target.hostname && !target.pathname) {
	                            // RFC 3986, section 5.2.3, case 1
	                            pathname = '/' + pathname;
	                        } else if (target.pathname) {
	                            if (pathname.slice(0 - 2) === '/.' || pathname.slice(0 - 3) === '/..' ||
	                                pathname === '.' || pathname === '..') {
	                                pathname = pathname + '/';
	                            }
	                            // RFC 3986, section 5.2.3, case 2
	                            lastSlashIndex = target.pathname.lastIndexOf('/');
	                            if (lastSlashIndex !== -1) {
	                                pathname = target.pathname.slice(0, lastSlashIndex + 1) + pathname;
	                            }
	                        }
	                    }
	                    // remove .. / .  as part of the resolution process
	                    target.pathname = Path.normalize(pathname);
	                }
	            } else if (o === 'search') {
	                if (to.search) {
	                    target.search = to.search;
	                    override = 1;
	                }
	            } else if (to[o]) {
	                // protocol auth host can inherit
	                override = override || target[o] !== to[o];
	                target[o] = to[o];
	            }
	        }
	
	        return url.format(target);
	    }
	};
	
	url.stringify = url.format;
	
	module.exports = url;
	/*
	 Refer
	 - application/x-www-form-urlencoded
	 - http://www.ietf.org/rfc/rfc3986.txt
	 - http://en.wikipedia.org/wiki/URI_scheme
	 - http://unixpapa.com/js/querystring.html
	 - http://code.stephenmorley.org/javascript/parsing-query-strings-for-get-data/
	 - same origin: http://tools.ietf.org/html/rfc6454
	 */

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * @ignore
	 * Port Node Utils For KISSY.
	 * Note: Only posix mode.
	 * @author yiminghe@gmail.com
	 */
	// [root, dir, basename, ext]
	var splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;
	
	function splitPathToArray(str) {
	    var arr = str.split(/\/+/);
	    if (!arr[arr.length - 1]) {
	        arr = arr.slice(0, -1);
	    }
	    if (!arr[0]) {
	        arr = arr.slice(1);
	    }
	    return arr;
	}
	
	// Remove .. and . in path array
	function normalizeArray(parts, allowAboveRoot) {
	    // level above root
	    var up = 0,
	        i = parts.length - 1,
	    // splice costs a lot in ie
	    // use new array instead
	        newParts = [],
	        last;
	
	    for (; i >= 0; i--) {
	        last = parts[i];
	        if (last !== '.') {
	            if (last === '..') {
	                up++;
	            } else if (up) {
	                up--;
	            } else {
	                newParts[newParts.length] = last;
	            }
	        }
	    }
	
	    // if allow above root, has to add ..
	    if (allowAboveRoot) {
	        for (; up--; up) {
	            newParts[newParts.length] = '..';
	        }
	    }
	
	    newParts = newParts.reverse();
	
	    return newParts;
	}
	
	/**
	 * Path Utils For KISSY.
	 * @class KISSY.Path
	 * @singleton
	 */
	var Path = {
	    version: '@VERSION@',
	
	    _debug: '@DEBUG@',
	
	    /**
	     * resolve([from ...], to)
	     * @return {String} Resolved path.
	     */
	    resolve: function () {
	        var resolvedPath = '',
	            resolvedPathStr,
	            i,
	            args = (arguments),
	            path,
	            absolute = 0;
	
	        for (i = args.length - 1; i >= 0 && !absolute; i--) {
	            path = args[i];
	            if (typeof path !== 'string' || !path) {
	                continue;
	            }
	            resolvedPath = path + '/' + resolvedPath;
	            absolute = path.charAt(0) === '/';
	        }
	
	        resolvedPathStr = normalizeArray(splitPathToArray(resolvedPath), !absolute).join('/');
	
	        return ((absolute ? '/' : '') + resolvedPathStr) || '.';
	    },
	
	    /**
	     * normalize .. and . in path
	     * @param {String} path Path tobe normalized
	     *
	     *
	     *      'x/y/../z' => 'x/z'
	     *      'x/y/z/../' => 'x/y/'
	     *
	     * @return {String}
	     */
	    normalize: function (path) {
	        var absolute = path.charAt(0) === '/',
	            trailingSlash = path.slice(0 - 1) === '/';
	
	        path = normalizeArray(splitPathToArray(path), !absolute).join('/');
	
	        if (!path && !absolute) {
	            path = '.';
	        }
	
	        if (path && trailingSlash) {
	            path += '/';
	        }
	
	        return (absolute ? '/' : '') + path;
	    },
	
	    /**
	     * join([path ...]) and normalize
	     * @return {String}
	     */
	    join: function () {
	        var args = Array.prototype.slice.call(arguments);
	        return Path.normalize(args.join('/'));
	    },
	
	    /**
	     * Get string which is to relative to from
	     * @param {String} from
	     * @param {String} to
	     *
	     *
	     *      relative('x/','x/y/z') => 'y/z'
	     *      relative('x/t/z','x/') => '../..'
	     *
	     * @return {String}
	     */
	    relative: function (from, to) {
	        from = Path.normalize(from);
	        to = Path.normalize(to);
	
	        var fromParts = splitPathToArray(from),
	            path = [],
	            sameIndex,
	            sameIndex2,
	            toParts = splitPathToArray(to),
	            commonLength = Math.min(fromParts.length, toParts.length);
	
	        for (sameIndex = 0; sameIndex < commonLength; sameIndex++) {
	            if (fromParts[sameIndex] !== toParts[sameIndex]) {
	                break;
	            }
	        }
	
	        sameIndex2 = sameIndex;
	
	        while (sameIndex < fromParts.length) {
	            path.push('..');
	            sameIndex++;
	        }
	
	        path = path.concat(toParts.slice(sameIndex2));
	
	        return path.join('/');
	    },
	
	    /**
	     * Get base name of path
	     * @param {String} path
	     * @param {String} [ext] ext to be stripped from result returned.
	     * @return {String}
	     */
	    basename: function (path, ext) {
	        var result = path.match(splitPathRe) || [],
	            basename;
	        basename = result[3] || '';
	        if (ext && basename && basename.slice(ext.length * -1) === ext) {
	            basename = basename.slice(0, -1 * ext.length);
	        }
	        return basename;
	    },
	
	    /**
	     * Get dirname of path
	     * @param {String} path
	     * @return {String}
	     */
	    dirname: function (path) {
	        var result = path.match(splitPathRe) || [],
	            root = result[1] || '',
	            dir = result[2] || '';
	
	        if (!root && !dir) {
	            // No dirname
	            return '.';
	        }
	
	        if (dir) {
	            // It has a dirname, strip trailing slash
	            dir = dir.substring(0, dir.length - 1);
	        }
	
	        return root + dir;
	    },
	
	    /**
	     * Get extension name of file in path
	     * @param {String} path
	     * @return {String}
	     */
	    extname: function (path) {
	        return (path.match(splitPathRe) || [])[4] || '';
	    }
	};
	
	module.exports = Path;
	/*
	 Refer
	 - https://github.com/joyent/node/blob/master/lib/path.js
	 */

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function runFn(fn, args, next, stopAtError, done) {
	  var ret = fn(stopAtError ? args[1] : args[0]);
	  if (ret && ret.then) {
	    ret.then(function (ok) {
	      if (stopAtError === false) {
	        done(null, ok);
	      } else {
	        next([null, ok]);
	      }
	    }, function (error) {
	      if (stopAtError) {
	        done(error, null);
	      } else {
	        next(error, null);
	      }
	    });
	  } else {
	    next([null, ret]);
	  }
	}
	
	function chainPromise(fns, arg, done) {
	  var stopAtError = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
	  fns = fns.filter(function (f) {
	    return !!f;
	  });
	  if (!fns.length) {
	    var args = stopAtError ? [null, arg] : [arg];
	    return done.apply(undefined, args);
	  }
	
	  var index = -1;
	
	  function next(ret) {
	    index++;
	    if (index < fns.length) {
	      var _args = stopAtError ? [null, arg] : [arg];
	      runFn(fns[index], index === 0 ? _args : ret, next, stopAtError, done);
	    } else {
	      done.apply(undefined, _toConsumableArray(ret));
	    }
	  }
	
	  next();
	}
	
	exports.default = chainPromise;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _xhrTransportBase = __webpack_require__(12);
	
	var _xhrTransportBase2 = _interopRequireDefault(_xhrTransportBase);
	
	var _subDomainTransport = __webpack_require__(14);
	
	var _subDomainTransport2 = _interopRequireDefault(_subDomainTransport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// express: subdomain offset
	function isSubDomain(hostname) {
	  // phonegap does not have document.domain
	  return document.domain && _utils2.default.endsWith(hostname, document.domain);
	}
	
	function XhrTransport(io) {
	  var c = io.config;
	  var crossDomain = c.crossDomain;
	  var useSubDomainProxy = c.useSubDomainProxy;
	  this.io = io;
	  if (useSubDomainProxy && crossDomain && (!_xhrTransportBase2.default.supportCORS || useSubDomainProxy === 'force')) {
	    // 跨子域
	    if (isSubDomain(c.uri.hostname)) {
	      // force to not use sub domain transport
	      if (useSubDomainProxy) {
	        return new _subDomainTransport2.default(io);
	      }
	    }
	  }
	
	  this.nativeXhr = _xhrTransportBase2.default.nativeXhr(crossDomain);
	  return this;
	}
	
	(0, _objectAssign2.default)(XhrTransport.prototype, _xhrTransportBase2.default.proto, {
	  send: function send() {
	    this.sendInternal();
	  }
	});
	
	_base2.default.setupTransport('*', XhrTransport);
	/*
	 2012-11-28 note ie port problem:
	 - ie 的 xhr 可以跨端口发请求，例如 localhost:8888 发请求到 localhost:9999
	 - ie iframe 间访问不设置 document.domain 完全不考虑 port！
	 - localhost:8888 访问 iframe 内的 localhost:9999

	 CORS : http://www.nczonline.net/blog/2010/05/25/cross-domain-io-with-cross-origin-resource-sharing/
	 */

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint no-console:0 */
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _modulexQuerystring = __webpack_require__(7);
	
	var _modulexQuerystring2 = _interopRequireDefault(_modulexQuerystring);
	
	var _modulexUrl = __webpack_require__(8);
	
	var _modulexUrl2 = _interopRequireDefault(_modulexUrl);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _constants = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// http://msdn.microsoft.com/en-us/library/cc288060(v=vs.85).aspx
	var XDomainRequest_ = _utils2.default.ieMode > 7 && window.XDomainRequest;
	var XhrTransportBase = {
	  proto: {}
	};
	var lastModifiedCached = {};
	var eTagCached = {};
	
	_base2.default.__lastModifiedCached = lastModifiedCached;
	_base2.default.__eTagCached = eTagCached;
	
	function createStandardXHR(_, refWin) {
	  try {
	    return new (refWin || window).XMLHttpRequest();
	  } catch (e) {
	    // empty
	  }
	  return undefined;
	}
	
	var supportCORS = XhrTransportBase.supportCORS = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined && 'withCredentials' in (createStandardXHR() || {});
	
	function createActiveXHR(_, refWin) {
	  try {
	    return new (refWin || window).ActiveXObject('Microsoft.XMLHTTP');
	  } catch (e) {
	    // empty
	  }
	  return undefined;
	}
	
	XhrTransportBase.nativeXhr = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined && window.ActiveXObject ? function (crossDomain, refWin) {
	  // consider ie10
	  if (!supportCORS && crossDomain && XDomainRequest_) {
	    return new XDomainRequest_();
	  }
	  // ie7 XMLHttpRequest 不能访问本地文件
	  return !_base2.default.isLocal && createStandardXHR(crossDomain, refWin) || createActiveXHR(crossDomain, refWin);
	} : createStandardXHR;
	
	XhrTransportBase.XDomainRequest_ = XDomainRequest_;
	
	function isInstanceOfXDomainRequest(xhr) {
	  return XDomainRequest_ && xhr instanceof XDomainRequest_;
	}
	
	function getIfModifiedKey(c) {
	  var ifModified = c.ifModified;
	  var ifModifiedKey = void 0;
	  if (ifModified) {
	    ifModifiedKey = c.uri;
	    if (c.cache === false) {
	      ifModifiedKey = _utils2.default.clone(ifModifiedKey);
	      // remove random timestamp
	      // random timestamp is forced to fetch code file from server
	      delete ifModifiedKey.query._ksTS;
	    }
	    ifModifiedKey = _modulexUrl2.default.stringify(ifModifiedKey);
	  }
	  return ifModifiedKey;
	}
	
	(0, _objectAssign2.default)(XhrTransportBase.proto, {
	  sendInternal: function sendInternal() {
	    var _this = this;
	
	    var io = this.io;
	    var c = io.config;
	    if (c.beforeSendInternal) {
	      c.beforeSendInternal.call(c.context, this, c);
	    }
	    var nativeXhr = this.nativeXhr;
	    var files = c.files;
	    var method = files ? 'post' : c.method;
	    var async = c.async;
	    var username = void 0;
	    var mimeType = io.mimeType;
	    var requestHeaders = io.requestHeaders || {};
	    var url = io._getUrlForSend();
	    var xhrFields = void 0;
	    var ifModifiedKey = getIfModifiedKey(c);
	    var cacheValue = void 0;
	    var i = void 0;
	
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
	
	    var xRequestHeader = requestHeaders['X-Requested-With'];
	
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
	
	    var sendContent = c.hasContent && c.data || null;
	
	    // support html5 file upload api
	    if (files) {
	      var originalSentContent = sendContent;
	      var data = {};
	      if (originalSentContent) {
	        data = _modulexQuerystring2.default.parse(originalSentContent);
	      }
	      (0, _objectAssign2.default)(data, files);
	      sendContent = new FormData();
	      _utils2.default.each(data, function (vs, k) {
	        if (Array.isArray(vs)) {
	          _utils2.default.each(vs, function (v) {
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
	        nativeXhr.onload = function () {
	          nativeXhr.readyState = 4;
	          nativeXhr.status = 200;
	          _this._callback();
	        };
	        nativeXhr.onerror = function () {
	          nativeXhr.readyState = 4;
	          nativeXhr.status = 500;
	          _this._callback();
	        };
	      } else {
	        nativeXhr.onreadystatechange = function () {
	          _this._callback();
	        };
	      }
	    }
	  },
	
	  // 由 io.abort 调用，自己不可以调用 io.abort
	  abort: function abort() {
	    this._callback(0, 1);
	  },
	  _callback: function _callback(event, abort) {
	    // Firefox throws exceptions when accessing properties
	    // of an xhr when a network error occurred
	    // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
	    var nativeXhr = this.nativeXhr;
	    var io = this.io;
	    var ifModifiedKey = void 0;
	    var lastModified = void 0;
	    var eTag = void 0;
	    var statusText = void 0;
	    var xml = void 0;
	    var c = io.config;
	    try {
	      // abort or complete
	      if (abort || nativeXhr.readyState === 4) {
	        // ie6 ActiveObject 设置不恰当属性导致出错
	        if (isInstanceOfXDomainRequest(nativeXhr)) {
	          nativeXhr.onerror = _utils2.default.noop;
	          nativeXhr.onload = _utils2.default.noop;
	        } else {
	          // ie6 ActiveObject 只能设置，不能读取这个属性，否则出错！
	          nativeXhr.onreadystatechange = _utils2.default.noop;
	        }
	
	        if (abort) {
	          // 完成以后 abort 不要调用
	          if (nativeXhr.readyState !== 4) {
	            nativeXhr.abort();
	          }
	        } else {
	          ifModifiedKey = getIfModifiedKey(c);
	
	          var status = nativeXhr.status;
	
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
	
	          var text = io.responseText = nativeXhr.responseText;
	
	          // same with old-ie iframe-upload
	          if (c.files && text) {
	            var bodyIndex = text.indexOf('<body>');
	            var lastBodyIndex = void 0;
	            if (bodyIndex !== -1) {
	              lastBodyIndex = text.lastIndexOf('</body>');
	              if (lastBodyIndex === -1) {
	                lastBodyIndex = text.length;
	              }
	              text = text.slice(bodyIndex + 6, lastBodyIndex);
	            }
	            // same with old-ie logic
	            io.responseText = _utils2.default.unEscapeHtml(text);
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
	          if (!status && _base2.default.isLocal && !c.crossDomain) {
	            status = io.responseText ? _constants.OK_CODE : _constants.NOT_FOUND_CODE;
	            // IE - #1450: sometimes returns 1223 when it should be 204
	          } else if (status === _constants.NO_CONTENT_CODE2) {
	            status = _constants.NO_CONTENT_CODE;
	          }
	          io._ioReady(status, statusText);
	        }
	      }
	    } catch (e) {
	      console.error(e.stack || e);
	      setTimeout(function () {
	        throw e;
	      }, 0);
	      nativeXhr.onreadystatechange = _utils2.default.noop;
	      if (!abort) {
	        io._ioReady(-1, e.message || 'process error');
	      }
	    }
	  }
	});
	
	exports.default = XhrTransportBase;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OK_CODE = exports.OK_CODE = 200;
	var ERROR_CODE = exports.ERROR_CODE = 500;
	var MULTIPLE_CHOICES = exports.MULTIPLE_CHOICES = 300;
	var NOT_MODIFIED = exports.NOT_MODIFIED = 304;
	var NO_CONTENT_CODE = exports.NO_CONTENT_CODE = 204;
	var NOT_FOUND_CODE = exports.NOT_FOUND_CODE = 404;
	var NO_CONTENT_CODE2 = exports.NO_CONTENT_CODE2 = 1223;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _modulexUrl = __webpack_require__(8);
	
	var _modulexUrl2 = _interopRequireDefault(_modulexUrl);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _xhrTransportBase = __webpack_require__(12);
	
	var _xhrTransportBase2 = _interopRequireDefault(_xhrTransportBase);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// hostname:{iframe: , ready:}
	var iframeMap = {}; /* eslint no-console:0 */
	
	_base2.default.ajaxSetup({
	  useSubDomainProxy: '',
	  subDomainProxyUrl: '/proxy.htm'
	});
	
	function onLoad() {
	  var c = this.io.config;
	  var uri = c.uri;
	  var hostname = uri.hostname;
	  var iframeDesc = iframeMap[hostname];
	  iframeDesc.ready = 1;
	  _utils2.default.removeEvent(iframeDesc.iframe, 'load', this._onLoad);
	  this.send();
	}
	
	function SubDomainTransport(io) {
	  var c = io.config;
	  this.io = io;
	  c.crossDomain = false;
	  this._onLoad = onLoad.bind(this);
	}
	
	(0, _objectAssign2.default)(SubDomainTransport.prototype, _xhrTransportBase2.default.proto, {
	  constructor: SubDomainTransport,
	  // get nativeXhr from iframe document
	  // not from current document directly like XhrTransport
	  send: function send() {
	    var c = this.io.config;
	    var uri = c.uri;
	    var hostname = uri.hostname;
	    var iframe = void 0;
	    var iframeUri = void 0;
	    var iframeDesc = iframeMap[hostname];
	    var proxy = c.subDomainProxyUrl;
	
	    if (iframeDesc && iframeDesc.ready) {
	      this.window = iframeDesc.iframe.contentWindow;
	      this.nativeXhr = _xhrTransportBase2.default.nativeXhr(0, iframeDesc.iframe.contentWindow);
	      if (this.nativeXhr) {
	        this.sendInternal();
	      } else {
	        console.error('io: document.domain not set correctly!');
	      }
	      return;
	    }
	
	    if (!iframeDesc) {
	      iframeDesc = iframeMap[hostname] = {};
	      iframe = iframeDesc.iframe = document.createElement('iframe');
	      (0, _objectAssign2.default)(iframe.style, {
	        position: 'absolute',
	        left: '-9999px',
	        top: '-9999px'
	      });
	      document.documentElement.insertBefore(iframe, null);
	      iframeUri = {};
	      iframeUri.protocol = uri.protocol;
	      iframeUri.host = uri.host;
	      iframeUri.pathname = proxy;
	      iframe.src = _modulexUrl2.default.stringify(iframeUri);
	    } else {
	      iframe = iframeDesc.iframe;
	    }
	    _utils2.default.addEvent(iframe, 'load', this._onLoad);
	  }
	});
	
	exports.default = SubDomainTransport;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _constants = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_base2.default.ajaxSetup({
	  accepts: {
	    script: 'text/javascript,application/javascript,application/ecmascript,application/x-ecmascript'
	  },
	  contents: {
	    script: /javascript|ecmascript/
	  },
	  converters: {
	    text: {
	      // 如果以 xhr+eval 需要下面的，
	      // 否则直接 script node 不需要，引擎自己执行了，
	      // 不需要手动 eval
	      script: function script(text) {
	        _utils2.default.globalEval(text);
	        return text;
	      }
	    }
	  }
	});
	
	var jsOnLoadCallbacks = {};
	
	function getScript(uri, success, charset) {
	  var config = success;
	  var error = void 0;
	  var callbacks = void 0;
	  if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
	    success = config.success;
	    error = config.error;
	    charset = config.charset;
	  }
	  callbacks = jsOnLoadCallbacks[uri] = jsOnLoadCallbacks[uri] || [];
	  callbacks.push([success, error]);
	  if (callbacks.length > 1) {
	    return callbacks.node;
	  }
	  var node = document.createElement('script');
	  if (charset) {
	    node.charset = charset;
	  }
	
	  node.src = uri;
	  node.async = true;
	
	  callbacks.node = node;
	
	  function end(callbackIndex) {
	    _utils2.default.each(jsOnLoadCallbacks[uri], function (callback) {
	      var fn = callback[callbackIndex];
	      if (fn) {
	        fn.call(node);
	      }
	    });
	    delete jsOnLoadCallbacks[uri];
	  }
	
	  function onload() {
	    var readyState = node.readyState;
	    if (!readyState || readyState === 'loaded' || readyState === 'complete') {
	      node.onreadystatechange = node.onload = null;
	      end(0);
	    }
	  }
	
	  node.onload = onload;
	  node.onerror = function () {
	    node.onerror = null;
	    end(1);
	  };
	
	  // can use js in head
	  document.documentElement.insertBefore(node, document.documentElement.firstChild);
	  return node;
	}
	
	function ScriptTransport(io) {
	  var config = io.config;
	  // 优先使用 xhr+eval 来执行脚本, 可以探测到（更多）失败状态
	  if (!config.crossDomain) {
	    return new (_base2.default.getTransport('*'))(io);
	  }
	  this.io = io;
	  return this;
	}
	
	(0, _objectAssign2.default)(ScriptTransport.prototype, {
	  send: function send() {
	    var self = this;
	    var io = this.io;
	    var c = io.config;
	    this.script = getScript(io._getUrlForSend(), {
	      charset: c.scriptCharset,
	      success: function success() {
	        self._callback('success');
	      },
	      error: function error() {
	        self._callback('error');
	      }
	    });
	  },
	  _callback: function _callback(event, abort) {
	    var script = this.script;
	    var io = this.io;
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
	      io._ioReady(_constants.OK_CODE, 'success');
	    } else if (event === 'error') {
	      // 非 ie<9 可以判断出来
	      io._ioReady(_constants.ERROR_CODE, 'script error');
	    }
	  },
	  abort: function abort() {
	    this._callback(0, 1);
	  }
	});
	
	_base2.default.setupTransport('script', ScriptTransport);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_base2.default.ajaxSetup({
	  jsonp: 'callback',
	  jsonpCallback: function jsonpCallback() {
	    // 不使用 now() ，极端情况下可能重复
	    return _utils2.default.guid('jsonp');
	  }
	});
	_base2.default.addPreprocessor('start', function (e) {
	  var io = e.io;
	  var c = io.config;
	  var type = c.type;
	  if (type[0] === 'jsonp') {
	    (function () {
	      // jsonp does not need contentType.
	      // https://github.com/kissyteam/kissy/issues/394
	      delete c.contentType;
	      var response = void 0;
	      var cJsonpCallback = c.jsonpCallback;
	      var converters = void 0;
	      var jsonpCallback = typeof cJsonpCallback === 'function' ? cJsonpCallback() : cJsonpCallback;
	      var previous = window[jsonpCallback];
	
	      c.uri.query[c.jsonp] = jsonpCallback;
	
	      // build temporary JSONP function
	      window[jsonpCallback] = function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        // 使用数组，区别：故意调用了 jsonpCallback(undefined) 与 根本没有调用
	        // jsonp 返回了数组
	        var r = args;
	        if (args.length <= 1) {
	          r = args[0];
	        }
	        // 先存在内存里, onload 后再读出来处理
	        response = [r];
	      };
	
	      // cleanup whether success or failure
	      io.always(function () {
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
	      converters.script.json = function () {
	        if (!response) {
	          // notify event on production mode
	          throw new Error('not call jsonpCallback: ' + jsonpCallback);
	        }
	        return response[0];
	      };
	
	      type.length = 2;
	      // 利用 script transport 发送 script 请求
	      type[0] = 'script';
	      type[1] = 'json';
	    })();
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _modulexQuerystring = __webpack_require__(7);
	
	var _modulexQuerystring2 = _interopRequireDefault(_modulexQuerystring);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _formSerializer = __webpack_require__(18);
	
	var _formSerializer2 = _interopRequireDefault(_formSerializer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var slice = Array.prototype.slice;
	
	_base2.default.addPreprocessor('start', function (e) {
	  var _window = window;
	  var FormData = _window.FormData;
	
	  var io = e.io;
	  var d = void 0;
	  var type = void 0;
	  var formParam = void 0;
	  var data = void 0;
	  var c = io.config;
	  var form = c.form;
	  var useIframeUpload = c.useIframeUpload || !FormData;
	
	  // serialize form if needed
	  if (form) {
	    data = c.data;
	    var isUpload = false;
	    var files = {};
	    var inputs = form.getElementsByTagName('input');
	    for (var i = 0, l = inputs.length; i < l; i++) {
	      var input = inputs[i];
	      if (input.type.toLowerCase() === 'file') {
	        isUpload = true;
	        if (useIframeUpload) {
	          break;
	        }
	        var selected = slice.call(input.files, 0);
	        files[input.getAttribute('name')] = selected.length > 1 ? selected : selected[0] || null;
	      }
	    }
	
	    if (isUpload && !useIframeUpload) {
	      c.files = c.files || {};
	      (0, _objectAssign2.default)(c.files, files);
	      // browser set contentType automatically for FileData
	      delete c.contentType;
	    }
	    // 上传有其他方法
	    if (!isUpload || !useIframeUpload) {
	      // when get need encode
	      // when FormData exists, only collect non-file type input
	      formParam = _formSerializer2.default.getFormData(form);
	      if (c.hasContent) {
	        formParam = _modulexQuerystring2.default.stringify(formParam, undefined, undefined, !c.traditional);
	        if (data) {
	          c.data += '&' + formParam;
	        } else {
	          c.data = formParam;
	        }
	      } else {
	        // get 直接加到 url
	        (0, _objectAssign2.default)(c.uri.query, formParam);
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _modulexQuerystring = __webpack_require__(7);
	
	var _modulexQuerystring2 = _interopRequireDefault(_modulexQuerystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rselectTextarea = /^(?:select|textarea)/i;
	var rCRLF = /\r?\n/g;
	/* eslint max-len:0 */
	var rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
	
	function normalizeCRLF(v) {
	  return v.replace(rCRLF, '\r\n');
	}
	
	// do not pass form.elements to S.makeArray ie678 bug
	function elementsToArray(elements) {
	  var ret = [];
	  for (var i = 0; i < elements.length; i++) {
	    ret.push(elements[i]);
	  }
	  return ret;
	}
	
	var FormSerializer = {
	  /**
	   * form serialization
	   * @method
	   * @param {HTMLElement[]|HTMLElement|Node} forms form elements
	   * @return {String} serialized string represent form elements
	   * @param {Boolean}[serializeArray=false]
	   * @member IO
	   * @static
	   */
	  serialize: function serialize(forms, serializeArray) {
	    // 名值键值对序列化,数组元素名字前不加 []
	    return _modulexQuerystring2.default.stringify(FormSerializer.getFormData(forms), undefined, undefined, serializeArray || false);
	  },
	  getFormData: function getFormData(forms) {
	    var elements = [];
	    var data = {};
	    _utils2.default.each(forms, function (el) {
	      // form 取其表单元素集合
	      // 其他直接取自身
	      var subs = el.elements ? elementsToArray(el.elements) : [el];
	      elements.push.apply(elements, subs);
	    });
	    // 对表单元素进行过滤，具备有效值的才保留
	    elements = elements.filter(function (el) {
	      // 有名字
	      return el.name &&
	      // 不被禁用
	      !el.disabled && (
	      // radio,checkbox 被选择了
	      el.checked ||
	      // select 或者 textarea
	      rselectTextarea.test(el.nodeName) ||
	      // input 类型
	      rinput.test(el.type));
	
	      // 这样子才取值
	    });
	    elements.forEach(function (el) {
	      // TODO, select multiple, welcome pr
	      var val = el.value;
	      var vs = void 0;
	
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
	      vs.push.apply(vs, _utils2.default.makeArray(val));
	    });
	    return data;
	  }
	};
	
	module.exports = FormSerializer;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _modulexQuerystring = __webpack_require__(7);
	
	var _modulexQuerystring2 = _interopRequireDefault(_modulexQuerystring);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _constants = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BREATH_INTERVAL = 30;
	var iframeConverter = _utils2.default.clone(_base2.default.getConfig().converters.text);
	
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
	iframeConverter.json = function (str) {
	  return JSON.parse(_utils2.default.unEscapeHtml(str));
	};
	
	// iframe 内的内容就是 body.innerText
	_base2.default.ajaxSetup({
	  converters: {
	    // iframe 到其他类型的转化和 text 一样
	    iframe: iframeConverter,
	    text: {
	      // fake type, just mirror
	      iframe: function iframe(text) {
	        return text;
	      }
	    },
	    xml: {
	      // fake type, just mirror
	      iframe: function iframe(xml) {
	        return xml;
	      }
	    }
	  }
	});
	
	/**
	 * Whether has been set a custom domain.
	 * Note not perfect: localhost:8888, domain='localhost'
	 * @param {Window} [win] Test window. Default current window.
	 * @return {Boolean}
	 */
	function isCustomDomain() {
	  var domain = document.domain;
	  var hostname = location.hostname;
	  return domain !== hostname && domain !== '[' + hostname + ']'; // IPv6 IP support
	}
	
	/**
	 * Get appropriate src for new empty iframe.
	 * Consider custom domain.
	 * @param {Window} [win] Window new iframe will be inserted into.
	 * @return {String} Src for iframe.
	 */
	function getEmptyIframeSrc(win) {
	  if (_utils2.default.ie && isCustomDomain()) {
	    return 'javascript:void(function(){\n' + encodeURIComponent('document.open();document.domain="' + win.document.domain + '";document.close();') + '\n        }())';
	  }
	  return '';
	}
	
	function createIframe(xhr) {
	  var id = _utils2.default.guid('io-iframe');
	  // empty src, so no history
	  var src = getEmptyIframeSrc();
	  var iframe = xhr.iframe = document.createElement('iframe');
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
	  var ret = [];
	  var isArray = void 0;
	  var i = void 0;
	  var e = void 0;
	  _utils2.default.each(query, function (data, k) {
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
	    fields.forEach(function (f) {
	      f.parentNode.removeChild(f);
	    });
	  }
	}
	
	function setAttrs(form, attrs) {
	  for (var a in attrs) {
	    if (attrs.hasOwnProperty(a)) {
	      form.setAttribute(a, attrs[a]);
	    }
	  }
	}
	
	function callback(event) {
	  var _this = this;
	
	  var form = this.form;
	  var io = this.io;
	  var eventType = event.type;
	  var iframeDoc = void 0;
	  var iframe = io.iframe;
	
	  // 防止重复调用 , 成功后 abort
	  if (!iframe) {
	    return;
	  }
	
	  // ie6 立即设置 action 设置为空导致白屏
	  if (eventType === 'abort' && _utils2.default.ie === 6) {
	    setTimeout(function () {
	      setAttrs(form, _this.attrs);
	    }, 0);
	  } else {
	    setAttrs(form, this.attrs);
	  }
	
	  removeFieldsFromData(this.fields);
	
	  _utils2.default.removeEvent(iframe, 'load', this._callback);
	  _utils2.default.removeEvent(iframe, 'error', this._callback);
	
	  setTimeout(function () {
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
	        if (_utils2.default.startsWith(io.responseText, '<?xml')) {
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
	        io._ioReady(_constants.OK_CODE, 'success');
	      } else {
	        // chrome does not throw exception:
	        // Unsafe JavaScript attempt to access frame with URL upload.jss
	        // from frame with URL test.html.
	        // Domains, protocols and ports must match.
	        // chrome will get iframeDoc to null
	        // so this error is parser error to normalize all browsers
	        io._ioReady(_constants.ERROR_CODE, 'parser error');
	      }
	    } catch (e) {
	      // #245 submit to a  cross domain page except chrome
	      io._ioReady(_constants.ERROR_CODE, 'parser error');
	    }
	  } else if (eventType === 'error') {
	    io._ioReady(_constants.ERROR_CODE, 'error');
	  }
	}
	
	function IframeTransport(io) {
	  this.io = io;
	  this._callback = callback.bind(this);
	}
	
	(0, _objectAssign2.default)(IframeTransport.prototype, {
	  send: function send() {
	    var _this2 = this;
	
	    var io = this.io;
	    var c = io.config;
	    var fields = void 0;
	    var iframe = void 0;
	    var query = void 0;
	    var data = c.data;
	    var form = c.form;
	
	    this.attrs = {
	      target: form.getAttribute('target') || '',
	      action: form.getAttribute('action') || '',
	      // enctype 区分 iframe 与 serialize
	      encoding: form.getAttribute('encoding'),
	      enctype: form.getAttribute('enctype'),
	      method: form.getAttribute('method')
	    };
	    this.form = form;
	
	    iframe = createIframe(io);
	
	    // set target to iframe to avoid main page refresh
	    setAttrs(form, {
	      target: iframe.id,
	      action: io._getUrlForSend(),
	      method: 'post',
	      enctype: 'multipart/form-data',
	      encoding: 'multipart/form-data'
	    });
	
	    // unparam to kv map
	    if (data) {
	      query = _modulexQuerystring2.default.parse(data);
	    }
	
	    if (query) {
	      fields = addDataToForm(query, form, !c.traditional);
	    }
	
	    this.fields = fields;
	
	    var go = function go() {
	      _utils2.default.addEvent(iframe, 'load', _this2._callback);
	      _utils2.default.addEvent(iframe, 'error', _this2._callback);
	      form.submit();
	    };
	
	    // ie6 need a breath
	    if (_utils2.default.ie === 6) {
	      setTimeout(go, 0);
	    } else {
	      // can not setTimeout or else chrome will submit to top window
	      go();
	    }
	  },
	  abort: function abort() {
	    this._callback({
	      type: 'abort'
	    });
	  }
	});
	
	_base2.default.setupTransport('iframe', IframeTransport);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _base = __webpack_require__(4);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _modulexUrl = __webpack_require__(8);
	
	var _modulexUrl2 = _interopRequireDefault(_modulexUrl);
	
	var _chainPromise = __webpack_require__(10);
	
	var _chainPromise2 = _interopRequireDefault(_chainPromise);
	
	var _constants = __webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// get individual response header from response header str
	var HEADER_REG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg; /* eslint no-console:0 */
	
	var responseInterceptors = _base2.default._responseInterceptors;
	
	function handleResponseData(io) {
	  // text xml 是否原生转化支持
	  var text = io.responseText;
	  var xml = io.responseXML;
	  var c = io.config;
	  var converts = c.converters;
	  var type0 = void 0;
	  var contentType = void 0;
	  var responseData = void 0;
	  var contents = c.contents;
	  var type = c.type;
	
	  // 例如 script 直接是js引擎执行，没有返回值，不需要自己处理初始返回值
	  // jsonp 时还需要把 script 转换成 json，后面还得自己来
	  if (text || xml) {
	    contentType = io.mimeType || io.getResponseHeader('Content-Type');
	
	    // 去除无用的通用格式
	    while (type[0] === '*') {
	      type.shift();
	    }
	
	    if (!type.length) {
	      // 获取源数据格式，放在第一个
	      for (type0 in contents) {
	        if (contents.hasOwnProperty(type0) && contents[type0].test(contentType)) {
	          if (type[0] !== type0) {
	            type.unshift(type0);
	          }
	          break;
	        }
	      }
	    }
	
	    // 服务器端没有告知（并且客户端没有 mime type0 ）默认 text 类型
	    type[0] = type[0] || 'text';
	
	    // 获得合适的初始数据
	    for (var dataTypeIndex = 0; dataTypeIndex < type.length; dataTypeIndex++) {
	      if (type[dataTypeIndex] === 'text' && text !== undefined) {
	        responseData = text;
	        break;
	      } else if (type[dataTypeIndex] === 'xml' && xml !== undefined) {
	        // 有 xml 值才直接取，否则可能还要从 xml 转
	        responseData = xml;
	        break;
	      }
	    }
	
	    if (!responseData) {
	      (function () {
	        var rawData = { text: text, xml: xml };
	        // 看能否从 text xml 转换到合适数据，并设置起始类型为 text/xml
	        ['text', 'xml'].forEach(function (prevType) {
	          type0 = type[0];
	          var converter = converts[prevType] && converts[prevType][type0];
	          if (converter && rawData[prevType]) {
	            type.unshift(prevType);
	            responseData = prevType === 'text' ? text : xml;
	            return false;
	          }
	          return undefined;
	        });
	      })();
	    }
	  }
	  var prevType = type[0];
	
	  // 按照转化链把初始数据转换成我们想要的数据类型
	  for (var i = 1; i < type.length; i++) {
	    type0 = type[i];
	
	    var converter = converts[prevType] && converts[prevType][type0];
	
	    if (!converter) {
	      throw new Error('no covert for ' + prevType + ' => ' + type0);
	    }
	    responseData = converter(responseData);
	
	    prevType = type0;
	  }
	
	  io.responseData = responseData;
	}
	
	(0, _objectAssign2.default)(_base2.default.prototype, {
	  // Caches the header
	  setRequestHeader: function setRequestHeader(name, value) {
	    this.requestHeaders[name] = value;
	    return this;
	  },
	
	
	  /**
	   * get all response headers as string after request is completed.
	   * @member IO
	   * @return {String}
	   */
	  getAllResponseHeaders: function getAllResponseHeaders() {
	    return this.state === 2 ? this.responseHeadersString : null;
	  },
	
	
	  /**
	   * get header value in response to specified header name
	   * @param {String} name header name
	   * @return {String} header value
	   * @member IO
	   */
	  getResponseHeader: function getResponseHeader(name) {
	    var match = void 0;
	    var responseHeaders = void 0;
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
	  overrideMimeType: function overrideMimeType(type) {
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
	  abort: function abort(statusText) {
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
	  getNativeXhr: function getNativeXhr() {
	    var transport = this.transport;
	    if (transport) {
	      return transport.nativeXhr;
	    }
	    return null;
	  },
	  _ioReady: function _ioReady(status, statusText) {
	    var _this = this;
	
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
	    var isSuccess = void 0;
	    if (status >= _constants.OK_CODE && status < _constants.MULTIPLE_CHOICES || status === _constants.NOT_MODIFIED) {
	      // note: not same with nativeStatusText, such as 'OK'/'Not Modified'
	      // 为了整个框架的和谐以及兼容性，用小写，并改变写法
	      if (status === _constants.NOT_MODIFIED) {
	        statusText = 'not modified';
	        isSuccess = true;
	      } else {
	        try {
	          handleResponseData(this);
	          statusText = 'success';
	          isSuccess = true;
	        } catch (e) {
	          console.error(e.stack || e);
	          setTimeout(function () {
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
	
	    var config = this.config;
	    var timeoutTimer = this.timeoutTimer;
	    if (timeoutTimer) {
	      clearTimeout(timeoutTimer);
	      this.timeoutTimer = 0;
	    }
	    var context = config.context;
	    var handler = isSuccess ? 'success' : 'error';
	    var responseData = this.responseData;
	
	    var argumentError = function argumentError(_e) {
	      var e = _e;
	      if (!(e instanceof Error)) {
	        e = new Error(e);
	      }
	      e.xhr = _this.transport.nativeXhr;
	      e.io = _this;
	      e.status = status;
	      return e;
	    };
	
	    var error = isSuccess ? null : argumentError(statusText);
	
	    var done = function done(_error, _responseData) {
	      error = _error;
	      if (error) {
	        error = argumentError(error);
	      }
	      responseData = _responseData;
	      var payload = [responseData, statusText, _this];
	      if (error) {
	        if (config.error) {
	          config.error.call(context, error);
	        }
	      } else if (config.success) {
	        config.success.apply(context, payload);
	      }
	
	      var eventObject = {
	        io: _this,
	        payload: payload,
	        error: error
	      };
	      var h = config.complete;
	      if (h) {
	        h.apply(context, payload);
	      }
	      _base2.default.fire(handler, eventObject);
	      _base2.default.fire('complete', eventObject);
	      if (typeof Promise !== 'undefined') {
	        _this.getPromise();
	        if (isSuccess) {
	          _this.__resolve(responseData);
	        } else {
	          _this.__reject(error);
	        }
	      }
	    };
	
	    if (error) {
	      (0, _chainPromise2.default)(responseInterceptors.map(function (interceptor) {
	        return interceptor.error;
	      }), error, done, false);
	    } else {
	      (0, _chainPromise2.default)(responseInterceptors.map(function (interceptor) {
	        return interceptor.success;
	      }), responseData, done);
	    }
	  },
	  _getUrlForSend: function _getUrlForSend() {
	    // for compatible, some server does not decode query
	    // uri will encode query
	    // x.html?t=1,2
	    // =>
	    // x.html?t=1%3c2
	    // so trim original query when process other query
	    // and append when send
	    var c = this.config;
	    var uri = c.uri;
	    var search = uri.search || '';
	    delete uri.search;
	    if (search && Object.keys(uri.query).length) {
	      search = '&' + search.substring(1);
	    }
	    return _modulexUrl2.default.stringify(uri, !c.traditional) + search;
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map