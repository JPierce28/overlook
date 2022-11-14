/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n}\n\nbody {\n  height: 220vh;\n  margin: 0;\n  background: linear-gradient(rgb(177, 250, 250), rgb(255, 255, 255), white);\n}\n\n.main-header {\n  background: rgb(244, 255, 254);\n  border-bottom: solid 2px lightblue;\n  height: 15vh;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.my-bookings-header {\n  background: rgb(244, 255, 254);\n  border-bottom: solid 4px lightblue;\n  height: 15vh;\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  margin-bottom: 30px;\n}\n\n.booking-header {\n  border-bottom: solid 2px black;\n  height: 25vh;\n  display: flex;\n  flex-direction: row;\n}\n\n.welcome-header {\n  height: 10vh;\n  background-color: rgb(244, 255, 254);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.welcome-screen {\n  height: 40vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.main-section {\n  height: 200vh;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-around;\n}\n\n.log-in-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.log-in-container {\n  height: 40vh;\n  width: 40vw;\n  background: white;\n  box-shadow: 3px 3px 3px 3px black;\n  border: solid 2px rgb(112, 189, 233);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.my-bookings{\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.welcome-container {\n  box-shadow: 3px 3px 3px 3px black;\n  height: 50vh;\n  width: 40vw;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.booking-container {\n  background: white;\n  box-shadow: 3px 3px 3px 3px black;\n  border: solid 2px rgb(112, 189, 233);\n  height: 100vh;\n  width: 80vw;\n  overflow-y: scroll;\n}\n\n.my-booking-container {\n  background: white;\n  box-shadow: 3px 3px 3px 3px black;\n  border: solid 2px rgb(112, 189, 233);\n  height: 100vh;\n  width: 80vw;\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: row;\n}\n\n.my-booking-header{\n  background: white;\n  border: solid 2px rgb(112, 189, 233);\n  height: 25vh;\n  width: 80vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  box-shadow: 3px 3px 3px 3px black;\n}\n\n.past-bookings-header {\n  width: 40%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-right: solid 3px #5faaef;\n}\n\n.future-bookings-header {\n  width: 40%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-left: solid 3px #5faaef;\n}\n\n.total-spent {\n  width: 20%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.filter-type {\n  width: 33%;\n  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.title {\n  width: 33%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.calendar {\n  height: 20%;\n  width: 40%;\n  font-size: large;\n  margin-bottom: 20px;\n  background: transparent;\n  border: 1px solid #91C9FF;\n  outline: none;\n  transition: 1s ease-in-out;\n  cursor: pointer;\n}\n\n.calendar:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.calendar-container {\n  width: 33%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.select-room-type{\n  width: 50%;\n  height: 20%;\n  border-radius: 10px;\n  cursor: pointer;\n  margin-bottom: 10px;\n  font-size: large;\n}\n\n.username-entry {\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  border-color: #91C9FF;\n}\n\n.password-entry {\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  border-color: #91C9FF;\n}\n\n.filter-by-type{\n  width: 50%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  margin-bottom: 15px;\n  background: transparent;\n  border: 1px solid #91C9FF;\n  outline: none;\n  transition: 1s ease-in-out;\n}\n\n.filter-by-type:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.filter-by-type:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.log-in-button{\n  width: 30%;\n  height: 10%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  margin-bottom: 15px;\n  background: transparent;\n  border: 1px solid #91C9FF;\n  outline: none;\n  transition: 1s ease-in-out;\n}\n\n.log-in-button:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.log-in-button:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.book-room {\n  margin: 10px;\n  height: 15%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  font-size: large;\n  border-radius: 15px;\n  border: dotted 3px lightblue;\n}\n\n.booking-list {\n  margin: 10px;\n  height: 15%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  font-size: large;\n  border-radius: 15px;\n  border: dotted 3px lightblue;\n}\n\n.calendar-search {\n  width: 50%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n  margin-bottom: 20px;\n}\n\n.calendar-search:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.calendar-search:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.book-now{\n  width: 10%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.book-now:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.book-now:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.delete-booking{\n  width: 25%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.delete-booking:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.delete-booking:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.my-bookings-button {\n  margin-top: 40px;\n  border-radius: 20px;\n  width: 10%;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.my-bookings-button:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.my-bookings-button:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.return-home-button {\n  margin-top: 40px;\n  border-radius: 20px;\n  width: 10%;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.return-home-button:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.return-home-button:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.past-bookings{\n  width: 50%;\n  border-right: solid 2px #5faaef;\n}\n\n.future-bookings{\n  width: 50%;\n}\n\n.customer-name{\n  margin-top: 60px;\n}\n\n.my-name{\n  margin-top: 60px;\n}\n\n#iceland-image {\n  height: 80%\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,uEAAuE;AACzE;;AAEA;EACE,aAAa;EACb,SAAS;EACT,0EAA0E;AAC5E;;AAEA;EACE,8BAA8B;EAC9B,kCAAkC;EAClC,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;EAC9B,kCAAkC;EAClC,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,8BAA8B;EAC9B,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,oCAAoC;EACpC,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,iBAAiB;EACjB,iCAAiC;EACjC,oCAAoC;EACpC,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,iCAAiC;EACjC,YAAY;EACZ,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,2BAA2B;AAC7B;;AAEA;EACE,iBAAiB;EACjB,iCAAiC;EACjC,oCAAoC;EACpC,aAAa;EACb,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,iCAAiC;EACjC,oCAAoC;EACpC,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,oCAAoC;EACpC,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,iCAAiC;AACnC;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,+BAA+B;AACjC;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,UAAU;EACV,uEAAuE;EACvE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,WAAW;EACX,UAAU;EACV,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;EAC1B,eAAe;AACjB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,eAAe;EACf,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;AAC5B;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;AAC5B;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,8BAA8B;EAC9B,gBAAgB;EAChB,mBAAmB;EACnB,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,8BAA8B;EAC9B,gBAAgB;EAChB,mBAAmB;EACnB,4BAA4B;AAC9B;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;EAC1B,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;EACf,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,UAAU;EACV,gBAAgB;EAChB,eAAe;EACf,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,UAAU;EACV,gBAAgB;EAChB,eAAe;EACf,uBAAuB;EACvB,yBAAyB;EACzB,aAAa;EACb,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,+BAA+B;AACjC;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE;AACF;;AAEA;EACE,aAAa;AACf","sourcesContent":["* {\n  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n}\n\nbody {\n  height: 220vh;\n  margin: 0;\n  background: linear-gradient(rgb(177, 250, 250), rgb(255, 255, 255), white);\n}\n\n.main-header {\n  background: rgb(244, 255, 254);\n  border-bottom: solid 2px lightblue;\n  height: 15vh;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.my-bookings-header {\n  background: rgb(244, 255, 254);\n  border-bottom: solid 4px lightblue;\n  height: 15vh;\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-around;\n  margin-bottom: 30px;\n}\n\n.booking-header {\n  border-bottom: solid 2px black;\n  height: 25vh;\n  display: flex;\n  flex-direction: row;\n}\n\n.welcome-header {\n  height: 10vh;\n  background-color: rgb(244, 255, 254);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.welcome-screen {\n  height: 40vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.main-section {\n  height: 200vh;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-around;\n}\n\n.log-in-page {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.log-in-container {\n  height: 40vh;\n  width: 40vw;\n  background: white;\n  box-shadow: 3px 3px 3px 3px black;\n  border: solid 2px rgb(112, 189, 233);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.my-bookings{\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.welcome-container {\n  box-shadow: 3px 3px 3px 3px black;\n  height: 50vh;\n  width: 40vw;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n\n.booking-container {\n  background: white;\n  box-shadow: 3px 3px 3px 3px black;\n  border: solid 2px rgb(112, 189, 233);\n  height: 100vh;\n  width: 80vw;\n  overflow-y: scroll;\n}\n\n.my-booking-container {\n  background: white;\n  box-shadow: 3px 3px 3px 3px black;\n  border: solid 2px rgb(112, 189, 233);\n  height: 100vh;\n  width: 80vw;\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: row;\n}\n\n.my-booking-header{\n  background: white;\n  border: solid 2px rgb(112, 189, 233);\n  height: 25vh;\n  width: 80vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  box-shadow: 3px 3px 3px 3px black;\n}\n\n.past-bookings-header {\n  width: 40%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-right: solid 3px #5faaef;\n}\n\n.future-bookings-header {\n  width: 40%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-left: solid 3px #5faaef;\n}\n\n.total-spent {\n  width: 20%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.filter-type {\n  width: 33%;\n  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.title {\n  width: 33%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.calendar {\n  height: 20%;\n  width: 40%;\n  font-size: large;\n  margin-bottom: 20px;\n  background: transparent;\n  border: 1px solid #91C9FF;\n  outline: none;\n  transition: 1s ease-in-out;\n  cursor: pointer;\n}\n\n.calendar:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.calendar-container {\n  width: 33%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.select-room-type{\n  width: 50%;\n  height: 20%;\n  border-radius: 10px;\n  cursor: pointer;\n  margin-bottom: 10px;\n  font-size: large;\n}\n\n.username-entry {\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  border-color: #91C9FF;\n}\n\n.password-entry {\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  border-color: #91C9FF;\n}\n\n.filter-by-type{\n  width: 50%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  margin-bottom: 15px;\n  background: transparent;\n  border: 1px solid #91C9FF;\n  outline: none;\n  transition: 1s ease-in-out;\n}\n\n.filter-by-type:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.filter-by-type:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.log-in-button{\n  width: 30%;\n  height: 10%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  margin-bottom: 15px;\n  background: transparent;\n  border: 1px solid #91C9FF;\n  outline: none;\n  transition: 1s ease-in-out;\n}\n\n.log-in-button:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.log-in-button:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.book-room {\n  margin: 10px;\n  height: 15%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  font-size: large;\n  border-radius: 15px;\n  border: dotted 3px lightblue;\n}\n\n.booking-list {\n  margin: 10px;\n  height: 15%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  font-size: large;\n  border-radius: 15px;\n  border: dotted 3px lightblue;\n}\n\n.calendar-search {\n  width: 50%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n  margin-bottom: 20px;\n}\n\n.calendar-search:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.calendar-search:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.book-now{\n  width: 10%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.book-now:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.book-now:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.delete-booking{\n  width: 25%;\n  height: 20%;\n  border-radius: 10px;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.delete-booking:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.delete-booking:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.my-bookings-button {\n  margin-top: 40px;\n  border-radius: 20px;\n  width: 10%;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.my-bookings-button:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.my-bookings-button:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.return-home-button {\n  margin-top: 40px;\n  border-radius: 20px;\n  width: 10%;\n  font-size: large;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid #5faaef;\n  outline: none;\n  transition: 1s ease-in-out;\n  font-size: large;\n}\n\n.return-home-button:hover {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.return-home-button:focus {\n  transition: 1s ease-in-out;\n  background: #c0defb;\n}\n\n.past-bookings{\n  width: 50%;\n  border-right: solid 2px #5faaef;\n}\n\n.future-bookings{\n  width: 50%;\n}\n\n.customer-name{\n  margin-top: 60px;\n}\n\n.my-name{\n  margin-top: 60px;\n}\n\n#iceland-image {\n  height: 80%\n}\n\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/iceland.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class BookingsList {
  constructor(allBookings) {
    this.allBookings = allBookings
  }
  searchByDate(dateChoosen) {
    let filteredBookings = this.allBookings.filter(day => {
      if(day.date.includes(dateChoosen)){
        return day
      }  
    })
    if(filteredBookings.length === 0){
      return "No bookings"
    } else {
      return filteredBookings
    }
  }
  searchByUser(id) {
    let filteredUser = this.allBookings.filter(booking => {
      return booking.userID === id
    })
    if(filteredUser.length === 0) {
      return "Hmm we cant seem to find any bookings for that user."
    } else {
      return filteredUser
    }
  }
  searchByRoom(roomNum) {
    let filteredRoom = this.allBookings.filter(room => {
      return room.roomNumber === roomNum
    })
    if(filteredRoom.length === 0) {
      return "Hmm we cant seem to find that room number. Try searching a different room number."
    } else {
      return filteredRoom
    }
  }
  availableBookings(dateChoosen, rooms) {
    let today = this.searchByDate(dateChoosen)
    if(today === "No bookings"){
      return rooms.allRooms
    } else {
    let bookingRoom = today.map(booking => {
      return booking.roomNumber
    })
    let allRoom = rooms.allRooms.filter(room => {
      return !bookingRoom.includes(room.number)
    })
    return allRoom
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingsList);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Guest{
  constructor(customer) {
    this.name = customer.name
    this.id = customer.id
  }
  myBookings(bookings) {
    return bookings.searchByUser(this.id)
  }
  totalSpent(bookings, rooms) {
    let allBookings = this.myBookings(bookings)
    let myRooms = allBookings.map(room => {
      return room.roomNumber
    })
    let roomNumber = rooms.allRooms.filter(num => {
      return myRooms.includes(num.number)
    })
    let amount = roomNumber.reduce((acc, nextRoom) => {
      return acc += nextRoom.costPerNight
    },0)
    return amount
  }
}





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Guest);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CustomerList {
  constructor(customers){
    this.customers = customers
  }
  filterByName(customerName) {
    let name = this.customers.find(customer => {
      return customer.name === customerName
    })
    if(name){
      return name
    } else {
    return 'Sorry we could not find that customer, try another name!'
    }
  }
  filterById(customerId) {
    let id = this.customers.find(customer => {
      return customerId === customer.id
    })
    if(id){
      return id
    } else {
      return 'Sorry we could not find that customer, try another id!'
    }
  }
}





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomerList);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class RoomsList {
  constructor(allRooms) {
    this.allRooms = allRooms
  }
  searchByType(typeSearch) {
    let roomSearch = this.allRooms.filter(room => {
      return room.roomType === typeSearch
    })
    return roomSearch
  }
  searchByNumber(numberSearch) {
    let roomNumberSearch = this.allRooms.find(room => {
      return room.number === numberSearch
    })
    if(roomNumberSearch){
      return roomNumberSearch
    } else {
      return "Sorry no rooom number matches that search try to use a number between 1-25."
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RoomsList);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customersUrl": () => (/* binding */ customersUrl),
/* harmony export */   "roomsUrl": () => (/* binding */ roomsUrl),
/* harmony export */   "bookingsUrl": () => (/* binding */ bookingsUrl),
/* harmony export */   "fetchedBookings": () => (/* binding */ fetchedBookings),
/* harmony export */   "fetchedCustomers": () => (/* binding */ fetchedCustomers),
/* harmony export */   "fetchedRooms": () => (/* binding */ fetchedRooms),
/* harmony export */   "getApiData": () => (/* binding */ getApiData),
/* harmony export */   "postApiData": () => (/* binding */ postApiData),
/* harmony export */   "deleteApi": () => (/* binding */ deleteApi)
/* harmony export */ });
const customersUrl = 'http://localhost:3001/api/v1/customers'
const roomsUrl = 'http://localhost:3001/api/v1/rooms'
const bookingsUrl = 'http://localhost:3001/api/v1/bookings'
// let singleCustomerUrl = 'http://localhost:3001/api/v1/customers/1'
const deleteBookingUrl = 'http://localhost:3001/api/v1/bookings/'

function getApiData(url) {
  const fetchedApi = fetch(url)
    .then((response) => response.json())
    .catch(error => console.log('Error: ', error))
  return fetchedApi
}

function deleteApi(bookingId) {
  let deleteData = fetch(deleteBookingUrl + bookingId, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .catch(error => console.log(error))
  return deleteData
}

function postApiData(addBooking) {
  let postData = fetch(bookingsUrl, {
    method: 'POST',
    body: JSON.stringify(addBooking),
    headers: {'content-type': 'application/json'}
  })
  .then(response => {
    if(response.ok){
      console.log('response: ', response)
      return response.json()
    } else {   
      throw new Error("Sorry, an error occured. Please refresh the page.")
    }
  })
  .catch(error => console.log('Post error:', error))
  return postData
}



const fetchedCustomers = getApiData(customersUrl)
const fetchedRooms = getApiData(roomsUrl)
const fetchedBookings = getApiData(bookingsUrl)
// let fetchedSingleCustomer = getApiData(singleCustomerUrl)



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_iceland_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _src_classes_Booking_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _src_classes_guest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _src_classes_customer_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _src_classes_Rooms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);











// Global Variables go here
let currentGuest, allBookings, allRooms, currentDate, date, day, month, year, allCustomers

//query selectors

const myBookingsButton = document.querySelector('.my-bookings-button')
const returnHomeButton = document.querySelector('.return-home-button')
const filterButton = document.querySelector('.filter-by-type')
const calendarButton = document.querySelector('.calendar-search')
const loginButton = document.querySelector('.log-in-button')
const roomTypeSelect = document.querySelector('.select-room-type')
const defaultValue = document.querySelector('.default-value')
const calendar = document.querySelector('.calendar') 
const myBookingsPage = document.querySelector('.my-bookings')
const homePage = document.querySelector('.main-section')
const loginPage = document.querySelector('.log-in-page')
const myPastBookings = document.querySelector('.past-bookings')
const myFutureBookings = document.querySelector('.future-bookings')
const availableBookingsContainer = document.querySelector('.available-bookings-container')
const displaySpent = document.querySelector('.total-spent')
const mainHeader = document.querySelector('.main-header')
const myBookingsHeader = document.querySelector('.my-booking-header')
const displayCustomer = document.querySelector('.customer-name')
const myName = document.querySelector('.my-name')
const userNameEntry = document.querySelector('.username-entry')
const passwordEntry = document.querySelector('.password-entry')
const logInError = document.querySelector('.log-in-error-message')

//events
window.addEventListener('load', dateToday)
myBookingsButton.addEventListener('click', viewMyBookings)
returnHomeButton.addEventListener('click', returnHome)
filterButton.addEventListener('click', filterByRoomType)
calendarButton.addEventListener('click', filterByDate)
loginButton.addEventListener('click', verifyLogIn)

//event handlers


function verifyLogIn() {
  let username = userNameEntry.value
  let password = passwordEntry.value
  let userId = username[8] + username[9] 
  if(password !== 'overlook2021'){
    logInError.innerHTML = `<h1>Password is incorrect please try again! (enter: overlook2021)</h1>`
  } 
  else if(username[9] === undefined && username[8] > 0){
    return logIn(username[8])
  }
  else if(userId > 50){
    console.log("more than 50");
    logInError.innerHTML = `<h1>User Id is out of range please use a number between 1 and 50</h1>`
  }
  else if(username[8] < 1){
    logInError.innerHTML = `<h1>User Id is out of range please use a number between 1 and 50</h1>`
  }
  else if (username[8] === undefined){
    logInError.innerHTML = `<h1>User name is incorrect, make sure to type customer</h1>`
  }
  else {
    logIn(userId)
  }
}

function logIn(userId) {
  removeHidden(homePage)
  removeHidden(mainHeader)
  addHidden(loginPage)
  let singleCustomerUrl = `http://localhost:3001/api/v1/customers/${userId}`
  let fetchedSingleCustomer = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.getApiData)(singleCustomerUrl)
  loadDate()
  getData(fetchedSingleCustomer)
}

function getData(singleUser) {
  Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchedCustomers, _apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchedRooms, _apiCalls__WEBPACK_IMPORTED_MODULE_7__.fetchedBookings, singleUser])
  .then((data) => {
    allCustomers = new _src_classes_customer_list__WEBPACK_IMPORTED_MODULE_5__.default(data[0].customers)
    allRooms = new _src_classes_Rooms__WEBPACK_IMPORTED_MODULE_6__.default(data[1].rooms)
    allBookings = new _src_classes_Booking_list__WEBPACK_IMPORTED_MODULE_3__.default(data[2].bookings)
    currentGuest = new _src_classes_guest__WEBPACK_IMPORTED_MODULE_4__.default(data[3])
    loadData(allBookings, allRooms)
  })
  .catch((error) => {
    availableBookingsContainer.innerHTML = `
    <h2>Sorry, an error occured. Please refresh the page. Error: ${error}</h2>`
  }); 
}

function postBooking(addedBooking) {
  const newPost = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.postApiData)(addedBooking)
  Promise.all([newPost])
    .then((data) => {
      console.log(data)
      return Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.getApiData)(_apiCalls__WEBPACK_IMPORTED_MODULE_7__.bookingsUrl)])
    })
    .then((data) => {
      console.log(data)
      allBookings = new _src_classes_Booking_list__WEBPACK_IMPORTED_MODULE_3__.default(data[0].bookings)
      loadData(allBookings, allRooms)
    })
}

function fetchDelete(id) {
  const newDelete = (0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.deleteApi)(id)
  Promise.all([newDelete])
    .then((data) => {
      console.log(data)
      return Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_7__.getApiData)(_apiCalls__WEBPACK_IMPORTED_MODULE_7__.bookingsUrl)])
    })
    .then((data) => {
      console.log(data)
      allBookings = new _src_classes_Booking_list__WEBPACK_IMPORTED_MODULE_3__.default(data[0].bookings)
      loadData(allBookings, allRooms)
      viewMyBookings()
    })
}

function loadData(bookingData, roomsData) {
  availableBookingsContainer.innerHTML = ''
  displayCustomer.innerHTML = `Signed in as: ${currentGuest.name}`
  let availableBookings = bookingData.availableBookings(currentDate, roomsData)
  if(availableBookings.length === 25){
    roomsData.allRooms.forEach(element => {
      availableBookingsContainer.innerHTML += `
    <div class="book-room">
        <p>Date: ${currentDate}</p>
        <p>Room Number: ${element.number}</p>
        <p>Room Type: ${element.roomType}</p>
        <p>Bidet: ${element.bidet}</p>
        <p>Cost Per Night: ${element.costPerNight}</p>
        <p>Beds: ${element.numBeds}</p>
        <button id="${element.number}" class="book-now">Book Now</button>
      </div>`
    })
  } else if (availableBookings.length === 0) {
    availableBookingsContainer.innerHTML += `<h2>We are so sorry, we don't have any availble bookings on this day. We would still love to see you so please adjust your date and or room type filters 🙂</h2>`
    
  } else {
    availableBookings.forEach(element => {
      availableBookingsContainer.innerHTML += `
      <div class="book-room">
        <p>Date: ${currentDate}</p>
        <p id="room-number">Room Number: ${element.number}</p>
        <p>Room Type: ${element.roomType}</p>
        <p>Bidet: ${element.bidet}</p>
        <p>Cost Per Night: ${element.costPerNight}</p>
        <p>Beds: ${element.numBeds}</p>
        <button id="${element.number}" class="book-now">Book Now</button>
      </div>`
    })
  }
  const addBookingButton = document.querySelectorAll('.book-now')
  addBookingButton.forEach((button) => {
    button.addEventListener('click', addBooking)
  })
}

function viewMyBookings() {
  myPastBookings.innerHTML = ''
  myFutureBookings.innerHTML = ''
  dateToday()
  myName.innerHTML = `Signed in as: ${currentGuest.name}`
  addHidden(homePage)
  removeHidden(myBookingsPage)
  addHidden(mainHeader)
  removeHidden(myBookingsHeader)
  let allMyBookings = currentGuest.myBookings(allBookings)
  let pastBookings = allMyBookings.filter(booking => {
    return booking.date < currentDate
  })
  let futureBookings = allMyBookings.filter(booking => {
    return booking.date >= currentDate
  })
  pastBookings.forEach(element => {
    myPastBookings.innerHTML += `
      <div class="booking-list"
        <p>Date: ${element.date}</p>
        <p>Room Number: ${element.roomNumber}</p>
        <p>Booking ID: ${element.id}</p>
      </div>`
  })
  futureBookings.forEach(element => {
    myFutureBookings.innerHTML += `
      <div class="booking-list"
        <p>Date: ${element.date}</p>
        <p>Room Number: ${element.roomNumber}</p>
        <button class="delete-booking"id="${element.id}">Cancel Booking</button>
      </div>`
  })
  const allSpent = currentGuest.totalSpent(allBookings, allRooms)
  displaySpent.innerHTML = `<h3 class="filter">Total I've Spent: $${allSpent}</h3>`
  const deleteButtons = document.querySelectorAll('.delete-booking')
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteBooking)
  })
}

function filterByRoomType() {
  let selectValue = roomTypeSelect.value
  const newSearch = allRooms.searchByType(selectValue)
  let newRooms = new _src_classes_Rooms__WEBPACK_IMPORTED_MODULE_6__.default(newSearch)
  loadData(allBookings, newRooms)
  if(selectValue === 'Select a Filter'){
    loadData(allBookings, allRooms)
  }
}

function filterByDate() {
  let searchDate = calendar.value
  currentDate = searchDate.replaceAll('-', '/')
  let filteredDate = allBookings.availableBookings(currentDate, allRooms)
  availableBookingsContainer.innerHTML = ''
  filteredDate.forEach(element => {
    availableBookingsContainer.innerHTML += `
    <div class="book-room">
        <p>Date: ${currentDate}</p>
        <p>Room Number: ${element.number}</p>
        <p>Room Type: ${element.roomType}</p>
        <p>Bidet: ${element.bidet}</p>
        <p>Cost Per Night: ${element.costPerNight}</p>
        <p>Beds: ${element.numBeds}</p>
        <button id="${element.number}" class="book-now">Book Now</button>
      </div>`
  })
  const addBookingButton = document.querySelectorAll('.book-now')
  addBookingButton.forEach((button) => {
    button.addEventListener('click', addBooking)
  })
}

function addBooking(event) {
  const newBooking = {'userID': currentGuest.id, date: currentDate, 'roomNumber': +event.target.id}
  postBooking(newBooking)
  roomTypeSelect.value = defaultValue.value
}

function deleteBooking(event) {
  const bookingId = event.target.id
  fetchDelete(bookingId)
}



//helper functions

function returnHome() {
  addHidden(myBookingsPage)
  removeHidden(homePage)
  removeHidden(mainHeader)
}

function dateToday() {
  date = new Date()
  day = date.getDate()
  month = date.getMonth()+1
  year = date.getFullYear()
  return currentDate = `${year}/${month}/${day}`
}

function loadDate () {
  calendar.min = `${year}-${month}-${day}`
}

function addHidden (element) {
  element.classList.add('hidden')
}

function removeHidden(element) {
  element.classList.remove('hidden')
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map