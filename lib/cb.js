(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cb"] = factory();
	else
		root["cb"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _package = __webpack_require__(1);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find and returns a element containing block.
 * Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block
 *
 * @param {Element} el The Element instance whose containing block you're searching for.
 * @returns {Element|Document|Window} Returns the containing block if any, null otherwise.
 */
exports.get = function (el) {
  if (typeof Window === 'undefined' || typeof Document === 'undefined' || typeof Element === 'undefined' || typeof window === 'undefined' || typeof document === 'undefined' || !(window instanceof Window) || !(document instanceof Document)) {
    throw new Error('This script must run in a browser.');
  }

  if (el === undefined) {
    throw new Error('"el" parameter is required.');
  }

  if (!(el instanceof Element)) {
    throw new Error('"el" parameter must be a Element instance.');
  }

  // Get the element position style property

  var _window$getComputedSt = window.getComputedStyle(el),
      position = _window$getComputedSt.position;

  /*
    If the position property is static or relative,
    the containing block is formed by the edge of
    the content box of the nearest ancestor element
    that is a block container (such as an inline-block,
    block, or list-item element) or which establishes
    a formatting context (such as a table container,
    flex container, grid container, or the block container
    itself)
  */


  if (position === 'static' || position === 'relative') {
    var parent = el.parentElement;
    while (parent) {
      var _window$getComputedSt2 = window.getComputedStyle(parent),
          display = _window$getComputedSt2.display;

      if (display === 'block' || display === 'inline-block' || display === 'list-item' || display === 'table' || display === 'flex' || display === 'grid') return parent;
      parent = parent.parentElement;
    }
  }

  /*
    If the position property is absolute, the containing block
    is formed by the edge of the padding box of the nearest
    ancestor element that has a position value other than static
    (fixed, absolute, relative, or sticky).
     If the position property is absolute or fixed,
    the containing block may also be formed by the edge
    of the padding box of the nearest ancestor element
    that has the following:
     A transform or perspective value other than none
    A will-change value of transform or perspective
    A filter value other than none or a will-change value
    of filter (only works on Firefox).
  */
  if (position === 'absolute') {
    var _parent = el.parentElement;
    while (_parent) {
      var _window$getComputedSt3 = window.getComputedStyle(_parent),
          parentPosition = _window$getComputedSt3.position,
          transform = _window$getComputedSt3.transform,
          filter = _window$getComputedSt3.filter,
          willChange = _window$getComputedSt3.willChange;

      if (parentPosition !== 'static' || transform !== 'none' || willChange === 'transform' || willChange === 'perspective' || filter !== 'none' || willChange === 'filter') return _parent;
      _parent = _parent.parentElement;
    }
    return window.document;
  }

  /*
    If the position property is fixed, the containing block
    is established by the viewport (in the case of continuous media)
    or the page area (in the case of paged media).
     If the position property is absolute or fixed,
    the containing block may also be formed by the edge
    of the padding box of the nearest ancestor element
    that has the following:
     A transform or perspective value other than none
    A will-change value of transform or perspective
    A filter value other than none or a will-change value
    of filter (only works on Firefox).
  */
  if (position === 'fixed') {
    var _parent2 = el.parentElement;
    while (_parent2) {
      var _window$getComputedSt4 = window.getComputedStyle(_parent2),
          _transform = _window$getComputedSt4.transform,
          _filter = _window$getComputedSt4.filter,
          _willChange = _window$getComputedSt4.willChange;

      if (_transform !== 'none' || _willChange === 'transform' || _willChange === 'perspective' || _filter !== 'none' || _willChange === 'filter') return _parent2;
      _parent2 = _parent2.parentElement;
    }
    return window;
  }

  // Containing block not found
  return null;
};

exports.version = function () {
  return _package2.default.version;
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"name":"containing-block","version":"1.0.0","description":"A utility function which find the containing block of a DOM element.","main":"dist/cb-min.js","scripts":{"build":"webpack"},"keywords":["block","container","container","CSS","DOM"],"author":{"name":"Valerio Bianchi","email":"contacts@valeriobianchi.com","url":"https://valeriobianchi.com"},"license":"MIT","devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-env":"^1.6.1","clone-deep":"^3.0.1","eslint":"^4.16.0","eslint-config-airbnb-base":"^12.1.0","eslint-loader":"^1.9.0","eslint-plugin-import":"^2.8.0","uglifyjs-webpack-plugin":"^1.1.6","webpack":"^3.10.0"}}

/***/ })
/******/ ]);
});