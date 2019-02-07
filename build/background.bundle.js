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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var config = {\n  apiKey: \"AIzaSyDyKcKgz_bST086H9VEHAZPY37ZXq3K2DE\",\n  projectId: \"yy-apps\"\n};\n\nif (typeof(firebase) === \"undefined\") {\n  alert(\"Please sign-in first.\");\n  console.error(\"Please sign-in first.\");\n} else {\n  firebase.initializeApp(config);\n}\n\nfunction initApp() {\n  firebase.auth().onAuthStateChanged(function(user) {\n    console.log('User state change detected from the Background script of the Chrome Extension:');\n  });\n}\n\nfunction onClickHandler(info, tab) {\n  if (!firebase.auth().currentUser) {\n    alert(\"Please sign-in first.\");\n    console.error(\"Please sign-in first.\");\n    return;\n  }\n\n  let db = firebase.firestore();\n  let createdAt = new Date();\n\n  db.collection(\"bookmarks\").add({\n    userId: firebase.auth().currentUser.uid,\n    url: info.pageUrl,\n    title: tab.title,\n    createdAt: new Date()\n  })\n  .then(function(docRef) {\n    console.log(\"Document written with ID: \", docRef.id);\n  })\n  .catch(function(error) {\n    console.error(\"Error adding document: \", error);\n  });\n}\n\nwindow.onload = function() {\n  initApp();\n};\n\nchrome.contextMenus.onClicked.addListener(onClickHandler);\nchrome.contextMenus.create({title: \"Save to Bookmarker\"});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYmFja2dyb3VuZC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9iYWNrZ3JvdW5kLmpzPzgxMDQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUR5S2NLZ3pfYlNUMDg2SDlWRUhBWlBZMzdaWHEzSzJERVwiLFxuICBwcm9qZWN0SWQ6IFwieXktYXBwc1wiXG59O1xuXG5pZiAodHlwZW9mKGZpcmViYXNlKSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICBhbGVydChcIlBsZWFzZSBzaWduLWluIGZpcnN0LlwiKTtcbiAgY29uc29sZS5lcnJvcihcIlBsZWFzZSBzaWduLWluIGZpcnN0LlwiKTtcbn0gZWxzZSB7XG4gIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbn1cblxuZnVuY3Rpb24gaW5pdEFwcCgpIHtcbiAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2coJ1VzZXIgc3RhdGUgY2hhbmdlIGRldGVjdGVkIGZyb20gdGhlIEJhY2tncm91bmQgc2NyaXB0IG9mIHRoZSBDaHJvbWUgRXh0ZW5zaW9uOicpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb25DbGlja0hhbmRsZXIoaW5mbywgdGFiKSB7XG4gIGlmICghZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyKSB7XG4gICAgYWxlcnQoXCJQbGVhc2Ugc2lnbi1pbiBmaXJzdC5cIik7XG4gICAgY29uc29sZS5lcnJvcihcIlBsZWFzZSBzaWduLWluIGZpcnN0LlwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcbiAgbGV0IGNyZWF0ZWRBdCA9IG5ldyBEYXRlKCk7XG5cbiAgZGIuY29sbGVjdGlvbihcImJvb2ttYXJrc1wiKS5hZGQoe1xuICAgIHVzZXJJZDogZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCxcbiAgICB1cmw6IGluZm8ucGFnZVVybCxcbiAgICB0aXRsZTogdGFiLnRpdGxlLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxuICB9KVxuICAudGhlbihmdW5jdGlvbihkb2NSZWYpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRvY3VtZW50IHdyaXR0ZW4gd2l0aCBJRDogXCIsIGRvY1JlZi5pZCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBhZGRpbmcgZG9jdW1lbnQ6IFwiLCBlcnJvcik7XG4gIH0pO1xufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIGluaXRBcHAoKTtcbn07XG5cbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKG9uQ2xpY2tIYW5kbGVyKTtcbmNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHt0aXRsZTogXCJTYXZlIHRvIEJvb2ttYXJrZXJcIn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/background.js\n");

/***/ })

/******/ });