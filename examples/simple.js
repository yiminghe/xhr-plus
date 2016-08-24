webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(94);


/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _xhrPlus = __webpack_require__(2);
	
	var _xhrPlus2 = _interopRequireDefault(_xhrPlus);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var a = 0; /* eslint no-console:0 */
	
	if (!a) {
	  (0, _xhrPlus2.default)({
	    url: './data/res.json',
	    success: function success() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      console.log('xhr success', args);
	    },
	    error: function error() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      console.log('xhr error', args);
	    }
	  });
	}
	
	(0, _xhrPlus2.default)({
	  url: './data/error.json',
	  success: function success() {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }
	
	    console.log('xhr error success', args);
	  },
	  error: function error() {
	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }
	
	    console.log('xhr error error', args);
	  }
	});
	
	(0, _xhrPlus2.default)({
	  type: 'jsonp',
	  jsonpCallback: 'ok',
	  url: './data/res.js',
	  success: function success() {
	    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	      args[_key5] = arguments[_key5];
	    }
	
	    console.log('jsonp success', args);
	  },
	  error: function error() {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }
	
	    console.log('jsonp error', args);
	  }
	});
	
	(0, _xhrPlus2.default)({
	  type: 'jsonp',
	  jsonpCallback: 'ok2',
	  crossDomain: true,
	  url: './data/res2.js',
	  success: function success() {
	    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      args[_key7] = arguments[_key7];
	    }
	
	    console.log('jsonp2 success', args);
	  },
	  error: function error() {
	    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	      args[_key8] = arguments[_key8];
	    }
	
	    console.log('jsonp2 error', args);
	  }
	});

/***/ }

});
//# sourceMappingURL=simple.js.map