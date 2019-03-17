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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _errors = __webpack_require__(5);

	var errors = _interopRequireWildcard(_errors);

	var _postHandlers = __webpack_require__(6);

	var post = _interopRequireWildcard(_postHandlers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	$(document).ready(function () {
	  $('#location-form').on('submit', getLocationInfo);
	  $('#sign-up').on('submit', registerUser);
	  $('#login').on('submit', logIn);
	  $('#favorite').click(favoriteLocation);
	}); // This file is in the entry point in your webpack config.


	var registerUser = function registerUser(event) {
	  event.preventDefault();
	  errors.clearErrors();
	  var email = $('input')[0].value;
	  var password = $('input')[1].value;
	  var confPassword = $('input')[2].value;
	  if (password !== confPassword) {
	    errors.displayError("Error: Please check passwords");
	  } else {
	    createUser(email, password, confPassword);
	  };
	};

	var logIn = function logIn(event) {
	  event.preventDefault();
	  errors.clearErrors();
	  var email = $('#email').val();
	  var password = $('#password').val();
	  var loginUrl = ("http://localhost:3000/api/v1") + "/sessions";
	  $.post(loginUrl, { email: email, password: password }).done(function (data) {
	    document.cookie = 'api_key=' + data.api_key;
	    window.location.replace('index.html');
	    $('.alerts').text('Successfully logged in!');
	  }).fail(function (data) {
	    errors.displayError("Please check your email and password, or sign up for a new account!");
	  });
	};

	var createUser = function createUser(email, password, confPassword) {
	  var usersUrl = ("http://localhost:3000/api/v1") + "/users";
	  $.post(usersUrl, { email: email, password: password, password_confirmation: confPassword }).done(function (data) {
	    document.cookie = 'api_key=' + data.api_key;
	    window.location.replace('index.html');
	    $('.alerts').text('Successfully created account!');
	  });
	};

	var getLocationInfo = function getLocationInfo(event) {
	  event.preventDefault();
	  var location = $('input').val().toLowerCase();
	  var locationUrl = ("http://localhost:3000/api/v1") + "/forecast?location=" + location;
	  var backgroundUrl = ("http://localhost:3000/api/v1") + "/backgrounds?location=" + location;
	  $.get(locationUrl).then(post.postWeather).catch(errors.errorLog);
	  $.get(backgroundUrl).then(post.postBackgroundImage).catch(errors.errorBackground);
	};

	var favoriteLocation = function favoriteLocation(event) {
	  var location = localStorage.getItem("location");
	  var api_key = document.cookie.split('=')[1];
	  var favoritesUrl = ("http://localhost:3000/api/v1") + "/favorites";
	  $.post(favoritesUrl, { api_key: api_key, location: location }).done(addFavorite).fail(function (data) {
	    errors.displayError("Please Log In or Sign Up to Favorite locations!");
	  });
	};

	var addFavorite = function addFavorite(data) {
	  $('.alerts').text("Location Favorited!");
	  $('#favorite').prop("disabled", true).text("Favorited!");
	  post.postFavorite();
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0; }\n\nbody {\n  font-family: 'Open Sans', sans-serif;\n  background-image: linear-gradient(-90deg, #006E90, #67B4DA);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  min-height: 100vh;\n  background-attachment: fixed; }\n\nnav {\n  background-color: #E6F4F1;\n  min-height: 40px;\n  padding: 8px 20px 0 20px; }\n  nav #page-title {\n    display: inline-block;\n    font-size: larger;\n    font-weight: bold; }\n    nav #page-title a {\n      text-decoration: none; }\n  nav #sign-up-link {\n    margin-top: 6px;\n    float: right;\n    font-size: smaller;\n    text-transform: uppercase; }\n\n.container {\n  position: relative;\n  margin: 2rem; }\n\n.errors {\n  background-color: rgba(255, 132, 132, 0.8);\n  padding: 2rem;\n  font-size: 1.2rem;\n  font-weight: bold;\n  display: none; }\n\n.current-weather, .detailed-container {\n  margin: 1rem;\n  max-width: 550px;\n  padding: 1.5rem;\n  background-color: rgba(255, 255, 255, 0.5); }\n\n.current-weather {\n  display: flex;\n  justify-content: space-between; }\n\n.high-low {\n  font-size: 0.8rem; }\n\n.location-info {\n  padding: 0.5rem; }\n\n.city-state {\n  font-size: 2rem;\n  font-weight: bold; }\n\n.favorite {\n  text-align: right; }\n  .favorite button {\n    padding: 0.2rem;\n    text-transform: uppercase;\n    font-size: xx-small;\n    font-weight: bold; }\n\n.detailed-container {\n  border: 2px solid black; }\n\n.detailed-weather {\n  display: flex;\n  justify-content: space-between; }\n  .detailed-weather table {\n    min-width: 200px;\n    border-collapse: collapse; }\n  .detailed-weather td {\n    border-bottom: 1px solid black;\n    padding: 8px 8px 4px 8px; }\n\n.table-data {\n  text-align: right; }\n\n.forecast-container {\n  margin: 1rem 10rem 1rem 1rem; }\n\n.hourly-container {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 1rem;\n  padding: 1rem;\n  background-color: rgba(255, 255, 255, 0.5);\n  text-align: center; }\n\n.hourly-icon {\n  font-size: 2rem; }\n\n.daily-container {\n  width: 60%;\n  margin-top: 1rem;\n  padding: 1rem 0 1rem 0;\n  background-color: rgba(255, 255, 255, 0.5); }\n  .daily-container table {\n    width: 100%;\n    table-layout: fixed;\n    text-align: center; }\n  .daily-container tr, .daily-container td {\n    padding-bottom: 1rem; }\n\n.daily-summary {\n  font-size: smaller; }\n\n.day i {\n  font-size: 2rem; }\n\n.daily-day {\n  text-transform: uppercase;\n  font-weight: bold; }\n\n.favorites-container {\n  margin: 1rem;\n  padding: 1.5rem;\n  background-color: rgba(255, 255, 255, 0.5); }\n\n.favorites {\n  display: flex; }\n\n.favorite-location {\n  padding: 1rem;\n  border: 1px solid black; }\n  .favorite-location .city-state {\n    font-size: 1.5rem;\n    font-weight: bold; }\n\n.favorite-temp, .favorite-icon {\n  font-size: 2rem; }\n\n.favorite-weather-details {\n  display: flex; }\n\n.favorite-details {\n  text-align: right; }\n\n.favorite-high-low {\n  padding-top: 1rem;\n  font-size: 0.8rem;\n  text-align: center; }\n\n#current-temp {\n  font-size: 4rem;\n  font-weight: bold; }\n\n#current-summary {\n  text-transform: uppercase; }\n\n#current-icon, #details-icon {\n  font-size: 3rem;\n  margin-top: 1rem; }\n\n#sign-up, #login {\n  padding-left: 2rem;\n  max-width: 350px;\n  font-weight: bold; }\n  #sign-up h2, #login h2 {\n    padding-bottom: 0.75rem; }\n  #sign-up input[type=email], #sign-up input[type=password], #login input[type=email], #login input[type=password] {\n    margin-bottom: 0.75rem;\n    margin-left: 0.25rem;\n    padding: 0.25rem;\n    width: 100%; }\n  #sign-up input[type=submit], #login input[type=submit] {\n    padding: 0.5rem 1rem;\n    margin-top: 0.75rem;\n    background-color: #E6F4F1;\n    border-radius: 5px;\n    font-weight: bold;\n    font-size: 1rem; }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var errorLog = exports.errorLog = function errorLog(error) {
	  console.log(error);
	};

	var errorBackground = exports.errorBackground = function errorBackground(error) {
	  $('body').css("background-image", "linear-gradient(-90deg, #006E90, #67B4DA)");
	  console.log(error);
	};

	var displayError = exports.displayError = function displayError(error) {
	  $('.errors').show().text(error);
	};

	var clearErrors = exports.clearErrors = function clearErrors() {
	  $('.errors').hide().text('');
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.postFavorite = exports.postWeatherDays = exports.postWeatherHours = exports.postCurrentWeather = exports.postWeather = exports.postBackgroundImage = undefined;

	var _currentWeather = __webpack_require__(7);

	var _currentWeather2 = _interopRequireDefault(_currentWeather);

	var _backgroundImage = __webpack_require__(8);

	var _backgroundImage2 = _interopRequireDefault(_backgroundImage);

	var _weatherHour = __webpack_require__(9);

	var _weatherHour2 = _interopRequireDefault(_weatherHour);

	var _weatherDay = __webpack_require__(10);

	var _weatherDay2 = _interopRequireDefault(_weatherDay);

	var _errors = __webpack_require__(5);

	var errors = _interopRequireWildcard(_errors);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var postBackgroundImage = exports.postBackgroundImage = function postBackgroundImage(imageInfo) {
	  var image = new _backgroundImage2.default(imageInfo.data.attributes);
	  $('body').css("background-image", 'url("' + image.url + '")');
	};

	var postWeather = exports.postWeather = function postWeather(weatherInfo) {
	  $('.alerts').text('');
	  errors.clearErrors();
	  $('#favorite').prop("disabled", false).text("Favorite");
	  postCurrentWeather(weatherInfo.data);
	  postWeatherHours(weatherInfo.data.attributes.weather_hours);
	  postWeatherDays(weatherInfo.data.attributes.weather_days);
	};

	var postCurrentWeather = exports.postCurrentWeather = function postCurrentWeather(weatherInfo) {
	  var currentWeather = new _currentWeather2.default(weatherInfo);
	  localStorage.setItem("currentWeather", JSON.stringify(currentWeather));
	  $('#current-temp').text(currentWeather.temp + "\xB0F");
	  $('#current-summary').text(currentWeather.summaryShort);
	  $('#current-temp-high').text(currentWeather.tempHigh + "\xB0F");
	  $('#current-temp-low').text(currentWeather.tempLow + "\xB0F");
	  $('#current-city').text(currentWeather.city);
	  $('#current-state').text(currentWeather.state);
	  $('#current-date').text(currentWeather.date);
	  $('#current-icon').html(currentWeather.icon);
	  $('#details-icon').html(currentWeather.icon);
	  $('#details-summary-short').text(currentWeather.summaryShort);
	  $('#details-summary').text(currentWeather.summary);
	  $('#details-feels').text(currentWeather.tempFeelsLike + "\xB0F");
	  $('#details-humidity').text(currentWeather.humidity + "%");
	  $('#details-visibility').text(currentWeather.visibility + " miles");
	  $('#details-uv').text(currentWeather.uv + " out of 10");
	};

	var postWeatherHours = exports.postWeatherHours = function postWeatherHours(weatherHours) {
	  var hours = weatherHours.map(function (weatherHour) {
	    return new _weatherHour2.default(weatherHour);
	  });
	  $('.hourly-container').html('');
	  hours.forEach(function (hour) {
	    $('.hourly-container').append('\n      <div class="hour">\n      <div class="hourly-time">' + hour.time + '</div>\n      <div class="hourly-icon">' + hour.icon + '</div>\n      <div class="hourly-temp">' + hour.temp + '</div>\n      </div>');
	  });
	};

	var postWeatherDays = exports.postWeatherDays = function postWeatherDays(weatherDays) {
	  var days = weatherDays.map(function (weatherDay) {
	    return new _weatherDay2.default(weatherDay);
	  });
	  $('.daily-table').html('');
	  days.forEach(function (day) {
	    $('.daily-table').append('\n      <tr class="day">\n        <td class="daily-day">' + day.day + '</td>\n        <td class="daily-summary">' + day.icon + '<br />' + day.summary + '</td>\n        <td class="daily-precip"><i class="fas fa-tint"></i><br />' + day.precipProbability + '%</td>\n        <td class="daily-high"><i class="fas fa-long-arrow-alt-up"></i>' + day.tempHigh + '\xB0F</td>\n        <td class="daily-low"><i class="fas fa-long-arrow-alt-down"></i>' + day.tempLow + '\xB0F</td>\n      </tr>');
	  });
	};

	var postFavorite = exports.postFavorite = function postFavorite() {
	  var weather = JSON.parse(localStorage.getItem("currentWeather"));
	  $('.favorites').append('\n    <div class="favorite-location">\n      <div class="location-info">          \n        <div class="city-state"><span class="favorite-city">' + weather.city + '</span>, <span class="favorite-state">' + weather.state + '</span></div>\n      </div>\n      <div class="favorite-weather-details">\n        <div class="favorite-temp">' + weather.temp + '\xB0F</div>\n        <div class="favorite-details">\n          <div class="favorite-icon">' + weather.icon + '</div>\n          <div class="favorite-summary">' + weather.summary + '</div>\n        </div>\n      </div>\n      <div class="favorite-high-low">\n        High: <span class="favorite-temp-high">' + weather.tempHigh + '\xB0F</span>   \n        Low: <span class="favorite-temp-low">' + weather.tempLow + '\xB0F</span>\n      </div>\n    </div>');
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CurrentWeather = function () {
	  function CurrentWeather(attributes) {
	    _classCallCheck(this, CurrentWeather);

	    localStorage.setItem("location", attributes.id);
	    var weather = attributes.attributes;
	    this.temp = Math.round(weather.current_weather.temperature);
	    this.summaryShort = weather.current_weather.summary_short;
	    this.summary = weather.current_weather.summary;
	    this.tempHigh = Math.round(weather.current_weather.temp_high);
	    this.tempLow = Math.round(weather.current_weather.temp_low);
	    this.tempFeelsLike = Math.round(weather.current_weather.temp_feels_like);
	    this.humidity = Math.round(weather.current_weather.humidity * 100);
	    this.visibility = weather.current_weather.visibility;
	    this.uv = weather.current_weather.uv_index;
	    this.city = weather.city;
	    this.state = weather.state;
	    this.date = weather.date;
	    this.icon = this.setIcon();
	  }

	  _createClass(CurrentWeather, [{
	    key: 'setIcon',
	    value: function setIcon() {
	      var weather = this.summaryShort.toLowerCase();
	      if (weather.includes('sun')) {
	        return this.icon = '<i class="fas fa-sun"></i>';
	      } else if (weather.includes('cloud') && weather.includes('partly')) {
	        return this.icon = '<i class="fas fa-cloud-sun"></i>';
	      } else if (weather.includes('snow')) {
	        return this.icon = '<i class="far fa-snowflake"></i>';
	      } else if (weather.includes('rain')) {
	        return this.icon = '<i class="fas fa-cloud-rain"></i>';
	      } else if (weather.includes('cloud')) {
	        return this.icon = '<i class="fas fa-cloud"></i>';
	      } else {
	        return this.icon = '<i class="fas fa-cloud-sun-rain"></i>';
	      };
	    }
	  }]);

	  return CurrentWeather;
	}();

	exports.default = CurrentWeather;
	;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BackgroundImage = function BackgroundImage(attributes) {
	  _classCallCheck(this, BackgroundImage);

	  this.url = attributes.image_url;
	};

	exports.default = BackgroundImage;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WeatherHour = function () {
	  function WeatherHour(attributes) {
	    _classCallCheck(this, WeatherHour);

	    this.temp = Math.round(attributes.temperature);
	    this.date = new Date(attributes.time * 1000);
	    this.time = this.setTime();
	    this.summaryShort = attributes.icon;
	    this.icon = this.setIcon();
	  }

	  _createClass(WeatherHour, [{
	    key: 'setTime',
	    value: function setTime() {
	      var date = this.date;
	      var time = date.toTimeString().slice(0, 2);
	      if (time > 12) {
	        return time - 12 + 'PM';
	      } else {
	        return time + 'AM';
	      };
	    }
	  }, {
	    key: 'setIcon',
	    value: function setIcon() {
	      var weather = this.summaryShort;
	      if (weather.includes('sun')) {
	        return this.icon = '<i class="fas fa-sun"></i>';
	      } else if (weather.includes('cloud') && weather.includes('partly')) {
	        return this.icon = '<i class="fas fa-cloud-sun"></i>';
	      } else if (weather.includes('snow')) {
	        return this.icon = '<i class="far fa-snowflake"></i>';
	      } else if (weather.includes('rain')) {
	        return this.icon = '<i class="fas fa-cloud-rain"></i>';
	      } else if (weather.includes('cloud')) {
	        return this.icon = '<i class="fas fa-cloud"></i>';
	      } else {
	        return this.icon = '<i class="fas fa-cloud-sun-rain"></i>';
	      };
	    }
	  }]);

	  return WeatherHour;
	}();

	exports.default = WeatherHour;
	;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WeatherDay = function () {
	  function WeatherDay(attributes) {
	    _classCallCheck(this, WeatherDay);

	    this.date = attributes.date;
	    this.day = this.setDay();
	    this.summary = attributes.summary;
	    this.summaryShort = attributes.icon;
	    this.icon = this.setIcon();
	    this.precipProbability = Math.round(attributes.precip_probability * 100);
	    this.tempHigh = Math.round(attributes.temp_high);
	    this.tempLow = Math.round(attributes.temp_low);
	  }

	  _createClass(WeatherDay, [{
	    key: 'setDay',
	    value: function setDay() {
	      var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	      var splitDate = this.date.split('-').map(function (data) {
	        return parseInt(data);
	      });
	      var date = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
	      var dayIndex = date.getDay();
	      return weekDays[dayIndex];
	    }
	  }, {
	    key: 'setIcon',
	    value: function setIcon() {
	      var weather = this.summaryShort;
	      if (weather.includes('sun')) {
	        return this.icon = '<i class="fas fa-sun"></i>';
	      } else if (weather.includes('cloud') && weather.includes('partly')) {
	        return this.icon = '<i class="fas fa-cloud-sun"></i>';
	      } else if (weather.includes('snow')) {
	        return this.icon = '<i class="far fa-snowflake"></i>';
	      } else if (weather.includes('rain')) {
	        return this.icon = '<i class="fas fa-cloud-rain"></i>';
	      } else if (weather.includes('cloud')) {
	        return this.icon = '<i class="fas fa-cloud"></i>';
	      } else {
	        return this.icon = '<i class="fas fa-cloud-sun-rain"></i>';
	      };
	    }
	  }]);

	  return WeatherDay;
	}();

	exports.default = WeatherDay;
	;

/***/ })
/******/ ]);