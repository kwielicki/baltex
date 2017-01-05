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


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* Skrypt odpowiadający za wykonanie eventu tel: w anchorze wyłącznie dla urządzeń mobilnych */

	(function ( $ ) {

	    var $tel_selector = document.querySelectorAll( "a[href^='tel:']" );

	    Element.prototype.hasClass = Element.prototype.hasClass ||
	        function(classArr){
	            var hasClass = 0,
	                className = this.getAttribute('class');

	            if( this == null || !classArr || !className ) return false;

	            if( !(classArr instanceof Array) )
	                classArr = classArr.split(' ');

	            for( var i in classArr )

	            if( className.split(classArr[i]).length > 1 )
	                hasClass++;

	            return hasClass == classArr.length;
	        };

	    if ($tel_selector !== undefined) {

	        var $html_selector      = document.getElementsByTagName( "html" )[0],
	            $mobile_selector    = "mobile";

	        Array.prototype.forEach = function () {

	            $tel_selector.forEach(function(i) {

	                if (!$html_selector.hasClass($mobile_selector)) {
	                    for (var i = 0; i < $tel_selector.length; i++) {
	                        $tel_selector[i].style.cursor = "default";
	                        $tel_selector[i].addEventListener('click', function(event) {
	                            event.preventDefault();
	                        });
	                    }
	                }

	            });

	        }

	    } else {

	    }

	})( jQuery );


/***/ }
/******/ ]);