/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chatMaster.js":
/*!***************************!*\
  !*** ./src/chatMaster.js ***!
  \***************************/
/*! exports provided: chatMaster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chatMaster\", function() { return chatMaster; });\n/**\n * ChatMASTER main class \n * \n * v.0.0.1 mei 2018\n */\nclass chatMaster{\n  //socket = io();\n  constructor(){\n    //debugger\n    this.socket = io();\n    this.connect();\n  }\n  /**\n   * Connect to websocket server\n   */\n  connect(){\n    //default socket connect event\n    this.socket.on('connect',()=>{\n      console.log(\"Connected to server\");\n      this.listenForEvents();\n    });\n  }\n  /**\n   * Listen for events defined\n   */\n  listenForEvents(){\n    //listen for new message\n    this.socket.on('newMessage',(data)=>{\n      this.newMessage(data);\n    });\n\n    //listen for disconnect\n    this.socket.on('disconnect',()=>{\n      this.disconnect();\n    });\n  }\n  /**\n   * Receving new message from server\n   * @param data.from: string\n   * @param data.body: string\n   * @param data.createdAt: date ISO string \n   */\n  newMessage(data){\n    console.log(\"New message...\", data);\n  }\n  /**\n   * Send new message/chat.post to server\n   * @param data.from: string, sender\n   * @param data.body: string, message body \n   */\n  createMessage(data){\n    this.socket.emit('createMessage',data);\n  }\n  disconnect(){\n    console.log(\"Connection closed by server\");\n  }\n}\n\n//# sourceURL=webpack:///./src/chatMaster.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chatMaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatMaster */ \"./src/chatMaster.js\");\n/**\n * chatMASTER main file\n * \n * v0.0.1 May 2018\n */\n\n\n//create new chatMASTER object\nlet chat = new _chatMaster__WEBPACK_IMPORTED_MODULE_0__[\"chatMaster\"]();\n\n//create new message\nchat.createMessage({\n  from:'Me',\n  body: \"This is my auto message\"\n})\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });