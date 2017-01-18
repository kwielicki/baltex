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

    /* Metoda, która sprawdza czy dany obiekt istnieje */
    $.fn.isExists = function() {
        return this.length > 0;
    }

    /* jQUery borwser /device */
    let detectDevices = () =>
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
    $(document).on('ready', function() {
        /** jQuery browser / device **/
            detectDevices();

        /** Placeholder **/
            $('input, textarea').placeholder({
                customClass: "js-placeholder"
            });

        /** Tooltipster **/
            $('.tooltipster').tooltipster({
                delay: 50,
                theme: 'light',
                functionInit: function(instance, helper){

                    var $origin = $(helper.origin),
                        dataOptions = $origin.attr('data-tooltipster');

                    if(dataOptions){

                        dataOptions = JSON.parse(dataOptions);

                        $.each(dataOptions, function(name, option){
                            instance.option(name, option);
                        });
                    }
                }
            });

        /** Page scroller **/
            if ($('[data-scroll]').isExists()) {
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
                if ($('[data-height]').isExists()) {
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
                if ($('[data-background]').isExists()) {
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
                if ($('[data-background-position]').isExists()) {
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
                if ($('[data-background-size]').isExists()) {
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
                if ($('[data-color]').isExists()) {
                    $('[data-color]').each(function() {
                        var $this = $(this),
                            $color = $this.attr('data-color');
                        $this.css('color', $color);
                    });
                }

        // Code for mode-rewrite data-attributes
        if ($('[data-mode-rewrite="on"]').isExists()) {
            $('a[href]').each(function() {
                var $this    = $(this),
                    attrHref = $this.attr('href');
                if (!(($this.is('[href*="/"')) || ($this.is('[href*="#"')) || ($this.is('[href*="mailto:"')) || ($this.is('[href*="tel:"')))) {
                    $this.attr('data-rewrite-mode', attrHref + ".html");

                    var modeRewiteText = $this.attr('data-rewrite-mode');
                    $this.attr('href', modeRewiteText);
                    $this.attr('data-rewrite-mode', attrHref);
                }
            });
        }

        /*
         * JAVASCRIPT CODE FOR SITE BAŁTEX
         * *******************************
         *
         * 1 - Navbar searcher
         * 2 - Main slider custom paging
         * 3 - Dropdown helper menu
         * 4 - Drukowanie widoku
         * 5 - Dodanie strony do ulubionych
         * 6 - Social media - udostępnianie strony
         * 7 - Google maps in modal + blank after confirmed
         * 8 - Match height plugin usage
         *
        */

        //- 1
        if ($('.js-search').isExists()) {
            $('.js-search').on('click', function(evt) {
                $('.search-modal').addClass('search-modal--activated');
                evt.preventDefault();
            });

            $('.js-search-close').on('click', function(evt) {
                $('.search-modal').removeClass('search-modal--activated');
                evt.preventDefault();
            });

            $(document).on('keydown', function(e) {
                if (e.keyCode == 27) {
                    if ($('.search-modal').hasClass('search-modal--activated')) {
                        $('.search-modal').removeClass('search-modal--activated');
                    }
                }
            })

        }

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
        $(".main-slider").on('afterChange', function(event, slick, currentSlide, nextSlide){
            var $this = $(this);
            $this.find(".item.slick-slide [data-fx]").each(function () {
                var $content = $(this);
                $content.removeClass($content.data('fx')).removeClass("activate");
            });
            setTimeout(function () {
                $this.find(".item.slick-active [data-fx]").each(function () {
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
        var toggleClass = {
            animated: 'animated activate fadeIn',
            activate: 'sidebar-menu--active'
        }
        $('.top-nav__anchor--dropdown').on('click', function(evt) {
            /*
             * Potrzebujemy dokładnej szerokośći, bez zaokrąglania, dlatego używam
             * natywnego JavaScriptu przy przekazywaniu wartości dla zmiennej thisWidth
             *
            */
            var thisWidth = event.target.getBoundingClientRect().width;
            $(this).toggleClass('is-active');
            $('.sidebar-menu').toggleClass(toggleClass.animated + ' ' + toggleClass.activate).css({
                'width'  : thisWidth + 'px'
            });
            evt.preventDefault();
            evt.stopPropagation();

            if ($(this).hasClass('is-active')) {
                $(this).find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                $(this).find('.fa-angle-up').removeClass('fa-angle-up').addClass('fa-angle-down');
            }

        });
        $('.sidebar-menu').on('click', function(evt) {
            evt.stopPropagation();
        });
        $(document).on('click', function() {
            var $anchorDropdown = $('.top-nav__anchor--dropdown');

            if ($('.sidebar-menu').hasClass(toggleClass.animated + ' ' + toggleClass.activate)) {
                $anchorDropdown.removeClass('is-active');
                $('.sidebar-menu').removeClass(toggleClass.animated + ' ' + toggleClass.activate);
            }
            if ($anchorDropdown.hasClass('is-active')) {
                $anchorDropdown.find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                $anchorDropdown.find('.fa-angle-up').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        });

        // 4
        $('.js-window-print').on('click', function(evt) {
            window.print();
            evt.preventDefault();
        })

        // 5
        $('.js-bookmark-application').on('click', function(e) {
            var bookmarkURL = window.location.href,
                bookmarkTitle = document.title;

            if ('addToHomescreen' in window && addToHomescreen.isCompatible) {

                // Mobile browsers
                addToHomescreen({ autostart: false, startDelay: 0 }).show(true);

                } else if (window.sidebar && window.sidebar.addPanel) {
                    // Firefox <=22
                    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
                } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
                    // Firefox 23+ and Opera <=14
                    $(this).attr({
                        href: bookmarkURL,
                        title: bookmarkTitle,
                        rel: 'sidebar'
                    }).off(e);
                    return true;
                } else if (window.external && ('AddFavorite' in window.external)) {
                    // IE Favorites
                    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                } else {
                    // TODO: Zaimplementować lepsze rozwiązanie
                    alert("Naciśnij Ctrl+D, aby dodać stronę do zakładek.")
                }
            return false;
        })

        // 6
        $('meta[property="og:url"]').attr('content', window.location.href);
        $('.social-bar__anchor--fb').on('click', function(event){
            var locationHref = window.location.href;
            window.open('http://www.facebook.com/sharer.php?u='+ encodeURIComponent(locationHref), '', 'width=481, height=481');
            event.preventDefault;
            return false;
        });
        $('.social-bar__anchor--tw').on('click', function(event){
        	window.open("https://twitter.com/share?url="+window.location.href + "&text" + "DemoText",'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            event.preventDefault;
            return false;
        });
        $('.social-bar__anchor--gp').on('click', function(event){
            var that = $(this);
            var anchorHref = that.attr('href');
            that.attr('href', anchorHref + window.location.href);
          	window.open(this.href,'', 	 'menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes,height=600,width=600');
            event.preventDefault;
            that.attr('href', anchorHref);
            return false;
        });

        // 7
        $('.js-btn-google-location').on('click', function() {
            var url = "https://www.google.pl/maps/dir//Ba%C5%82tex,+D%C5%82ugowola+Pierwsza+128,+27-300+Lipsko/@51.1039439,21.5831361,13.5z/data=!4m15!1m6!3m5!1s0x47229e1014989993:0xad41a8ec403e4a4!2zQmHFgnRleA!8m2!3d51.100704!4d21.5993461!4m7!1m0!1m5!1m1!1s0x47229e1014989993:0xad41a8ec403e4a4!2m2!1d21.5993461!2d51.100704"
            window.open(url, '_blank');
            $('.js-btn-modal-close').trigger('click');
        })

        // 8
        if ($('.main-slider').length) {
            $('.main-slider').find('.item').find('.main-slider__title').matchHeight();
        }
        if ($('.info-box').length) {
            $('.slick-slider').find('.item').find('.info-box__inner').matchHeight();
        }

        // 9
        $('.nav-bar__hamburger').on('click', function() {

            var $this = $(this);
            $this.find('.nav-bar__hamburger-menu span').toggleClass('is-active');
            $('.nav-bar__mobile').slideToggle(400).toggleClass('is-active');
        });


	}); //- Document on ready [end]

	$(window).on('load', function() {

        /*
         * JAVASCRIPT CODE FOR SITE BALTEX
         * *******************************
         *
         * 0 - Pobranie czasu ładowania strony
         * 1 - Dodanie odpowiedniej klasy, po załadowaniu strony
         * 2 - Uruchomienie parallaxu Skrollr
         * 3 - Css animate - wywołanie funkcji
        */

        // 0
        var dataTimeNow         = new Date().getTime(),
            dataTimeDiff        = dataTimeNow - startTime,
            dataTimeDiffSec     = (dataTimeDiff / 1000).toFixed(1);
        console.log("Page loading time - " + dataTimeDiffSec + " second");

        // 1
		$body.addClass('window-loaded');

        // 2
        var skroll;
        if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991) {
            skroll = skrollr.init({
                forceHeight: false
            });
        }

        // 3
        cssAnimate();

        $('[data-target=".google-maps-direction"]').on('click', function() {
            function initMap() {
                var uluru = {lat: -25.363, lng: 131.044};
                var map = new google.maps.Map(document.getElementById('google-map-modal'), {
                    zoom: 4,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            }
            initMap();
        });

	});//- Window on load [end]

    $(window).on('scroll', function() {

        /* Execute function for css animate */
        cssAnimate();

    }); //- Window on scroll [end]

    $(window).on('resizeend', function() {

        if ($('.nav-bar__mobile').hasClass('is-active')) {
            $('.nav-bar__mobile').slideUp(400);
        }

    }); //- window on resize [end]

}(jQuery))
