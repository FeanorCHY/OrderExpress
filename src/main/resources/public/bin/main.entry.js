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

	__webpack_require__(1);
	let $ = __webpack_require__(5);
	window.$ = window.jQuery = $;
	window.AdminLTEOptions = __webpack_require__(6);
	<!-- bootstrap datepicker -->
	__webpack_require__(7);
	<!-- ion-rangeslider -->
	__webpack_require__(8);
	<!-- InputMask -->
	__webpack_require__(9);
	__webpack_require__(10);
	let _ = __webpack_require__(11);
	let Backbone = __webpack_require__(13);
	Backbone.$ = $;
	let View = __webpack_require__(12);
	let Model = __webpack_require__(17);
	let Collection = __webpack_require__(18);
	let Router = __webpack_require__(19);
	let utils = __webpack_require__(15);
	let _vars = __webpack_require__(14);

	$(document).ready(function () {
	    console.log(window.location.href);
	    loadDOMElements();
	    let AppRouter = new Router.AppRouter();
	    let customerModel = new Model.Customer();
	    let userBadgeView = new View.UserBadgeView({
	        model: customerModel
	    });
	    let userProfileSummaryView = new View.UserProfileSummaryView({
	        model: customerModel
	    });
	    let userProfileView = new View.UserProfileView({
	        model: customerModel
	    });
	    let userTransactionView = new View.UserTransactionView();
	    // userTransactionView.render();
	    customerModel.on("change", function () {
	        userBadgeView.render();
	        if (customerModel.get("isLoggedIn")) {
	            userProfileSummaryView.render();
	        }
	    });
	    checkLogStatus(customerModel);
	    let loginMaskView = new View.LoginMaskView({
	        model: customerModel
	    });
	    let registrationMaskView = new View.RegisterMaskView({
	        model: customerModel
	    });
	    registrationMaskView.bindEvents();

	    let restaurantFilterModel = new Model.RestaurantFilterModel();
	    let restaurantTypeModel = new Model.RestaurantTypeModel();
	    let restaurantTypeView = new View.RestaurantTypeView({
	        model: restaurantTypeModel
	    });

	    let rsrCollection = new Collection.RestaurantSearchResultCollection();
	    let rsrView = new View.RestaurantSearchResultView({
	        model: rsrCollection
	    });
	    rsrCollection.on("change", function () {
	        rsrView.render();
	        restaurantFilterModel.bindSearchText();
	    });
	    restaurantFilterModel.on("change", function () {
	        $("#restaurant-search-table").html(utils.ui.overlayIcon);
	        restaurantFilterModel.preFetchValidation(restaurantTypeModel);
	        rsrCollection.fetchData(restaurantFilterModel.attributes);
	    });

	    $('#login-button').on("click", function () {
	        loginMaskView.render();
	    });

	    AppRouter.on('route:profile', function (cus_id) {
	        $("section.content-header").find("h1").html("Profile<small>And we deliver your favorite food!</small>");
	        $("#home-left-panel").find(".box").hide();
	        $("#home-right-panel").find(".box").hide();
	        userProfileSummaryView.render();
	        // userTransactionView.render();
	        userProfileSummaryView.$el.show();
	        userTransactionView.$el.show();
	    });
	    AppRouter.on('route:editProfile', function (cus_id) {
	        $("section.content-header").find("h1").html("Profile<small>And we deliver your favorite food!</small>");
	        $("#home-right-panel").find(".box").hide();
	        userProfileSummaryView.render();
	        userProfileView.render();
	        userProfileView.$el.show();
	    });
	    AppRouter.on('route:home', function () {
	        $("section.content-header").find("h1").html("Pick a Restaurant<small>And we deliver your favorite food!</small>");
	        $("#home-left-panel").find(".box").hide();
	        $("#home-right-panel").find(".box").hide();
	        restaurantTypeModel.fetchData();
	        restaurantTypeModel.on("change", function () {
	            restaurantTypeView.render();
	            restaurantFilterModel.bindEvents();
	            rsrView.render();
	            restaurantFilterModel.bindSearchText();
	            restaurantTypeView.$el.show();
	            rsrView.$el.show();
	        });
	    });
	    Backbone.history.start();
	    AppRouter.navigate("");
	});

	function loadDOMElements() {

	    $('input').iCheck({
	        checkboxClass: 'icheckbox_square-blue',
	        radioClass: 'iradio_square-blue',
	        increaseArea: '20%' // optional
	    });

	    // Date picker
	    $('#datepicker').datepicker({
	        autoclose: true
	    });

	    // Phone mask
	    $(":input").inputmask();

	    console.log("loaded.");
	}

	function checkLogStatus(customerModel) {
	    $.when($.getJSON("/logStatus")).done(function (data) {
	        if (data.hasOwnProperty("customer")) {
	            customerModel.parseWith(data.customer);
	            customerModel.set("isLoggedIn", true);
	        }
	    });
	}




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*\n * Page: index\n * ----------------------\n */\n\n/*\n *Filters\n */\n#side-filter {\n    margin-top: -30px;\n}\n\n#restaurant-cuisine {\n    min-height: 300px;\n}\n.hidden-range {\n    display: none;\n}\n\n/*\n * search-result\n */\n#restaurant-search-table {\n    min-height: 645px;\n}\n\n/*\n * Page: Login & Register\n * ----------------------\n */\n\n.login-logo,\n.register-logo {\n    font-size: 35px;\n    text-align: center;\n    margin-bottom: 25px;\n    font-weight: 300;\n}\n\n.login-logo a,\n.register-logo a {\n    color: #444;\n}\n\n.login-page,\n.register-page {\n    background-color: #d2d6de;\n}\n\n.login-background {\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    min-height: 100%;\n    height: inherit;\n    background-color: #d2d6de;\n    z-index: 2000;\n    /* for IE */\n    filter: alpha(opacity=90);\n    /* CSS3 standard */\n    opacity: 0.9;\n}\n\n.login-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    min-height: 100%;\n    margin: 0 auto;\n    background: transparent;\n    z-index: 3000;\n}\n\n.login-box {\n    width: 360px;\n    margin: 7% auto;\n    z-index: 3100;\n}\n\n.register-box {\n    width: 360px;\n    margin: 7% auto;\n}\n\n@media (max-width: 768px) {\n    .login-box,\n    .register-box {\n        width: 90%;\n        margin-top: 20px;\n    }\n}\n\n.login-box-body,\n.register-box-body {\n    background: #fff;\n    padding: 20px;\n    border-top: 0;\n    color: #666;\n}\n\n.login-box-body .form-control-feedback,\n.register-box-body .form-control-feedback {\n    color: #777;\n}\n\n.login-box-msg,\n.register-box-msg {\n    margin: 0;\n    text-align: center;\n    padding: 0 20px 20px 20px;\n}\n\n.social-auth-links {\n    margin: 10px 0;\n}\n\n#chk-err {\n    color: red;\n}\n\n.clearfix:before,\n.clearfix:after {\n    content: \" \";\n    display: table;\n}\n\n.clearfix:after {\n    clear: both;\n    overflow: hidden;\n}\n\n.clearfix {\n    zoom: 1;\n    /* IE < 8 */\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var AdminLTE_Options = {
	    //Add slimscroll to navbar menus
	    //This requires you to load the slimscroll plugin
	    //in every page before app.js
	    navbarMenuSlimscroll: true,
	    navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
	    navbarMenuHeight: "200px", //The height of the inner menu
	    //General animation speed for JS animated elements such as box collapse/expand and
	    //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
	    //'fast', 'normal', or 'slow'
	    animationSpeed: 500,
	    //Sidebar push menu toggle button selector
	    sidebarToggleSelector: "[data-toggle='offcanvas']",
	    //Activate sidebar push menu
	    sidebarPushMenu: true,
	    //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
	    sidebarSlimScroll: true,
	    //Enable sidebar expand on hover effect for sidebar mini
	    //This option is forced to true if both the fixed layout and sidebar mini
	    //are used together
	    sidebarExpandOnHover: false,
	    //BoxRefresh Plugin
	    enableBoxRefresh: true,
	    //Bootstrap.js tooltip
	    enableBSToppltip: true,
	    BSTooltipSelector: "[data-toggle='tooltip']",
	    //Enable Fast Click. Fastclick.js creates a more
	    //native touch experience with touch devices. If you
	    //choose to enable the plugin, make sure you load the script
	    //before AdminLTE's app.js
	    enableFastclick: true,
	    //Control Sidebar Options
	    enableControlSidebar: true,
	    controlSidebarOptions: {
	        //Which button should trigger the open/close event
	        toggleBtnSelector: "[data-toggle='control-sidebar']",
	        //The sidebar selector
	        selector: ".control-sidebar",
	        //Enable slide over content
	        slide: true
	    },
	    //Box Widget Plugin. Enable this plugin
	    //to allow boxes to be collapsed and/or removed
	    enableBoxWidget: true,
	    //Box Widget plugin options
	    boxWidgetOptions: {
	        boxWidgetIcons: {
	            //Collapse icon
	            collapse: 'fa-minus',
	            //Open icon
	            open: 'fa-plus',
	            //Remove icon
	            remove: 'fa-times'
	        },
	        boxWidgetSelectors: {
	            //Remove button selector
	            remove: '[data-widget="remove"]',
	            //Collapse button selector
	            collapse: '[data-widget="collapse"]'
	        }
	    },
	    //Direct Chat plugin options
	    directChat: {
	        //Enable direct chat by default
	        enable: true,
	        //The button to open and close the chat contacts pane
	        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
	    },
	    //Define the set of colors to use globally around the website
	    colors: {
	        lightBlue: "#3c8dbc",
	        red: "#f56954",
	        green: "#00a65a",
	        aqua: "#00c0ef",
	        yellow: "#f39c12",
	        blue: "#0073b7",
	        navy: "#001F3F",
	        teal: "#39CCCC",
	        olive: "#3D9970",
	        lime: "#01FF70",
	        orange: "#FF851B",
	        fuchsia: "#F012BE",
	        purple: "#8E24AA",
	        maroon: "#D81B60",
	        black: "#222222",
	        gray: "#d2d6de"
	    },
	    //The standard screen sizes that bootstrap uses.
	    //If you change these in the variables.less file, change
	    //them here too.
	    screenSizes: {
	        xs: 480,
	        sm: 768,
	        md: 992,
	        lg: 1200
	    }
	};

	module.exports = {
	    AdminLTE_Options: AdminLTE_Options
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* =========================================================
	 * bootstrap-datepicker.js
	 * Repo: https://github.com/eternicode/bootstrap-datepicker/
	 * Demo: http://eternicode.github.io/bootstrap-datepicker/
	 * Docs: http://bootstrap-datepicker.readthedocs.org/
	 * Forked from http://www.eyecon.ro/bootstrap-datepicker
	 * =========================================================
	 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */

	(function($, undefined){

		var $window = $(window);

		function UTCDate(){
			return new Date(Date.UTC.apply(Date, arguments));
		}
		function UTCToday(){
			var today = new Date();
			return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
		}
		function alias(method){
			return function(){
				return this[method].apply(this, arguments);
			};
		}

		var DateArray = (function(){
			var extras = {
				get: function(i){
					return this.slice(i)[0];
				},
				contains: function(d){
					// Array.indexOf is not cross-browser;
					// $.inArray doesn't work with Dates
					var val = d && d.valueOf();
					for (var i=0, l=this.length; i < l; i++)
						if (this[i].valueOf() === val)
							return i;
					return -1;
				},
				remove: function(i){
					this.splice(i,1);
				},
				replace: function(new_array){
					if (!new_array)
						return;
					if (!$.isArray(new_array))
						new_array = [new_array];
					this.clear();
					this.push.apply(this, new_array);
				},
				clear: function(){
					this.splice(0);
				},
				copy: function(){
					var a = new DateArray();
					a.replace(this);
					return a;
				}
			};

			return function(){
				var a = [];
				a.push.apply(a, arguments);
				$.extend(a, extras);
				return a;
			};
		})();


		// Picker object

		var Datepicker = function(element, options){
			this.dates = new DateArray();
			this.viewDate = UTCToday();
			this.focusDate = null;

			this._process_options(options);

			this.element = $(element);
			this.isInline = false;
			this.isInput = this.element.is('input');
			this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
			this.hasInput = this.component && this.element.find('input').length;
			if (this.component && this.component.length === 0)
				this.component = false;

			this.picker = $(DPGlobal.template);
			this._buildEvents();
			this._attachEvents();

			if (this.isInline){
				this.picker.addClass('datepicker-inline').appendTo(this.element);
			}
			else {
				this.picker.addClass('datepicker-dropdown dropdown-menu');
			}

			if (this.o.rtl){
				this.picker.addClass('datepicker-rtl');
			}

			this.viewMode = this.o.startView;

			if (this.o.calendarWeeks)
				this.picker.find('tfoot th.today')
							.attr('colspan', function(i, val){
								return parseInt(val) + 1;
							});

			this._allow_update = false;

			this.setStartDate(this._o.startDate);
			this.setEndDate(this._o.endDate);
			this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

			this.fillDow();
			this.fillMonths();

			this._allow_update = true;

			this.update();
			this.showMode();

			if (this.isInline){
				this.show();
			}
		};

		Datepicker.prototype = {
			constructor: Datepicker,

			_process_options: function(opts){
				// Store raw options for reference
				this._o = $.extend({}, this._o, opts);
				// Processed options
				var o = this.o = $.extend({}, this._o);

				// Check if "de-DE" style date is available, if not language should
				// fallback to 2 letter code eg "de"
				var lang = o.language;
				if (!dates[lang]){
					lang = lang.split('-')[0];
					if (!dates[lang])
						lang = defaults.language;
				}
				o.language = lang;

				switch (o.startView){
					case 2:
					case 'decade':
						o.startView = 2;
						break;
					case 1:
					case 'year':
						o.startView = 1;
						break;
					default:
						o.startView = 0;
				}

				switch (o.minViewMode){
					case 1:
					case 'months':
						o.minViewMode = 1;
						break;
					case 2:
					case 'years':
						o.minViewMode = 2;
						break;
					default:
						o.minViewMode = 0;
				}

				o.startView = Math.max(o.startView, o.minViewMode);

				// true, false, or Number > 0
				if (o.multidate !== true){
					o.multidate = Number(o.multidate) || false;
					if (o.multidate !== false)
						o.multidate = Math.max(0, o.multidate);
					else
						o.multidate = 1;
				}
				o.multidateSeparator = String(o.multidateSeparator);

				o.weekStart %= 7;
				o.weekEnd = ((o.weekStart + 6) % 7);

				var format = DPGlobal.parseFormat(o.format);
				if (o.startDate !== -Infinity){
					if (!!o.startDate){
						if (o.startDate instanceof Date)
							o.startDate = this._local_to_utc(this._zero_time(o.startDate));
						else
							o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
					}
					else {
						o.startDate = -Infinity;
					}
				}
				if (o.endDate !== Infinity){
					if (!!o.endDate){
						if (o.endDate instanceof Date)
							o.endDate = this._local_to_utc(this._zero_time(o.endDate));
						else
							o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
					}
					else {
						o.endDate = Infinity;
					}
				}

				o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
				if (!$.isArray(o.daysOfWeekDisabled))
					o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
				o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
					return parseInt(d, 10);
				});

				var plc = String(o.orientation).toLowerCase().split(/\s+/g),
					_plc = o.orientation.toLowerCase();
				plc = $.grep(plc, function(word){
					return (/^auto|left|right|top|bottom$/).test(word);
				});
				o.orientation = {x: 'auto', y: 'auto'};
				if (!_plc || _plc === 'auto')
					; // no action
				else if (plc.length === 1){
					switch (plc[0]){
						case 'top':
						case 'bottom':
							o.orientation.y = plc[0];
							break;
						case 'left':
						case 'right':
							o.orientation.x = plc[0];
							break;
					}
				}
				else {
					_plc = $.grep(plc, function(word){
						return (/^left|right$/).test(word);
					});
					o.orientation.x = _plc[0] || 'auto';

					_plc = $.grep(plc, function(word){
						return (/^top|bottom$/).test(word);
					});
					o.orientation.y = _plc[0] || 'auto';
				}
			},
			_events: [],
			_secondaryEvents: [],
			_applyEvents: function(evs){
				for (var i=0, el, ch, ev; i < evs.length; i++){
					el = evs[i][0];
					if (evs[i].length === 2){
						ch = undefined;
						ev = evs[i][1];
					}
					else if (evs[i].length === 3){
						ch = evs[i][1];
						ev = evs[i][2];
					}
					el.on(ev, ch);
				}
			},
			_unapplyEvents: function(evs){
				for (var i=0, el, ev, ch; i < evs.length; i++){
					el = evs[i][0];
					if (evs[i].length === 2){
						ch = undefined;
						ev = evs[i][1];
					}
					else if (evs[i].length === 3){
						ch = evs[i][1];
						ev = evs[i][2];
					}
					el.off(ev, ch);
				}
			},
			_buildEvents: function(){
				if (this.isInput){ // single input
					this._events = [
						[this.element, {
							focus: $.proxy(this.show, this),
							keyup: $.proxy(function(e){
								if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
									this.update();
							}, this),
							keydown: $.proxy(this.keydown, this)
						}]
					];
				}
				else if (this.component && this.hasInput){ // component: input + button
					this._events = [
						// For components that are not readonly, allow keyboard nav
						[this.element.find('input'), {
							focus: $.proxy(this.show, this),
							keyup: $.proxy(function(e){
								if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
									this.update();
							}, this),
							keydown: $.proxy(this.keydown, this)
						}],
						[this.component, {
							click: $.proxy(this.show, this)
						}]
					];
				}
				else if (this.element.is('div')){  // inline datepicker
					this.isInline = true;
				}
				else {
					this._events = [
						[this.element, {
							click: $.proxy(this.show, this)
						}]
					];
				}
				this._events.push(
					// Component: listen for blur on element descendants
					[this.element, '*', {
						blur: $.proxy(function(e){
							this._focused_from = e.target;
						}, this)
					}],
					// Input: listen for blur on element
					[this.element, {
						blur: $.proxy(function(e){
							this._focused_from = e.target;
						}, this)
					}]
				);

				this._secondaryEvents = [
					[this.picker, {
						click: $.proxy(this.click, this)
					}],
					[$(window), {
						resize: $.proxy(this.place, this)
					}],
					[$(document), {
						'mousedown touchstart': $.proxy(function(e){
							// Clicked outside the datepicker, hide it
							if (!(
								this.element.is(e.target) ||
								this.element.find(e.target).length ||
								this.picker.is(e.target) ||
								this.picker.find(e.target).length
							)){
								this.hide();
							}
						}, this)
					}]
				];
			},
			_attachEvents: function(){
				this._detachEvents();
				this._applyEvents(this._events);
			},
			_detachEvents: function(){
				this._unapplyEvents(this._events);
			},
			_attachSecondaryEvents: function(){
				this._detachSecondaryEvents();
				this._applyEvents(this._secondaryEvents);
			},
			_detachSecondaryEvents: function(){
				this._unapplyEvents(this._secondaryEvents);
			},
			_trigger: function(event, altdate){
				var date = altdate || this.dates.get(-1),
					local_date = this._utc_to_local(date);

				this.element.trigger({
					type: event,
					date: local_date,
					dates: $.map(this.dates, this._utc_to_local),
					format: $.proxy(function(ix, format){
						if (arguments.length === 0){
							ix = this.dates.length - 1;
							format = this.o.format;
						}
						else if (typeof ix === 'string'){
							format = ix;
							ix = this.dates.length - 1;
						}
						format = format || this.o.format;
						var date = this.dates.get(ix);
						return DPGlobal.formatDate(date, format, this.o.language);
					}, this)
				});
			},

			show: function(){
				if (!this.isInline)
					this.picker.appendTo('body');
				this.picker.show();
				this.place();
				this._attachSecondaryEvents();
				this._trigger('show');
			},

			hide: function(){
				if (this.isInline)
					return;
				if (!this.picker.is(':visible'))
					return;
				this.focusDate = null;
				this.picker.hide().detach();
				this._detachSecondaryEvents();
				this.viewMode = this.o.startView;
				this.showMode();

				if (
					this.o.forceParse &&
					(
						this.isInput && this.element.val() ||
						this.hasInput && this.element.find('input').val()
					)
				)
					this.setValue();
				this._trigger('hide');
			},

			remove: function(){
				this.hide();
				this._detachEvents();
				this._detachSecondaryEvents();
				this.picker.remove();
				delete this.element.data().datepicker;
				if (!this.isInput){
					delete this.element.data().date;
				}
			},

			_utc_to_local: function(utc){
				return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
			},
			_local_to_utc: function(local){
				return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
			},
			_zero_time: function(local){
				return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
			},
			_zero_utc_time: function(utc){
				return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
			},

			getDates: function(){
				return $.map(this.dates, this._utc_to_local);
			},

			getUTCDates: function(){
				return $.map(this.dates, function(d){
					return new Date(d);
				});
			},

			getDate: function(){
				return this._utc_to_local(this.getUTCDate());
			},

			getUTCDate: function(){
				return new Date(this.dates.get(-1));
			},

			setDates: function(){
				var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
				this.update.apply(this, args);
				this._trigger('changeDate');
				this.setValue();
			},

			setUTCDates: function(){
				var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
				this.update.apply(this, $.map(args, this._utc_to_local));
				this._trigger('changeDate');
				this.setValue();
			},

			setDate: alias('setDates'),
			setUTCDate: alias('setUTCDates'),

			setValue: function(){
				var formatted = this.getFormattedDate();
				if (!this.isInput){
					if (this.component){
						this.element.find('input').val(formatted).change();
					}
				}
				else {
					this.element.val(formatted).change();
				}
			},

			getFormattedDate: function(format){
				if (format === undefined)
					format = this.o.format;

				var lang = this.o.language;
				return $.map(this.dates, function(d){
					return DPGlobal.formatDate(d, format, lang);
				}).join(this.o.multidateSeparator);
			},

			setStartDate: function(startDate){
				this._process_options({startDate: startDate});
				this.update();
				this.updateNavArrows();
			},

			setEndDate: function(endDate){
				this._process_options({endDate: endDate});
				this.update();
				this.updateNavArrows();
			},

			setDaysOfWeekDisabled: function(daysOfWeekDisabled){
				this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
				this.update();
				this.updateNavArrows();
			},

			place: function(){
				if (this.isInline)
					return;
				var calendarWidth = this.picker.outerWidth(),
					calendarHeight = this.picker.outerHeight(),
					visualPadding = 10,
					windowWidth = $window.width(),
					windowHeight = $window.height(),
					scrollTop = $window.scrollTop();

				var zIndex = parseInt(this.element.parents().filter(function(){
						return $(this).css('z-index') !== 'auto';
					}).first().css('z-index'))+10;
				var offset = this.component ? this.component.parent().offset() : this.element.offset();
				var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
				var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
				var left = offset.left,
					top = offset.top;

				this.picker.removeClass(
					'datepicker-orient-top datepicker-orient-bottom '+
					'datepicker-orient-right datepicker-orient-left'
				);

				if (this.o.orientation.x !== 'auto'){
					this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
					if (this.o.orientation.x === 'right')
						left -= calendarWidth - width;
				}
				// auto x orientation is best-placement: if it crosses a window
				// edge, fudge it sideways
				else {
					// Default to left
					this.picker.addClass('datepicker-orient-left');
					if (offset.left < 0)
						left -= offset.left - visualPadding;
					else if (offset.left + calendarWidth > windowWidth)
						left = windowWidth - calendarWidth - visualPadding;
				}

				// auto y orientation is best-situation: top or bottom, no fudging,
				// decision based on which shows more of the calendar
				var yorient = this.o.orientation.y,
					top_overflow, bottom_overflow;
				if (yorient === 'auto'){
					top_overflow = -scrollTop + offset.top - calendarHeight;
					bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
					if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
						yorient = 'top';
					else
						yorient = 'bottom';
				}
				this.picker.addClass('datepicker-orient-' + yorient);
				if (yorient === 'top')
					top += height;
				else
					top -= calendarHeight + parseInt(this.picker.css('padding-top'));

				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			},

			_allow_update: true,
			update: function(){
				if (!this._allow_update)
					return;

				var oldDates = this.dates.copy(),
					dates = [],
					fromArgs = false;
				if (arguments.length){
					$.each(arguments, $.proxy(function(i, date){
						if (date instanceof Date)
							date = this._local_to_utc(date);
						dates.push(date);
					}, this));
					fromArgs = true;
				}
				else {
					dates = this.isInput
							? this.element.val()
							: this.element.data('date') || this.element.find('input').val();
					if (dates && this.o.multidate)
						dates = dates.split(this.o.multidateSeparator);
					else
						dates = [dates];
					delete this.element.data().date;
				}

				dates = $.map(dates, $.proxy(function(date){
					return DPGlobal.parseDate(date, this.o.format, this.o.language);
				}, this));
				dates = $.grep(dates, $.proxy(function(date){
					return (
						date < this.o.startDate ||
						date > this.o.endDate ||
						!date
					);
				}, this), true);
				this.dates.replace(dates);

				if (this.dates.length)
					this.viewDate = new Date(this.dates.get(-1));
				else if (this.viewDate < this.o.startDate)
					this.viewDate = new Date(this.o.startDate);
				else if (this.viewDate > this.o.endDate)
					this.viewDate = new Date(this.o.endDate);

				if (fromArgs){
					// setting date by clicking
					this.setValue();
				}
				else if (dates.length){
					// setting date by typing
					if (String(oldDates) !== String(this.dates))
						this._trigger('changeDate');
				}
				if (!this.dates.length && oldDates.length)
					this._trigger('clearDate');

				this.fill();
			},

			fillDow: function(){
				var dowCnt = this.o.weekStart,
					html = '<tr>';
				if (this.o.calendarWeeks){
					var cell = '<th class="cw">&nbsp;</th>';
					html += cell;
					this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
				}
				while (dowCnt < this.o.weekStart + 7){
					html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
				}
				html += '</tr>';
				this.picker.find('.datepicker-days thead').append(html);
			},

			fillMonths: function(){
				var html = '',
				i = 0;
				while (i < 12){
					html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
				}
				this.picker.find('.datepicker-months td').html(html);
			},

			setRange: function(range){
				if (!range || !range.length)
					delete this.range;
				else
					this.range = $.map(range, function(d){
						return d.valueOf();
					});
				this.fill();
			},

			getClassNames: function(date){
				var cls = [],
					year = this.viewDate.getUTCFullYear(),
					month = this.viewDate.getUTCMonth(),
					today = new Date();
				if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
					cls.push('old');
				}
				else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
					cls.push('new');
				}
				if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
					cls.push('focused');
				// Compare internal UTC date with local today, not UTC today
				if (this.o.todayHighlight &&
					date.getUTCFullYear() === today.getFullYear() &&
					date.getUTCMonth() === today.getMonth() &&
					date.getUTCDate() === today.getDate()){
					cls.push('today');
				}
				if (this.dates.contains(date) !== -1)
					cls.push('active');
				if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
					$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
					cls.push('disabled');
				}
				if (this.range){
					if (date > this.range[0] && date < this.range[this.range.length-1]){
						cls.push('range');
					}
					if ($.inArray(date.valueOf(), this.range) !== -1){
						cls.push('selected');
					}
				}
				return cls;
			},

			fill: function(){
				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth(),
					startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
					startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
					endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
					endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
					todaytxt = dates[this.o.language].today || dates['en'].today || '',
					cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
					tooltip;
				this.picker.find('.datepicker-days thead th.datepicker-switch')
							.text(dates[this.o.language].months[month]+' '+year);
				this.picker.find('tfoot th.today')
							.text(todaytxt)
							.toggle(this.o.todayBtn !== false);
				this.picker.find('tfoot th.clear')
							.text(cleartxt)
							.toggle(this.o.clearBtn !== false);
				this.updateNavArrows();
				this.fillMonths();
				var prevMonth = UTCDate(year, month-1, 28),
					day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
				prevMonth.setUTCDate(day);
				prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
				var nextMonth = new Date(prevMonth);
				nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
				nextMonth = nextMonth.valueOf();
				var html = [];
				var clsName;
				while (prevMonth.valueOf() < nextMonth){
					if (prevMonth.getUTCDay() === this.o.weekStart){
						html.push('<tr>');
						if (this.o.calendarWeeks){
							// ISO 8601: First week contains first thursday.
							// ISO also states week starts on Monday, but we can be more abstract here.
							var
								// Start of current week: based on weekstart/current date
								ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
								// Thursday of this week
								th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
								// First Thursday of year, year from thursday
								yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
								// Calendar week: ms between thursdays, div ms per day, div 7 days
								calWeek =  (th - yth) / 864e5 / 7 + 1;
							html.push('<td class="cw">'+ calWeek +'</td>');

						}
					}
					clsName = this.getClassNames(prevMonth);
					clsName.push('day');

					if (this.o.beforeShowDay !== $.noop){
						var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
						if (before === undefined)
							before = {};
						else if (typeof(before) === 'boolean')
							before = {enabled: before};
						else if (typeof(before) === 'string')
							before = {classes: before};
						if (before.enabled === false)
							clsName.push('disabled');
						if (before.classes)
							clsName = clsName.concat(before.classes.split(/\s+/));
						if (before.tooltip)
							tooltip = before.tooltip;
					}

					clsName = $.unique(clsName);
					html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
					if (prevMonth.getUTCDay() === this.o.weekEnd){
						html.push('</tr>');
					}
					prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
				}
				this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

				var months = this.picker.find('.datepicker-months')
							.find('th:eq(1)')
								.text(year)
								.end()
							.find('span').removeClass('active');

				$.each(this.dates, function(i, d){
					if (d.getUTCFullYear() === year)
						months.eq(d.getUTCMonth()).addClass('active');
				});

				if (year < startYear || year > endYear){
					months.addClass('disabled');
				}
				if (year === startYear){
					months.slice(0, startMonth).addClass('disabled');
				}
				if (year === endYear){
					months.slice(endMonth+1).addClass('disabled');
				}

				html = '';
				year = parseInt(year/10, 10) * 10;
				var yearCont = this.picker.find('.datepicker-years')
									.find('th:eq(1)')
										.text(year + '-' + (year + 9))
										.end()
									.find('td');
				year -= 1;
				var years = $.map(this.dates, function(d){
						return d.getUTCFullYear();
					}),
					classes;
				for (var i = -1; i < 11; i++){
					classes = ['year'];
					if (i === -1)
						classes.push('old');
					else if (i === 10)
						classes.push('new');
					if ($.inArray(year, years) !== -1)
						classes.push('active');
					if (year < startYear || year > endYear)
						classes.push('disabled');
					html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
					year += 1;
				}
				yearCont.html(html);
			},

			updateNavArrows: function(){
				if (!this._allow_update)
					return;

				var d = new Date(this.viewDate),
					year = d.getUTCFullYear(),
					month = d.getUTCMonth();
				switch (this.viewMode){
					case 0:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
							this.picker.find('.prev').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
							this.picker.find('.next').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
					case 1:
					case 2:
						if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
							this.picker.find('.prev').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.prev').css({visibility: 'visible'});
						}
						if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
							this.picker.find('.next').css({visibility: 'hidden'});
						}
						else {
							this.picker.find('.next').css({visibility: 'visible'});
						}
						break;
				}
			},

			click: function(e){
				e.preventDefault();
				var target = $(e.target).closest('span, td, th'),
					year, month, day;
				if (target.length === 1){
					switch (target[0].nodeName.toLowerCase()){
						case 'th':
							switch (target[0].className){
								case 'datepicker-switch':
									this.showMode(1);
									break;
								case 'prev':
								case 'next':
									var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
									switch (this.viewMode){
										case 0:
											this.viewDate = this.moveMonth(this.viewDate, dir);
											this._trigger('changeMonth', this.viewDate);
											break;
										case 1:
										case 2:
											this.viewDate = this.moveYear(this.viewDate, dir);
											if (this.viewMode === 1)
												this._trigger('changeYear', this.viewDate);
											break;
									}
									this.fill();
									break;
								case 'today':
									var date = new Date();
									date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

									this.showMode(-2);
									var which = this.o.todayBtn === 'linked' ? null : 'view';
									this._setDate(date, which);
									break;
								case 'clear':
									var element;
									if (this.isInput)
										element = this.element;
									else if (this.component)
										element = this.element.find('input');
									if (element)
										element.val("").change();
									this.update();
									this._trigger('changeDate');
									if (this.o.autoclose)
										this.hide();
									break;
							}
							break;
						case 'span':
							if (!target.is('.disabled')){
								this.viewDate.setUTCDate(1);
								if (target.is('.month')){
									day = 1;
									month = target.parent().find('span').index(target);
									year = this.viewDate.getUTCFullYear();
									this.viewDate.setUTCMonth(month);
									this._trigger('changeMonth', this.viewDate);
									if (this.o.minViewMode === 1){
										this._setDate(UTCDate(year, month, day));
									}
								}
								else {
									day = 1;
									month = 0;
									year = parseInt(target.text(), 10)||0;
									this.viewDate.setUTCFullYear(year);
									this._trigger('changeYear', this.viewDate);
									if (this.o.minViewMode === 2){
										this._setDate(UTCDate(year, month, day));
									}
								}
								this.showMode(-1);
								this.fill();
							}
							break;
						case 'td':
							if (target.is('.day') && !target.is('.disabled')){
								day = parseInt(target.text(), 10)||1;
								year = this.viewDate.getUTCFullYear();
								month = this.viewDate.getUTCMonth();
								if (target.is('.old')){
									if (month === 0){
										month = 11;
										year -= 1;
									}
									else {
										month -= 1;
									}
								}
								else if (target.is('.new')){
									if (month === 11){
										month = 0;
										year += 1;
									}
									else {
										month += 1;
									}
								}
								this._setDate(UTCDate(year, month, day));
							}
							break;
					}
				}
				if (this.picker.is(':visible') && this._focused_from){
					$(this._focused_from).focus();
				}
				delete this._focused_from;
			},

			_toggle_multidate: function(date){
				var ix = this.dates.contains(date);
				if (!date){
					this.dates.clear();
				}
				else if (ix !== -1){
					this.dates.remove(ix);
				}
				else {
					this.dates.push(date);
				}
				if (typeof this.o.multidate === 'number')
					while (this.dates.length > this.o.multidate)
						this.dates.remove(0);
			},

			_setDate: function(date, which){
				if (!which || which === 'date')
					this._toggle_multidate(date && new Date(date));
				if (!which || which  === 'view')
					this.viewDate = date && new Date(date);

				this.fill();
				this.setValue();
				this._trigger('changeDate');
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
				if (this.o.autoclose && (!which || which === 'date')){
					this.hide();
				}
			},

			moveMonth: function(date, dir){
				if (!date)
					return undefined;
				if (!dir)
					return date;
				var new_date = new Date(date.valueOf()),
					day = new_date.getUTCDate(),
					month = new_date.getUTCMonth(),
					mag = Math.abs(dir),
					new_month, test;
				dir = dir > 0 ? 1 : -1;
				if (mag === 1){
					test = dir === -1
						// If going back one month, make sure month is not current month
						// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
						? function(){
							return new_date.getUTCMonth() === month;
						}
						// If going forward one month, make sure month is as expected
						// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
						: function(){
							return new_date.getUTCMonth() !== new_month;
						};
					new_month = month + dir;
					new_date.setUTCMonth(new_month);
					// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
					if (new_month < 0 || new_month > 11)
						new_month = (new_month + 12) % 12;
				}
				else {
					// For magnitudes >1, move one month at a time...
					for (var i=0; i < mag; i++)
						// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
						new_date = this.moveMonth(new_date, dir);
					// ...then reset the day, keeping it in the new month
					new_month = new_date.getUTCMonth();
					new_date.setUTCDate(day);
					test = function(){
						return new_month !== new_date.getUTCMonth();
					};
				}
				// Common date-resetting loop -- if date is beyond end of month, make it
				// end of month
				while (test()){
					new_date.setUTCDate(--day);
					new_date.setUTCMonth(new_month);
				}
				return new_date;
			},

			moveYear: function(date, dir){
				return this.moveMonth(date, dir*12);
			},

			dateWithinRange: function(date){
				return date >= this.o.startDate && date <= this.o.endDate;
			},

			keydown: function(e){
				if (this.picker.is(':not(:visible)')){
					if (e.keyCode === 27) // allow escape to hide and re-show picker
						this.show();
					return;
				}
				var dateChanged = false,
					dir, newDate, newViewDate,
					focusDate = this.focusDate || this.viewDate;
				switch (e.keyCode){
					case 27: // escape
						if (this.focusDate){
							this.focusDate = null;
							this.viewDate = this.dates.get(-1) || this.viewDate;
							this.fill();
						}
						else
							this.hide();
						e.preventDefault();
						break;
					case 37: // left
					case 39: // right
						if (!this.o.keyboardNavigation)
							break;
						dir = e.keyCode === 37 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveYear(focusDate, dir);
							this._trigger('changeYear', this.viewDate);
						}
						else if (e.shiftKey){
							newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveMonth(focusDate, dir);
							this._trigger('changeMonth', this.viewDate);
						}
						else {
							newDate = new Date(this.dates.get(-1) || UTCToday());
							newDate.setUTCDate(newDate.getUTCDate() + dir);
							newViewDate = new Date(focusDate);
							newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
						}
						if (this.dateWithinRange(newDate)){
							this.focusDate = this.viewDate = newViewDate;
							this.setValue();
							this.fill();
							e.preventDefault();
						}
						break;
					case 38: // up
					case 40: // down
						if (!this.o.keyboardNavigation)
							break;
						dir = e.keyCode === 38 ? -1 : 1;
						if (e.ctrlKey){
							newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveYear(focusDate, dir);
							this._trigger('changeYear', this.viewDate);
						}
						else if (e.shiftKey){
							newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
							newViewDate = this.moveMonth(focusDate, dir);
							this._trigger('changeMonth', this.viewDate);
						}
						else {
							newDate = new Date(this.dates.get(-1) || UTCToday());
							newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
							newViewDate = new Date(focusDate);
							newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
						}
						if (this.dateWithinRange(newDate)){
							this.focusDate = this.viewDate = newViewDate;
							this.setValue();
							this.fill();
							e.preventDefault();
						}
						break;
					case 32: // spacebar
						// Spacebar is used in manually typing dates in some formats.
						// As such, its behavior should not be hijacked.
						break;
					case 13: // enter
						focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
						this._toggle_multidate(focusDate);
						dateChanged = true;
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.setValue();
						this.fill();
						if (this.picker.is(':visible')){
							e.preventDefault();
							if (this.o.autoclose)
								this.hide();
						}
						break;
					case 9: // tab
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
						this.hide();
						break;
				}
				if (dateChanged){
					if (this.dates.length)
						this._trigger('changeDate');
					else
						this._trigger('clearDate');
					var element;
					if (this.isInput){
						element = this.element;
					}
					else if (this.component){
						element = this.element.find('input');
					}
					if (element){
						element.change();
					}
				}
			},

			showMode: function(dir){
				if (dir){
					this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
				}
				this.picker
					.find('>div')
					.hide()
					.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
						.css('display', 'block');
				this.updateNavArrows();
			}
		};

		var DateRangePicker = function(element, options){
			this.element = $(element);
			this.inputs = $.map(options.inputs, function(i){
				return i.jquery ? i[0] : i;
			});
			delete options.inputs;

			$(this.inputs)
				.datepicker(options)
				.bind('changeDate', $.proxy(this.dateUpdated, this));

			this.pickers = $.map(this.inputs, function(i){
				return $(i).data('datepicker');
			});
			this.updateDates();
		};
		DateRangePicker.prototype = {
			updateDates: function(){
				this.dates = $.map(this.pickers, function(i){
					return i.getUTCDate();
				});
				this.updateRanges();
			},
			updateRanges: function(){
				var range = $.map(this.dates, function(d){
					return d.valueOf();
				});
				$.each(this.pickers, function(i, p){
					p.setRange(range);
				});
			},
			dateUpdated: function(e){
				// `this.updating` is a workaround for preventing infinite recursion
				// between `changeDate` triggering and `setUTCDate` calling.  Until
				// there is a better mechanism.
				if (this.updating)
					return;
				this.updating = true;

				var dp = $(e.target).data('datepicker'),
					new_date = dp.getUTCDate(),
					i = $.inArray(e.target, this.inputs),
					l = this.inputs.length;
				if (i === -1)
					return;

				$.each(this.pickers, function(i, p){
					if (!p.getUTCDate())
						p.setUTCDate(new_date);
				});

				if (new_date < this.dates[i]){
					// Date being moved earlier/left
					while (i >= 0 && new_date < this.dates[i]){
						this.pickers[i--].setUTCDate(new_date);
					}
				}
				else if (new_date > this.dates[i]){
					// Date being moved later/right
					while (i < l && new_date > this.dates[i]){
						this.pickers[i++].setUTCDate(new_date);
					}
				}
				this.updateDates();

				delete this.updating;
			},
			remove: function(){
				$.map(this.pickers, function(p){ p.remove(); });
				delete this.element.data().datepicker;
			}
		};

		function opts_from_el(el, prefix){
			// Derive options from element data-attrs
			var data = $(el).data(),
				out = {}, inkey,
				replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
			prefix = new RegExp('^' + prefix.toLowerCase());
			function re_lower(_,a){
				return a.toLowerCase();
			}
			for (var key in data)
				if (prefix.test(key)){
					inkey = key.replace(replace, re_lower);
					out[inkey] = data[key];
				}
			return out;
		}

		function opts_from_locale(lang){
			// Derive options from locale plugins
			var out = {};
			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					return;
			}
			var d = dates[lang];
			$.each(locale_opts, function(i,k){
				if (k in d)
					out[k] = d[k];
			});
			return out;
		}

		var old = $.fn.datepicker;
		$.fn.datepicker = function(option){
			var args = Array.apply(null, arguments);
			args.shift();
			var internal_return;
			this.each(function(){
				var $this = $(this),
					data = $this.data('datepicker'),
					options = typeof option === 'object' && option;
				if (!data){
					var elopts = opts_from_el(this, 'date'),
						// Preliminary otions
						xopts = $.extend({}, defaults, elopts, options),
						locopts = opts_from_locale(xopts.language),
						// Options priority: js args, data-attrs, locales, defaults
						opts = $.extend({}, defaults, locopts, elopts, options);
					if ($this.is('.input-daterange') || opts.inputs){
						var ropts = {
							inputs: opts.inputs || $this.find('input').toArray()
						};
						$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
					}
					else {
						$this.data('datepicker', (data = new Datepicker(this, opts)));
					}
				}
				if (typeof option === 'string' && typeof data[option] === 'function'){
					internal_return = data[option].apply(data, args);
					if (internal_return !== undefined)
						return false;
				}
			});
			if (internal_return !== undefined)
				return internal_return;
			else
				return this;
		};

		var defaults = $.fn.datepicker.defaults = {
			autoclose: false,
			beforeShowDay: $.noop,
			calendarWeeks: false,
			clearBtn: false,
			daysOfWeekDisabled: [],
			endDate: Infinity,
			forceParse: true,
			format: 'mm/dd/yyyy',
			keyboardNavigation: true,
			language: 'en',
			minViewMode: 0,
			multidate: false,
			multidateSeparator: ',',
			orientation: "auto",
			rtl: false,
			startDate: -Infinity,
			startView: 0,
			todayBtn: false,
			todayHighlight: false,
			weekStart: 0
		};
		var locale_opts = $.fn.datepicker.locale_opts = [
			'format',
			'rtl',
			'weekStart'
		];
		$.fn.datepicker.Constructor = Datepicker;
		var dates = $.fn.datepicker.dates = {
			en: {
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				today: "Today",
				clear: "Clear"
			}
		};

		var DPGlobal = {
			modes: [
				{
					clsName: 'days',
					navFnc: 'Month',
					navStep: 1
				},
				{
					clsName: 'months',
					navFnc: 'FullYear',
					navStep: 1
				},
				{
					clsName: 'years',
					navFnc: 'FullYear',
					navStep: 10
			}],
			isLeapYear: function(year){
				return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
			},
			getDaysInMonth: function(year, month){
				return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
			},
			validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
			nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
			parseFormat: function(format){
				// IE treats \0 as a string end in inputs (truncating the value),
				// so it's a bad format delimiter, anyway
				var separators = format.replace(this.validParts, '\0').split('\0'),
					parts = format.match(this.validParts);
				if (!separators || !separators.length || !parts || parts.length === 0){
					throw new Error("Invalid date format.");
				}
				return {separators: separators, parts: parts};
			},
			parseDate: function(date, format, language){
				if (!date)
					return undefined;
				if (date instanceof Date)
					return date;
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					part, dir, i;
				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
					date = new Date();
					for (i=0; i < parts.length; i++){
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						switch (part[2]){
							case 'd':
								date.setUTCDate(date.getUTCDate() + dir);
								break;
							case 'm':
								date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
								break;
							case 'w':
								date.setUTCDate(date.getUTCDate() + dir * 7);
								break;
							case 'y':
								date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
								break;
						}
					}
					return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
				}
				parts = date && date.match(this.nonpunctuation) || [];
				date = new Date();
				var parsed = {},
					setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
					setters_map = {
						yyyy: function(d,v){
							return d.setUTCFullYear(v);
						},
						yy: function(d,v){
							return d.setUTCFullYear(2000+v);
						},
						m: function(d,v){
							if (isNaN(d))
								return d;
							v -= 1;
							while (v < 0) v += 12;
							v %= 12;
							d.setUTCMonth(v);
							while (d.getUTCMonth() !== v)
								d.setUTCDate(d.getUTCDate()-1);
							return d;
						},
						d: function(d,v){
							return d.setUTCDate(v);
						}
					},
					val, filtered;
				setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
				setters_map['dd'] = setters_map['d'];
				date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
				var fparts = format.parts.slice();
				// Remove noop parts
				if (parts.length !== fparts.length){
					fparts = $(fparts).filter(function(i,p){
						return $.inArray(p, setters_order) !== -1;
					}).toArray();
				}
				// Process remainder
				function match_part(){
					var m = this.slice(0, parts[i].length),
						p = parts[i].slice(0, m.length);
					return m === p;
				}
				if (parts.length === fparts.length){
					var cnt;
					for (i=0, cnt = fparts.length; i < cnt; i++){
						val = parseInt(parts[i], 10);
						part = fparts[i];
						if (isNaN(val)){
							switch (part){
								case 'MM':
									filtered = $(dates[language].months).filter(match_part);
									val = $.inArray(filtered[0], dates[language].months) + 1;
									break;
								case 'M':
									filtered = $(dates[language].monthsShort).filter(match_part);
									val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
									break;
							}
						}
						parsed[part] = val;
					}
					var _date, s;
					for (i=0; i < setters_order.length; i++){
						s = setters_order[i];
						if (s in parsed && !isNaN(parsed[s])){
							_date = new Date(date);
							setters_map[s](_date, parsed[s]);
							if (!isNaN(_date))
								date = _date;
						}
					}
				}
				return date;
			},
			formatDate: function(date, format, language){
				if (!date)
					return '';
				if (typeof format === 'string')
					format = DPGlobal.parseFormat(format);
				var val = {
					d: date.getUTCDate(),
					D: dates[language].daysShort[date.getUTCDay()],
					DD: dates[language].days[date.getUTCDay()],
					m: date.getUTCMonth() + 1,
					M: dates[language].monthsShort[date.getUTCMonth()],
					MM: dates[language].months[date.getUTCMonth()],
					yy: date.getUTCFullYear().toString().substring(2),
					yyyy: date.getUTCFullYear()
				};
				val.dd = (val.d < 10 ? '0' : '') + val.d;
				val.mm = (val.m < 10 ? '0' : '') + val.m;
				date = [];
				var seps = $.extend([], format.separators);
				for (var i=0, cnt = format.parts.length; i <= cnt; i++){
					if (seps.length)
						date.push(seps.shift());
					date.push(val[format.parts[i]]);
				}
				return date.join('');
			},
			headTemplate: '<thead>'+
								'<tr>'+
									'<th class="prev">&laquo;</th>'+
									'<th colspan="5" class="datepicker-switch"></th>'+
									'<th class="next">&raquo;</th>'+
								'</tr>'+
							'</thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
			footTemplate: '<tfoot>'+
								'<tr>'+
									'<th colspan="7" class="today"></th>'+
								'</tr>'+
								'<tr>'+
									'<th colspan="7" class="clear"></th>'+
								'</tr>'+
							'</tfoot>'
		};
		DPGlobal.template = '<div class="datepicker">'+
								'<div class="datepicker-days">'+
									'<table class="table table-condensed">'+
										DPGlobal.headTemplate+
										'<tbody></tbody>'+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-months">'+
									'<table class="table table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
								'<div class="datepicker-years">'+
									'<table class="table table-condensed">'+
										DPGlobal.headTemplate+
										DPGlobal.contTemplate+
										DPGlobal.footTemplate+
									'</table>'+
								'</div>'+
							'</div>';

		$.fn.datepicker.DPGlobal = DPGlobal;


		/* DATEPICKER NO CONFLICT
		* =================== */

		$.fn.datepicker.noConflict = function(){
			$.fn.datepicker = old;
			return this;
		};


		/* DATEPICKER DATA-API
		* ================== */

		$(document).on(
			'focus.datepicker.data-api click.datepicker.data-api',
			'[data-provide="datepicker"]',
			function(e){
				var $this = $(this);
				if ($this.data('datepicker'))
					return;
				e.preventDefault();
				// component click requires us to explicitly show it
				$this.datepicker('show');
			}
		);
		$(function(){
			$('[data-provide="datepicker-inline"]').datepicker();
		});

	}(window.jQuery));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Ion.RangeSlider
	// version 2.1.4 Build: 355
	// © Denis Ineshin, 2016
	// https://github.com/IonDen
	//
	// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
	// GitHub page:     https://github.com/IonDen/ion.rangeSlider
	//
	// Released under MIT licence:
	// http://ionden.com/a/plugins/licence-en.html
	// =====================================================================================================================

	(function (factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
	            factory($, document, window, navigator);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        factory(jQuery, document, window, navigator);
	    }
	} (function ($, document, window, navigator, undefined) {
	    "use strict";

	    // =================================================================================================================
	    // Service

	    var plugin_count = 0;

	    // IE8 fix
	    var is_old_ie = (function () {
	        var n = navigator.userAgent,
	            r = /msie\s\d+/i,
	            v;
	        if (n.search(r) > 0) {
	            v = r.exec(n).toString();
	            v = v.split(" ")[1];
	            if (v < 9) {
	                $("html").addClass("lt-ie9");
	                return true;
	            }
	        }
	        return false;
	    } ());
	    if (!Function.prototype.bind) {
	        Function.prototype.bind = function bind(that) {

	            var target = this;
	            var slice = [].slice;

	            if (typeof target != "function") {
	                throw new TypeError();
	            }

	            var args = slice.call(arguments, 1),
	                bound = function () {

	                    if (this instanceof bound) {

	                        var F = function(){};
	                        F.prototype = target.prototype;
	                        var self = new F();

	                        var result = target.apply(
	                            self,
	                            args.concat(slice.call(arguments))
	                        );
	                        if (Object(result) === result) {
	                            return result;
	                        }
	                        return self;

	                    } else {

	                        return target.apply(
	                            that,
	                            args.concat(slice.call(arguments))
	                        );

	                    }

	                };

	            return bound;
	        };
	    }
	    if (!Array.prototype.indexOf) {
	        Array.prototype.indexOf = function(searchElement, fromIndex) {
	            var k;
	            if (this == null) {
	                throw new TypeError('"this" is null or not defined');
	            }
	            var O = Object(this);
	            var len = O.length >>> 0;
	            if (len === 0) {
	                return -1;
	            }
	            var n = +fromIndex || 0;
	            if (Math.abs(n) === Infinity) {
	                n = 0;
	            }
	            if (n >= len) {
	                return -1;
	            }
	            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
	            while (k < len) {
	                if (k in O && O[k] === searchElement) {
	                    return k;
	                }
	                k++;
	            }
	            return -1;
	        };
	    }



	    // =================================================================================================================
	    // Template

	    var base_html =
	        '<span class="irs">' +
	        '<span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span>' +
	        '<span class="irs-min">0</span><span class="irs-max">1</span>' +
	        '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' +
	        '</span>' +
	        '<span class="irs-grid"></span>' +
	        '<span class="irs-bar"></span>';

	    var single_html =
	        '<span class="irs-bar-edge"></span>' +
	        '<span class="irs-shadow shadow-single"></span>' +
	        '<span class="irs-slider single"></span>';

	    var double_html =
	        '<span class="irs-shadow shadow-from"></span>' +
	        '<span class="irs-shadow shadow-to"></span>' +
	        '<span class="irs-slider from"></span>' +
	        '<span class="irs-slider to"></span>';

	    var disable_html =
	        '<span class="irs-disable-mask"></span>';



	    // =================================================================================================================
	    // Core

	    /**
	     * Main plugin constructor
	     *
	     * @param input {Object} link to base input element
	     * @param options {Object} slider config
	     * @param plugin_count {Number}
	     * @constructor
	     */
	    var IonRangeSlider = function (input, options, plugin_count) {
	        this.VERSION = "2.1.4";
	        this.input = input;
	        this.plugin_count = plugin_count;
	        this.current_plugin = 0;
	        this.calc_count = 0;
	        this.update_tm = 0;
	        this.old_from = 0;
	        this.old_to = 0;
	        this.old_min_interval = null;
	        this.raf_id = null;
	        this.dragging = false;
	        this.force_redraw = false;
	        this.no_diapason = false;
	        this.is_key = false;
	        this.is_update = false;
	        this.is_start = true;
	        this.is_finish = false;
	        this.is_active = false;
	        this.is_resize = false;
	        this.is_click = false;

	        // cache for links to all DOM elements
	        this.$cache = {
	            win: $(window),
	            body: $(document.body),
	            input: $(input),
	            cont: null,
	            rs: null,
	            min: null,
	            max: null,
	            from: null,
	            to: null,
	            single: null,
	            bar: null,
	            line: null,
	            s_single: null,
	            s_from: null,
	            s_to: null,
	            shad_single: null,
	            shad_from: null,
	            shad_to: null,
	            edge: null,
	            grid: null,
	            grid_labels: []
	        };

	        // storage for measure variables
	        this.coords = {
	            // left
	            x_gap: 0,
	            x_pointer: 0,

	            // width
	            w_rs: 0,
	            w_rs_old: 0,
	            w_handle: 0,

	            // percents
	            p_gap: 0,
	            p_gap_left: 0,
	            p_gap_right: 0,
	            p_step: 0,
	            p_pointer: 0,
	            p_handle: 0,
	            p_single_fake: 0,
	            p_single_real: 0,
	            p_from_fake: 0,
	            p_from_real: 0,
	            p_to_fake: 0,
	            p_to_real: 0,
	            p_bar_x: 0,
	            p_bar_w: 0,

	            // grid
	            grid_gap: 0,
	            big_num: 0,
	            big: [],
	            big_w: [],
	            big_p: [],
	            big_x: []
	        };

	        // storage for labels measure variables
	        this.labels = {
	            // width
	            w_min: 0,
	            w_max: 0,
	            w_from: 0,
	            w_to: 0,
	            w_single: 0,

	            // percents
	            p_min: 0,
	            p_max: 0,
	            p_from_fake: 0,
	            p_from_left: 0,
	            p_to_fake: 0,
	            p_to_left: 0,
	            p_single_fake: 0,
	            p_single_left: 0
	        };



	        /**
	         * get and validate config
	         */
	        var $inp = this.$cache.input,
	            val = $inp.prop("value"),
	            config, config_from_data, prop;

	        // default config
	        config = {
	            type: "single",

	            min: 10,
	            max: 100,
	            from: null,
	            to: null,
	            step: 1,

	            min_interval: 0,
	            max_interval: 0,
	            drag_interval: false,

	            values: [],
	            p_values: [],

	            from_fixed: false,
	            from_min: null,
	            from_max: null,
	            from_shadow: false,

	            to_fixed: false,
	            to_min: null,
	            to_max: null,
	            to_shadow: false,

	            prettify_enabled: true,
	            prettify_separator: " ",
	            prettify: null,

	            force_edges: false,

	            keyboard: false,
	            keyboard_step: 5,

	            grid: false,
	            grid_margin: true,
	            grid_num: 4,
	            grid_snap: false,

	            hide_min_max: false,
	            hide_from_to: false,

	            prefix: "",
	            postfix: "",
	            max_postfix: "",
	            decorate_both: true,
	            values_separator: " — ",

	            input_values_separator: ";",

	            disable: false,

	            onStart: null,
	            onChange: null,
	            onFinish: null,
	            onUpdate: null
	        };



	        // config from data-attributes extends js config
	        config_from_data = {
	            type: $inp.data("type"),

	            min: $inp.data("min"),
	            max: $inp.data("max"),
	            from: $inp.data("from"),
	            to: $inp.data("to"),
	            step: $inp.data("step"),

	            min_interval: $inp.data("minInterval"),
	            max_interval: $inp.data("maxInterval"),
	            drag_interval: $inp.data("dragInterval"),

	            values: $inp.data("values"),

	            from_fixed: $inp.data("fromFixed"),
	            from_min: $inp.data("fromMin"),
	            from_max: $inp.data("fromMax"),
	            from_shadow: $inp.data("fromShadow"),

	            to_fixed: $inp.data("toFixed"),
	            to_min: $inp.data("toMin"),
	            to_max: $inp.data("toMax"),
	            to_shadow: $inp.data("toShadow"),

	            prettify_enabled: $inp.data("prettifyEnabled"),
	            prettify_separator: $inp.data("prettifySeparator"),

	            force_edges: $inp.data("forceEdges"),

	            keyboard: $inp.data("keyboard"),
	            keyboard_step: $inp.data("keyboardStep"),

	            grid: $inp.data("grid"),
	            grid_margin: $inp.data("gridMargin"),
	            grid_num: $inp.data("gridNum"),
	            grid_snap: $inp.data("gridSnap"),

	            hide_min_max: $inp.data("hideMinMax"),
	            hide_from_to: $inp.data("hideFromTo"),

	            prefix: $inp.data("prefix"),
	            postfix: $inp.data("postfix"),
	            max_postfix: $inp.data("maxPostfix"),
	            decorate_both: $inp.data("decorateBoth"),
	            values_separator: $inp.data("valuesSeparator"),

	            input_values_separator: $inp.data("inputValuesSeparator"),

	            disable: $inp.data("disable")
	        };
	        config_from_data.values = config_from_data.values && config_from_data.values.split(",");

	        for (prop in config_from_data) {
	            if (config_from_data.hasOwnProperty(prop)) {
	                if (!config_from_data[prop] && config_from_data[prop] !== 0) {
	                    delete config_from_data[prop];
	                }
	            }
	        }



	        // input value extends default config
	        if (val) {
	            val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

	            if (val[0] && val[0] == +val[0]) {
	                val[0] = +val[0];
	            }
	            if (val[1] && val[1] == +val[1]) {
	                val[1] = +val[1];
	            }

	            if (options && options.values && options.values.length) {
	                config.from = val[0] && options.values.indexOf(val[0]);
	                config.to = val[1] && options.values.indexOf(val[1]);
	            } else {
	                config.from = val[0] && +val[0];
	                config.to = val[1] && +val[1];
	            }
	        }



	        // js config extends default config
	        $.extend(config, options);


	        // data config extends config
	        $.extend(config, config_from_data);
	        this.options = config;



	        // validate config, to be sure that all data types are correct
	        this.validate();



	        // default result object, returned to callbacks
	        this.result = {
	            input: this.$cache.input,
	            slider: null,

	            min: this.options.min,
	            max: this.options.max,

	            from: this.options.from,
	            from_percent: 0,
	            from_value: null,

	            to: this.options.to,
	            to_percent: 0,
	            to_value: null
	        };



	        this.init();
	    };

	    IonRangeSlider.prototype = {

	        /**
	         * Starts or updates the plugin instance
	         *
	         * @param is_update {boolean}
	         */
	        init: function (is_update) {
	            this.no_diapason = false;
	            this.coords.p_step = this.convertToPercent(this.options.step, true);

	            this.target = "base";

	            this.toggleInput();
	            this.append();
	            this.setMinMax();

	            if (is_update) {
	                this.force_redraw = true;
	                this.calc(true);

	                // callbacks called
	                this.callOnUpdate();
	            } else {
	                this.force_redraw = true;
	                this.calc(true);

	                // callbacks called
	                this.callOnStart();
	            }

	            this.updateScene();
	        },

	        /**
	         * Appends slider template to a DOM
	         */
	        append: function () {
	            var container_html = '<span class="irs js-irs-' + this.plugin_count + '"></span>';
	            this.$cache.input.before(container_html);
	            this.$cache.input.prop("readonly", true);
	            this.$cache.cont = this.$cache.input.prev();
	            this.result.slider = this.$cache.cont;

	            this.$cache.cont.html(base_html);
	            this.$cache.rs = this.$cache.cont.find(".irs");
	            this.$cache.min = this.$cache.cont.find(".irs-min");
	            this.$cache.max = this.$cache.cont.find(".irs-max");
	            this.$cache.from = this.$cache.cont.find(".irs-from");
	            this.$cache.to = this.$cache.cont.find(".irs-to");
	            this.$cache.single = this.$cache.cont.find(".irs-single");
	            this.$cache.bar = this.$cache.cont.find(".irs-bar");
	            this.$cache.line = this.$cache.cont.find(".irs-line");
	            this.$cache.grid = this.$cache.cont.find(".irs-grid");

	            if (this.options.type === "single") {
	                this.$cache.cont.append(single_html);
	                this.$cache.edge = this.$cache.cont.find(".irs-bar-edge");
	                this.$cache.s_single = this.$cache.cont.find(".single");
	                this.$cache.from[0].style.visibility = "hidden";
	                this.$cache.to[0].style.visibility = "hidden";
	                this.$cache.shad_single = this.$cache.cont.find(".shadow-single");
	            } else {
	                this.$cache.cont.append(double_html);
	                this.$cache.s_from = this.$cache.cont.find(".from");
	                this.$cache.s_to = this.$cache.cont.find(".to");
	                this.$cache.shad_from = this.$cache.cont.find(".shadow-from");
	                this.$cache.shad_to = this.$cache.cont.find(".shadow-to");

	                this.setTopHandler();
	            }

	            if (this.options.hide_from_to) {
	                this.$cache.from[0].style.display = "none";
	                this.$cache.to[0].style.display = "none";
	                this.$cache.single[0].style.display = "none";
	            }

	            this.appendGrid();

	            if (this.options.disable) {
	                this.appendDisableMask();
	                this.$cache.input[0].disabled = true;
	            } else {
	                this.$cache.cont.removeClass("irs-disabled");
	                this.$cache.input[0].disabled = false;
	                this.bindEvents();
	            }

	            if (this.options.drag_interval) {
	                this.$cache.bar[0].style.cursor = "ew-resize";
	            }
	        },

	        /**
	         * Determine which handler has a priority
	         * works only for double slider type
	         */
	        setTopHandler: function () {
	            var min = this.options.min,
	                max = this.options.max,
	                from = this.options.from,
	                to = this.options.to;

	            if (from > min && to === max) {
	                this.$cache.s_from.addClass("type_last");
	            } else if (to < max) {
	                this.$cache.s_to.addClass("type_last");
	            }
	        },

	        /**
	         * Determine which handles was clicked last
	         * and which handler should have hover effect
	         *
	         * @param target {String}
	         */
	        changeLevel: function (target) {
	            switch (target) {
	                case "single":
	                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
	                    break;
	                case "from":
	                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
	                    this.$cache.s_from.addClass("state_hover");
	                    this.$cache.s_from.addClass("type_last");
	                    this.$cache.s_to.removeClass("type_last");
	                    break;
	                case "to":
	                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
	                    this.$cache.s_to.addClass("state_hover");
	                    this.$cache.s_to.addClass("type_last");
	                    this.$cache.s_from.removeClass("type_last");
	                    break;
	                case "both":
	                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
	                    this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer);
	                    this.$cache.s_to.removeClass("type_last");
	                    this.$cache.s_from.removeClass("type_last");
	                    break;
	            }
	        },

	        /**
	         * Then slider is disabled
	         * appends extra layer with opacity
	         */
	        appendDisableMask: function () {
	            this.$cache.cont.append(disable_html);
	            this.$cache.cont.addClass("irs-disabled");
	        },

	        /**
	         * Remove slider instance
	         * and ubind all events
	         */
	        remove: function () {
	            this.$cache.cont.remove();
	            this.$cache.cont = null;

	            this.$cache.line.off("keydown.irs_" + this.plugin_count);

	            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
	            this.$cache.body.off("mousemove.irs_" + this.plugin_count);

	            this.$cache.win.off("touchend.irs_" + this.plugin_count);
	            this.$cache.win.off("mouseup.irs_" + this.plugin_count);

	            if (is_old_ie) {
	                this.$cache.body.off("mouseup.irs_" + this.plugin_count);
	                this.$cache.body.off("mouseleave.irs_" + this.plugin_count);
	            }

	            this.$cache.grid_labels = [];
	            this.coords.big = [];
	            this.coords.big_w = [];
	            this.coords.big_p = [];
	            this.coords.big_x = [];

	            cancelAnimationFrame(this.raf_id);
	        },

	        /**
	         * bind all slider events
	         */
	        bindEvents: function () {
	            if (this.no_diapason) {
	                return;
	            }

	            this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
	            this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));

	            this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
	            this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));

	            this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	            this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

	            if (this.options.drag_interval && this.options.type === "double") {
	                this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
	                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
	            } else {
	                this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	            }

	            if (this.options.type === "single") {
	                this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
	                this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
	                this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

	                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
	                this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
	                this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	                this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	            } else {
	                this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
	                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null));

	                this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
	                this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
	                this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
	                this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
	                this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	                this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

	                this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
	                this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
	                this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
	                this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
	                this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	                this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
	            }

	            if (this.options.keyboard) {
	                this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
	            }

	            if (is_old_ie) {
	                this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
	                this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this));
	            }
	        },

	        /**
	         * Mousemove or touchmove
	         * only for handlers
	         *
	         * @param e {Object} event object
	         */
	        pointerMove: function (e) {
	            if (!this.dragging) {
	                return;
	            }

	            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
	            this.coords.x_pointer = x - this.coords.x_gap;

	            this.calc();
	        },

	        /**
	         * Mouseup or touchend
	         * only for handlers
	         *
	         * @param e {Object} event object
	         */
	        pointerUp: function (e) {
	            if (this.current_plugin !== this.plugin_count) {
	                return;
	            }

	            if (this.is_active) {
	                this.is_active = false;
	            } else {
	                return;
	            }

	            this.$cache.cont.find(".state_hover").removeClass("state_hover");

	            this.force_redraw = true;

	            if (is_old_ie) {
	                $("*").prop("unselectable", false);
	            }

	            this.updateScene();
	            this.restoreOriginalMinInterval();

	            // callbacks call
	            if ($.contains(this.$cache.cont[0], e.target) || this.dragging) {
	                this.is_finish = true;
	                this.callOnFinish();
	            }
	            
	            this.dragging = false;
	        },

	        /**
	         * Mousedown or touchstart
	         * only for handlers
	         *
	         * @param target {String|null}
	         * @param e {Object} event object
	         */
	        pointerDown: function (target, e) {
	            e.preventDefault();
	            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
	            if (e.button === 2) {
	                return;
	            }

	            if (target === "both") {
	                this.setTempMinInterval();
	            }

	            if (!target) {
	                target = this.target;
	            }

	            this.current_plugin = this.plugin_count;
	            this.target = target;

	            this.is_active = true;
	            this.dragging = true;

	            this.coords.x_gap = this.$cache.rs.offset().left;
	            this.coords.x_pointer = x - this.coords.x_gap;

	            this.calcPointerPercent();
	            this.changeLevel(target);

	            if (is_old_ie) {
	                $("*").prop("unselectable", true);
	            }

	            this.$cache.line.trigger("focus");

	            this.updateScene();
	        },

	        /**
	         * Mousedown or touchstart
	         * for other slider elements, like diapason line
	         *
	         * @param target {String}
	         * @param e {Object} event object
	         */
	        pointerClick: function (target, e) {
	            e.preventDefault();
	            var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
	            if (e.button === 2) {
	                return;
	            }

	            this.current_plugin = this.plugin_count;
	            this.target = target;

	            this.is_click = true;
	            this.coords.x_gap = this.$cache.rs.offset().left;
	            this.coords.x_pointer = +(x - this.coords.x_gap).toFixed();

	            this.force_redraw = true;
	            this.calc();

	            this.$cache.line.trigger("focus");
	        },

	        /**
	         * Keyborard controls for focused slider
	         *
	         * @param target {String}
	         * @param e {Object} event object
	         * @returns {boolean|undefined}
	         */
	        key: function (target, e) {
	            if (this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
	                return;
	            }

	            switch (e.which) {
	                case 83: // W
	                case 65: // A
	                case 40: // DOWN
	                case 37: // LEFT
	                    e.preventDefault();
	                    this.moveByKey(false);
	                    break;

	                case 87: // S
	                case 68: // D
	                case 38: // UP
	                case 39: // RIGHT
	                    e.preventDefault();
	                    this.moveByKey(true);
	                    break;
	            }

	            return true;
	        },

	        /**
	         * Move by key. Beta
	         * @todo refactor than have plenty of time
	         *
	         * @param right {boolean} direction to move
	         */
	        moveByKey: function (right) {
	            var p = this.coords.p_pointer;

	            if (right) {
	                p += this.options.keyboard_step;
	            } else {
	                p -= this.options.keyboard_step;
	            }

	            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * p);
	            this.is_key = true;
	            this.calc();
	        },

	        /**
	         * Set visibility and content
	         * of Min and Max labels
	         */
	        setMinMax: function () {
	            if (!this.options) {
	                return;
	            }

	            if (this.options.hide_min_max) {
	                this.$cache.min[0].style.display = "none";
	                this.$cache.max[0].style.display = "none";
	                return;
	            }

	            if (this.options.values.length) {
	                this.$cache.min.html(this.decorate(this.options.p_values[this.options.min]));
	                this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
	            } else {
	                this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min));
	                this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max));
	            }

	            this.labels.w_min = this.$cache.min.outerWidth(false);
	            this.labels.w_max = this.$cache.max.outerWidth(false);
	        },

	        /**
	         * Then dragging interval, prevent interval collapsing
	         * using min_interval option
	         */
	        setTempMinInterval: function () {
	            var interval = this.result.to - this.result.from;

	            if (this.old_min_interval === null) {
	                this.old_min_interval = this.options.min_interval;
	            }

	            this.options.min_interval = interval;
	        },

	        /**
	         * Restore min_interval option to original
	         */
	        restoreOriginalMinInterval: function () {
	            if (this.old_min_interval !== null) {
	                this.options.min_interval = this.old_min_interval;
	                this.old_min_interval = null;
	            }
	        },



	        // =============================================================================================================
	        // Calculations

	        /**
	         * All calculations and measures start here
	         *
	         * @param update {boolean=}
	         */
	        calc: function (update) {
	            if (!this.options) {
	                return;
	            }

	            this.calc_count++;

	            if (this.calc_count === 10 || update) {
	                this.calc_count = 0;
	                this.coords.w_rs = this.$cache.rs.outerWidth(false);

	                this.calcHandlePercent();
	            }

	            if (!this.coords.w_rs) {
	                return;
	            }

	            this.calcPointerPercent();
	            var handle_x = this.getHandleX();

	            if (this.target === "click") {
	                this.coords.p_gap = this.coords.p_handle / 2;
	                handle_x = this.getHandleX();

	                if (this.options.drag_interval) {
	                    this.target = "both_one";
	                } else {
	                    this.target = this.chooseHandle(handle_x);
	                }
	            }

	            switch (this.target) {
	                case "base":
	                    var w = (this.options.max - this.options.min) / 100,
	                        f = (this.result.from - this.options.min) / w,
	                        t = (this.result.to - this.options.min) / w;

	                    this.coords.p_single_real = this.toFixed(f);
	                    this.coords.p_from_real = this.toFixed(f);
	                    this.coords.p_to_real = this.toFixed(t);

	                    this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
	                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
	                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);

	                    this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
	                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
	                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

	                    this.target = null;

	                    break;

	                case "single":
	                    if (this.options.from_fixed) {
	                        break;
	                    }

	                    this.coords.p_single_real = this.convertToRealPercent(handle_x);
	                    this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
	                    this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);

	                    this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);

	                    break;

	                case "from":
	                    if (this.options.from_fixed) {
	                        break;
	                    }

	                    this.coords.p_from_real = this.convertToRealPercent(handle_x);
	                    this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
	                    if (this.coords.p_from_real > this.coords.p_to_real) {
	                        this.coords.p_from_real = this.coords.p_to_real;
	                    }
	                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
	                    this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
	                    this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");

	                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

	                    break;

	                case "to":
	                    if (this.options.to_fixed) {
	                        break;
	                    }

	                    this.coords.p_to_real = this.convertToRealPercent(handle_x);
	                    this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
	                    if (this.coords.p_to_real < this.coords.p_from_real) {
	                        this.coords.p_to_real = this.coords.p_from_real;
	                    }
	                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
	                    this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
	                    this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");

	                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

	                    break;

	                case "both":
	                    if (this.options.from_fixed || this.options.to_fixed) {
	                        break;
	                    }

	                    handle_x = this.toFixed(handle_x + (this.coords.p_handle * 0.1));

	                    this.coords.p_from_real = this.convertToRealPercent(handle_x) - this.coords.p_gap_left;
	                    this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
	                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
	                    this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
	                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

	                    this.coords.p_to_real = this.convertToRealPercent(handle_x) + this.coords.p_gap_right;
	                    this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
	                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
	                    this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
	                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

	                    break;

	                case "both_one":
	                    if (this.options.from_fixed || this.options.to_fixed) {
	                        break;
	                    }

	                    var real_x = this.convertToRealPercent(handle_x),
	                        from = this.result.from_percent,
	                        to = this.result.to_percent,
	                        full = to - from,
	                        half = full / 2,
	                        new_from = real_x - half,
	                        new_to = real_x + half;

	                    if (new_from < 0) {
	                        new_from = 0;
	                        new_to = new_from + full;
	                    }

	                    if (new_to > 100) {
	                        new_to = 100;
	                        new_from = new_to - full;
	                    }

	                    this.coords.p_from_real = this.calcWithStep(new_from);
	                    this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
	                    this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

	                    this.coords.p_to_real = this.calcWithStep(new_to);
	                    this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
	                    this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

	                    break;
	            }

	            if (this.options.type === "single") {
	                this.coords.p_bar_x = (this.coords.p_handle / 2);
	                this.coords.p_bar_w = this.coords.p_single_fake;

	                this.result.from_percent = this.coords.p_single_real;
	                this.result.from = this.convertToValue(this.coords.p_single_real);

	                if (this.options.values.length) {
	                    this.result.from_value = this.options.values[this.result.from];
	                }
	            } else {
	                this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + (this.coords.p_handle / 2));
	                this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake);

	                this.result.from_percent = this.coords.p_from_real;
	                this.result.from = this.convertToValue(this.coords.p_from_real);
	                this.result.to_percent = this.coords.p_to_real;
	                this.result.to = this.convertToValue(this.coords.p_to_real);

	                if (this.options.values.length) {
	                    this.result.from_value = this.options.values[this.result.from];
	                    this.result.to_value = this.options.values[this.result.to];
	                }
	            }

	            this.calcMinMax();
	            this.calcLabels();
	        },


	        /**
	         * calculates pointer X in percent
	         */
	        calcPointerPercent: function () {
	            if (!this.coords.w_rs) {
	                this.coords.p_pointer = 0;
	                return;
	            }

	            if (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)  ) {
	                this.coords.x_pointer = 0;
	            } else if (this.coords.x_pointer > this.coords.w_rs) {
	                this.coords.x_pointer = this.coords.w_rs;
	            }

	            this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100);
	        },

	        convertToRealPercent: function (fake) {
	            var full = 100 - this.coords.p_handle;
	            return fake / full * 100;
	        },

	        convertToFakePercent: function (real) {
	            var full = 100 - this.coords.p_handle;
	            return real / 100 * full;
	        },

	        getHandleX: function () {
	            var max = 100 - this.coords.p_handle,
	                x = this.toFixed(this.coords.p_pointer - this.coords.p_gap);

	            if (x < 0) {
	                x = 0;
	            } else if (x > max) {
	                x = max;
	            }

	            return x;
	        },

	        calcHandlePercent: function () {
	            if (this.options.type === "single") {
	                this.coords.w_handle = this.$cache.s_single.outerWidth(false);
	            } else {
	                this.coords.w_handle = this.$cache.s_from.outerWidth(false);
	            }

	            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
	        },

	        /**
	         * Find closest handle to pointer click
	         *
	         * @param real_x {Number}
	         * @returns {String}
	         */
	        chooseHandle: function (real_x) {
	            if (this.options.type === "single") {
	                return "single";
	            } else {
	                var m_point = this.coords.p_from_real + ((this.coords.p_to_real - this.coords.p_from_real) / 2);
	                if (real_x >= m_point) {
	                    return this.options.to_fixed ? "from" : "to";
	                } else {
	                    return this.options.from_fixed ? "to" : "from";
	                }
	            }
	        },

	        /**
	         * Measure Min and Max labels width in percent
	         */
	        calcMinMax: function () {
	            if (!this.coords.w_rs) {
	                return;
	            }

	            this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100;
	            this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100;
	        },

	        /**
	         * Measure labels width and X in percent
	         */
	        calcLabels: function () {
	            if (!this.coords.w_rs || this.options.hide_from_to) {
	                return;
	            }

	            if (this.options.type === "single") {

	                this.labels.w_single = this.$cache.single.outerWidth(false);
	                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
	                this.labels.p_single_left = this.coords.p_single_fake + (this.coords.p_handle / 2) - (this.labels.p_single_fake / 2);
	                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

	            } else {

	                this.labels.w_from = this.$cache.from.outerWidth(false);
	                this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100;
	                this.labels.p_from_left = this.coords.p_from_fake + (this.coords.p_handle / 2) - (this.labels.p_from_fake / 2);
	                this.labels.p_from_left = this.toFixed(this.labels.p_from_left);
	                this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake);

	                this.labels.w_to = this.$cache.to.outerWidth(false);
	                this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100;
	                this.labels.p_to_left = this.coords.p_to_fake + (this.coords.p_handle / 2) - (this.labels.p_to_fake / 2);
	                this.labels.p_to_left = this.toFixed(this.labels.p_to_left);
	                this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake);

	                this.labels.w_single = this.$cache.single.outerWidth(false);
	                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
	                this.labels.p_single_left = ((this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2) - (this.labels.p_single_fake / 2);
	                this.labels.p_single_left = this.toFixed(this.labels.p_single_left);
	                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

	            }
	        },



	        // =============================================================================================================
	        // Drawings

	        /**
	         * Main function called in request animation frame
	         * to update everything
	         */
	        updateScene: function () {
	            if (this.raf_id) {
	                cancelAnimationFrame(this.raf_id);
	                this.raf_id = null;
	            }

	            clearTimeout(this.update_tm);
	            this.update_tm = null;

	            if (!this.options) {
	                return;
	            }

	            this.drawHandles();

	            if (this.is_active) {
	                this.raf_id = requestAnimationFrame(this.updateScene.bind(this));
	            } else {
	                this.update_tm = setTimeout(this.updateScene.bind(this), 300);
	            }
	        },

	        /**
	         * Draw handles
	         */
	        drawHandles: function () {
	            this.coords.w_rs = this.$cache.rs.outerWidth(false);

	            if (!this.coords.w_rs) {
	                return;
	            }

	            if (this.coords.w_rs !== this.coords.w_rs_old) {
	                this.target = "base";
	                this.is_resize = true;
	            }

	            if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) {
	                this.setMinMax();
	                this.calc(true);
	                this.drawLabels();
	                if (this.options.grid) {
	                    this.calcGridMargin();
	                    this.calcGridLabels();
	                }
	                this.force_redraw = true;
	                this.coords.w_rs_old = this.coords.w_rs;
	                this.drawShadow();
	            }

	            if (!this.coords.w_rs) {
	                return;
	            }

	            if (!this.dragging && !this.force_redraw && !this.is_key) {
	                return;
	            }

	            if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {

	                this.drawLabels();

	                this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
	                this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";

	                if (this.options.type === "single") {
	                    this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";

	                    this.$cache.single[0].style.left = this.labels.p_single_left + "%";

	                    if (this.options.values.length) {
	                        this.$cache.input.prop("value", this.result.from_value);
	                    } else {
	                        this.$cache.input.prop("value", this.result.from);
	                    }
	                    this.$cache.input.data("from", this.result.from);
	                } else {
	                    this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
	                    this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";

	                    if (this.old_from !== this.result.from || this.force_redraw) {
	                        this.$cache.from[0].style.left = this.labels.p_from_left + "%";
	                    }
	                    if (this.old_to !== this.result.to || this.force_redraw) {
	                        this.$cache.to[0].style.left = this.labels.p_to_left + "%";
	                    }

	                    this.$cache.single[0].style.left = this.labels.p_single_left + "%";

	                    if (this.options.values.length) {
	                        this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value);
	                    } else {
	                        this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
	                    }
	                    this.$cache.input.data("from", this.result.from);
	                    this.$cache.input.data("to", this.result.to);
	                }

	                if ((this.old_from !== this.result.from || this.old_to !== this.result.to) && !this.is_start) {
	                    this.$cache.input.trigger("change");
	                }

	                this.old_from = this.result.from;
	                this.old_to = this.result.to;

	                // callbacks call
	                if (!this.is_resize && !this.is_update && !this.is_start && !this.is_finish) {
	                    this.callOnChange();
	                }
	                if (this.is_key || this.is_click) {
	                    this.is_key = false;
	                    this.is_click = false;
	                    this.callOnFinish();
	                }

	                this.is_update = false;
	                this.is_resize = false;
	                this.is_finish = false;
	            }

	            this.is_start = false;
	            this.is_key = false;
	            this.is_click = false;
	            this.force_redraw = false;
	        },

	        /**
	         * Draw labels
	         * measure labels collisions
	         * collapse close labels
	         */
	        drawLabels: function () {
	            if (!this.options) {
	                return;
	            }

	            var values_num = this.options.values.length,
	                p_values = this.options.p_values,
	                text_single,
	                text_from,
	                text_to;

	            if (this.options.hide_from_to) {
	                return;
	            }

	            if (this.options.type === "single") {

	                if (values_num) {
	                    text_single = this.decorate(p_values[this.result.from]);
	                    this.$cache.single.html(text_single);
	                } else {
	                    text_single = this.decorate(this._prettify(this.result.from), this.result.from);
	                    this.$cache.single.html(text_single);
	                }

	                this.calcLabels();

	                if (this.labels.p_single_left < this.labels.p_min + 1) {
	                    this.$cache.min[0].style.visibility = "hidden";
	                } else {
	                    this.$cache.min[0].style.visibility = "visible";
	                }

	                if (this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1) {
	                    this.$cache.max[0].style.visibility = "hidden";
	                } else {
	                    this.$cache.max[0].style.visibility = "visible";
	                }

	            } else {

	                if (values_num) {

	                    if (this.options.decorate_both) {
	                        text_single = this.decorate(p_values[this.result.from]);
	                        text_single += this.options.values_separator;
	                        text_single += this.decorate(p_values[this.result.to]);
	                    } else {
	                        text_single = this.decorate(p_values[this.result.from] + this.options.values_separator + p_values[this.result.to]);
	                    }
	                    text_from = this.decorate(p_values[this.result.from]);
	                    text_to = this.decorate(p_values[this.result.to]);

	                    this.$cache.single.html(text_single);
	                    this.$cache.from.html(text_from);
	                    this.$cache.to.html(text_to);

	                } else {

	                    if (this.options.decorate_both) {
	                        text_single = this.decorate(this._prettify(this.result.from), this.result.from);
	                        text_single += this.options.values_separator;
	                        text_single += this.decorate(this._prettify(this.result.to), this.result.to);
	                    } else {
	                        text_single = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.to);
	                    }
	                    text_from = this.decorate(this._prettify(this.result.from), this.result.from);
	                    text_to = this.decorate(this._prettify(this.result.to), this.result.to);

	                    this.$cache.single.html(text_single);
	                    this.$cache.from.html(text_from);
	                    this.$cache.to.html(text_to);

	                }

	                this.calcLabels();

	                var min = Math.min(this.labels.p_single_left, this.labels.p_from_left),
	                    single_left = this.labels.p_single_left + this.labels.p_single_fake,
	                    to_left = this.labels.p_to_left + this.labels.p_to_fake,
	                    max = Math.max(single_left, to_left);

	                if (this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left) {
	                    this.$cache.from[0].style.visibility = "hidden";
	                    this.$cache.to[0].style.visibility = "hidden";
	                    this.$cache.single[0].style.visibility = "visible";

	                    if (this.result.from === this.result.to) {
	                        if (this.target === "from") {
	                            this.$cache.from[0].style.visibility = "visible";
	                        } else if (this.target === "to") {
	                            this.$cache.to[0].style.visibility = "visible";
	                        } else if (!this.target) {
	                            this.$cache.from[0].style.visibility = "visible";
	                        }
	                        this.$cache.single[0].style.visibility = "hidden";
	                        max = to_left;
	                    } else {
	                        this.$cache.from[0].style.visibility = "hidden";
	                        this.$cache.to[0].style.visibility = "hidden";
	                        this.$cache.single[0].style.visibility = "visible";
	                        max = Math.max(single_left, to_left);
	                    }
	                } else {
	                    this.$cache.from[0].style.visibility = "visible";
	                    this.$cache.to[0].style.visibility = "visible";
	                    this.$cache.single[0].style.visibility = "hidden";
	                }

	                if (min < this.labels.p_min + 1) {
	                    this.$cache.min[0].style.visibility = "hidden";
	                } else {
	                    this.$cache.min[0].style.visibility = "visible";
	                }

	                if (max > 100 - this.labels.p_max - 1) {
	                    this.$cache.max[0].style.visibility = "hidden";
	                } else {
	                    this.$cache.max[0].style.visibility = "visible";
	                }

	            }
	        },

	        /**
	         * Draw shadow intervals
	         */
	        drawShadow: function () {
	            var o = this.options,
	                c = this.$cache,

	                is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
	                is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
	                is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
	                is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max),

	                from_min,
	                from_max,
	                to_min,
	                to_max;

	            if (o.type === "single") {
	                if (o.from_shadow && (is_from_min || is_from_max)) {
	                    from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
	                    from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
	                    from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
	                    from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
	                    from_min = from_min + (this.coords.p_handle / 2);

	                    c.shad_single[0].style.display = "block";
	                    c.shad_single[0].style.left = from_min + "%";
	                    c.shad_single[0].style.width = from_max + "%";
	                } else {
	                    c.shad_single[0].style.display = "none";
	                }
	            } else {
	                if (o.from_shadow && (is_from_min || is_from_max)) {
	                    from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
	                    from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
	                    from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
	                    from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
	                    from_min = from_min + (this.coords.p_handle / 2);

	                    c.shad_from[0].style.display = "block";
	                    c.shad_from[0].style.left = from_min + "%";
	                    c.shad_from[0].style.width = from_max + "%";
	                } else {
	                    c.shad_from[0].style.display = "none";
	                }

	                if (o.to_shadow && (is_to_min || is_to_max)) {
	                    to_min = this.convertToPercent(is_to_min ? o.to_min : o.min);
	                    to_max = this.convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
	                    to_min = this.toFixed(to_min - (this.coords.p_handle / 100 * to_min));
	                    to_max = this.toFixed(to_max - (this.coords.p_handle / 100 * to_max));
	                    to_min = to_min + (this.coords.p_handle / 2);

	                    c.shad_to[0].style.display = "block";
	                    c.shad_to[0].style.left = to_min + "%";
	                    c.shad_to[0].style.width = to_max + "%";
	                } else {
	                    c.shad_to[0].style.display = "none";
	                }
	            }
	        },



	        // =============================================================================================================
	        // Callbacks

	        callOnStart: function () {
	            if (this.options.onStart && typeof this.options.onStart === "function") {
	                this.options.onStart(this.result);
	            }
	        },
	        callOnChange: function () {
	            if (this.options.onChange && typeof this.options.onChange === "function") {
	                this.options.onChange(this.result);
	            }
	        },
	        callOnFinish: function () {
	            if (this.options.onFinish && typeof this.options.onFinish === "function") {
	                this.options.onFinish(this.result);
	            }
	        },
	        callOnUpdate: function () {
	            if (this.options.onUpdate && typeof this.options.onUpdate === "function") {
	                this.options.onUpdate(this.result);
	            }
	        },



	        // =============================================================================================================
	        // Service methods

	        toggleInput: function () {
	            this.$cache.input.toggleClass("irs-hidden-input");
	        },

	        /**
	         * Convert real value to percent
	         *
	         * @param value {Number} X in real
	         * @param no_min {boolean=} don't use min value
	         * @returns {Number} X in percent
	         */
	        convertToPercent: function (value, no_min) {
	            var diapason = this.options.max - this.options.min,
	                one_percent = diapason / 100,
	                val, percent;

	            if (!diapason) {
	                this.no_diapason = true;
	                return 0;
	            }

	            if (no_min) {
	                val = value;
	            } else {
	                val = value - this.options.min;
	            }

	            percent = val / one_percent;

	            return this.toFixed(percent);
	        },

	        /**
	         * Convert percent to real values
	         *
	         * @param percent {Number} X in percent
	         * @returns {Number} X in real
	         */
	        convertToValue: function (percent) {
	            var min = this.options.min,
	                max = this.options.max,
	                min_decimals = min.toString().split(".")[1],
	                max_decimals = max.toString().split(".")[1],
	                min_length, max_length,
	                avg_decimals = 0,
	                abs = 0;

	            if (percent === 0) {
	                return this.options.min;
	            }
	            if (percent === 100) {
	                return this.options.max;
	            }


	            if (min_decimals) {
	                min_length = min_decimals.length;
	                avg_decimals = min_length;
	            }
	            if (max_decimals) {
	                max_length = max_decimals.length;
	                avg_decimals = max_length;
	            }
	            if (min_length && max_length) {
	                avg_decimals = (min_length >= max_length) ? min_length : max_length;
	            }

	            if (min < 0) {
	                abs = Math.abs(min);
	                min = +(min + abs).toFixed(avg_decimals);
	                max = +(max + abs).toFixed(avg_decimals);
	            }

	            var number = ((max - min) / 100 * percent) + min,
	                string = this.options.step.toString().split(".")[1],
	                result;

	            if (string) {
	                number = +number.toFixed(string.length);
	            } else {
	                number = number / this.options.step;
	                number = number * this.options.step;

	                number = +number.toFixed(0);
	            }

	            if (abs) {
	                number -= abs;
	            }

	            if (string) {
	                result = +number.toFixed(string.length);
	            } else {
	                result = this.toFixed(number);
	            }

	            if (result < this.options.min) {
	                result = this.options.min;
	            } else if (result > this.options.max) {
	                result = this.options.max;
	            }

	            return result;
	        },

	        /**
	         * Round percent value with step
	         *
	         * @param percent {Number}
	         * @returns percent {Number} rounded
	         */
	        calcWithStep: function (percent) {
	            var rounded = Math.round(percent / this.coords.p_step) * this.coords.p_step;

	            if (rounded > 100) {
	                rounded = 100;
	            }
	            if (percent === 100) {
	                rounded = 100;
	            }

	            return this.toFixed(rounded);
	        },

	        checkMinInterval: function (p_current, p_next, type) {
	            var o = this.options,
	                current,
	                next;

	            if (!o.min_interval) {
	                return p_current;
	            }

	            current = this.convertToValue(p_current);
	            next = this.convertToValue(p_next);

	            if (type === "from") {

	                if (next - current < o.min_interval) {
	                    current = next - o.min_interval;
	                }

	            } else {

	                if (current - next < o.min_interval) {
	                    current = next + o.min_interval;
	                }

	            }

	            return this.convertToPercent(current);
	        },

	        checkMaxInterval: function (p_current, p_next, type) {
	            var o = this.options,
	                current,
	                next;

	            if (!o.max_interval) {
	                return p_current;
	            }

	            current = this.convertToValue(p_current);
	            next = this.convertToValue(p_next);

	            if (type === "from") {

	                if (next - current > o.max_interval) {
	                    current = next - o.max_interval;
	                }

	            } else {

	                if (current - next > o.max_interval) {
	                    current = next + o.max_interval;
	                }

	            }

	            return this.convertToPercent(current);
	        },

	        checkDiapason: function (p_num, min, max) {
	            var num = this.convertToValue(p_num),
	                o = this.options;

	            if (typeof min !== "number") {
	                min = o.min;
	            }

	            if (typeof max !== "number") {
	                max = o.max;
	            }

	            if (num < min) {
	                num = min;
	            }

	            if (num > max) {
	                num = max;
	            }

	            return this.convertToPercent(num);
	        },

	        toFixed: function (num) {
	            num = num.toFixed(9);
	            return +num;
	        },

	        _prettify: function (num) {
	            if (!this.options.prettify_enabled) {
	                return num;
	            }

	            if (this.options.prettify && typeof this.options.prettify === "function") {
	                return this.options.prettify(num);
	            } else {
	                return this.prettify(num);
	            }
	        },

	        prettify: function (num) {
	            var n = num.toString();
	            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
	        },

	        checkEdges: function (left, width) {
	            if (!this.options.force_edges) {
	                return this.toFixed(left);
	            }

	            if (left < 0) {
	                left = 0;
	            } else if (left > 100 - width) {
	                left = 100 - width;
	            }

	            return this.toFixed(left);
	        },

	        validate: function () {
	            var o = this.options,
	                r = this.result,
	                v = o.values,
	                vl = v.length,
	                value,
	                i;

	            if (typeof o.min === "string") o.min = +o.min;
	            if (typeof o.max === "string") o.max = +o.max;
	            if (typeof o.from === "string") o.from = +o.from;
	            if (typeof o.to === "string") o.to = +o.to;
	            if (typeof o.step === "string") o.step = +o.step;

	            if (typeof o.from_min === "string") o.from_min = +o.from_min;
	            if (typeof o.from_max === "string") o.from_max = +o.from_max;
	            if (typeof o.to_min === "string") o.to_min = +o.to_min;
	            if (typeof o.to_max === "string") o.to_max = +o.to_max;

	            if (typeof o.keyboard_step === "string") o.keyboard_step = +o.keyboard_step;
	            if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

	            if (o.max < o.min) {
	                o.max = o.min;
	            }

	            if (vl) {
	                o.p_values = [];
	                o.min = 0;
	                o.max = vl - 1;
	                o.step = 1;
	                o.grid_num = o.max;
	                o.grid_snap = true;


	                for (i = 0; i < vl; i++) {
	                    value = +v[i];

	                    if (!isNaN(value)) {
	                        v[i] = value;
	                        value = this._prettify(value);
	                    } else {
	                        value = v[i];
	                    }

	                    o.p_values.push(value);
	                }
	            }

	            if (typeof o.from !== "number" || isNaN(o.from)) {
	                o.from = o.min;
	            }

	            if (typeof o.to !== "number" || isNaN(o.from)) {
	                o.to = o.max;
	            }

	            if (o.type === "single") {

	                if (o.from < o.min) {
	                    o.from = o.min;
	                }

	                if (o.from > o.max) {
	                    o.from = o.max;
	                }

	            } else {

	                if (o.from < o.min || o.from > o.max) {
	                    o.from = o.min;
	                }
	                if (o.to > o.max || o.to < o.min) {
	                    o.to = o.max;
	                }
	                if (o.from > o.to) {
	                    o.from = o.to;
	                }

	            }

	            if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
	                o.step = 1;
	            }

	            if (typeof o.keyboard_step !== "number" || isNaN(o.keyboard_step) || !o.keyboard_step || o.keyboard_step < 0) {
	                o.keyboard_step = 5;
	            }

	            if (typeof o.from_min === "number" && o.from < o.from_min) {
	                o.from = o.from_min;
	            }

	            if (typeof o.from_max === "number" && o.from > o.from_max) {
	                o.from = o.from_max;
	            }

	            if (typeof o.to_min === "number" && o.to < o.to_min) {
	                o.to = o.to_min;
	            }

	            if (typeof o.to_max === "number" && o.from > o.to_max) {
	                o.to = o.to_max;
	            }

	            if (r) {
	                if (r.min !== o.min) {
	                    r.min = o.min;
	                }

	                if (r.max !== o.max) {
	                    r.max = o.max;
	                }

	                if (r.from < r.min || r.from > r.max) {
	                    r.from = o.from;
	                }

	                if (r.to < r.min || r.to > r.max) {
	                    r.to = o.to;
	                }
	            }

	            if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
	                o.min_interval = 0;
	            }

	            if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
	                o.max_interval = 0;
	            }

	            if (o.min_interval && o.min_interval > o.max - o.min) {
	                o.min_interval = o.max - o.min;
	            }

	            if (o.max_interval && o.max_interval > o.max - o.min) {
	                o.max_interval = o.max - o.min;
	            }
	        },

	        decorate: function (num, original) {
	            var decorated = "",
	                o = this.options;

	            if (o.prefix) {
	                decorated += o.prefix;
	            }

	            decorated += num;

	            if (o.max_postfix) {
	                if (o.values.length && num === o.p_values[o.max]) {
	                    decorated += o.max_postfix;
	                    if (o.postfix) {
	                        decorated += " ";
	                    }
	                } else if (original === o.max) {
	                    decorated += o.max_postfix;
	                    if (o.postfix) {
	                        decorated += " ";
	                    }
	                }
	            }

	            if (o.postfix) {
	                decorated += o.postfix;
	            }

	            return decorated;
	        },

	        updateFrom: function () {
	            this.result.from = this.options.from;
	            this.result.from_percent = this.convertToPercent(this.result.from);
	            if (this.options.values) {
	                this.result.from_value = this.options.values[this.result.from];
	            }
	        },

	        updateTo: function () {
	            this.result.to = this.options.to;
	            this.result.to_percent = this.convertToPercent(this.result.to);
	            if (this.options.values) {
	                this.result.to_value = this.options.values[this.result.to];
	            }
	        },

	        updateResult: function () {
	            this.result.min = this.options.min;
	            this.result.max = this.options.max;
	            this.updateFrom();
	            this.updateTo();
	        },


	        // =============================================================================================================
	        // Grid

	        appendGrid: function () {
	            if (!this.options.grid) {
	                return;
	            }

	            var o = this.options,
	                i, z,

	                total = o.max - o.min,
	                big_num = o.grid_num,
	                big_p = 0,
	                big_w = 0,

	                small_max = 4,
	                local_small_max,
	                small_p,
	                small_w = 0,

	                result,
	                html = '';



	            this.calcGridMargin();

	            if (o.grid_snap) {
	                big_num = total / o.step;
	                big_p = this.toFixed(o.step / (total / 100));
	            } else {
	                big_p = this.toFixed(100 / big_num);
	            }

	            if (big_num > 4) {
	                small_max = 3;
	            }
	            if (big_num > 7) {
	                small_max = 2;
	            }
	            if (big_num > 14) {
	                small_max = 1;
	            }
	            if (big_num > 28) {
	                small_max = 0;
	            }

	            for (i = 0; i < big_num + 1; i++) {
	                local_small_max = small_max;

	                big_w = this.toFixed(big_p * i);

	                if (big_w > 100) {
	                    big_w = 100;

	                    local_small_max -= 2;
	                    if (local_small_max < 0) {
	                        local_small_max = 0;
	                    }
	                }
	                this.coords.big[i] = big_w;

	                small_p = (big_w - (big_p * (i - 1))) / (local_small_max + 1);

	                for (z = 1; z <= local_small_max; z++) {
	                    if (big_w === 0) {
	                        break;
	                    }

	                    small_w = this.toFixed(big_w - (small_p * z));

	                    html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
	                }

	                html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';

	                result = this.convertToValue(big_w);
	                if (o.values.length) {
	                    result = o.p_values[result];
	                } else {
	                    result = this._prettify(result);
	                }

	                html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
	            }
	            this.coords.big_num = Math.ceil(big_num + 1);



	            this.$cache.cont.addClass("irs-with-grid");
	            this.$cache.grid.html(html);
	            this.cacheGridLabels();
	        },

	        cacheGridLabels: function () {
	            var $label, i,
	                num = this.coords.big_num;

	            for (i = 0; i < num; i++) {
	                $label = this.$cache.grid.find(".js-grid-text-" + i);
	                this.$cache.grid_labels.push($label);
	            }

	            this.calcGridLabels();
	        },

	        calcGridLabels: function () {
	            var i, label, start = [], finish = [],
	                num = this.coords.big_num;

	            for (i = 0; i < num; i++) {
	                this.coords.big_w[i] = this.$cache.grid_labels[i].outerWidth(false);
	                this.coords.big_p[i] = this.toFixed(this.coords.big_w[i] / this.coords.w_rs * 100);
	                this.coords.big_x[i] = this.toFixed(this.coords.big_p[i] / 2);

	                start[i] = this.toFixed(this.coords.big[i] - this.coords.big_x[i]);
	                finish[i] = this.toFixed(start[i] + this.coords.big_p[i]);
	            }

	            if (this.options.force_edges) {
	                if (start[0] < -this.coords.grid_gap) {
	                    start[0] = -this.coords.grid_gap;
	                    finish[0] = this.toFixed(start[0] + this.coords.big_p[0]);

	                    this.coords.big_x[0] = this.coords.grid_gap;
	                }

	                if (finish[num - 1] > 100 + this.coords.grid_gap) {
	                    finish[num - 1] = 100 + this.coords.grid_gap;
	                    start[num - 1] = this.toFixed(finish[num - 1] - this.coords.big_p[num - 1]);

	                    this.coords.big_x[num - 1] = this.toFixed(this.coords.big_p[num - 1] - this.coords.grid_gap);
	                }
	            }

	            this.calcGridCollision(2, start, finish);
	            this.calcGridCollision(4, start, finish);

	            for (i = 0; i < num; i++) {
	                label = this.$cache.grid_labels[i][0];
	                label.style.marginLeft = -this.coords.big_x[i] + "%";
	            }
	        },

	        // Collisions Calc Beta
	        // TODO: Refactor then have plenty of time
	        calcGridCollision: function (step, start, finish) {
	            var i, next_i, label,
	                num = this.coords.big_num;

	            for (i = 0; i < num; i += step) {
	                next_i = i + (step / 2);
	                if (next_i >= num) {
	                    break;
	                }

	                label = this.$cache.grid_labels[next_i][0];

	                if (finish[i] <= start[next_i]) {
	                    label.style.visibility = "visible";
	                } else {
	                    label.style.visibility = "hidden";
	                }
	            }
	        },

	        calcGridMargin: function () {
	            if (!this.options.grid_margin) {
	                return;
	            }

	            this.coords.w_rs = this.$cache.rs.outerWidth(false);
	            if (!this.coords.w_rs) {
	                return;
	            }

	            if (this.options.type === "single") {
	                this.coords.w_handle = this.$cache.s_single.outerWidth(false);
	            } else {
	                this.coords.w_handle = this.$cache.s_from.outerWidth(false);
	            }
	            this.coords.p_handle = this.toFixed(this.coords.w_handle  / this.coords.w_rs * 100);
	            this.coords.grid_gap = this.toFixed((this.coords.p_handle / 2) - 0.1);

	            this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%";
	            this.$cache.grid[0].style.left = this.coords.grid_gap + "%";
	        },



	        // =============================================================================================================
	        // Public methods

	        update: function (options) {
	            if (!this.input) {
	                return;
	            }

	            this.is_update = true;

	            this.options.from = this.result.from;
	            this.options.to = this.result.to;

	            this.options = $.extend(this.options, options);
	            this.validate();
	            this.updateResult(options);

	            this.toggleInput();
	            this.remove();
	            this.init(true);
	        },

	        reset: function () {
	            if (!this.input) {
	                return;
	            }

	            this.updateResult();
	            this.update();
	        },

	        destroy: function () {
	            if (!this.input) {
	                return;
	            }

	            this.toggleInput();
	            this.$cache.input.prop("readonly", false);
	            $.data(this.input, "ionRangeSlider", null);

	            this.remove();
	            this.input = null;
	            this.options = null;
	        }
	    };

	    $.fn.ionRangeSlider = function (options) {
	        return this.each(function() {
	            if (!$.data(this, "ionRangeSlider")) {
	                $.data(this, "ionRangeSlider", new IonRangeSlider(this, options, plugin_count++));
	            }
	        });
	    };



	    // =================================================================================================================
	    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	    // MIT license

	    (function() {
	        var lastTime = 0;
	        var vendors = ['ms', 'moz', 'webkit', 'o'];
	        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
	                || window[vendors[x]+'CancelRequestAnimationFrame'];
	        }

	        if (!window.requestAnimationFrame)
	            window.requestAnimationFrame = function(callback, element) {
	                var currTime = new Date().getTime();
	                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	                    timeToCall);
	                lastTime = currTime + timeToCall;
	                return id;
	            };

	        if (!window.cancelAnimationFrame)
	            window.cancelAnimationFrame = function(id) {
	                clearTimeout(id);
	            };
	    }());

	}));


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	* @license Input Mask plugin for jquery
	* http://github.com/RobinHerbots/jquery.inputmask
	* Copyright (c) 2010 - 2014 Robin Herbots
	* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
	* Version: 0.0.0
	*/

	(function ($) {
	    if ($.fn.inputmask === undefined) {
	        //helper functions    
	        function isInputEventSupported(eventName) {
	            var el = document.createElement('input'),
	            eventName = 'on' + eventName,
	            isSupported = (eventName in el);
	            if (!isSupported) {
	                el.setAttribute(eventName, 'return;');
	                isSupported = typeof el[eventName] == 'function';
	            }
	            el = null;
	            return isSupported;
	        }
	        function resolveAlias(aliasStr, options, opts) {
	            var aliasDefinition = opts.aliases[aliasStr];
	            if (aliasDefinition) {
	                if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
	                $.extend(true, opts, aliasDefinition);  //merge alias definition in the options
	                $.extend(true, opts, options);  //reapply extra given options
	                return true;
	            }
	            return false;
	        }
	        function generateMaskSets(opts) {
	            var ms = [];
	            var genmasks = []; //used to keep track of the masks that where processed, to avoid duplicates
	            function getMaskTemplate(mask) {
	                if (opts.numericInput) {
	                    mask = mask.split('').reverse().join('');
	                }
	                var escaped = false, outCount = 0, greedy = opts.greedy, repeat = opts.repeat;
	                if (repeat == "*") greedy = false;
	                //if (greedy == true && opts.placeholder == "") opts.placeholder = " ";
	                if (mask.length == 1 && greedy == false && repeat != 0) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
	                var singleMask = $.map(mask.split(""), function (element, index) {
	                    var outElem = [];
	                    if (element == opts.escapeChar) {
	                        escaped = true;
	                    }
	                    else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
	                        var maskdef = opts.definitions[element];
	                        if (maskdef && !escaped) {
	                            for (var i = 0; i < maskdef.cardinality; i++) {
	                                outElem.push(opts.placeholder.charAt((outCount + i) % opts.placeholder.length));
	                            }
	                        } else {
	                            outElem.push(element);
	                            escaped = false;
	                        }
	                        outCount += outElem.length;
	                        return outElem;
	                    }
	                });

	                //allocate repetitions
	                var repeatedMask = singleMask.slice();
	                for (var i = 1; i < repeat && greedy; i++) {
	                    repeatedMask = repeatedMask.concat(singleMask.slice());
	                }

	                return { "mask": repeatedMask, "repeat": repeat, "greedy": greedy };
	            }
	            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
	            function getTestingChain(mask) {
	                if (opts.numericInput) {
	                    mask = mask.split('').reverse().join('');
	                }
	                var isOptional = false, escaped = false;
	                var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

	                return $.map(mask.split(""), function (element, index) {
	                    var outElem = [];

	                    if (element == opts.escapeChar) {
	                        escaped = true;
	                    } else if (element == opts.optionalmarker.start && !escaped) {
	                        isOptional = true;
	                        newBlockMarker = true;
	                    }
	                    else if (element == opts.optionalmarker.end && !escaped) {
	                        isOptional = false;
	                        newBlockMarker = true;
	                    }
	                    else {
	                        var maskdef = opts.definitions[element];
	                        if (maskdef && !escaped) {
	                            var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
	                            for (var i = 1; i < maskdef.cardinality; i++) {
	                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
	                                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
	                                if (isOptional == true) //reset newBlockMarker
	                                    newBlockMarker = false;
	                            }
	                            outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
	                        } else {
	                            outElem.push({ fn: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: null, def: element });
	                            escaped = false;
	                        }
	                        //reset newBlockMarker
	                        newBlockMarker = false;
	                        return outElem;
	                    }
	                });
	            }
	            function markOptional(maskPart) { //needed for the clearOptionalTail functionality
	                return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
	            }
	            function splitFirstOptionalEndPart(maskPart) {
	                var optionalStartMarkers = 0, optionalEndMarkers = 0, mpl = maskPart.length;
	                for (var i = 0; i < mpl; i++) {
	                    if (maskPart.charAt(i) == opts.optionalmarker.start) {
	                        optionalStartMarkers++;
	                    }
	                    if (maskPart.charAt(i) == opts.optionalmarker.end) {
	                        optionalEndMarkers++;
	                    }
	                    if (optionalStartMarkers > 0 && optionalStartMarkers == optionalEndMarkers)
	                        break;
	                }
	                var maskParts = [maskPart.substring(0, i)];
	                if (i < mpl) {
	                    maskParts.push(maskPart.substring(i + 1, mpl));
	                }
	                return maskParts;
	            }
	            function splitFirstOptionalStartPart(maskPart) {
	                var mpl = maskPart.length;
	                for (var i = 0; i < mpl; i++) {
	                    if (maskPart.charAt(i) == opts.optionalmarker.start) {
	                        break;
	                    }
	                }
	                var maskParts = [maskPart.substring(0, i)];
	                if (i < mpl) {
	                    maskParts.push(maskPart.substring(i + 1, mpl));
	                }
	                return maskParts;
	            }
	            function generateMask(maskPrefix, maskPart, metadata) {
	                var maskParts = splitFirstOptionalEndPart(maskPart);
	                var newMask, maskTemplate;

	                var masks = splitFirstOptionalStartPart(maskParts[0]);
	                if (masks.length > 1) {
	                    newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
	                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
	                        genmasks.push(newMask);
	                        maskTemplate = getMaskTemplate(newMask);
	                        ms.push({
	                            "mask": newMask,
	                            "_buffer": maskTemplate["mask"],
	                            "buffer": maskTemplate["mask"].slice(),
	                            "tests": getTestingChain(newMask),
	                            "lastValidPosition": -1,
	                            "greedy": maskTemplate["greedy"],
	                            "repeat": maskTemplate["repeat"],
	                            "metadata": metadata
	                        });
	                    }
	                    newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
	                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
	                        genmasks.push(newMask);
	                        maskTemplate = getMaskTemplate(newMask);
	                        ms.push({
	                            "mask": newMask,
	                            "_buffer": maskTemplate["mask"],
	                            "buffer": maskTemplate["mask"].slice(),
	                            "tests": getTestingChain(newMask),
	                            "lastValidPosition": -1,
	                            "greedy": maskTemplate["greedy"],
	                            "repeat": maskTemplate["repeat"],
	                            "metadata": metadata
	                        });
	                    }
	                    if (splitFirstOptionalStartPart(masks[1]).length > 1) { //optional contains another optional
	                        generateMask(maskPrefix + masks[0], masks[1] + maskParts[1], metadata);
	                    }
	                    if (maskParts.length > 1 && splitFirstOptionalStartPart(maskParts[1]).length > 1) {
	                        generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1], metadata);
	                        generateMask(maskPrefix + masks[0], maskParts[1], metadata);
	                    }
	                }
	                else {
	                    newMask = maskPrefix + maskParts;
	                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
	                        genmasks.push(newMask);
	                        maskTemplate = getMaskTemplate(newMask);
	                        ms.push({
	                            "mask": newMask,
	                            "_buffer": maskTemplate["mask"],
	                            "buffer": maskTemplate["mask"].slice(),
	                            "tests": getTestingChain(newMask),
	                            "lastValidPosition": -1,
	                            "greedy": maskTemplate["greedy"],
	                            "repeat": maskTemplate["repeat"],
	                            "metadata": metadata
	                        });
	                    }
	                }

	            }

	            if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
	                opts.mask = opts.mask.call(this, opts);
	            }
	            if ($.isArray(opts.mask)) {
	                $.each(opts.mask, function (ndx, msk) {
	                    if (msk["mask"] != undefined) {
	                        generateMask("", msk["mask"].toString(), msk);
	                    } else
	                        generateMask("", msk.toString());
	                });
	            } else generateMask("", opts.mask.toString());

	            return opts.greedy ? ms : ms.sort(function (a, b) { return a["mask"].length - b["mask"].length; });
	        }

	        var msie10 = navigator.userAgent.match(new RegExp("msie 10", "i")) !== null,
	            iphone = navigator.userAgent.match(new RegExp("iphone", "i")) !== null,
	            android = navigator.userAgent.match(new RegExp("android.*safari.*", "i")) !== null,
	            androidchrome = navigator.userAgent.match(new RegExp("android.*chrome.*", "i")) !== null,
	            pasteEvent = isInputEventSupported('paste') ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange";


	        //masking scope
	        //actionObj definition see below
	        function maskScope(masksets, activeMasksetIndex, opts, actionObj) {
	            var isRTL = false,
	                valueOnFocus = getActiveBuffer().join(''),
	                $el, chromeValueOnInput,
	                skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
	                skipInputEvent = false, //skip when triggered from within inputmask
	                ignorable = false;


	            //maskset helperfunctions

	            function getActiveMaskSet() {
	                return masksets[activeMasksetIndex];
	            }

	            function getActiveTests() {
	                return getActiveMaskSet()['tests'];
	            }

	            function getActiveBufferTemplate() {
	                return getActiveMaskSet()['_buffer'];
	            }

	            function getActiveBuffer() {
	                return getActiveMaskSet()['buffer'];
	            }

	            function isValid(pos, c, strict) { //strict true ~ no correction or autofill
	                strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions 

	                function _isValid(position, activeMaskset, c, strict) {
	                    var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '', buffer = activeMaskset["buffer"];
	                    for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
	                        chrs += getBufferElement(buffer, testPos - (i - 1));
	                    }

	                    if (c) {
	                        chrs += c;
	                    }

	                    //return is false or a json object => { pos: ??, c: ??} or true
	                    return activeMaskset['tests'][testPos].fn != null ?
	                        activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts)
	                        : (c == getBufferElement(activeMaskset['_buffer'], position, true) || c == opts.skipOptionalPartCharacter) ?
	                            { "refresh": true, c: getBufferElement(activeMaskset['_buffer'], position, true), pos: position }
	                            : false;
	                }

	                function PostProcessResults(maskForwards, results) {
	                    var hasValidActual = false;
	                    $.each(results, function (ndx, rslt) {
	                        hasValidActual = $.inArray(rslt["activeMasksetIndex"], maskForwards) == -1 && rslt["result"] !== false;
	                        if (hasValidActual) return false;
	                    });
	                    if (hasValidActual) { //strip maskforwards
	                        results = $.map(results, function (rslt, ndx) {
	                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) == -1) {
	                                return rslt;
	                            } else {
	                                masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = actualLVP;
	                            }
	                        });
	                    } else { //keep maskforwards with the least forward
	                        var lowestPos = -1, lowestIndex = -1, rsltValid;
	                        $.each(results, function (ndx, rslt) {
	                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1 && rslt["result"] !== false & (lowestPos == -1 || lowestPos > rslt["result"]["pos"])) {
	                                lowestPos = rslt["result"]["pos"];
	                                lowestIndex = rslt["activeMasksetIndex"];
	                            }
	                        });
	                        results = $.map(results, function (rslt, ndx) {
	                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1) {
	                                if (rslt["result"]["pos"] == lowestPos) {
	                                    return rslt;
	                                } else if (rslt["result"] !== false) {
	                                    for (var i = pos; i < lowestPos; i++) {
	                                        rsltValid = _isValid(i, masksets[rslt["activeMasksetIndex"]], masksets[lowestIndex]["buffer"][i], true);
	                                        if (rsltValid === false) {
	                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos - 1;
	                                            break;
	                                        } else {
	                                            setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], i, masksets[lowestIndex]["buffer"][i], true);
	                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = i;
	                                        }
	                                    }
	                                    //also check check for the lowestpos with the new input
	                                    rsltValid = _isValid(lowestPos, masksets[rslt["activeMasksetIndex"]], c, true);
	                                    if (rsltValid !== false) {
	                                        setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], lowestPos, c, true);
	                                        masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos;
	                                    }
	                                    //console.log("ndx " + rslt["activeMasksetIndex"] + " validate " + masksets[rslt["activeMasksetIndex"]]["buffer"].join('') + " lv " + masksets[rslt["activeMasksetIndex"]]['lastValidPosition']);
	                                    return rslt;
	                                }
	                            }
	                        });
	                    }
	                    return results;
	                }

	                if (strict) {
	                    var result = _isValid(pos, getActiveMaskSet(), c, strict); //only check validity in current mask when validating strict
	                    if (result === true) {
	                        result = { "pos": pos }; //always take a possible corrected maskposition into account
	                    }
	                    return result;
	                }

	                var results = [], result = false, currentActiveMasksetIndex = activeMasksetIndex,
	                    actualBuffer = getActiveBuffer().slice(), actualLVP = getActiveMaskSet()["lastValidPosition"],
	                    actualPrevious = seekPrevious(pos),
	                    maskForwards = [];
	                $.each(masksets, function (index, value) {
	                    if (typeof (value) == "object") {
	                        activeMasksetIndex = index;

	                        var maskPos = pos;
	                        var lvp = getActiveMaskSet()['lastValidPosition'],
	                            rsltValid;
	                        if (lvp == actualLVP) {
	                            if ((maskPos - actualLVP) > 1) {
	                                for (var i = lvp == -1 ? 0 : lvp; i < maskPos; i++) {
	                                    rsltValid = _isValid(i, getActiveMaskSet(), actualBuffer[i], true);
	                                    if (rsltValid === false) {
	                                        break;
	                                    } else {
	                                        setBufferElement(getActiveBuffer(), i, actualBuffer[i], true);
	                                        if (rsltValid === true) {
	                                            rsltValid = { "pos": i }; //always take a possible corrected maskposition into account
	                                        }
	                                        var newValidPosition = rsltValid.pos || i;
	                                        if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
	                                            getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
	                                    }
	                                }
	                            }
	                            //does the input match on a further position?
	                            if (!isMask(maskPos) && !_isValid(maskPos, getActiveMaskSet(), c, strict)) {
	                                var maxForward = seekNext(maskPos) - maskPos;
	                                for (var fw = 0; fw < maxForward; fw++) {
	                                    if (_isValid(++maskPos, getActiveMaskSet(), c, strict) !== false)
	                                        break;
	                                }
	                                maskForwards.push(activeMasksetIndex);
	                                //console.log('maskforward ' + activeMasksetIndex + " pos " + pos + " maskPos " + maskPos);
	                            }
	                        }

	                        if (getActiveMaskSet()['lastValidPosition'] >= actualLVP || activeMasksetIndex == currentActiveMasksetIndex) {
	                            if (maskPos >= 0 && maskPos < getMaskLength()) {
	                                result = _isValid(maskPos, getActiveMaskSet(), c, strict);
	                                if (result !== false) {
	                                    if (result === true) {
	                                        result = { "pos": maskPos }; //always take a possible corrected maskposition into account
	                                    }
	                                    var newValidPosition = result.pos || maskPos;
	                                    if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
	                                        getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
	                                }
	                                //console.log("pos " + pos + " ndx " + activeMasksetIndex + " validate " + getActiveBuffer().join('') + " lv " + getActiveMaskSet()['lastValidPosition']);
	                                results.push({ "activeMasksetIndex": index, "result": result });
	                            }
	                        }
	                    }
	                });
	                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMasksetIndex

	                return PostProcessResults(maskForwards, results); //return results of the multiple mask validations
	            }

	            function determineActiveMasksetIndex() {
	                var currentMasksetIndex = activeMasksetIndex,
	                    highestValid = { "activeMasksetIndex": 0, "lastValidPosition": -1, "next": -1 };
	                $.each(masksets, function (index, value) {
	                    if (typeof (value) == "object") {
	                        activeMasksetIndex = index;
	                        if (getActiveMaskSet()['lastValidPosition'] > highestValid['lastValidPosition']) {
	                            highestValid["activeMasksetIndex"] = index;
	                            highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
	                            highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
	                        } else if (getActiveMaskSet()['lastValidPosition'] == highestValid['lastValidPosition'] &&
	                            (highestValid['next'] == -1 || highestValid['next'] > seekNext(getActiveMaskSet()['lastValidPosition']))) {
	                            highestValid["activeMasksetIndex"] = index;
	                            highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
	                            highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
	                        }
	                    }
	                });

	                activeMasksetIndex = highestValid["lastValidPosition"] != -1 && masksets[currentMasksetIndex]["lastValidPosition"] == highestValid["lastValidPosition"] ? currentMasksetIndex : highestValid["activeMasksetIndex"];
	                if (currentMasksetIndex != activeMasksetIndex) {
	                    clearBuffer(getActiveBuffer(), seekNext(highestValid["lastValidPosition"]), getMaskLength());
	                    getActiveMaskSet()["writeOutBuffer"] = true;
	                }
	                $el.data('_inputmask')['activeMasksetIndex'] = activeMasksetIndex; //store the activeMasksetIndex
	            }

	            function isMask(pos) {
	                var testPos = determineTestPosition(pos);
	                var test = getActiveTests()[testPos];

	                return test != undefined ? test.fn : false;
	            }

	            function determineTestPosition(pos) {
	                return pos % getActiveTests().length;
	            }

	            function getMaskLength() {
	                return opts.getMaskLength(getActiveBufferTemplate(), getActiveMaskSet()['greedy'], getActiveMaskSet()['repeat'], getActiveBuffer(), opts);
	            }

	            //pos: from position

	            function seekNext(pos) {
	                var maskL = getMaskLength();
	                if (pos >= maskL) return maskL;
	                var position = pos;
	                while (++position < maskL && !isMask(position)) {
	                }
	                return position;
	            }

	            //pos: from position

	            function seekPrevious(pos) {
	                var position = pos;
	                if (position <= 0) return 0;

	                while (--position > 0 && !isMask(position)) {
	                }
	                return position;
	            }

	            function setBufferElement(buffer, position, element, autoPrepare) {
	                if (autoPrepare) position = prepareBuffer(buffer, position);

	                var test = getActiveTests()[determineTestPosition(position)];
	                var elem = element;
	                if (elem != undefined && test != undefined) {
	                    switch (test.casing) {
	                        case "upper":
	                            elem = element.toUpperCase();
	                            break;
	                        case "lower":
	                            elem = element.toLowerCase();
	                            break;
	                    }
	                }

	                buffer[position] = elem;
	            }

	            function getBufferElement(buffer, position, autoPrepare) {
	                if (autoPrepare) position = prepareBuffer(buffer, position);
	                return buffer[position];
	            }

	            //needed to handle the non-greedy mask repetitions

	            function prepareBuffer(buffer, position) {
	                var j;
	                while (buffer[position] == undefined && buffer.length < getMaskLength()) {
	                    j = 0;
	                    while (getActiveBufferTemplate()[j] !== undefined) { //add a new buffer
	                        buffer.push(getActiveBufferTemplate()[j++]);
	                    }
	                }

	                return position;
	            }

	            function writeBuffer(input, buffer, caretPos) {
	                input._valueSet(buffer.join(''));
	                if (caretPos != undefined) {
	                    caret(input, caretPos);
	                }
	            }

	            function clearBuffer(buffer, start, end, stripNomasks) {
	                for (var i = start, maskL = getMaskLength() ; i < end && i < maskL; i++) {
	                    if (stripNomasks === true) {
	                        if (!isMask(i))
	                            setBufferElement(buffer, i, "");
	                    } else
	                        setBufferElement(buffer, i, getBufferElement(getActiveBufferTemplate().slice(), i, true));
	                }
	            }

	            function setReTargetPlaceHolder(buffer, pos) {
	                var testPos = determineTestPosition(pos);
	                setBufferElement(buffer, pos, getBufferElement(getActiveBufferTemplate(), testPos));
	            }

	            function getPlaceHolder(pos) {
	                return opts.placeholder.charAt(pos % opts.placeholder.length);
	            }

	            function checkVal(input, writeOut, strict, nptvl, intelliCheck) {
	                var inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet()).split('');

	                $.each(masksets, function (ndx, ms) {
	                    if (typeof (ms) == "object") {
	                        ms["buffer"] = ms["_buffer"].slice();
	                        ms["lastValidPosition"] = -1;
	                        ms["p"] = -1;
	                    }
	                });
	                if (strict !== true) activeMasksetIndex = 0;
	                if (writeOut) input._valueSet(""); //initial clear
	                var ml = getMaskLength();
	                $.each(inputValue, function (ndx, charCode) {
	                    if (intelliCheck === true) {
	                        var p = getActiveMaskSet()["p"], lvp = p == -1 ? p : seekPrevious(p),
	                            pos = lvp == -1 ? ndx : seekNext(lvp);
	                        if ($.inArray(charCode, getActiveBufferTemplate().slice(lvp + 1, pos)) == -1) {
	                            keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
	                        }
	                    } else {
	                        keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
	                    }
	                });

	                if (strict === true && getActiveMaskSet()["p"] != -1) {
	                    getActiveMaskSet()["lastValidPosition"] = seekPrevious(getActiveMaskSet()["p"]);
	                }
	            }

	            function escapeRegex(str) {
	                return $.inputmask.escapeRegex.call(this, str);
	            }

	            function truncateInput(inputValue) {
	                return inputValue.replace(new RegExp("(" + escapeRegex(getActiveBufferTemplate().join('')) + ")*$"), "");
	            }

	            function clearOptionalTail(input) {
	                var buffer = getActiveBuffer(), tmpBuffer = buffer.slice(), testPos, pos;
	                for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
	                    var testPos = determineTestPosition(pos);
	                    if (getActiveTests()[testPos].optionality) {
	                        if (!isMask(pos) || !isValid(pos, buffer[pos], true))
	                            tmpBuffer.pop();
	                        else break;
	                    } else break;
	                }
	                writeBuffer(input, tmpBuffer);
	            }

	            function unmaskedvalue($input, skipDatepickerCheck) {
	                if (getActiveTests() && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
	                    //checkVal(input, false, true);
	                    var umValue = $.map(getActiveBuffer(), function (element, index) {
	                        return isMask(index) && isValid(index, element, true) ? element : null;
	                    });
	                    var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join('');
	                    return opts.onUnMask != undefined ? opts.onUnMask.call(this, getActiveBuffer().join(''), unmaskedValue) : unmaskedValue;
	                } else {
	                    return $input[0]._valueGet();
	                }
	            }

	            function TranslatePosition(pos) {
	                if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
	                    var bffrLght = getActiveBuffer().length;
	                    pos = bffrLght - pos;
	                }
	                return pos;
	            }

	            function caret(input, begin, end) {
	                var npt = input.jquery && input.length > 0 ? input[0] : input, range;
	                if (typeof begin == 'number') {
	                    begin = TranslatePosition(begin);
	                    end = TranslatePosition(end);
	                    if (!$(input).is(':visible')) {
	                        return;
	                    }
	                    end = (typeof end == 'number') ? end : begin;
	                    npt.scrollLeft = npt.scrollWidth;
	                    if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
	                    if (npt.setSelectionRange) {
	                        npt.selectionStart = begin;
	                        npt.selectionEnd = android ? begin : end;

	                    } else if (npt.createTextRange) {
	                        range = npt.createTextRange();
	                        range.collapse(true);
	                        range.moveEnd('character', end);
	                        range.moveStart('character', begin);
	                        range.select();
	                    }
	                } else {
	                    if (!$(input).is(':visible')) {
	                        return { "begin": 0, "end": 0 };
	                    }
	                    if (npt.setSelectionRange) {
	                        begin = npt.selectionStart;
	                        end = npt.selectionEnd;
	                    } else if (document.selection && document.selection.createRange) {
	                        range = document.selection.createRange();
	                        begin = 0 - range.duplicate().moveStart('character', -100000);
	                        end = begin + range.text.length;
	                    }
	                    begin = TranslatePosition(begin);
	                    end = TranslatePosition(end);
	                    return { "begin": begin, "end": end };
	                }
	            }

	            function isComplete(buffer) { //return true / false / undefined (repeat *)
	                if (opts.repeat == "*") return undefined;
	                var complete = false, highestValidPosition = 0, currentActiveMasksetIndex = activeMasksetIndex;
	                $.each(masksets, function (ndx, ms) {
	                    if (typeof (ms) == "object") {
	                        activeMasksetIndex = ndx;
	                        var aml = seekPrevious(getMaskLength());
	                        if (ms["lastValidPosition"] >= highestValidPosition && ms["lastValidPosition"] == aml) {
	                            var msComplete = true;
	                            for (var i = 0; i <= aml; i++) {
	                                var mask = isMask(i), testPos = determineTestPosition(i);
	                                if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceHolder(i))) || (!mask && buffer[i] != getActiveBufferTemplate()[testPos])) {
	                                    msComplete = false;
	                                    break;
	                                }
	                            }
	                            complete = complete || msComplete;
	                            if (complete) //break loop
	                                return false;
	                        }
	                        highestValidPosition = ms["lastValidPosition"];
	                    }
	                });
	                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMaskset
	                return complete;
	            }

	            function isSelection(begin, end) {
	                return isRTL ? (begin - end) > 1 || ((begin - end) == 1 && opts.insertMode) :
	                    (end - begin) > 1 || ((end - begin) == 1 && opts.insertMode);
	            }


	            //private functions
	            function installEventRuler(npt) {
	                var events = $._data(npt).events;

	                $.each(events, function (eventType, eventHandlers) {
	                    $.each(eventHandlers, function (ndx, eventHandler) {
	                        if (eventHandler.namespace == "inputmask") {
	                            if (eventHandler.type != "setvalue") {
	                                var handler = eventHandler.handler;
	                                eventHandler.handler = function (e) {
	                                    if (this.readOnly || this.disabled)
	                                        e.preventDefault;
	                                    else
	                                        return handler.apply(this, arguments);
	                                };
	                            }
	                        }
	                    });
	                });
	            }

	            function patchValueProperty(npt) {
	                var valueProperty;
	                if (Object.getOwnPropertyDescriptor)
	                    valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
	                if (valueProperty && valueProperty.get) {
	                    if (!npt._valueGet) {
	                        var valueGet = valueProperty.get;
	                        var valueSet = valueProperty.set;
	                        npt._valueGet = function () {
	                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
	                        };
	                        npt._valueSet = function (value) {
	                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
	                        };

	                        Object.defineProperty(npt, "value", {
	                            get: function () {
	                                var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
	                                    activeMasksetIndex = inputData['activeMasksetIndex'];
	                                return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
	                            },
	                            set: function (value) {
	                                valueSet.call(this, value);
	                                $(this).triggerHandler('setvalue.inputmask');
	                            }
	                        });
	                    }
	                } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
	                    if (!npt._valueGet) {
	                        var valueGet = npt.__lookupGetter__("value");
	                        var valueSet = npt.__lookupSetter__("value");
	                        npt._valueGet = function () {
	                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
	                        };
	                        npt._valueSet = function (value) {
	                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
	                        };

	                        npt.__defineGetter__("value", function () {
	                            var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
	                                activeMasksetIndex = inputData['activeMasksetIndex'];
	                            return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
	                        });
	                        npt.__defineSetter__("value", function (value) {
	                            valueSet.call(this, value);
	                            $(this).triggerHandler('setvalue.inputmask');
	                        });
	                    }
	                } else {
	                    if (!npt._valueGet) {
	                        npt._valueGet = function () { return isRTL ? this.value.split('').reverse().join('') : this.value; };
	                        npt._valueSet = function (value) { this.value = isRTL ? value.split('').reverse().join('') : value; };
	                    }
	                    if ($.valHooks.text == undefined || $.valHooks.text.inputmaskpatch != true) {
	                        var valueGet = $.valHooks.text && $.valHooks.text.get ? $.valHooks.text.get : function (elem) { return elem.value; };
	                        var valueSet = $.valHooks.text && $.valHooks.text.set ? $.valHooks.text.set : function (elem, value) {
	                            elem.value = value;
	                            return elem;
	                        };

	                        jQuery.extend($.valHooks, {
	                            text: {
	                                get: function (elem) {
	                                    var $elem = $(elem);
	                                    if ($elem.data('_inputmask')) {
	                                        if ($elem.data('_inputmask')['opts'].autoUnmask)
	                                            return $elem.inputmask('unmaskedvalue');
	                                        else {
	                                            var result = valueGet(elem),
	                                                inputData = $elem.data('_inputmask'), masksets = inputData['masksets'],
	                                                activeMasksetIndex = inputData['activeMasksetIndex'];
	                                            return result != masksets[activeMasksetIndex]['_buffer'].join('') ? result : '';
	                                        }
	                                    } else return valueGet(elem);
	                                },
	                                set: function (elem, value) {
	                                    var $elem = $(elem);
	                                    var result = valueSet(elem, value);
	                                    if ($elem.data('_inputmask')) $elem.triggerHandler('setvalue.inputmask');
	                                    return result;
	                                },
	                                inputmaskpatch: true
	                            }
	                        });
	                    }
	                }
	            }

	            //shift chars to left from start to end and put c at end position if defined

	            function shiftL(start, end, c, maskJumps) {
	                var buffer = getActiveBuffer();
	                if (maskJumps !== false) //jumping over nonmask position
	                    while (!isMask(start) && start - 1 >= 0) start--;
	                for (var i = start; i < end && i < getMaskLength() ; i++) {
	                    if (isMask(i)) {
	                        setReTargetPlaceHolder(buffer, i);
	                        var j = seekNext(i);
	                        var p = getBufferElement(buffer, j);
	                        if (p != getPlaceHolder(j)) {
	                            if (j < getMaskLength() && isValid(i, p, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
	                                setBufferElement(buffer, i, p, true);
	                            } else {
	                                if (isMask(i))
	                                    break;
	                            }
	                        }
	                    } else {
	                        setReTargetPlaceHolder(buffer, i);
	                    }
	                }
	                if (c != undefined)
	                    setBufferElement(buffer, seekPrevious(end), c);

	                if (getActiveMaskSet()["greedy"] == false) {
	                    var trbuffer = truncateInput(buffer.join('')).split('');
	                    buffer.length = trbuffer.length;
	                    for (var i = 0, bl = buffer.length; i < bl; i++) {
	                        buffer[i] = trbuffer[i];
	                    }
	                    if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
	                }
	                return start; //return the used start position
	            }

	            function shiftR(start, end, c) {
	                var buffer = getActiveBuffer();
	                if (getBufferElement(buffer, start, true) != getPlaceHolder(start)) {
	                    for (var i = seekPrevious(end) ; i > start && i >= 0; i--) {
	                        if (isMask(i)) {
	                            var j = seekPrevious(i);
	                            var t = getBufferElement(buffer, j);
	                            if (t != getPlaceHolder(j)) {
	                                if (isValid(j, t, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
	                                    setBufferElement(buffer, i, t, true);
	                                    setReTargetPlaceHolder(buffer, j);
	                                } //else break;
	                            }
	                        } else
	                            setReTargetPlaceHolder(buffer, i);
	                    }
	                }
	                if (c != undefined && getBufferElement(buffer, start) == getPlaceHolder(start))
	                    setBufferElement(buffer, start, c);
	                var lengthBefore = buffer.length;
	                if (getActiveMaskSet()["greedy"] == false) {
	                    var trbuffer = truncateInput(buffer.join('')).split('');
	                    buffer.length = trbuffer.length;
	                    for (var i = 0, bl = buffer.length; i < bl; i++) {
	                        buffer[i] = trbuffer[i];
	                    }
	                    if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
	                }
	                return end - (lengthBefore - buffer.length); //return new start position
	            }

	            function HandleRemove(input, k, pos) {
	                if (opts.numericInput || isRTL) {
	                    switch (k) {
	                        case opts.keyCode.BACKSPACE:
	                            k = opts.keyCode.DELETE;
	                            break;
	                        case opts.keyCode.DELETE:
	                            k = opts.keyCode.BACKSPACE;
	                            break;
	                    }
	                    if (isRTL) {
	                        var pend = pos.end;
	                        pos.end = pos.begin;
	                        pos.begin = pend;
	                    }
	                }

	                var isSelection = true;
	                if (pos.begin == pos.end) {
	                    var posBegin = k == opts.keyCode.BACKSPACE ? pos.begin - 1 : pos.begin;
	                    if (opts.isNumeric && opts.radixPoint != "" && getActiveBuffer()[posBegin] == opts.radixPoint) {
	                        pos.begin = (getActiveBuffer().length - 1 == posBegin) /* radixPoint is latest? delete it */ ? pos.begin : k == opts.keyCode.BACKSPACE ? posBegin : seekNext(posBegin);
	                        pos.end = pos.begin;
	                    }
	                    isSelection = false;
	                    if (k == opts.keyCode.BACKSPACE)
	                        pos.begin--;
	                    else if (k == opts.keyCode.DELETE)
	                        pos.end++;
	                } else if (pos.end - pos.begin == 1 && !opts.insertMode) {
	                    isSelection = false;
	                    if (k == opts.keyCode.BACKSPACE)
	                        pos.begin--;
	                }

	                clearBuffer(getActiveBuffer(), pos.begin, pos.end);

	                var ml = getMaskLength();
	                if (opts.greedy == false) {
	                    shiftL(pos.begin, ml, undefined, !isRTL && (k == opts.keyCode.BACKSPACE && !isSelection));
	                } else {
	                    var newpos = pos.begin;
	                    for (var i = pos.begin; i < pos.end; i++) { //seeknext to skip placeholders at start in selection
	                        if (isMask(i) || !isSelection)
	                            newpos = shiftL(pos.begin, ml, undefined, !isRTL && (k == opts.keyCode.BACKSPACE && !isSelection));
	                    }
	                    if (!isSelection) pos.begin = newpos;
	                }
	                var firstMaskPos = seekNext(-1);
	                clearBuffer(getActiveBuffer(), pos.begin, pos.end, true);
	                checkVal(input, false, masksets[1] == undefined || firstMaskPos >= pos.end, getActiveBuffer());
	                if (getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
	                    getActiveMaskSet()["lastValidPosition"] = -1;
	                    getActiveMaskSet()["p"] = firstMaskPos;
	                } else {
	                    getActiveMaskSet()["p"] = pos.begin;
	                }
	            }

	            function keydownEvent(e) {
	                //Safari 5.1.x - modal dialog fires keypress twice workaround
	                skipKeyPressEvent = false;
	                var input = this, $input = $(input), k = e.keyCode, pos = caret(input);

	                //backspace, delete, and escape get special treatment
	                if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127) || e.ctrlKey && k == 88) { //backspace/delete
	                    e.preventDefault(); //stop default action but allow propagation
	                    if (k == 88) valueOnFocus = getActiveBuffer().join('');
	                    HandleRemove(input, k, pos);
	                    determineActiveMasksetIndex();
	                    writeBuffer(input, getActiveBuffer(), getActiveMaskSet()["p"]);
	                    if (input._valueGet() == getActiveBufferTemplate().join(''))
	                        $input.trigger('cleared');

	                    if (opts.showTooltip) { //update tooltip
	                        $input.prop("title", getActiveMaskSet()["mask"]);
	                    }
	                } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
	                    setTimeout(function () {
	                        var caretPos = seekNext(getActiveMaskSet()["lastValidPosition"]);
	                        if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
	                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
	                    }, 0);
	                } else if ((k == opts.keyCode.HOME && !e.shiftKey) || k == opts.keyCode.PAGE_UP) { //Home or page_up
	                    caret(input, 0, e.shiftKey ? pos.begin : 0);
	                } else if (k == opts.keyCode.ESCAPE || (k == 90 && e.ctrlKey)) { //escape && undo
	                    checkVal(input, true, false, valueOnFocus.split(''));
	                    $input.click();
	                } else if (k == opts.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
	                    opts.insertMode = !opts.insertMode;
	                    caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
	                } else if (opts.insertMode == false && !e.shiftKey) {
	                    if (k == opts.keyCode.RIGHT) {
	                        setTimeout(function () {
	                            var caretPos = caret(input);
	                            caret(input, caretPos.begin);
	                        }, 0);
	                    } else if (k == opts.keyCode.LEFT) {
	                        setTimeout(function () {
	                            var caretPos = caret(input);
	                            caret(input, caretPos.begin - 1);
	                        }, 0);
	                    }
	                }

	                var currentCaretPos = caret(input);
	                if (opts.onKeyDown.call(this, e, getActiveBuffer(), opts) === true) //extra stuff to execute on keydown
	                    caret(input, currentCaretPos.begin, currentCaretPos.end);
	                ignorable = $.inArray(k, opts.ignorables) != -1;
	            }


	            function keypressEvent(e, checkval, k, writeOut, strict, ndx) {
	                //Safari 5.1.x - modal dialog fires keypress twice workaround
	                if (k == undefined && skipKeyPressEvent) return false;
	                skipKeyPressEvent = true;

	                var input = this, $input = $(input);

	                e = e || window.event;
	                var k = checkval ? k : (e.which || e.charCode || e.keyCode);

	                if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
	                    return true;
	                } else {
	                    if (k) {
	                        //special treat the decimal separator
	                        if (checkval !== true && k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;

	                        var pos, results, result, c = String.fromCharCode(k);
	                        if (checkval) {
	                            var pcaret = strict ? ndx : getActiveMaskSet()["lastValidPosition"] + 1;
	                            pos = { begin: pcaret, end: pcaret };
	                        } else {
	                            pos = caret(input);
	                        }

	                        //should we clear a possible selection??
	                        var isSlctn = isSelection(pos.begin, pos.end), redetermineLVP = false,
	                            initialIndex = activeMasksetIndex;
	                        if (isSlctn) {
	                            activeMasksetIndex = initialIndex;
	                            $.each(masksets, function (ndx, lmnt) { //init undobuffer for recovery when not valid
	                                if (typeof (lmnt) == "object") {
	                                    activeMasksetIndex = ndx;
	                                    getActiveMaskSet()["undoBuffer"] = getActiveBuffer().join('');
	                                }
	                            });
	                            HandleRemove(input, opts.keyCode.DELETE, pos);
	                            if (!opts.insertMode) { //preserve some space
	                                $.each(masksets, function (ndx, lmnt) {
	                                    if (typeof (lmnt) == "object") {
	                                        activeMasksetIndex = ndx;
	                                        shiftR(pos.begin, getMaskLength());
	                                        getActiveMaskSet()["lastValidPosition"] = seekNext(getActiveMaskSet()["lastValidPosition"]);
	                                    }
	                                });
	                            }
	                            activeMasksetIndex = initialIndex; //restore index
	                        }

	                        var radixPosition = getActiveBuffer().join('').indexOf(opts.radixPoint);
	                        if (opts.isNumeric && checkval !== true && radixPosition != -1) {
	                            if (opts.greedy && pos.begin <= radixPosition) {
	                                pos.begin = seekPrevious(pos.begin);
	                                pos.end = pos.begin;
	                            } else if (c == opts.radixPoint) {
	                                pos.begin = radixPosition;
	                                pos.end = pos.begin;
	                            }
	                        }


	                        var p = pos.begin;
	                        results = isValid(p, c, strict);
	                        if (strict === true) results = [{ "activeMasksetIndex": activeMasksetIndex, "result": results }];
	                        var minimalForwardPosition = -1;
	                        $.each(results, function (index, result) {
	                            activeMasksetIndex = result["activeMasksetIndex"];
	                            getActiveMaskSet()["writeOutBuffer"] = true;
	                            var np = result["result"];
	                            if (np !== false) {
	                                var refresh = false, buffer = getActiveBuffer();
	                                if (np !== true) {
	                                    refresh = np["refresh"]; //only rewrite buffer from isValid
	                                    p = np.pos != undefined ? np.pos : p; //set new position from isValid
	                                    c = np.c != undefined ? np.c : c; //set new char from isValid
	                                }
	                                if (refresh !== true) {
	                                    if (opts.insertMode == true) {
	                                        var lastUnmaskedPosition = getMaskLength();
	                                        var bfrClone = buffer.slice();
	                                        while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
	                                            lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(lastUnmaskedPosition);
	                                        }
	                                        if (lastUnmaskedPosition >= p) {
	                                            shiftR(p, getMaskLength(), c);
	                                            //shift the lvp if needed
	                                            var lvp = getActiveMaskSet()["lastValidPosition"], nlvp = seekNext(lvp);
	                                            if (nlvp != getMaskLength() && lvp >= p && (getBufferElement(getActiveBuffer(), nlvp, true) != getPlaceHolder(nlvp))) {
	                                                getActiveMaskSet()["lastValidPosition"] = nlvp;
	                                            }
	                                        } else getActiveMaskSet()["writeOutBuffer"] = false;
	                                    } else setBufferElement(buffer, p, c, true);
	                                    if (minimalForwardPosition == -1 || minimalForwardPosition > seekNext(p)) {
	                                        minimalForwardPosition = seekNext(p);
	                                    }
	                                } else if (!strict) {
	                                    var nextPos = p < getMaskLength() ? p + 1 : p;
	                                    if (minimalForwardPosition == -1 || minimalForwardPosition > nextPos) {
	                                        minimalForwardPosition = nextPos;
	                                    }
	                                }
	                                if (minimalForwardPosition > getActiveMaskSet()["p"])
	                                    getActiveMaskSet()["p"] = minimalForwardPosition; //needed for checkval strict 
	                            }
	                        });

	                        if (strict !== true) {
	                            activeMasksetIndex = initialIndex;
	                            determineActiveMasksetIndex();
	                        }
	                        if (writeOut !== false) {
	                            $.each(results, function (ndx, rslt) {
	                                if (rslt["activeMasksetIndex"] == activeMasksetIndex) {
	                                    result = rslt;
	                                    return false;
	                                }
	                            });
	                            if (result != undefined) {
	                                var self = this;
	                                setTimeout(function () { opts.onKeyValidation.call(self, result["result"], opts); }, 0);
	                                if (getActiveMaskSet()["writeOutBuffer"] && result["result"] !== false) {
	                                    var buffer = getActiveBuffer();

	                                    var newCaretPosition;
	                                    if (checkval) {
	                                        newCaretPosition = undefined;
	                                    } else if (opts.numericInput) {
	                                        if (p > radixPosition) {
	                                            newCaretPosition = seekPrevious(minimalForwardPosition);
	                                        } else if (c == opts.radixPoint) {
	                                            newCaretPosition = minimalForwardPosition - 1;
	                                        } else newCaretPosition = seekPrevious(minimalForwardPosition - 1);
	                                    } else {
	                                        newCaretPosition = minimalForwardPosition;
	                                    }

	                                    writeBuffer(input, buffer, newCaretPosition);
	                                    if (checkval !== true) {
	                                        setTimeout(function () { //timeout needed for IE
	                                            if (isComplete(buffer) === true)
	                                                $input.trigger("complete");
	                                            skipInputEvent = true;
	                                            $input.trigger("input");
	                                        }, 0);
	                                    }
	                                } else if (isSlctn) {
	                                    getActiveMaskSet()["buffer"] = getActiveMaskSet()["undoBuffer"].split('');
	                                }
	                            }
	                        }

	                        if (opts.showTooltip) { //update tooltip
	                            $input.prop("title", getActiveMaskSet()["mask"]);
	                        }

	                        //needed for IE8 and below
	                        if (e) e.preventDefault ? e.preventDefault() : e.returnValue = false;
	                    }
	                }
	            }

	            function keyupEvent(e) {
	                var $input = $(this), input = this, k = e.keyCode, buffer = getActiveBuffer();

	                if (androidchrome && k == opts.keyCode.BACKSPACE) {
	                    if (chromeValueOnInput == input._valueGet())
	                        keydownEvent.call(this, e);
	                }

	                opts.onKeyUp.call(this, e, buffer, opts); //extra stuff to execute on keyup
	                if (k == opts.keyCode.TAB && opts.showMaskOnFocus) {
	                    if ($input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
	                        buffer = getActiveBufferTemplate().slice();
	                        writeBuffer(input, buffer);
	                        caret(input, 0);
	                        valueOnFocus = getActiveBuffer().join('');
	                    } else {
	                        writeBuffer(input, buffer);
	                        if (buffer.join('') == getActiveBufferTemplate().join('') && $.inArray(opts.radixPoint, buffer) != -1) {
	                            caret(input, TranslatePosition(0));
	                            $input.click();
	                        } else
	                            caret(input, TranslatePosition(0), TranslatePosition(getMaskLength()));
	                    }
	                }
	            }

	            function inputEvent(e) {
	                if (skipInputEvent === true) {
	                    skipInputEvent = false;
	                    return true;
	                }
	                var input = this, $input = $(input);

	                chromeValueOnInput = getActiveBuffer().join('');
	                checkVal(input, false, false);
	                writeBuffer(input, getActiveBuffer());
	                if (isComplete(getActiveBuffer()) === true)
	                    $input.trigger("complete");
	                $input.click();
	            }

	            function mask(el) {
	                $el = $(el);
	                if ($el.is(":input")) {
	                    //store tests & original buffer in the input element - used to get the unmasked value
	                    $el.data('_inputmask', {
	                        'masksets': masksets,
	                        'activeMasksetIndex': activeMasksetIndex,
	                        'opts': opts,
	                        'isRTL': false
	                    });

	                    //show tooltip
	                    if (opts.showTooltip) {
	                        $el.prop("title", getActiveMaskSet()["mask"]);
	                    }

	                    //correct greedy setting if needed
	                    getActiveMaskSet()['greedy'] = getActiveMaskSet()['greedy'] ? getActiveMaskSet()['greedy'] : getActiveMaskSet()['repeat'] == 0;

	                    //handle maxlength attribute
	                    if ($el.attr("maxLength") != null) //only when the attribute is set
	                    {
	                        var maxLength = $el.prop('maxLength');
	                        if (maxLength > -1) { //handle *-repeat
	                            $.each(masksets, function (ndx, ms) {
	                                if (typeof (ms) == "object") {
	                                    if (ms["repeat"] == "*") {
	                                        ms["repeat"] = maxLength;
	                                    }
	                                }
	                            });
	                        }
	                        if (getMaskLength() >= maxLength && maxLength > -1) { //FF sets no defined max length to -1 
	                            if (maxLength < getActiveBufferTemplate().length) getActiveBufferTemplate().length = maxLength;
	                            if (getActiveMaskSet()['greedy'] == false) {
	                                getActiveMaskSet()['repeat'] = Math.round(maxLength / getActiveBufferTemplate().length);
	                            }
	                            $el.prop('maxLength', getMaskLength() * 2);
	                        }
	                    }

	                    patchValueProperty(el);

	                    if (opts.numericInput) opts.isNumeric = opts.numericInput;
	                    if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics) || (opts.isNumeric && opts.rightAlignNumerics))
	                        $el.css("text-align", "right");

	                    if (el.dir == "rtl" || opts.numericInput) {
	                        el.dir = "ltr";
	                        $el.removeAttr("dir");
	                        var inputData = $el.data('_inputmask');
	                        inputData['isRTL'] = true;
	                        $el.data('_inputmask', inputData);
	                        isRTL = true;
	                    }

	                    //unbind all events - to make sure that no other mask will interfere when re-masking
	                    $el.unbind(".inputmask");
	                    $el.removeClass('focus.inputmask');
	                    //bind events
	                    $el.closest('form').bind("submit", function () { //trigger change on submit if any
	                        if (valueOnFocus != getActiveBuffer().join('')) {
	                            $el.change();
	                        }
	                    }).bind('reset', function () {
	                        setTimeout(function () {
	                            $el.trigger("setvalue");
	                        }, 0);
	                    });
	                    $el.bind("mouseenter.inputmask", function () {
	                        var $input = $(this), input = this;
	                        if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
	                            if (input._valueGet() != getActiveBuffer().join('')) {
	                                writeBuffer(input, getActiveBuffer());
	                            }
	                        }
	                    }).bind("blur.inputmask", function () {
	                        var $input = $(this), input = this, nptValue = input._valueGet(), buffer = getActiveBuffer();
	                        $input.removeClass('focus.inputmask');
	                        if (valueOnFocus != getActiveBuffer().join('')) {
	                            $input.change();
	                        }
	                        if (opts.clearMaskOnLostFocus && nptValue != '') {
	                            if (nptValue == getActiveBufferTemplate().join(''))
	                                input._valueSet('');
	                            else { //clearout optional tail of the mask
	                                clearOptionalTail(input);
	                            }
	                        }
	                        if (isComplete(buffer) === false) {
	                            $input.trigger("incomplete");
	                            if (opts.clearIncomplete) {
	                                $.each(masksets, function (ndx, ms) {
	                                    if (typeof (ms) == "object") {
	                                        ms["buffer"] = ms["_buffer"].slice();
	                                        ms["lastValidPosition"] = -1;
	                                    }
	                                });
	                                activeMasksetIndex = 0;
	                                if (opts.clearMaskOnLostFocus)
	                                    input._valueSet('');
	                                else {
	                                    buffer = getActiveBufferTemplate().slice();
	                                    writeBuffer(input, buffer);
	                                }
	                            }
	                        }
	                    }).bind("focus.inputmask", function () {
	                        var $input = $(this), input = this, nptValue = input._valueGet();
	                        if (opts.showMaskOnFocus && !$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
	                            if (input._valueGet() != getActiveBuffer().join('')) {
	                                writeBuffer(input, getActiveBuffer(), seekNext(getActiveMaskSet()["lastValidPosition"]));
	                            }
	                        }
	                        $input.addClass('focus.inputmask');
	                        valueOnFocus = getActiveBuffer().join('');
	                    }).bind("mouseleave.inputmask", function () {
	                        var $input = $(this), input = this;
	                        if (opts.clearMaskOnLostFocus) {
	                            if (!$input.hasClass('focus.inputmask') && input._valueGet() != $input.attr("placeholder")) {
	                                if (input._valueGet() == getActiveBufferTemplate().join('') || input._valueGet() == '')
	                                    input._valueSet('');
	                                else { //clearout optional tail of the mask
	                                    clearOptionalTail(input);
	                                }
	                            }
	                        }
	                    }).bind("click.inputmask", function () {
	                        var input = this;
	                        setTimeout(function () {
	                            var selectedCaret = caret(input), buffer = getActiveBuffer();
	                            if (selectedCaret.begin == selectedCaret.end) {
	                                var clickPosition = isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin,
	                                    lvp = getActiveMaskSet()["lastValidPosition"],
	                                    lastPosition;
	                                if (opts.isNumeric) {
	                                    lastPosition = opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1 ?
	                                        (opts.numericInput ? seekNext($.inArray(opts.radixPoint, buffer)) : $.inArray(opts.radixPoint, buffer)) :
	                                        seekNext(lvp);
	                                } else {
	                                    lastPosition = seekNext(lvp);
	                                }
	                                if (clickPosition < lastPosition) {
	                                    if (isMask(clickPosition))
	                                        caret(input, clickPosition);
	                                    else caret(input, seekNext(clickPosition));
	                                } else
	                                    caret(input, lastPosition);
	                            }
	                        }, 0);
	                    }).bind('dblclick.inputmask', function () {
	                        var input = this;
	                        setTimeout(function () {
	                            caret(input, 0, seekNext(getActiveMaskSet()["lastValidPosition"]));
	                        }, 0);
	                    }).bind(pasteEvent + ".inputmask dragdrop.inputmask drop.inputmask", function (e) {
	                        if (skipInputEvent === true) {
	                            skipInputEvent = false;
	                            return true;
	                        }
	                        var input = this, $input = $(input);

	                        //paste event for IE8 and lower I guess ;-)
	                        if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
	                            return true;
	                        }
	                        setTimeout(function () {
	                            var pasteValue = opts.onBeforePaste != undefined ? opts.onBeforePaste.call(this, input._valueGet()) : input._valueGet();
	                            checkVal(input, true, false, pasteValue.split(''), true);
	                            if (isComplete(getActiveBuffer()) === true)
	                                $input.trigger("complete");
	                            $input.click();
	                        }, 0);
	                    }).bind('setvalue.inputmask', function () {
	                        var input = this;
	                        checkVal(input, true);
	                        valueOnFocus = getActiveBuffer().join('');
	                        if (input._valueGet() == getActiveBufferTemplate().join(''))
	                            input._valueSet('');
	                    }).bind('complete.inputmask', opts.oncomplete
	                    ).bind('incomplete.inputmask', opts.onincomplete
	                    ).bind('cleared.inputmask', opts.oncleared
	                    ).bind("keyup.inputmask", keyupEvent);

	                    if (androidchrome) {
	                        $el.bind("input.inputmask", inputEvent);
	                    } else {
	                        $el.bind("keydown.inputmask", keydownEvent
	                        ).bind("keypress.inputmask", keypressEvent);
	                    }

	                    if (msie10)
	                        $el.bind("input.inputmask", inputEvent);

	                    //apply mask
	                    checkVal(el, true, false);
	                    valueOnFocus = getActiveBuffer().join('');
	                    // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
	                    var activeElement;
	                    try {
	                        activeElement = document.activeElement;
	                    } catch (e) {
	                    }
	                    if (activeElement === el) { //position the caret when in focus
	                        $el.addClass('focus.inputmask');
	                        caret(el, seekNext(getActiveMaskSet()["lastValidPosition"]));
	                    } else if (opts.clearMaskOnLostFocus) {
	                        if (getActiveBuffer().join('') == getActiveBufferTemplate().join('')) {
	                            el._valueSet('');
	                        } else {
	                            clearOptionalTail(el);
	                        }
	                    } else {
	                        writeBuffer(el, getActiveBuffer());
	                    }

	                    installEventRuler(el);
	                }
	            }

	            //action object
	            if (actionObj != undefined) {
	                switch (actionObj["action"]) {
	                    case "isComplete":
	                        return isComplete(actionObj["buffer"]);
	                    case "unmaskedvalue":
	                        isRTL = actionObj["$input"].data('_inputmask')['isRTL'];
	                        return unmaskedvalue(actionObj["$input"], actionObj["skipDatepickerCheck"]);
	                    case "mask":
	                        mask(actionObj["el"]);
	                        break;
	                    case "format":
	                        $el = $({});
	                        $el.data('_inputmask', {
	                            'masksets': masksets,
	                            'activeMasksetIndex': activeMasksetIndex,
	                            'opts': opts,
	                            'isRTL': opts.numericInput
	                        });
	                        if (opts.numericInput) {
	                            opts.isNumeric = opts.numericInput;
	                            isRTL = true;
	                        }

	                        checkVal($el, false, false, actionObj["value"].split(''), true);
	                        return getActiveBuffer().join('');
	                }
	            }
	        }
	        $.inputmask = {
	            //options default
	            defaults: {
	                placeholder: "_",
	                optionalmarker: { start: "[", end: "]" },
	                quantifiermarker: { start: "{", end: "}" },
	                groupmarker: { start: "(", end: ")" },
	                escapeChar: "\\",
	                mask: null,
	                oncomplete: $.noop, //executes when the mask is complete
	                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
	                oncleared: $.noop, //executes when the mask is cleared
	                repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
	                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
	                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
	                clearMaskOnLostFocus: true,
	                insertMode: true, //insert the input or overwrite the input
	                clearIncomplete: false, //clear the incomplete input on blur
	                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
	                onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
	                onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
	                onBeforePaste: undefined, //executes before masking the pasted value to allow preprocessing of the pasted value.  args => pastedValue => return processedValue
	                onUnMask: undefined, //executes after unmasking to allow postprocessing of the unmaskedvalue.  args => maskedValue, unmaskedValue
	                showMaskOnFocus: true, //show the mask-placeholder when the input has focus
	                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
	                onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
	                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
	                showTooltip: false, //show the activemask as tooltip
	                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
	                //numeric basic properties
	                isNumeric: false, //enable numeric features
	                radixPoint: "", //".", // | ","
	                skipRadixDance: false, //disable radixpoint caret positioning
	                rightAlignNumerics: true, //align numerics to the right
	                //numeric basic properties
	                definitions: {
	                    '9': {
	                        validator: "[0-9]",
	                        cardinality: 1
	                    },
	                    'a': {
	                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
	                        cardinality: 1
	                    },
	                    '*': {
	                        validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
	                        cardinality: 1
	                    }
	                },
	                keyCode: {
	                    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
	                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
	                },
	                //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
	                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
	                getMaskLength: function (buffer, greedy, repeat, currentBuffer, opts) {
	                    var calculatedLength = buffer.length;
	                    if (!greedy) {
	                        if (repeat == "*") {
	                            calculatedLength = currentBuffer.length + 1;
	                        } else if (repeat > 1) {
	                            calculatedLength += (buffer.length * (repeat - 1));
	                        }
	                    }
	                    return calculatedLength;
	                }
	            },
	            escapeRegex: function (str) {
	                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
	            },
	            format: function (value, options) {
	                var opts = $.extend(true, {}, $.inputmask.defaults, options);
	                resolveAlias(opts.alias, options, opts);
	                return maskScope(generateMaskSets(opts), 0, opts, { "action": "format", "value": value });
	            }
	        };

	        $.fn.inputmask = function (fn, options) {
	            var opts = $.extend(true, {}, $.inputmask.defaults, options),
	                masksets,
	                activeMasksetIndex = 0;

	            if (typeof fn === "string") {
	                switch (fn) {
	                    case "mask":
	                        //resolve possible aliases given by options
	                        resolveAlias(opts.alias, options, opts);
	                        masksets = generateMaskSets(opts);
	                        if (masksets.length == 0) { return this; }

	                        return this.each(function () {
	                            maskScope($.extend(true, {}, masksets), 0, opts, { "action": "mask", "el": this });
	                        });
	                    case "unmaskedvalue":
	                        var $input = $(this), input = this;
	                        if ($input.data('_inputmask')) {
	                            masksets = $input.data('_inputmask')['masksets'];
	                            activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
	                            opts = $input.data('_inputmask')['opts'];
	                            return maskScope(masksets, activeMasksetIndex, opts, { "action": "unmaskedvalue", "$input": $input });
	                        } else return $input.val();
	                    case "remove":
	                        return this.each(function () {
	                            var $input = $(this), input = this;
	                            if ($input.data('_inputmask')) {
	                                masksets = $input.data('_inputmask')['masksets'];
	                                activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
	                                opts = $input.data('_inputmask')['opts'];
	                                //writeout the unmaskedvalue
	                                input._valueSet(maskScope(masksets, activeMasksetIndex, opts, { "action": "unmaskedvalue", "$input": $input, "skipDatepickerCheck": true }));
	                                //clear data
	                                $input.removeData('_inputmask');
	                                //unbind all events
	                                $input.unbind(".inputmask");
	                                $input.removeClass('focus.inputmask');
	                                //restore the value property
	                                var valueProperty;
	                                if (Object.getOwnPropertyDescriptor)
	                                    valueProperty = Object.getOwnPropertyDescriptor(input, "value");
	                                if (valueProperty && valueProperty.get) {
	                                    if (input._valueGet) {
	                                        Object.defineProperty(input, "value", {
	                                            get: input._valueGet,
	                                            set: input._valueSet
	                                        });
	                                    }
	                                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
	                                    if (input._valueGet) {
	                                        input.__defineGetter__("value", input._valueGet);
	                                        input.__defineSetter__("value", input._valueSet);
	                                    }
	                                }
	                                try { //try catch needed for IE7 as it does not supports deleting fns
	                                    delete input._valueGet;
	                                    delete input._valueSet;
	                                } catch (e) {
	                                    input._valueGet = undefined;
	                                    input._valueSet = undefined;

	                                }
	                            }
	                        });
	                        break;
	                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
	                        if (this.data('_inputmask')) {
	                            masksets = this.data('_inputmask')['masksets'];
	                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
	                            return masksets[activeMasksetIndex]['_buffer'].join('');
	                        }
	                        else return "";
	                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
	                        return this.data('_inputmask') ? !this.data('_inputmask')['opts'].autoUnmask : false;
	                    case "isComplete":
	                        masksets = this.data('_inputmask')['masksets'];
	                        activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
	                        opts = this.data('_inputmask')['opts'];
	                        return maskScope(masksets, activeMasksetIndex, opts, { "action": "isComplete", "buffer": this[0]._valueGet().split('') });
	                    case "getmetadata": //return mask metadata if exists
	                        if (this.data('_inputmask')) {
	                            masksets = this.data('_inputmask')['masksets'];
	                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
	                            return masksets[activeMasksetIndex]['metadata'];
	                        }
	                        else return undefined;
	                    default:
	                        //check if the fn is an alias
	                        if (!resolveAlias(fn, options, opts)) {
	                            //maybe fn is a mask so we try
	                            //set mask
	                            opts.mask = fn;
	                        }
	                        masksets = generateMaskSets(opts);
	                        if (masksets.length == 0) { return this; }
	                        return this.each(function () {
	                            maskScope($.extend(true, {}, masksets), activeMasksetIndex, opts, { "action": "mask", "el": this });
	                        });

	                        break;
	                }
	            } else if (typeof fn == "object") {
	                opts = $.extend(true, {}, $.inputmask.defaults, fn);

	                resolveAlias(opts.alias, fn, opts); //resolve aliases
	                masksets = generateMaskSets(opts);
	                if (masksets.length == 0) { return this; }
	                return this.each(function () {
	                    maskScope($.extend(true, {}, masksets), activeMasksetIndex, opts, { "action": "mask", "el": this });
	                });
	            } else if (fn == undefined) {
	                //look for data-inputmask atribute - the attribute should only contain optipns
	                return this.each(function () {
	                    var attrOptions = $(this).attr("data-inputmask");
	                    if (attrOptions && attrOptions != "") {
	                        try {
	                            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
	                            var dataoptions = $.parseJSON("{" + attrOptions + "}");
	                            $.extend(true, dataoptions, options);
	                            opts = $.extend(true, {}, $.inputmask.defaults, dataoptions);
	                            resolveAlias(opts.alias, dataoptions, opts);
	                            opts.alias = undefined;
	                            $(this).inputmask(opts);
	                        } catch (ex) { } //need a more relax parseJSON
	                    }
	                });
	            }
	        };
	    }
	})(jQuery);


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
	Input Mask plugin extensions
	http://github.com/RobinHerbots/jquery.inputmask
	Copyright (c) 2010 - 2014 Robin Herbots
	Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
	Version: 0.0.0

	Phone extension.
	When using this extension make sure you specify the correct url to get the masks

	 $(selector).inputmask("phone", {
	                url: "Scripts/jquery.inputmask/phone-codes/phone-codes.json", 
	                onKeyValidation: function () { //show some metadata in the console
	                    console.log($(this).inputmask("getmetadata")["name_en"]);
	                } 
	  });


	*/
	(function ($) {
	    $.extend($.inputmask.defaults.aliases, {
	        'phone': {
	            url: "phone-codes/phone-codes.json",
	            mask: function (opts) {
	                opts.definitions = {
	                    'p': {
	                        validator: function () { return false; },
	                        cardinality: 1
	                    },
	                    '#': {
	                        validator: "[0-9]",
	                        cardinality: 1
	                    }
	                };
	                var maskList = [];
	                $.ajax({
	                    url: opts.url,
	                    async: false,
	                    dataType: 'json',
	                    success: function (response) {
	                        maskList = response;
	                    }
	                });
	    
	                maskList.splice(0, 0, "+p(ppp)ppp-pppp");
	                return maskList;
	            }
	        }
	    });
	})(jQuery);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	let $ = __webpack_require__(5);
	let _ = __webpack_require__(11);
	let Backbone = __webpack_require__(13);
	Backbone.$ = $;
	let _vars = __webpack_require__(14);
	let utils = __webpack_require__(15);
	let Model = __webpack_require__(17);
	const __templateRoot = "../templates/";
	__webpack_require__(16);


	let UserBadgeView = Backbone.View.extend({
	    el: '#user-badge',
	    template: _.template(utils.secureElement($("#user-badge-template"))),
	    render: function () {
	        let self = this;
	        if (this.model.get("isLoggedIn")) {
	            $('#login-button').css('display', 'none');
	            self.$el.css("display", "block");
	            self.$el.html(self.template(self.model.attributes));
	            self.bindEvents();
	        } else {
	            $('#login-button').find('a').html('Sign In').css('display', 'block');
	            self.$el.css("display", "none");
	        }
	    },
	    bindEvents: function () {
	        $('#logout-button').on("click", function () {
	            $.when($.getJSON("/logout")).done(function (data) {
	                this.model.clear();
	            }).fail(function (xhr, textStatus) {

	            });
	        })
	    }
	});

	let UserProfileSummaryView = Backbone.View.extend({
	    el: '#user-profile-summary-container',
	    template: _.template(utils.secureElement($("#user-profile-summary-template"))),
	    initialize: function () {
	    },
	    render: function () {
	        utils.loadings.showLeftLoading();
	        let self = this;
	        // removeBeforeAppend();
	        this.$el.html(self.template(self.model.attributes));
	        utils.loadings.hideLeftLoading();
	    }
	});

	let UserProfileView = Backbone.View.extend({
	    el: '#user-profile-container',
	    template: _.template(utils.secureElement($("#user-profile-template"))),
	    initialize: function () {

	    },
	    render: function () {
	        let self = this;
	        this.$el.html(self.template(self.model.attributes));
	        this.bindEvents();
	    },
	    bindEvents: function () {
	        let self = this;
	        $('.user-profile-edit-gender').iCheck({
	            checkboxClass: 'icheckbox_square-blue',
	            radioClass: 'iradio_square-blue',
	            increaseArea: '20%' // optional
	        });

	        $("#user-profile-edit-gender").find("input[value=" + self.model.get("cus_gender") + "]").iCheck("check");

	        // Date picker
	        // $('#user-profile-edit-bday').datepicker({
	        //     autoclose: true
	        // });

	        // Phone mask
	        $("#user-profile-edit-phone").inputmask();
	        $("#user-profile-edit-bday").inputmask();

	        $("#user-profile-edit-reset").click(function () {
	            self.render();
	        });

	        $("#user-profile-edit-submit").click(function () {
	            if (self.submitValidation()) {
	                let updated = {
	                    cus_name: $("#user-profile-edit-name").val(),
	                    cus_email: $("#user-profile-edit-email").val(),
	                    cus_age: $("#user-profile-edit-bday").val(),
	                    cus_phone: $("#user-profile-edit-phone").val().replace(/\D/g, ''),
	                    cus_password: $("#user-profile-edit-password-1").val(),
	                    cus_gender: $("#user-profile-edit-gender").find("input:checked").val()
	                };
	                self.model.save(updated, {
	                    success: function (model) {
	                        self.model.parseWith(model.attributes);
	                        self.model.trigger("change");
	                        window.location.hash = "#user/" + self.model.get("cus_id");
	                    }, error: function () {

	                    }
	                });
	            }

	        });
	    },
	    submitValidation: function () {
	        let flag = true,
	            cus_name = $("#user-profile-edit-name"),
	            cus_email = $("#user-profile-edit-email"),
	            cus_age = $("#user-profile-edit-bday"),
	            cus_phone = $("#user-profile-edit-phone"),
	            cus_password_1 = $("#user-profile-edit-password-1"),
	            cus_password_2 = $("#user-profile-edit-password-2"),
	            cus_gender = $("#user-profile-edit-gender").find("input:checked");
	        if (!utils.userNameValidate(cus_name.val())) {
	            cus_name.parent().addClass("has-error");
	            flag = false;
	        } else {
	            cus_name.parent().removeClass("has-error");
	        }
	        if (!utils.emailValidate(cus_email.val())) {
	            cus_email.parent().addClass("has-error");
	            flag = false;
	        } else {
	            cus_email.parent().removeClass("has-error");
	        }
	        if (!utils.ageValidate(cus_age.val())) {
	            cus_age.parent().addClass("has-error");
	            flag = false;
	        } else {
	            cus_age.parent().removeClass("has-error");
	        }
	        if (!utils.phoneValidate(cus_phone.val().replace(/\D/g, ''))) {
	            cus_phone.parent().addClass("has-error");
	            flag = false;
	        } else {
	            cus_phone.parent().removeClass("has-error");
	        }
	        if (!utils.genderValidate(cus_gender.val())) {
	            cus_gender.addClass("has-error");
	            flag = false;
	        } else {
	            cus_gender.removeClass("has-error");
	        }
	        if (cus_password_1.val() !== "" || cus_password_2.val() !== "") {
	            if (!(cus_password_2.val().length === cus_password_1.val().length
	                && cus_password_2.val().length >= 8
	                && cus_password_2.val().length <= 45)
	                || cus_password_1.val() !== cus_password_2.val()
	                || !utils.passwordValidate(cus_password_1.val())) {
	                cus_password_1.parent().addClass("has-error");
	                cus_password_2.parent().addClass("has-error");
	                flag = false;
	            } else {
	                cus_password_1.parent().removeClass("has-error");
	                cus_password_2.parent().removeClass("has-error");
	            }
	        }
	        return flag;
	    },
	    bindTrigger: function () {
	        let self = this;
	        $("#user-edit-profile-button").click(function () {
	            self.render();
	        });
	    }
	});

	let UserTransactionView = Backbone.View.extend({
	    el: "#user-transaction-container",
	    template: _.template(utils.secureElement($("#user-transaction-template"))),
	    render: function () {
	        let self = this;
	        this.$el.html(self.template());
	    }
	});

	let LoginMaskView = Backbone.View.extend({
	    el: 'body',
	    render: function () {
	        let self = this;
	        if (!this.model.get("isLoggedIn")) {
	            $.when(fetchTemplate("loginMask")).done(function (data) {
	                self.template = _.template(data);
	                self.$el.prepend(self.template);
	            }).fail(function (xhr, textStatus) {

	            });
	            this.bindEvents();
	        }
	    },
	    bindEvents: function () {
	        let self = this;
	        $(".ion-close-circled").on("click", function () {
	            self.removeMask();
	        });
	        $('#login-submit').on("click", function () {
	            self.model.set({
	                cus_email: $('#login-cus-email').val(),
	                cus_password: $('#login-cus-password').val()
	            });

	            if ($(".icheckbox_square-blue").hasClass("checked")) {
	                // TODO: add operation.
	            }

	            if (self.inputValidation()) {
	                $.when($.ajax({
	                    url: "/login",
	                    type: "POST",
	                    data: JSON.stringify(self.model.attributes),
	                    dataType: 'json'
	                })).done(function (data) {
	                    console.log(data.statusMsg);
	                    $("#info-message-container").css("margin-top", "-30px");
	                    $("#info-message").html(data.statusMsg);
	                    self.model.parseWith(data.customer);
	                    self.model.set("isLoggedIn", true);
	                    self.removeMask();
	                }).fail(function (xhr, textStatus) {
	                    console.log(xhr.status + ": " + xhr.responseJSON.statusMsg);
	                    $("#info-message-container").css("margin-top", "-30px");
	                    $("#info-message").html(xhr.responseJSON.statusMsg);
	                    if (xhr.status === 422) {
	                        $("#login-cus-password").focus().select();
	                    } else if (xhr.status === 404) {
	                        $("#login-cus-password").val("");
	                        $("#login-cus-email").focus().select();
	                    }
	                });
	            }
	        });
	    },
	    inputValidation: function () {
	        let self = this;
	        if (!utils.emailValidate(self.model.get("cus_email"))) {
	            $('#login-cus-email').css("border-color", _vars["--color-login-red"]);
	            return false;
	        } else {
	            $('#login-cus-email').css("border-color", _vars["--color-login-gray"]);
	            return true;
	        }
	    },
	    removeMask: function () {
	        $(".login-mask").remove();
	        $(".login-background").remove();
	    }
	});

	let RegisterMaskView = Backbone.View.extend({
	    el: '#register-box-body',
	    bindEvents: function () {
	        let self = this;
	        $('#cus_name').on("input blur", function () {
	            self.nameValidation();
	        });
	        $('#cus_email').on("blur", function () {
	            self.emailValidation();
	        });
	        $('#cus_password').on("input blur", function () {
	            self.passwordValidation();
	        });
	        $('#datepicker').on("input blur change", function () {
	            self.dateValidation();
	        });
	        $('#cus_address').on("input blur", function () {
	            self.addressValidation();
	        });
	        $('#cus_phone').on("input blur", function () {
	            self.phoneValidation();
	        });
	        $('#register_cus_password').find('.input-group-addon').on("click", function () {
	            let theIcon = $(this).find('i');
	            theIcon.toggleClass("fa-lock fa-unlock-alt");
	            if (theIcon.hasClass("fa-lock")) {
	                $('#cus_password').attr("type", "password");
	            } else {
	                $('#cus_password').attr("type", "text");
	            }
	        });
	        $(".icheckbox_square-blue ins").on("click", function () {
	            if ($("#register_agree_to_term").parent().hasClass("checked")) {
	                $("#alert-box").remove();
	            }
	        });
	        $('#register-button').on("click", function () {
	            self.submitValidation();
	        });
	    },
	    nameValidation: function () {
	        let c = $('#register_cus_name'),
	            cus_name = c.find('#cus_name').val(),
	            flag = false;
	        if (cus_name === "") {
	            this.setStatus(c, "error", "User name cannot be empty.");
	            flag = false;
	        } else if (cus_name.length < 4) {
	            this.model.set("cus_name", cus_name);
	            this.setStatus(c, "warning", "User name longer than 3 is recommended.");
	            flag = true;
	        } else if (cus_name.length > 45) {
	            this.setStatus(c, "error", "User name should contain no more than 45 letters.");
	            flag = false;
	        } else if (!utils.userNameValidate(cus_name)) {
	            this.setStatus(c, "error", "Only combination of numbers, letters and underscore \"_\" is allowed.");
	            flag = false;
	        } else {
	            this.model.set("cus_name", cus_name);
	            c.find('.help-block').html("");
	            c.find('.form-control-feedback').html(utils.ui.success);
	            this.nowClear(c);
	            flag = true;
	        }
	        return flag;
	    },
	    emailValidation: function () {
	        let self = this,
	            c = $('#register_cus_email'),
	            cus_email = c.find('#cus_email').val();
	        if (self.emailPreValidation(c)) {
	            $.when(self.emailExistence(cus_email)).done(function (data) {
	                self.setStatus(c, "error", "Email has already been taken. Try another please.");
	            }).fail(function (xhr, textStatus) {
	                self.model.set("cus_email", cus_email);
	                c.find('.help-block').html("");
	                c.find('.form-control-feedback').html(utils.ui.success);
	                self.nowClear(c);
	            });
	        }
	    },
	    emailPreValidation: function (c) {
	        let flag = false,
	            cus_email = c.find('#cus_email').val();
	        if (cus_email === "") {
	            this.setStatus(c, "error", "Email cannot be empty.");
	            flag = false;
	        } else if (!utils.emailValidate(cus_email)) {
	            this.setStatus(c, "error", "Typo in email?");
	            flag = false;
	        } else if (cus_email.length > 45) {
	            this.setStatus(c, "error", "Email should contain no more than 45 letters.");
	            flag = false;
	        } else {
	            flag = true;
	        }
	        return flag;
	    },
	    passwordValidation: function () {
	        let c = $('#register_cus_password'),
	            cus_password = c.find('#cus_password').val(),
	            flag = false;
	        if (cus_password === "") {
	            this.setStatus(c, "error", "Password cannot be empty.");
	            flag = false;
	        } else if (!utils.passwordValidate(cus_password)) {
	            this.setStatus(c, "error", "At least one number and one special character from \"!@#$%^&*\" are required.");
	            flag = false;
	        } else {
	            if (cus_password.length > 45) {
	                this.setStatus(c, "error", "Password should contain no more than 45 letters.");
	                flag = false;
	            } else if (cus_password.length >= 8 && cus_password.length <= 16) {
	                this.model.set("cus_password", cus_password);
	                c.find('.help-block').html("");
	                c.find('.form-control-feedback').html(utils.ui.success);
	                this.nowClear(c);
	                flag = true;
	            } else {
	                this.model.set("cus_password", cus_password);
	                this.setStatus(c, "warning", "Password from 8 to 16 digits is recommended.");
	                flag = true;
	            }
	        }
	        return flag;
	    },
	    dateValidation: function () {
	        let c = $('#register_cus_age'),
	            cus_bday = c.find('#datepicker').val(),
	            flag = false;
	        if (cus_bday === "") {
	            this.model.set("cus_age", cus_bday);
	            this.setClass(c, "has-warning");
	            flag = true;
	        } else if (!utils.dateValidate(cus_bday)) {
	            this.setStatus(c, "error", "Invalid date format.");
	            flag = false;
	        } else {
	            let dateArray = cus_bday.split("/"),
	                month = +dateArray[0],
	                day = +dateArray[1],
	                year = +dateArray[2];
	            if (day > 28) {
	                let converted = new Date(year, month - 1, day),
	                    convertedString = (converted.getMonth() + 1) + "/" + converted.getDate() + "/" + converted.getFullYear();
	                $("#datepicker").val(convertedString);
	                if (c.find('.form-control-feedback').html() !== "") {
	                    c.find('.form-control-feedback').html("");
	                }
	            }
	            this.model.set("cus_age", cus_bday);
	            c.find('.help-block').html("");
	            c.find('.form-control-feedback').html("");
	            this.nowClear(c);
	            flag = true;
	        }
	        return flag;
	    },
	    addressValidation: function () {
	        let c = $('#register_cus_address'),
	            cus_address = c.find('#cus_address').val(),
	            flag = false;
	        if (cus_address === "") {
	            this.model.set("cus_address", cus_address);
	            this.setClass(c, "has-warning");
	            flag = true;
	        } else if (cus_address.length > 100) {
	            this.setStatus(c, "error", "Address should contain no more than 100 letters.");
	            flag = false;
	        } else {
	            this.model.set("cus_address", cus_address);
	            this.nowClear(c);
	            flag = true;
	        }
	        return flag;
	    },
	    phoneValidation: function () {
	        let c = $('#register_cus_phone'),
	            cus_phone = c.find('#cus_phone').val(),
	            flag = false;
	        if (cus_phone === "") {
	            this.model.set("cus_phone", cus_phone);
	            this.setClass(c, "has-warning");
	            flag = true;
	        } else if (cus_phone.replace(/\D/g, '').length !== 10) {
	            this.setClass(c, "has-error");
	            flag = false;
	        } else {
	            this.model.set("cus_phone", cus_phone);
	            this.nowClear(c);
	            flag = true;
	        }
	        return flag;
	    },
	    agreeToTermValidation: function () {
	        if (!$("#register_agree_to_term").parent().hasClass("checked") && (typeof $("#alert-box")[0]) === "undefined") {
	            $(".register-box").append("\
	                <div id='alert-box' class='alert alert-info alert-dismissible'>\
	                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>\
	                <h4><i class='icon fa fa-info'></i> Before Registration</h4>\
	                Read and agree to our <a href='#'>terms</a> before start to use.\
	                </div>");
	        }
	    },
	    submitValidation: function () {
	        let self = this,
	            cus_gender = $('#register_cus_gender').find("input:checked").val(),
	            emailContainer = $('#register_cus_email'),
	            cus_email = emailContainer.find('#cus_email').val();
	        if (!utils.genderValidate(cus_gender)) {
	            $('.iradio_square-blue').removeClass("checked");
	            $($('.iradio_square-blue').get(2)).addClass("checked");
	        }
	        this.model.set("cus_gender", cus_gender);
	        this.agreeToTermValidation();
	        if (self.nameValidation() & self.passwordValidation() & self.dateValidation() &
	            self.emailPreValidation(emailContainer) & self.addressValidation() & self.phoneValidation()) {
	            $.when(self.emailExistence(cus_email)).done(function (data) {
	                self.setStatus(emailContainer, "error", "Email has already been taken. Try another please.");
	            }).fail(function (xhr, textStatus) {
	                self.model.set("cus_email", cus_email);
	                emailContainer.find('.help-block').html("");
	                emailContainer.find('.form-control-feedback').html(utils.ui.success);
	                self.nowClear(emailContainer);
	                self.parseRegistration();
	                $.when($.post({
	                    url: '/user/register',
	                    data: JSON.stringify(self.model.attributes),
	                    dataType: 'json'
	                })).done(function (data) {
	                    self.model.parseWith(data.customer);
	                    window.location.href = "/";
	                }).fail(function (xhr, textStatus) {
	                    if (xhr.status === 409) {
	                        console.log("email taken.");
	                    }
	                    console.log(xhr);
	                });
	            });
	        }
	    },
	    parseRegistration: function () {
	        let self = this,
	            bdayArray = this.model.get("cus_age").split("/"),
	            bday = new Date(bdayArray[2], (+bdayArray[0] - 1), bdayArray[1]),
	            now = new Date(),
	            diff = (now.getTime() - bday.getTime()) / 1000;
	        diff /= (60 * 60 * 24);
	        this.model.set({
	            "cus_age": Math.abs(Math.round(diff / 365.25)),
	            "cus_phone": self.model.get("cus_phone").replace(/\D/g, '')
	        });
	    },
	    emailExistence: function (cus_email) {
	        return $.getJSON("/user/email/" + cus_email);
	    },
	    setStatus: function (element, status, info) {
	        element.find('.help-block').html(info);
	        element.find('.form-control-feedback').html(utils.ui[status]);
	        this.setClass(element, "has-" + status);
	    },
	    setClass: function (element, className) {
	        element.removeClass("has-warning has-error has-success").addClass(className);
	    },
	    nowClear: function (element) {
	        element.removeClass("has-warning has-error has-success");
	    }
	});

	let RestaurantTypeView = Backbone.View.extend({
	    el: '#restaurant-filter-container',
	    template: _.template(utils.secureElement($("#restaurant-filter-template"))),
	    render: function () {
	        let self = this;
	        // removeBeforeAppend();
	        utils.loadings.hideLeftLoading();
	        this.$el.html(this.template({list: self.model.attributes}));
	        this.renderElements();
	    },
	    renderElements: function () {
	        // render icheck
	        $('.restaurant-cuisine-icheck').iCheck({
	            checkboxClass: 'icheckbox_square-blue',
	            radioClass: 'iradio_square-blue',
	            increaseArea: '20%' // optional
	        });
	        // delivery-time-range
	        $("#delivery-time-range").ionRangeSlider({
	            min: 15,
	            max: 120,
	            from: 30,
	            to: 60,
	            step: 15,
	            type: 'double',
	            min_interval: 15,
	            postfix: ' min.',
	            grid: true,
	            grid_num: 7,
	            input_values_separator: ";"
	        });
	        // avg-price-range
	        $("#avg-price-range").ionRangeSlider({
	            min: 5,
	            max: 105,
	            from: 10,
	            to: 30,
	            step: 5,
	            type: 'double',
	            min_interval: 5,
	            prefix: '$',
	            grid: true,
	            grid_num: 10,
	            input_values_separator: ";"
	        });
	        // rating-range
	        $("#rating-range").ionRangeSlider({
	            min: 0,
	            max: 5,
	            from: 4,
	            to: 5,
	            step: 1,
	            type: 'double',
	            min_interval: 1,
	            grid: false,
	            input_values_separator: ";"
	        });
	    }
	});

	let RestaurantSearchResultView = Backbone.View.extend({
	    el: '#restaurant-search-result-container',
	    template: _.template(utils.secureElement($("#restaurant-search-result-template"))),
	    initialize: function () {
	        this.render();
	    },
	    render: function () {
	        this.$el.html(this.template({
	            restaurants: this.model.models.map(function (restaurant) {
	                return restaurant.attributes;
	            })
	        }));
	    }
	});

	function fetchTemplate(templateIdentifier) {
	    let template_url = __templateRoot + templateIdentifier + ".html";
	    return $.ajax({
	        url: template_url,
	        method: 'GET',
	        async: false,
	        dataType: 'html'
	    });
	}

	function removeBeforeAppend() {
	    let root = $("#home-left-panel"),
	        offspring = root.children();
	    for (let i = 1; i < offspring.length; i++) {
	        $(offspring[i]).remove();
	    }
	}

	module.exports = {
	    UserBadgeView: UserBadgeView,
	    LoginMaskView: LoginMaskView,
	    RegisterMaskView: RegisterMaskView,
	    RestaurantTypeView: RestaurantTypeView,
	    RestaurantSearchResultView: RestaurantSearchResultView,
	    UserProfileSummaryView: UserProfileSummaryView,
	    UserProfileView: UserProfileView,
	    UserTransactionView: UserTransactionView
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {//     Backbone.js 1.3.3

	//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org

	(function(factory) {

	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self == 'object' && self.self === self && self) ||
	            (typeof global == 'object' && global.global === global && global);

	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(5), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function(_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore'), $;
	    try { $ = require('jquery'); } catch (e) {}
	    factory(root, exports, _, $);

	  // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
	  }

	})(function(root, Backbone, _, $) {

	  // Initial Setup
	  // -------------

	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;

	  // Create a local reference to a common array method we'll want to use later.
	  var slice = Array.prototype.slice;

	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.3.3';

	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;

	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function() {
	    root.Backbone = previousBackbone;
	    return this;
	  };

	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;

	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;

	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function(length, method, attribute) {
	    switch (length) {
	      case 1: return function() {
	        return _[method](this[attribute]);
	      };
	      case 2: return function(value) {
	        return _[method](this[attribute], value);
	      };
	      case 3: return function(iteratee, context) {
	        return _[method](this[attribute], cb(iteratee, this), context);
	      };
	      case 4: return function(iteratee, defaultVal, context) {
	        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	      };
	      default: return function() {
	        var args = slice.call(arguments);
	        args.unshift(this[attribute]);
	        return _[method].apply(_, args);
	      };
	    }
	  };
	  var addUnderscoreMethods = function(Class, methods, attribute) {
	    _.each(methods, function(length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };

	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
	    return iteratee;
	  };
	  var modelMatcher = function(attrs) {
	    var matcher = _.matches(attrs);
	    return function(model) {
	      return matcher(model.attributes);
	    };
	  };

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function(iteratee, events, name, callback, opts) {
	    var i = 0, names;
	    if (name && typeof name === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length ; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space-separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };

	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function(name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };

	  // Guard the `listening` argument from the public API.
	  var internalOn = function(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	      context: context,
	      ctx: obj,
	      listening: listening
	    });

	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }

	    return obj;
	  };

	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo = function(obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
	    }

	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };

	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context, ctx = options.ctx, listening = options.listening;
	      if (listening) listening.count++;

	      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
	    }
	    return events;
	  };

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off = function(name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	      context: context,
	      listeners: this._listeners
	    });
	    return this;
	  };

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening = function(obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }

	    return this;
	  };

	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function(events, name, callback, options) {
	    if (!events) return;

	    var i = 0, listening;
	    var context = options.context, listeners = options.listeners;

	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }

	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];

	      // Bail out if there are no events stored.
	      if (!handlers) break;

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (
	          callback && callback !== handler.callback &&
	            callback !== handler.callback._callback ||
	              context && context !== handler.context
	        ) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }

	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    return events;
	  };

	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once = function(name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    if (typeof name === 'string' && context == null) callback = void 0;
	    return this.on(events, callback, context);
	  };

	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce = function(obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };

	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function() {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger = function(name) {
	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

	    eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };

	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function(objEvents, name, callback, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	  };

	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;

	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);

	  // Backbone.Model
	  // --------------

	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.

	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function(attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    var defaults = _.result(this, 'defaults');
	    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };

	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {

	    // A hash of attributes whose current and previous value differ.
	    changed: null,

	    // The value returned during the last failed validation.
	    validationError: null,

	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',

	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Return a copy of the model's `attributes` object.
	    toJSON: function(options) {
	      return _.clone(this.attributes);
	    },

	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Get the value of an attribute.
	    get: function(attr) {
	      return this.attributes[attr];
	    },

	    // Get the HTML-escaped value of an attribute.
	    escape: function(attr) {
	      return _.escape(this.get(attr));
	    },

	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function(attr) {
	      return this.get(attr) != null;
	    },

	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },

	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function(key, val, options) {
	      if (key == null) return this;

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});

	      // Run validation.
	      if (!this._validate(attrs, options)) return false;

	      // Extract attributes and options.
	      var unset      = options.unset;
	      var silent     = options.silent;
	      var changes    = [];
	      var changing   = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }

	      var current = this.attributes;
	      var changed = this.changed;
	      var prev    = this._previousAttributes;

	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }

	      // Update the `id`.
	      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }

	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },

	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
	    },

	    // Clear all attributes on the model, firing `"change"`.
	    clear: function(options) {
	      var attrs = {};
	      for (var key in this.attributes) attrs[key] = void 0;
	      return this.set(attrs, _.extend({}, options, {unset: true}));
	    },

	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },

	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },

	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },

	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function() {
	      return _.clone(this._previousAttributes);
	    },

	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var model = this;
	      var success = options.success;
	      options.success = function(resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || typeof key === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options = _.extend({validate: true, parse: true}, options);
	      var wait = options.wait;

	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else if (!this._validate(attrs, options)) {
	        return false;
	      }

	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function(resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);

	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

	      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);

	      // Restore attributes.
	      this.attributes = attributes;

	      return xhr;
	    },

	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;

	      var destroy = function() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };

	      options.success = function(resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };

	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },

	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function() {
	      var base =
	        _.result(this, 'urlRoot') ||
	        _.result(this.collection, 'url') ||
	        urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },

	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new model with identical attributes to this one.
	    clone: function() {
	      return new this.constructor(this.attributes);
	    },

	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function() {
	      return !this.has(this.idAttribute);
	    },

	    // Check if the model is currently in a valid state.
	    isValid: function(options) {
	      return this._validate({}, _.extend({}, options, {validate: true}));
	    },

	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	      return false;
	    }

	  });

	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	      omit: 0, chain: 1, isEmpty: 1};

	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');

	  // Backbone.Collection
	  // -------------------

	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.

	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function(models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({silent: true}, options));
	  };

	  // Default options for `Collection#set`.
	  var setOptions = {add: true, remove: true, merge: true};
	  var addOptions = {add: true, remove: false};

	  // Splices `insert` into `array` at index `at`.
	  var splice = function(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    var i;
	    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
	    for (i = 0; i < length; i++) array[i + at] = insert[i];
	    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {

	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function(options) {
	      return this.map(function(model) { return model.toJSON(options); });
	    },

	    // Proxy `Backbone.sync` by default.
	    sync: function() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function(models, options) {
	      return this.set(models, _.extend({merge: false}, options, addOptions));
	    },

	    // Remove a model, or a list of models from the set.
	    remove: function(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed.length) {
	        options.changes = {added: [], merged: [], removed: removed};
	        this.trigger('update', this, options);
	      }
	      return singular ? removed[0] : removed;
	    },

	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function(models, options) {
	      if (models == null) return;

	      options = _.extend({}, setOptions, options);
	      if (options.parse && !this._isModel(models)) {
	        models = this.parse(models, options) || [];
	      }

	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();

	      var at = options.at;
	      if (at != null) at = +at;
	      if (at > this.length) at = this.length;
	      if (at < 0) at += this.length + 1;

	      var set = [];
	      var toAdd = [];
	      var toMerge = [];
	      var toRemove = [];
	      var modelMap = {};

	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;

	      var sort = false;
	      var sortable = this.comparator && at == null && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model, i;
	      for (i = 0; i < models.length; i++) {
	        model = models[i];

	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            toMerge.push(existing);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;

	        // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }

	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }

	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
	          return m !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }

	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({silent: true});

	      // Unless silenced, it's time to fire all appropriate add/sort/update events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length || toMerge.length) {
	          options.changes = {
	            added: toAdd,
	            removed: toRemove,
	            merged: toMerge
	          };
	          this.trigger('update', this, options);
	        }
	      }

	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },

	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({silent: true}, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },

	    // Add a model to the end of the collection.
	    push: function(model, options) {
	      return this.add(model, _.extend({at: this.length}, options));
	    },

	    // Remove a model from the end of the collection.
	    pop: function(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },

	    // Add a model to the beginning of the collection.
	    unshift: function(model, options) {
	      return this.add(model, _.extend({at: 0}, options));
	    },

	    // Remove a model from the beginning of the collection.
	    shift: function(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },

	    // Slice out a sub-array of models from the collection.
	    slice: function() {
	      return slice.apply(this.models, arguments);
	    },

	    // Get a model from the set by id, cid, model object with id or cid
	    // properties, or an attributes object that is transformed through modelId.
	    get: function(obj) {
	      if (obj == null) return void 0;
	      return this._byId[obj] ||
	        this._byId[this.modelId(obj.attributes || obj)] ||
	        obj.cid && this._byId[obj.cid];
	    },

	    // Returns `true` if the model is in the collection.
	    has: function(obj) {
	      return this.get(obj) != null;
	    },

	    // Get the model at the given index.
	    at: function(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },

	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },

	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function(attrs) {
	      return this.where(attrs, true);
	    },

	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});

	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },

	    // Pluck an attribute from each model in the collection.
	    pluck: function(attr) {
	      return this.map(attr + '');
	    },

	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function(options) {
	      options = _.extend({parse: true}, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function(resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function(m, resp, callbackOpts) {
	        if (wait) collection.add(m, callbackOpts);
	        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },

	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function(resp, options) {
	      return resp;
	    },

	    // Create a new collection with an identical list of models as this one.
	    clone: function() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },

	    // Define how to uniquely identify models in the collection.
	    modelId: function(attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },

	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function() {
	      this.length = 0;
	      this.models = [];
	      this._byId  = {};
	    },

	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },

	    // Internal method called by both remove and set.
	    _removeModels: function(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;

	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;

	        // Remove references before triggering 'remove' event to prevent an
	        // infinite loop. #3693
	        delete this._byId[model.cid];
	        var id = this.modelId(model.attributes);
	        if (id != null) delete this._byId[id];

	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }

	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed;
	    },

	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function(model) {
	      return model instanceof Model;
	    },

	    // Internal method to create a model's ties to a collection.
	    _addReference: function(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },

	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },

	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function(event, model, collection, options) {
	      if (model) {
	        if ((event === 'add' || event === 'remove') && collection !== this) return;
	        if (event === 'destroy') this.remove(model, options);
	        if (event === 'change') {
	          var prevId = this.modelId(model.previousAttributes());
	          var id = this.modelId(model.attributes);
	          if (prevId !== id) {
	            if (prevId != null) delete this._byId[prevId];
	            if (id != null) this._byId[id] = model;
	          }
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
	      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
	      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');

	  // Backbone.View
	  // -------------

	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.

	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function(options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function(selector) {
	      return this.$el.find(selector);
	    },

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function() {
	      return this;
	    },

	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },

	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function() {
	      this.$el.remove();
	    },

	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },

	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },

	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },

	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },

	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function(tagName) {
	      return document.createElement(tagName);
	    },

	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },

	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function(attributes) {
	      this.$el.attr(attributes);
	    }

	  });

	  // Backbone.sync
	  // -------------

	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function(method, model, options) {
	    var type = methodMap[method];

	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });

	    // Default JSON-request options.
	    var params = {type: type, dataType: 'json'};

	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }

	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }

	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? {model: params.data} : {};
	    }

	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function(xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }

	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }

	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function(xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };

	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };

	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch': 'PATCH',
	    'delete': 'DELETE',
	    'read': 'GET'
	  };

	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function() {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };

	  // Backbone.Router
	  // ---------------

	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function(options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam    = /(\(\?)?:\w+/g;
	  var splatParam    = /\*\w+/g;
	  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function(){},

	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function(route, name, callback) {
	      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(route, function(fragment) {
	        var args = router._extractParameters(route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },

	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },

	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },

	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route, routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function(route) {
	      route = route.replace(escapeRegExp, '\\$&')
	                   .replace(optionalParam, '(?:$1)?')
	                   .replace(namedParam, function(match, optional) {
	                     return optional ? match : '([^/?]+)';
	                   })
	                   .replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function(param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }

	  });

	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function() {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },

	    // Does the pathname match the root?
	    matchRoot: function() {
	      var path = this.decodeFragment(this.location.pathname);
	      var rootPath = path.slice(0, this.root.length - 1) + '/';
	      return rootPath === this.root;
	    },

	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },

	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the pathname and search params, without the root.
	    getPath: function() {
	      var path = this.decodeFragment(
	        this.location.pathname + this.getSearch()
	      ).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },

	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options          = _.extend({root: '/'}, this.options, options);
	      this.root             = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState  = !!this.options.pushState;
	      this._hasPushState    = !!(this.history && this.history.pushState);
	      this._usePushState    = this._wantsPushState && this._hasPushState;
	      this.fragment         = this.getFragment();

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var rootPath = this.root.slice(0, -1) || '/';
	          this.location.replace(rootPath + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;

	        // Or if we've started out with a hash-based route, but we're currently
	        // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), {replace: true});
	        }

	      }

	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }

	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function(eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function(eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };

	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }

	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }

	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function(route, callback) {
	      this.handlers.unshift({route: route, callback: callback});
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function(e) {
	      var current = this.getFragment();

	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }

	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function(handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = {trigger: !!options};

	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');

	      // Don't include a trailing slash on the root.
	      var rootPath = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        rootPath = rootPath.slice(0, -1) || '/';
	      }
	      var url = rootPath + fragment;

	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	      // If hash changes haven't been explicitly disabled, update the hash
	      // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
	          var iWindow = this.iframe.contentWindow;

	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }

	          this._updateHash(iWindow.location, fragment, options.replace);
	        }

	      // If you've told us that you explicitly don't want fallback hashchange-
	      // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });

	  // Create the default Backbone.history.
	  Backbone.history = new History;

	  // Helpers
	  // -------

	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function(protoProps, staticProps) {
	    var parent = this;
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function(){ return parent.apply(this, arguments); };
	    }

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function and add the prototype properties.
	    child.prototype = _.create(parent.prototype, protoProps);
	    child.prototype.constructor = child;

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function() {
	    throw new Error('A "url" property or function must be specified');
	  };

	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function(model, options) {
	    var error = options.error;
	    options.error = function(resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };

	  return Backbone;
	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {"--color-login-gray":"#d2d6de","--color-login-red":"#dd4b39","--color-register-red":"#dd4b39","--color-register-yellow":"#f39c12","--color-register-green":"#00a65a"}

/***/ },
/* 15 */
/***/ function(module, exports) {

	let utils = {
	    emailValidate: function (email) {
	        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|edu|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
	        return re.test(email);
	    },
	    ageValidate: function (age) {
	        age = +age;
	        return !isNaN(age) && age > 0 && age < 101;
	    },
	    phoneValidate: function (phoneNumber) {
	        return phoneNumber.length === 10 && !isNaN(+phoneNumber);
	    },
	    genderValidate: function (gender) {
	        return gender === "male" || gender === "female" || gender === "unknown";
	    },
	    userNameValidate: function (userName) {
	        var re = /^\w+$/;
	        return re.test(userName);
	    },
	    passwordValidate: function (password) {
	        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*]).*[a-zA-Z0-9!@#$%^&*]$/;
	        return re.test(password);
	    },
	    dateValidate: function (bDay) {
	        var re = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
	        return re.test(bDay);
	    },
	    slash: function (url) {
	        return url.charAt(url.length - 1) === '/' ? url : url + '/';
	    },
	    secureElement: function (element) {
	        if(element.length!==0)
	            return element.html();
	        else return "";
	    },
	    ui: {
	        empty: "",
	        success: "<i class='fa fa-check' style='color:#00a65a'></i>",
	        warning: "<i class='fa fa-bell-o' style='color:#f39c12'></i>",
	        error: "<i class='fa fa-times-circle-o' style='color:#dd4b39'></i>",
	        overlayIcon: "<div class='overlay'><i class='fa fa-refresh fa-spin'></i></div>"
	    },
	    loadings:{
	        hideLeftLoading:function () {
	            $("#left-panel-loading-box").hide();
	        },
	        showLeftLoading:function () {
	            $("#left-panel-loading-box").show();
	        }
	    }
	};

	module.exports = utils;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * iCheck v1.0.1, http://git.io/arlzeA
	 * =================================
	 * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
	 *
	 * (c) 2013 Damir Sultanov, http://fronteed.com
	 * MIT Licensed
	 */

	(function($) {

	  // Cached vars
	  var _iCheck = 'iCheck',
	    _iCheckHelper = _iCheck + '-helper',
	    _checkbox = 'checkbox',
	    _radio = 'radio',
	    _checked = 'checked',
	    _unchecked = 'un' + _checked,
	    _disabled = 'disabled',
	    _determinate = 'determinate',
	    _indeterminate = 'in' + _determinate,
	    _update = 'update',
	    _type = 'type',
	    _click = 'click',
	    _touch = 'touchbegin.i touchend.i',
	    _add = 'addClass',
	    _remove = 'removeClass',
	    _callback = 'trigger',
	    _label = 'label',
	    _cursor = 'cursor',
	    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

	  // Plugin init
	  $.fn[_iCheck] = function(options, fire) {

	    // Walker
	    var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
	      stack = $(),
	      walker = function(object) {
	        object.each(function() {
	          var self = $(this);

	          if (self.is(handle)) {
	            stack = stack.add(self);
	          } else {
	            stack = stack.add(self.find(handle));
	          }
	        });
	      };

	    // Check if we should operate with some method
	    if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {

	      // Normalize method's name
	      options = options.toLowerCase();

	      // Find checkboxes and radio buttons
	      walker(this);

	      return stack.each(function() {
	        var self = $(this);

	        if (options == 'destroy') {
	          tidy(self, 'ifDestroyed');
	        } else {
	          operate(self, true, options);
	        }
	          // Fire method's callback
	        if ($.isFunction(fire)) {
	          fire();
	        }
	      });

	    // Customization
	    } else if (typeof options == 'object' || !options) {

	      // Check if any options were passed
	      var settings = $.extend({
	          checkedClass: _checked,
	          disabledClass: _disabled,
	          indeterminateClass: _indeterminate,
	          labelHover: true,
	          aria: false
	        }, options),

	        selector = settings.handle,
	        hoverClass = settings.hoverClass || 'hover',
	        focusClass = settings.focusClass || 'focus',
	        activeClass = settings.activeClass || 'active',
	        labelHover = !!settings.labelHover,
	        labelHoverClass = settings.labelHoverClass || 'hover',

	        // Setup clickable area
	        area = ('' + settings.increaseArea).replace('%', '') | 0;

	      // Selector limit
	      if (selector == _checkbox || selector == _radio) {
	        handle = 'input[type="' + selector + '"]';
	      }
	        // Clickable area limit
	      if (area < -50) {
	        area = -50;
	      }
	        // Walk around the selector
	      walker(this);

	      return stack.each(function() {
	        var self = $(this);

	        // If already customized
	        tidy(self);

	        var node = this,
	          id = node.id,

	          // Layer styles
	          offset = -area + '%',
	          size = 100 + (area * 2) + '%',
	          layer = {
	            position: 'absolute',
	            top: offset,
	            left: offset,
	            display: 'block',
	            width: size,
	            height: size,
	            margin: 0,
	            padding: 0,
	            background: '#fff',
	            border: 0,
	            opacity: 0
	          },

	          // Choose how to hide input
	          hide = _mobile ? {
	            position: 'absolute',
	            visibility: 'hidden'
	          } : area ? layer : {
	            position: 'absolute',
	            opacity: 0
	          },

	          // Get proper class
	          className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,

	          // Find assigned labels
	          label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),

	          // Check ARIA option
	          aria = !!settings.aria,

	          // Set ARIA placeholder
	          ariaID = _iCheck + '-' + Math.random().toString(36).replace('0.', ''),

	          // Parent & helper
	          parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
	          helper;

	        // Set ARIA "labelledby"
	        if (label.length && aria) {
	          label.each(function() {
	            parent += 'aria-labelledby="';

	            if (this.id) {
	              parent += this.id;
	            } else {
	              this.id = ariaID;
	              parent += ariaID;
	            }

	            parent += '"';
	          });
	        }
	          // Wrap input
	        parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);

	        // Layer addition
	        helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);

	        // Finalize customization
	        self.data(_iCheck, {o: settings, s: self.attr('style')}).css(hide);
	        !!settings.inheritClass && parent[_add](node.className || '');
	        !!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
	        parent.css('position') == 'static' && parent.css('position', 'relative');
	        operate(self, true, _update);

	        // Label events
	        if (label.length) {
	          label.on(_click + '.i mouseover.i mouseout.i ' + _touch, function(event) {
	            var type = event[_type],
	              item = $(this);

	            // Do nothing if input is disabled
	            if (!node[_disabled]) {

	              // Click
	              if (type == _click) {
	                if ($(event.target).is('a')) {
	                  return;
	                }
	                operate(self, false, true);

	              // Hover state
	              } else if (labelHover) {

	                // mouseout|touchend
	                if (/ut|nd/.test(type)) {
	                  parent[_remove](hoverClass);
	                  item[_remove](labelHoverClass);
	                } else {
	                  parent[_add](hoverClass);
	                  item[_add](labelHoverClass);
	                }
	              }
	                if (_mobile) {
	                event.stopPropagation();
	              } else {
	                return false;
	              }
	            }
	          });
	        }
	          // Input events
	        self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function(event) {
	          var type = event[_type],
	            key = event.keyCode;

	          // Click
	          if (type == _click) {
	            return false;

	          // Keydown
	          } else if (type == 'keydown' && key == 32) {
	            if (!(node[_type] == _radio && node[_checked])) {
	              if (node[_checked]) {
	                off(self, _checked);
	              } else {
	                on(self, _checked);
	              }
	            }
	              return false;

	          // Keyup
	          } else if (type == 'keyup' && node[_type] == _radio) {
	            !node[_checked] && on(self, _checked);

	          // Focus/blur
	          } else if (/us|ur/.test(type)) {
	            parent[type == 'blur' ? _remove : _add](focusClass);
	          }
	        });

	        // Helper events
	        helper.on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function(event) {
	          var type = event[_type],

	            // mousedown|mouseup
	            toggle = /wn|up/.test(type) ? activeClass : hoverClass;

	          // Do nothing if input is disabled
	          if (!node[_disabled]) {

	            // Click
	            if (type == _click) {
	              operate(self, false, true);

	            // Active and hover states
	            } else {

	              // State is on
	              if (/wn|er|in/.test(type)) {

	                // mousedown|mouseover|touchbegin
	                parent[_add](toggle);

	              // State is off
	              } else {
	                parent[_remove](toggle + ' ' + activeClass);
	              }
	                // Label hover
	              if (label.length && labelHover && toggle == hoverClass) {

	                // mouseout|touchend
	                label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
	              }
	            }
	              if (_mobile) {
	              event.stopPropagation();
	            } else {
	              return false;
	            }
	          }
	        });
	      });
	    } else {
	      return this;
	    }
	  };

	  // Do something with inputs
	  function operate(input, direct, method) {
	    var node = input[0],
	      state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
	      active = method == _update ? {
	        checked: node[_checked],
	        disabled: node[_disabled],
	        indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
	      } : node[state];

	    // Check, disable or indeterminate
	    if (/^(ch|di|in)/.test(method) && !active) {
	      on(input, state);

	    // Uncheck, enable or determinate
	    } else if (/^(un|en|de)/.test(method) && active) {
	      off(input, state);

	    // Update
	    } else if (method == _update) {

	      // Handle states
	      for (var state in active) {
	        if (active[state]) {
	          on(input, state, true);
	        } else {
	          off(input, state, true);
	        }
	      }
	    } else if (!direct || method == 'toggle') {

	      // Helper or label was clicked
	      if (!direct) {
	        input[_callback]('ifClicked');
	      }
	        // Toggle checked state
	      if (active) {
	        if (node[_type] !== _radio) {
	          off(input, state);
	        }
	      } else {
	        on(input, state);
	      }
	    }
	  }
	    // Add checked, disabled or indeterminate state
	  function on(input, state, keep) {
	    var node = input[0],
	      parent = input.parent(),
	      checked = state == _checked,
	      indeterminate = state == _indeterminate,
	      disabled = state == _disabled,
	      callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
	      regular = option(input, callback + capitalize(node[_type])),
	      specific = option(input, state + capitalize(node[_type]));

	    // Prevent unnecessary actions
	    if (node[state] !== true) {

	      // Toggle assigned radio buttons
	      if (!keep && state == _checked && node[_type] == _radio && node.name) {
	        var form = input.closest('form'),
	          inputs = 'input[name="' + node.name + '"]';

	        inputs = form.length ? form.find(inputs) : $(inputs);

	        inputs.each(function() {
	          if (this !== node && $(this).data(_iCheck)) {
	            off($(this), state);
	          }
	        });
	      }
	        // Indeterminate state
	      if (indeterminate) {

	        // Add indeterminate state
	        node[state] = true;

	        // Remove checked state
	        if (node[_checked]) {
	          off(input, _checked, 'force');
	        }
	          // Checked or disabled state
	      } else {

	        // Add checked or disabled state
	        if (!keep) {
	          node[state] = true;
	        }
	          // Remove indeterminate state
	        if (checked && node[_indeterminate]) {
	          off(input, _indeterminate, false);
	        }
	      }
	        // Trigger callbacks
	      callbacks(input, checked, state, keep);
	    }
	      // Add proper cursor
	    if (node[_disabled] && !!option(input, _cursor, true)) {
	      parent.find('.' + _iCheckHelper).css(_cursor, 'default');
	    }
	      // Add state class
	    parent[_add](specific || option(input, state) || '');

	    // Set ARIA attribute
	    disabled ? parent.attr('aria-disabled', 'true') : parent.attr('aria-checked', indeterminate ? 'mixed' : 'true');

	    // Remove regular state class
	    parent[_remove](regular || option(input, callback) || '');
	  }
	    // Remove checked, disabled or indeterminate state
	  function off(input, state, keep) {
	    var node = input[0],
	      parent = input.parent(),
	      checked = state == _checked,
	      indeterminate = state == _indeterminate,
	      disabled = state == _disabled,
	      callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
	      regular = option(input, callback + capitalize(node[_type])),
	      specific = option(input, state + capitalize(node[_type]));

	    // Prevent unnecessary actions
	    if (node[state] !== false) {

	      // Toggle state
	      if (indeterminate || !keep || keep == 'force') {
	        node[state] = false;
	      }
	        // Trigger callbacks
	      callbacks(input, checked, callback, keep);
	    }
	      // Add proper cursor
	    if (!node[_disabled] && !!option(input, _cursor, true)) {
	      parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
	    }
	      // Remove state class
	    parent[_remove](specific || option(input, state) || '');

	    // Set ARIA attribute
	    disabled ? parent.attr('aria-disabled', 'false') : parent.attr('aria-checked', 'false');

	    // Add regular state class
	    parent[_add](regular || option(input, callback) || '');
	  }
	    // Remove all traces
	  function tidy(input, callback) {
	    if (input.data(_iCheck)) {

	      // Remove everything except input
	      input.parent().html(input.attr('style', input.data(_iCheck).s || ''));

	      // Callback
	      if (callback) {
	        input[_callback](callback);
	      }
	        // Unbind events
	      input.off('.i').unwrap();
	      $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
	    }
	  }
	    // Get some option
	  function option(input, state, regular) {
	    if (input.data(_iCheck)) {
	      return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
	    }
	  }
	    // Capitalize some string
	  function capitalize(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }
	    // Executable handlers
	  function callbacks(input, checked, callback, keep) {
	    if (!keep) {
	      if (checked) {
	        input[_callback]('ifToggled');
	      }
	        input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
	    }
	  }
	})(window.jQuery || window.Zepto);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	let $ = __webpack_require__(5);
	let _ = __webpack_require__(11);
	let Backbone = __webpack_require__(13);
	Backbone.$ = $;
	let utils = __webpack_require__(15);
	const default_img_path_without_suffix = "../img/user-default";

	let Customer = Backbone.Model.extend({
	    url: function () {
	        let base = "/user";
	        if (this.isNew()) {
	            return base + "/register";
	        }
	        return utils.slash(base) + this.id;
	    },
	    default: {
	        isLoggedIn: false
	    },
	    initialize: function () {
	        // this.set("cus_email", "asd11@qq.com");
	    },
	    validationError: "",
	    validate: function () {
	        let self = this;
	        let errMsg = "";
	        if (!utils.emailValidate(self.attributes.cus_email)) {
	            errMsg = "invalid email.";
	        } else if (!utils.ageValidate(self.attributes.cus_age)) {
	            errMsg = "invalid age.";
	        } else if (!utils.phoneValidate(self.attributes.cus_phone)) {
	            errMsg = "invalid phone number.";
	        } else if (!utils.genderValidate(self.attributes.cus_gender)) {
	            errMsg = "invalid gender.";
	        }
	        if (errMsg !== "") {
	            self.validationError = errMsg;
	            return errMsg;
	        }
	    },
	    parseWith: function (customer) {
	        this.set({
	            id:customer.cus_id,
	            cus_id: customer.cus_id,
	            cus_name: customer.cus_name,
	            cus_password: customer.cus_password,
	            cus_gender: customer.cus_gender,
	            cus_age: customer.cus_age,
	            cus_email: customer.cus_email,
	            cus_address: customer.cus_address,
	            cus_phone: customer.cus_phone
	        });
	        this.setAvatar(default_img_path_without_suffix);
	    },
	    setAvatar: function (img_path) {
	        this.set("cus_img", img_path);
	    }
	});

	let RestaurantFilterModel = Backbone.Model.extend({
	    defaults: {
	        res_type: "",
	        avg_price: "10,30",
	        res_rating: "4,5",
	        res_delivery_time: "30,60",
	        search_text: ""
	    },
	    initialize: function () {

	    },
	    bindEvents: function () {
	        let self = this;
	        $(".checkbox.icheck label, .checkbox.icheck label div ins").map(function (idx, icheck) {
	            icheck.addEventListener("click", function () {
	                self.bindUpdateType();
	            })
	        });
	        this.bindUpdateType();
	        this.bindUpdateAvgPrice();
	        this.bindUpdateRating();
	        this.bindUpdateDeliveryTime();
	        this.bindSearchText();
	    },
	    bindUpdateType: function () {
	        let tempResType = "";
	        $("#restaurant-cuisine .icheckbox_square-blue").map(function (idx, element) {
	            let e = $(element);
	            if (e.hasClass("checked")) {
	                tempResType += e.find("input").val() + ",";
	            }
	        });
	        this.set("res_type", tempResType);
	    },
	    bindSearchText: function () {
	        let self = this,
	            input = $("#restaurant-search-text"),
	            button = input.parent().find("button");
	        input.on("mouseup", function () {
	            self.set("search_text", input.val());
	        });
	        button.click(function () {
	            self.set("search_text", input.val());
	        });
	    },
	    bindUpdateAvgPrice: function () {
	        this.updateRange("avg_price", "#avg-price-range");
	    },
	    bindUpdateRating: function () {
	        this.updateRange("res_rating", "#rating-range");
	    },
	    bindUpdateDeliveryTime: function () {
	        this.updateRange("res_delivery_time", "#delivery-time-range");
	    },
	    updateRange: function (attribute, inputElement) {
	        let self = this,
	            input = $(inputElement),
	            root = input.parent();
	        root.find(".from, .irs-from, .to, .irs-to").map(function (idx, element) {
	            element.addEventListener("mouseup", function () {
	                self.set(attribute, input.val());
	            });
	        });
	    },
	    preFetchValidation: function (restaurantTypeModel) {
	        if (this.get("res_type") === "") {
	            this.set("res_type", Object.keys(restaurantTypeModel.attributes).join());
	        }
	    }
	});

	let RestaurantTypeModel = Backbone.Model.extend({
	    url: function () {
	        let base = "/search/cuisine";
	        if (this.isNew()) {
	            return base;
	        }
	        return utils.slash(base) + this.id;
	    },
	    fetchData: function () {
	        let self = this;
	        this.fetch({
	            success: function (model, response, options) {
	                self.model = model;
	            },
	            error: function (model, response, options) {
	            }
	        });
	    }
	});

	let RestaurantModel = Backbone.Model.extend({
	    url: "/restaurant",
	    default: {},
	    initialize: function () {
	    },
	    validate: function () {
	    },
	    parse: function () {
	    }
	});

	let DishModel = Backbone.Model.extend({
	    url: "/dish",
	    default: {},
	    initialize: function () {

	    },
	    validate: function () {

	    },
	    parse: function () {

	    }
	});

	module.exports = {
	    Customer: Customer,
	    RestaurantFilterModel: RestaurantFilterModel,
	    RestaurantModel: RestaurantModel,
	    RestaurantTypeModel: RestaurantTypeModel,
	    DishModel: DishModel
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	let $ = __webpack_require__(5);
	let _ = __webpack_require__(11);
	let Backbone = __webpack_require__(13);
	Backbone.$ = $;
	let utils = __webpack_require__(15);


	let RestaurantSearchResultCollection = Backbone.Collection.extend({
	    url: '/search/filter',
	    fetchData: function (filterAttributes) {
	        let self = this;
	        $.when($.get({
	            url: this.url,
	            data: filterAttributes,
	            dataType: 'json'
	        })).done(function (data) {
	            self.set(data.results, {reset: true});
	            self.trigger("change");
	        }).fail(function (xhr, textStatus) {
	            console.log(xhr.status);
	        });
	    }
	});

	let DishCollection = Backbone.Collection.extend({});

	module.exports = {
	    RestaurantSearchResultCollection: RestaurantSearchResultCollection,
	    DishCollection: DishCollection
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	let $ = __webpack_require__(5);
	let _ = __webpack_require__(11);
	let Backbone = __webpack_require__(13);
	Backbone.$ = $;

	let AppRouter = Backbone.Router.extend({
	    routes: {
	        "": "home",
	        "user/:cus_id": "profile",
	        "user/:cus_id/edit": "editProfile"
	    },
	    initialize:function () {

	    }
	});

	module.exports = {
	    AppRouter: AppRouter
	};

/***/ }
/******/ ]);