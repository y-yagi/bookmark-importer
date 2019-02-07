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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/popup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/popup.js":
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Initialize Firebase\nvar config = {\n  apiKey: \"AIzaSyDyKcKgz_bST086H9VEHAZPY37ZXq3K2DE\"\n\n};\nfirebase.initializeApp(config);\n\nfunction initApp() {\n  // Listen for auth state changes.\n  // [START authstatelistener]\n  firebase.auth().onAuthStateChanged(function(user) {\n    if (user) {\n      // User is signed in.\n      var displayName = user.displayName;\n      var isAnonymous = user.isAnonymous;\n      var uid = user.uid;\n      var providerData = user.providerData;\n      // [START_EXCLUDE]\n      document.getElementById('quickstart-button').textContent = 'Sign out';\n      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';\n      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');\n      // [END_EXCLUDE]\n    } else {\n      // Let's try to get a Google auth token programmatically.\n      // [START_EXCLUDE]\n      document.getElementById('quickstart-button').textContent = 'Sign-in with Google';\n      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';\n      document.getElementById('quickstart-account-details').textContent = 'null';\n      // [END_EXCLUDE]\n    }\n    document.getElementById('quickstart-button').disabled = false;\n  });\n  // [END authstatelistener]\n\n  document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);\n}\n\n/**\n * Start the auth flow and authorizes to Firebase.\n * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.\n */\nfunction startAuth(interactive) {\n  // Request an OAuth token from the Chrome Identity API.\n  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {\n    if (chrome.runtime.lastError && !interactive) {\n      console.log('It was not possible to get a token programmatically.');\n    } else if(chrome.runtime.lastError) {\n      console.error(chrome.runtime.lastError);\n    } else if (token) {\n      // Authorize Firebase with the OAuth Access Token.\n      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);\n      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function(error) {\n        // The OAuth token might have been invalidated. Lets' remove it from cache.\n        if (error.code === 'auth/invalid-credential') {\n          chrome.identity.removeCachedAuthToken({token: token}, function() {\n            startAuth(interactive);\n          });\n        }\n      });\n    } else {\n      console.error('The OAuth Token was null');\n    }\n  });\n}\n\n/**\n * Starts the sign-in process.\n */\nfunction startSignIn() {\n  document.getElementById('quickstart-button').disabled = true;\n  if (firebase.auth().currentUser) {\n    firebase.auth().signOut();\n  } else {\n    startAuth(true);\n  }\n}\n\nwindow.onload = function() {\n  initApp();\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvcG9wdXAuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcG9wdXAuanM/ZGZmZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbml0aWFsaXplIEZpcmViYXNlXG52YXIgY29uZmlnID0ge1xuICBhcGlLZXk6IFwiQUl6YVN5RHlLY0tnel9iU1QwODZIOVZFSEFaUFkzN1pYcTNLMkRFXCJcblxufTtcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcblxuZnVuY3Rpb24gaW5pdEFwcCgpIHtcbiAgLy8gTGlzdGVuIGZvciBhdXRoIHN0YXRlIGNoYW5nZXMuXG4gIC8vIFtTVEFSVCBhdXRoc3RhdGVsaXN0ZW5lcl1cbiAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIC8vIFVzZXIgaXMgc2lnbmVkIGluLlxuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdXNlci5kaXNwbGF5TmFtZTtcbiAgICAgIHZhciBpc0Fub255bW91cyA9IHVzZXIuaXNBbm9ueW1vdXM7XG4gICAgICB2YXIgdWlkID0gdXNlci51aWQ7XG4gICAgICB2YXIgcHJvdmlkZXJEYXRhID0gdXNlci5wcm92aWRlckRhdGE7XG4gICAgICAvLyBbU1RBUlRfRVhDTFVERV1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWlja3N0YXJ0LWJ1dHRvbicpLnRleHRDb250ZW50ID0gJ1NpZ24gb3V0JztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWlja3N0YXJ0LXNpZ24taW4tc3RhdHVzJykudGV4dENvbnRlbnQgPSAnU2lnbmVkIGluJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWlja3N0YXJ0LWFjY291bnQtZGV0YWlscycpLnRleHRDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodXNlciwgbnVsbCwgJyAgJyk7XG4gICAgICAvLyBbRU5EX0VYQ0xVREVdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExldCdzIHRyeSB0byBnZXQgYSBHb29nbGUgYXV0aCB0b2tlbiBwcm9ncmFtbWF0aWNhbGx5LlxuICAgICAgLy8gW1NUQVJUX0VYQ0xVREVdXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVpY2tzdGFydC1idXR0b24nKS50ZXh0Q29udGVudCA9ICdTaWduLWluIHdpdGggR29vZ2xlJztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWlja3N0YXJ0LXNpZ24taW4tc3RhdHVzJykudGV4dENvbnRlbnQgPSAnU2lnbmVkIG91dCc7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVpY2tzdGFydC1hY2NvdW50LWRldGFpbHMnKS50ZXh0Q29udGVudCA9ICdudWxsJztcbiAgICAgIC8vIFtFTkRfRVhDTFVERV1cbiAgICB9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1aWNrc3RhcnQtYnV0dG9uJykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfSk7XG4gIC8vIFtFTkQgYXV0aHN0YXRlbGlzdGVuZXJdXG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1aWNrc3RhcnQtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFNpZ25JbiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIFN0YXJ0IHRoZSBhdXRoIGZsb3cgYW5kIGF1dGhvcml6ZXMgdG8gRmlyZWJhc2UuXG4gKiBAcGFyYW17Ym9vbGVhbn0gaW50ZXJhY3RpdmUgVHJ1ZSBpZiB0aGUgT0F1dGggZmxvdyBzaG91bGQgcmVxdWVzdCB3aXRoIGFuIGludGVyYWN0aXZlIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0QXV0aChpbnRlcmFjdGl2ZSkge1xuICAvLyBSZXF1ZXN0IGFuIE9BdXRoIHRva2VuIGZyb20gdGhlIENocm9tZSBJZGVudGl0eSBBUEkuXG4gIGNocm9tZS5pZGVudGl0eS5nZXRBdXRoVG9rZW4oe2ludGVyYWN0aXZlOiAhIWludGVyYWN0aXZlfSwgZnVuY3Rpb24odG9rZW4pIHtcbiAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yICYmICFpbnRlcmFjdGl2ZSkge1xuICAgICAgY29uc29sZS5sb2coJ0l0IHdhcyBub3QgcG9zc2libGUgdG8gZ2V0IGEgdG9rZW4gcHJvZ3JhbW1hdGljYWxseS4nKTtcbiAgICB9IGVsc2UgaWYoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgfSBlbHNlIGlmICh0b2tlbikge1xuICAgICAgLy8gQXV0aG9yaXplIEZpcmViYXNlIHdpdGggdGhlIE9BdXRoIEFjY2VzcyBUb2tlbi5cbiAgICAgIHZhciBjcmVkZW50aWFsID0gZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIuY3JlZGVudGlhbChudWxsLCB0b2tlbik7XG4gICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluQW5kUmV0cmlldmVEYXRhV2l0aENyZWRlbnRpYWwoY3JlZGVudGlhbCkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgLy8gVGhlIE9BdXRoIHRva2VuIG1pZ2h0IGhhdmUgYmVlbiBpbnZhbGlkYXRlZC4gTGV0cycgcmVtb3ZlIGl0IGZyb20gY2FjaGUuXG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnYXV0aC9pbnZhbGlkLWNyZWRlbnRpYWwnKSB7XG4gICAgICAgICAgY2hyb21lLmlkZW50aXR5LnJlbW92ZUNhY2hlZEF1dGhUb2tlbih7dG9rZW46IHRva2VufSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGFydEF1dGgoaW50ZXJhY3RpdmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlIE9BdXRoIFRva2VuIHdhcyBudWxsJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBTdGFydHMgdGhlIHNpZ24taW4gcHJvY2Vzcy5cbiAqL1xuZnVuY3Rpb24gc3RhcnRTaWduSW4oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWlja3N0YXJ0LWJ1dHRvbicpLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlcikge1xuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCk7XG4gIH0gZWxzZSB7XG4gICAgc3RhcnRBdXRoKHRydWUpO1xuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgaW5pdEFwcCgpO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/popup.js\n");

/***/ })

/******/ });