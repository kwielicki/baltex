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
