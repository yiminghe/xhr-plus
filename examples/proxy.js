webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(93);


/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _xhrPlus = __webpack_require__(2);
	
	var _xhrPlus2 = _interopRequireDefault(_xhrPlus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.domain = 'alipay.com'; /* eslint no-console:0 */
	
	(0, _xhrPlus2.default)({
	  url: '//local2.alipay.com:8000/examples/data/res.json',
	  useSubDomainProxy: 'force',
	  success: function success() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    console.log('proxy success', args);
	  },
	  error: function error() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    console.log('proxy error', args);
	  }
	});

/***/ }

});
//# sourceMappingURL=proxy.js.map