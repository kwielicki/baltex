(function ($) {
    "use strict";

    /** Global variables **/
    var $html         = $('html'),
        $body         = $('body'),
        $deviceWidth  = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        $deviceHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

	/** Get location and set data-location **/
    var $windowLocation = window.location.pathname;
        $html.attr('data-location', $windowLocation);

    /** Get browser language **/
    var browserLanguage = window.navigator.userLanguage || window.navigator.language;
    	$html.attr('data-browser-language', browserLanguage);

    /** DeviceJS no conflict **/
    var devicejs = device.noConflict();

    /** Function for css animate **/
        function cssAnimate() {
            if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991){
                $('.css-animate .animated').each(function(){
                    var that = $(this);
                    if (that.data('time') != undefined){
                        var delay = that.attr('data-time');
                        if(that.visible(true)){
                            setTimeout(function(){
                                that.addClass('activate');
                                that.addClass(that.data('fx'));
                            }, delay)
                        }
                    }
                    else{
                        if(that.visible(true)){
                            that.addClass('activate');
                            that.addClass(that.data('fx'));
                        }
                    }
                });
            } else {
                $body.removeClass('css-animate');
            }
        }
    /* Window on resize with delay */
    var TIMEOUT   = $html.attr('data-resized'),
        EVENT_KEY = 'resizeend',
        $window = $(window),
        timer;

        window.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                $window.trigger(EVENT_KEY);
            }, TIMEOUT);
        });

    /* Equal height */
    $.fn.equalheight = function(){
        var $this = $(this),
            $array = [],
            options = {
              height: false,
              minHeight: true,
              reset: false
            };
        $this.each(function(){
            var $outerHeight = $this.outerHeight();
            $array.push($outerHeight);
        });
        var maxValue = Math.max.apply(Math,$array);
        if (options['height'] === true){
            $this.css('height', maxValue + "px");
        }
        if (options['minHeight'] === true){
            $this.css('min-height', maxValue + "px");
        }
    };  

    $(document).on('ready', function() {

        /** jQuery browser / device **/
            $html.addClass('ver-' + $.browser.versionNumber);
            $html.addClass('device_width-' + $deviceWidth);
            $html.addClass('device_height-' +$deviceHeight);
            if ($.browser.webkit) {
                $html.addClass('browser-webkit');
            } else if ($.browser.msie) {
                $html.addClass('browser-msie');
            } else if ($.browser.mozilla) {
                $html.addClass('browser-mozilla');
            }

        /** Placeholder **/
            $('input, textarea').placeholder({
                customClass: "js-placeholder"
            });

        /** Tooltipster **/
            $('.tooltipster').tooltipster({
                delay: 50
            });

        /** Page scroller **/
            if ($('[data-scroll]').length > 0) {
                $('[data-scroll]').on('click', function(e) {
                    var $scroll;
                    e.preventDefault();
                    $scroll = $(this).attr('data-scroll');
                    if ($scroll === 'up') {
                        $('html, body').animate({
                            scrollTop: $($scroll).offset().top
                        }, 900, 'swing');
                    } else if ($scroll.charAt(0) === '#') {
                        if ($html.hasClass('mobile')) {
                            $('html, body').animate({
                                scrollTop: $($scroll).offset().top
                            }, 900, 'swing');
                        } else {
                            $('html, body').animate({
                                scrollTop: $($scoll).offset().top
                            }, 900, 'swing');
                        }
                    }
                    return false;
                });
            }

        /** Parallax Skrollr **/
            if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991) {
                $('[data-parallax]').each(function() {
                    var $this = $(this),
                        $item = $this.attr('data-parallax');

                    $this.attr('data-top-bottom', 'background-position: 50% -' + $item + 'px');
                    $this.attr('data-bottom-top', 'background-position: 50% ' + $item + 'px');
                    $this.attr('data-center', 'background-position: 50% 0px');
                })
            } else {
                $('[data-parallax]').each(function() {
                    var $this = $(this);

                    $this.addClass('js-parallax-disabled');
                })
            }
        /** Helpers **/

            // Min height
                if ($('[data-height]').length > 0) {
                    $('[data-height]').each(function() {
                        var $height, $this;
                        $this = $(this);
                        $height = $this.attr('data-height');
                        if ($height.indexOf('%') > -1) {
                            $this.css('min-height', $deviceHeight * parseInt($height, 10) / 100);
                        } else {
                            $this.css('min-height', parseInt($height, 10) + 'px');
                        }
                    });
                }

            // Background color for desktop and mobile
                if ($('[data-background]').length > 0) {
                    $('[data-background]').each(function() {
                        var $background, $backgroundmobile, $this;
                        $this = $(this);
                        $background = $(this).attr('data-background');
                        $backgroundmobile = $(this).attr('data-background-mobile');
                        if ($this.attr('data-background').substr(0, 1) === '#') {
                            $this.css('background-color', $background);
                        } else if ($html.hasClass('mobile')) {
                            $this.css('background-image', 'url(' + $backgroundmobile + ')');
                        } else {
                            $this.css('background-image', 'url(' + $background + ')');
                        }
                    });
                }

            // Background position
                if ($('[data-background-position]').length > 0) {
                    $('[data-background-position]').each(function() {
                        var $bgPosition, $this;
                        $this = $(this);
                        $bgPosition = $(this).attr('data-background-position');
                        if ($this.attr('data-background-position') == '') {
                            $this.css('background-position', '50% 50%');
                        }
                        else if ($this.attr('data-background-position')) {
                            $this.css('background-position', $bgPosition);
                        }
                    });
                }

            // Background size
                if ($('[data-background-size]').length > 0) {
                    $('[data-background-size]').each(function() {
                        var $bgSize, $this;
                        $this = $(this);
                        $bgSize = $(this).attr('data-background-size');
                        if ($this.attr('data-background-size') == '') {
                            $this.css('background-size', 'cover');
                        }
                        else if ($this.attr('data-background-position')) {
                            $this.css('background-size', $bgSize);
                        }
                    });
                }

            // Color
                if ($('[data-color]').length > 0) {
                    $('[data-color]').each(function() {
                        var $this = $(this),
                            $color = $this.attr('data-color');
                        $this.css('color', $color);
                    });
                }

        // Code for mode-rewrite data-attributes
        if ($('[data-mode-rewrite="on"]').length > 0) {
            $('a[href]').each(function() {
                var $this    = $(this),
                    attrHref = $this.attr('href');
                
                $this.attr('data-rewrite-mode', attrHref + ".html");

                var modeRewiteText = $this.attr('data-rewrite-mode');
                console.log(modeRewiteText);
                $this.attr('href', modeRewiteText);
                $this.attr('data-rewrite-mode', attrHref);
            }); 
        }

        /* 
         * JAVASCRIPT CODE FOR SITE BALTEX
         * *******************************
         *
         * 1 - Navbar searcher
         * 2 - Main slider custom paging
         * 3 - Hamburger menu
        */

        //- 1
        $('.js-searcher').on('click', function() {
            $(this).stop().toggleClass('nav-bar__icon--active');
            $('.form-searcher').stop().slideToggle('400');
            $('.nav-bar__source').toggleClass('nav-bar__source--active');
        })

        //- 2
        $(".main-slider").slick({
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 7000,
            pauseOnHover: true,
            speed: 500,
            customPaging : function(slider, i) {
                var thumb = $(slider.$slides[i]).data('thumb');
                return "<span style='background-image: url(" + $(slider.$slides[i]).data('background') + ")'>" + "<h6>" + thumb;
            },
        });
        $(".main-slider").on('beforeChange', function(){

            var $this = $(this);
            $this.find(".slick-slide [data-fx]").each(function () {
                var $content = $(this);
                $content.removeClass($content.data('fx')).removeClass("activate");
            });
            setTimeout(function () {
                $this.find(".slick-active [data-fx]").each(function () {
                    var $content = $(this);
                    if ($content.data('time') != undefined) {
                        setTimeout(function () {
                            $content.addClass($content.data('fx')).addClass("activate");
                        }, $content.data('time'));
                    } else{
                        $content.addClass($content.data('fx')).addClass("activate");
                    }
                })
            }, 150);
        });

        // 3
        $('.js-hamburger').on('click', function(evt) {
            $('.nav-bar__dropdown').toggleClass('is-active');
            if ($('.nav-bar__dropdown').hasClass('is-active')) {
                $('.nav-bar__dropdown').fadeIn(400);
            } else {
                $('.nav-bar__dropdown').fadeOut(400);
            }
        });


	}); //- Document on ready [end]

	$(window).on('load', function() {

        /* 
         * JAVASCRIPT CODE FOR SITE BALTEX
         * *******************************
         * 1 - Synchronizacja wysokośći tytułu dla głownej karuzeli
         * 
        */

        if ($html.hasClass('mobile')) {
            $(".main-slider").find('.main-slider__title').equalheight();
        }

        $(".nav-bar__dropdown").mCustomScrollbar({
            theme:"minimal-dark"
        });

		$body.addClass('window-loaded');

        /* Parallax Skrollr - init */
            var skroll;
            if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991) {
                skroll = skrollr.init({
                    forceHeight: false
                });
            }

        /* Execute function for css animate */
        cssAnimate();


	});//- Window on load [end]

    $(window).on('scroll', function() {

        /* Execute function for css animate */
        cssAnimate();

    }); //- Window on scroll [end]

    $(window).on('resizeend', function() {

        /* 
         * JAVASCRIPT CODE FOR SITE BALTEX
         * *******************************
         * 1 - Synchronizacja wysokośći tytułu dla głownej karuzeli
         * 
        */

        if ($html.hasClass('mobile')) {
            $(".main-slider").find('.main-slider__title').equalheight();
        }

        
    }); //- window on resize [end]

}(jQuery))
