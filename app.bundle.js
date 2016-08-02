/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _model = __webpack_require__(1);

	var _model2 = _interopRequireDefault(_model);

	var _menu = __webpack_require__(2);

	var _menu2 = _interopRequireDefault(_menu);

	var _menu3 = __webpack_require__(14);

	var _menu4 = _interopRequireDefault(_menu3);

	__webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class App
	 */
	var App = function () {
		/**
	  * @constructor
	  */
		function App(options) {
			_classCallCheck(this, App);

			this.model = new _model2.default({
				url: 'menu',
				id: options.id
			});
			this.menu = new _menu2.default({
				el: document.querySelector(options.el),
				data: {
					title: '',
					items: []
				},
				template: _menu4.default
			});

			this.model.fetch(this.menu.render.bind(this.menu));
			this.activateMenuListener('remove', this._onRemove);
			this.activateMenuListener('add', this._onAdd);
		}

		_createClass(App, [{
			key: 'activateMenuListener',
			value: function activateMenuListener(name, func) {
				this.menu.el.addEventListener(name, func.bind(this));
			}

			/**
	   * @param  {event} event
	   * @private
	   */

		}, {
			key: '_onRemove',
			value: function _onRemove(event) {
				this.menu.removeItem(event.detail);
				this._saveModelData();
			}

			/**
	   * @param  {event} event
	   * @private
	   */

		}, {
			key: '_onAdd',
			value: function _onAdd(event) {
				this.menu.addItem(event.detail);
				this._saveModelData();
			}

			/**
	   * @private
	   */

		}, {
			key: '_saveModelData',
			value: function _saveModelData() {
				this.model.setData(this.menu.data);
				this.model.save();
			}
		}]);

		return App;
	}();

	new App({
		el: '.js-menu-list',
		id: 'shoppinglist'
	});

	new App({
		el: '.js-menu-recipe',
		id: 'recipe'
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BASE_URL = 'https://learnjs-components.firebaseio.com/';

	var Model = function () {
		function Model(options) {
			_classCallCheck(this, Model);

			this.data = options.data || {};
			this.url = options.url;
			this.id = options.id;
			this._getResponse = this._getResponse.bind(this);
		}

		_createClass(Model, [{
			key: 'getData',
			value: function getData() {
				return this.data;
			}
		}, {
			key: 'setData',
			value: function setData(data) {
				this.data = data;
			}

			/**
	   * Загрузка данных с сервера
	   * @param	{Function} resolve
	   * @return {XMLHttpRequest}
	   */

		}, {
			key: 'fetch',
			value: function fetch(resolve) {
				var _this = this;

				var req = this._makeRequest('GET');

				req.onreadystatechange = function () {
					if (_this._getResponse(req)) {
						resolve(_this.getData());
					}
				};

				req.send();
				return req;
			}
		}, {
			key: 'save',
			value: function save() {
				var req = this._makeRequest('PUT');

				req.onreadystatechange = this._getResponse(req);

				var reqString = JSON.stringify(this.getData());
				req.send(reqString);
			}

			/**
	   * Создание объекта запроса
	   * @param {string} method - HTTP method
	   * @return {XMLHttpRequest}
	   * @private
	   */

		}, {
			key: '_makeRequest',
			value: function _makeRequest(method) {
				var xhr = new XMLHttpRequest();

				xhr.open(method, BASE_URL + this.url + '/' + this.id + '.json');

				return xhr;
			}

			/**
	   * Преобразование тескта ответа в данные
	   * @param {string} responseText
	   * @return {Object}
	   */

		}, {
			key: 'parse',
			value: function parse(responseText) {
				return JSON.parse(responseText);
			}

			/**
	   * @param  {XMLHttpRequest} req
	   * @return {boolean}
	    * @private
	   */

		}, {
			key: '_getResponse',
			value: function _getResponse(req) {
				if (req.readyState != 4) return false;

				if (req.status != 200) {
					console.log(req.status + ': ' + req.statusText);
					return false;
				} else {
					var data = this.parse(req.responseText);
					this.data = data;
					return true;
				}
			}
		}]);

		return Model;
	}();

	//export


	exports.default = Model;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _component = __webpack_require__(3);

	var _component2 = _interopRequireDefault(_component);

	var _form = __webpack_require__(4);

	var _form2 = _interopRequireDefault(_form);

	var _form3 = __webpack_require__(9);

	var _form4 = _interopRequireDefault(_form3);

	__webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class Menu
	 */
	var Menu = function (_Component) {
		_inherits(Menu, _Component);

		/**
	  * @constructor
	  * @param	{Object} options
	  * @param	{HTMLElement} options.el
	  */
		function Menu(options) {
			_classCallCheck(this, Menu);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, options));

			_this.el = options.el;
			return _this;
		}

		_createClass(Menu, [{
			key: 'openMenu',
			value: function openMenu() {
				this.el.classList.toggle('menu_open');
			}

			/**
	   * @param  {Object|undefined} data
	   */

		}, {
			key: 'render',
			value: function render(data) {
				_get(Object.getPrototypeOf(Menu.prototype), 'render', this).call(this, data);
				this.form = new _form2.default({
					el: this.el.querySelector('.js-form'),
					template: _form4.default
				});
			}

			/**
	  * @param {HTMLElement} item
	  */

		}, {
			key: 'pickItem',
			value: function pickItem(item) {
				var pickedItem = item;
				if (!item.classList.contains('menu__item')) {
					pickedItem = item.parentNode;
				}
				this.trigger('pick', {
					name: pickedItem.firstChild.textContent,
					quantity: pickedItem.childNodes[1].textContent
				});
			}

			/**
	   * @param  {HTMLElement} item
	   */

		}, {
			key: 'addItem',
			value: function addItem(item) {
				this.data.items.push(item);
				this.render();
			}

			/**
	  * @param  {HTMLElement} item
	  * @private
	  */

		}, {
			key: '_onRemoveClick',
			value: function _onRemoveClick(item) {
				var index = parseInt(item.parentNode.dataset.index);
				this.trigger('remove', {
					index: index
				});
			}

			/**
	  * @param  {HTMLElement} item
	  */

		}, {
			key: 'removeItem',
			value: function removeItem(removedItem) {
				this.data.items = this.data.items.filter(function (item, index) {
					return index !== removedItem.index;
				});
				this.render();
			}

			/**
	   * @param  {Event} event
	   * @private
	   */

		}, {
			key: '_onClick',
			value: function _onClick(event) {
				event.preventDefault();
				var item = event.target;

				switch (item.dataset.action) {
					case 'remove':
						this._onRemoveClick(item);
						break;

					case 'pick':
						this.pickItem(item);
						break;

					case 'open':
						this.openMenu();
						break;
				}
			}
		}]);

		return Menu;
	}(_component2.default);

	// Export


	exports.default = Menu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class Component
	 */
	var Component = function () {
		/**
	  * @constructor
	  * @param	{Object} options
	  * @param	{HTMLElement} options.el
	  */
		function Component(options) {
			_classCallCheck(this, Component);

			this.el = options.el;
			this.data = Object.assign({}, options.data);
			this._template = options.template;
			this.render();
			this._initEvents();
		}

		/**
	  * @private
	  */


		_createClass(Component, [{
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('click', this._onClick.bind(this));
			}
		}, {
			key: 'render',
			value: function render(data) {
				if (data) {
					this.data = data;
				}
				this.el.innerHTML = this._template(this.data);
			}

			/**
	   * @param	{string} name event type
	   * @param	{Object} data event object
	   */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
					bubbles: true,
					detail: data
				});
				this.el.dispatchEvent(widgetEvent);

				console.log(name, data);
			}
		}]);

		return Component;
	}();

	// Export


	exports.default = Component;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _component = __webpack_require__(3);

	var _component2 = _interopRequireDefault(_component);

	__webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @class Form
	 */
	var Form = function (_Component) {
		_inherits(Form, _Component);

		/**
	  * @constructor
	  * @param	{Object} options
	  * @param	{HTMLElement} options.el
	  */
		function Form(options) {
			_classCallCheck(this, Form);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, options));

			_this.inputs = _this.el.querySelector('form');
			return _this;
		}

		_createClass(Form, [{
			key: 'openForm',
			value: function openForm() {
				this.el.querySelector('.menu__add-goods').classList.toggle('menu__form_open');
			}

			/**
	   * @param	{Event} event
	   * @private
	   */

		}, {
			key: '_onClick',
			value: function _onClick(event) {
				event.preventDefault();
				var item = event.target;

				switch (item.dataset.action) {
					case 'form':
						this.openForm();
						break;
					case 'add':
						this.trigger('add', {
							name: this.inputs.elements[0].value,
							quantity: this.inputs.elements[1].value
						});
						this.inputs.reset();
						break;
				}
			}
		}]);

		return Form;
	}(_component2.default);

	exports.default = Form;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./form.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./form.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".menu__add-button {\n\tmargin-left: 1em;\n\toutline: none;\n\tborder: none;\n\tbackground: none;\n\tcolor: rgba(136,14,79,0.7);\n\tfont-size: 1em;\n\tline-height: 1.75em;\n\tcursor: pointer;\n}\n\n.menu__add-button:hover {\n\t-webkit-transition: 1.25s;\n\ttransition: 1.25s;\n\t-webkit-transform: rotate(360deg);\n\t        transform: rotate(360deg);\n}\n\n.menu__add-goods {\n\tdisplay: none;\n}\n\n.menu__form_open {\n\tdisplay: block;\n}\n\nform {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-ms-flex-wrap: wrap;\n\t    flex-wrap: wrap;\n\t        align-items: stretch;\n\t        justify-content: flex-start;\n\t-webkit-box-align: stretch;\n\t    -ms-flex-align: stretch;\n\t-webkit-box-pack: start;\n\t    -ms-flex-pack: start;\n}\n\ninput {\n\t    -ms-flex: 1 0 auto;\n\t        flex: 1 0 auto;\n\tmargin: 0.5em 1em;\n\tpadding: 0 1em;\n\theight: 2em;\n\toutline: none;\n\tborder: 1px solid rgba(55,71,79,0.7);\n\tborder-radius: 7px;\n\tbackground: none;\n\tbox-shadow: 2px 2px 5px rgba(0,0,0,.3);\n\tfont-size: 0.75em;\n\tfont-family: 'Didact Gothic', sans-serif;\n\t-webkit-box-flex: 1;\n}\n\ninput[type=\"text\"]:focus {\n\tpadding-left: 1em;\n\toutline: none;\n\tborder: 1px solid rgba(136,14,79,0.7);\n}\n\ninput[type=\"submit\"] {\n\tborder: 1px solid rgba(136,14,79,0.7);\n\tbackground: none;\n\tcolor: rgba(136,14,79,1);\n\tcursor: pointer;\n}\n\ninput[type=\"submit\"]:hover {\n\tbackground: rgba(136,14,79,0.7);\n\tcolor: #FAFAFA;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(10);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cbutton class=\"menu__add-button\" data-action=\"form\"\u003E✚\u003C\u002Fbutton\u003E\u003Cdiv class=\"menu__add-goods\"\u003E\u003Cform class=\"form\"\u003E\u003Cinput type=\"text\" name=\"good-name\" placeholder=\"Наименование\"\u003E\u003Cinput type=\"text\" name=\"good-quantity\" placeholder=\"Количество\"\u003E\u003Cinput data-action=\"add\" type=\"submit\" value=\"Добавить\"\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pug_has_own_property = Object.prototype.hasOwnProperty;

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = pug_merge;
	function pug_merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = pug_merge(attrs, a[i]);
	    }
	    return attrs;
	  }

	  for (var key in b) {
	    if (key === 'class') {
	      var valA = a[key] || [];
	      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
	    } else if (key === 'style') {
	      var valA = pug_style(a[key]);
	      var valB = pug_style(b[key]);
	      a[key] = valA + (valA && valB && ';') + valB;
	    } else {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Process array, object, or string as a string of classes delimited by a space.
	 *
	 * If `val` is an array, all members of it and its subarrays are counted as
	 * classes. If `escaping` is an array, then whether or not the item in `val` is
	 * escaped depends on the corresponding item in `escaping`. If `escaping` is
	 * not an array, no escaping is done.
	 *
	 * If `val` is an object, all the keys whose value is truthy are counted as
	 * classes. No escaping is done.
	 *
	 * If `val` is a string, it is counted as a class. No escaping is done.
	 *
	 * @param {(Array.<string>|Object.<string, boolean>|string)} val
	 * @param {?Array.<string>} escaping
	 * @return {String}
	 */
	exports.classes = pug_classes;
	function pug_classes_array(val, escaping) {
	  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
	  for (var i = 0; i < val.length; i++) {
	    className = pug_classes(val[i]);
	    if (!className) continue;
	    escapeEnabled && escaping[i] && (className = pug_escape(className));
	    classString = classString + padding + className;
	    padding = ' ';
	  }
	  return classString;
	}
	function pug_classes_object(val) {
	  var classString = '', padding = '';
	  for (var key in val) {
	    if (key && val[key] && pug_has_own_property.call(val, key)) {
	      classString = classString + padding + key;
	      padding = ' ';
	    }
	  }
	  return classString;
	}
	function pug_classes(val, escaping) {
	  if (Array.isArray(val)) {
	    return pug_classes_array(val, escaping);
	  } else if (val && typeof val === 'object') {
	    return pug_classes_object(val);
	  } else {
	    return val || '';
	  }
	}

	/**
	 * Convert object or string to a string of CSS styles delimited by a semicolon.
	 *
	 * @param {(Object.<string, string>|string)} val
	 * @return {String}
	 */

	exports.style = pug_style;
	function pug_style(val) {
	  if (!val) return '';
	  if (typeof val === 'object') {
	    var out = '', delim = '';
	    for (var style in val) {
	      /* istanbul ignore else */
	      if (pug_has_own_property.call(val, style)) {
	        out = out + delim + style + ':' + val[style];
	        delim = ';';
	      }
	    }
	    return out;
	  } else {
	    val = '' + val;
	    if (val[val.length - 1] === ';') return val.slice(0, -1);
	    return val;
	  }
	};

	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = pug_attr;
	function pug_attr(key, val, escaped, terse) {
	  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
	    return '';
	  }
	  if (val === true) {
	    return ' ' + (terse ? key : key + '="' + key + '"');
	  }
	  if (typeof val.toJSON === 'function') {
	    val = val.toJSON();
	  }
	  if (typeof val !== 'string') {
	    val = JSON.stringify(val);
	    if (!escaped && val.indexOf('"') !== -1) {
	      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
	    }
	  }
	  if (escaped) val = pug_escape(val);
	  return ' ' + key + '="' + val + '"';
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} terse whether to use HTML5 terse boolean attributes
	 * @return {String}
	 */
	exports.attrs = pug_attrs;
	function pug_attrs(obj, terse){
	  var attrs = '';

	  for (var key in obj) {
	    if (pug_has_own_property.call(obj, key)) {
	      var val = obj[key];

	      if ('class' === key) {
	        val = pug_classes(val);
	        attrs = pug_attr(key, val, false, terse) + attrs;
	        continue;
	      }
	      if ('style' === key) {
	        val = pug_style(val);
	      }
	      attrs += pug_attr(key, val, false, terse);
	    }
	  }

	  return attrs;
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var pug_match_html = /["&<>]/;
	exports.escape = pug_escape;
	function pug_escape(_html){
	  var html = '' + _html;
	  var regexResult = pug_match_html.exec(html);
	  if (!regexResult) return _html;

	  var result = '';
	  var i, lastIndex, escape;
	  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
	    switch (html.charCodeAt(i)) {
	      case 34: escape = '&quot;'; break;
	      case 38: escape = '&amp;'; break;
	      case 60: escape = '&lt;'; break;
	      case 62: escape = '&gt;'; break;
	      default: continue;
	    }
	    if (lastIndex !== i) result += html.substring(lastIndex, i);
	    lastIndex = i + 1;
	    result += escape;
	  }
	  if (lastIndex !== i) return result + html.substring(lastIndex, i);
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the pug in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @param {String} str original source
	 * @api private
	 */

	exports.rethrow = pug_rethrow;
	function pug_rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(11).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    pug_rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Pug') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./menu.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".menu {\n\tbox-sizing: border-box;\n\tmargin: 1em 1em;\n\tmax-width: 90vw;\n\twidth: auto;\n\tborder-radius: 10px;\n\tbackground-color: rgba(250,250,250 ,0.9);\n\tbox-shadow: 2px 2px 5px rgba(0,0,0,.3);\n\tcolor: rgba(55,71,79,1);\n\tfont-size: 1.5em;\n}\n\n.menu:after{\n    display:table;\n    clear:both;\n    content:'';\n}\n\n.menu__list {\n\tdisplay: none;\n}\n\n.menu_open .menu__list  {\n\tdisplay: block;\n\tmargin: 1em 1em;\n}\n\n.menu__title {\n\tpadding-left: 1em;\n\tmin-height: 2em;\n\tborder-radius: 10px;\n\tbackground: rgba(136,14,79,0.7);\n\tbox-shadow: 2px 2px 2px rgba(0,0,0,.2);\n\tcolor: #FAFAFA;\n\ttext-shadow: 2px 2px rgba(0,0,0,.2);\n\tline-height: 2em;\n\tcursor: pointer;\n}\n\n.menu__title:hover {\n\ttext-decoration: underline;\n}\n\n.menu__list ul {\n\tmargin: 0;\n\tpadding-left: 0;\n\tlist-style: none;\n}\n\n.menu__item {\n\tpadding-left: 1em;\n\tborder-radius: 7px;\n\tfont-size: 1em;\n\tline-height: 2em;\n\tcursor: pointer;\n}\n\n.menu__item b:after {\n\tcontent: \" \\2013   \";\n\tfont-weight: normal;\n}\n\n.menu__item:hover {\n\tbackground: rgba(248,187,208 ,.5);\n\tcolor: rgba(136,14,79,0.7);\n}\n\n\n.menu__remove-button {\n\tvisibility: hidden;\n\tfloat: right;\n\tmargin: 0 1em;\n\toutline: none;\n\tborder: none;\n\tbackground: none;\n\tcolor: rgba(136,14,79,0.7);\n\tcontent: \"\\2716\";\n\tfont-size: 1em;\n\tline-height: 1.75em;\n\tcursor: pointer;\n}\n\n.menu__item:hover > .menu__remove-button {\n\tvisibility: visible;\n}\n\n.menu__remove-button:hover {\n\t-webkit-transition: 1.25s;\n\ttransition: 1.25s;\n\t-webkit-transform: rotate(360deg);\n\t        transform: rotate(360deg);\n}\n", ""]);

	// exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(10);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (items, title) {pug_html = pug_html + "\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"menu__title\" data-action=\"open\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu__list\"\u003E\u003Cul\u003E";
	// iterate items
	var pug_obj0 = items;
	if ('number' == typeof pug_obj0.length) {

	  for (var index = 0, pug_length0 = pug_obj0.length; index < pug_length0; index++) {
	    var item = pug_obj0[index];

	pug_html = pug_html + "\u003Cli" + (" class=\"menu__item\""+pug.attr("data-index", index, true, true)+" data-action=\"pick\"") + "\u003E\u003Cb data-action=\"pick\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fb\u003E\u003Cspan data-action=\"pick\"\u003E" + (pug.escape(null == (pug_interp = item.quantity) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cbutton class=\"menu__remove-button\" data-action=\"remove\"\u003E✖\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
	  }

	} else {
	  var pug_length0 = 0;
	  for (var index in pug_obj0) {
	    pug_length0++;
	    var item = pug_obj0[index];

	pug_html = pug_html + "\u003Cli" + (" class=\"menu__item\""+pug.attr("data-index", index, true, true)+" data-action=\"pick\"") + "\u003E\u003Cb data-action=\"pick\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fb\u003E\u003Cspan data-action=\"pick\"\u003E" + (pug.escape(null == (pug_interp = item.quantity) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cbutton class=\"menu__remove-button\" data-action=\"remove\"\u003E✖\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
	  }

	}

	pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cdiv class=\"js-form\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return pug_html;};
	module.exports = template;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./app.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color:white;\n  background-image: -webkit-linear-gradient(left, rgba(248,187,208,.5) 50%, transparent 50%),\n  -webkit-linear-gradient(rgba(248,187,208,.5) 50%, transparent 50%);\n  background-image: linear-gradient(90deg, rgba(248,187,208,.5) 50%, transparent 50%),\n  linear-gradient(rgba(248,187,208,.5) 50%, transparent 50%);\n  background-size:50px 50px;\n  font-family: 'Didact Gothic', sans-serif;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);