/* @author Krzysztof Wielicki
 * Wtyczka ucinająca zadaną ilość tekstu.
 * Treść która została ucięta, jest przechowywana w elemencie span
 */
 
(function ( $ ) {
    
    "use strict";
    
    $.fn.shorterString = function( options ) {
        
        /* 
         * @param {plugString}  => String
         * @param {elipsisText} => String
         * @param {maxLength}   => Number
         */
         
        var pluginName = 'str-cutter'
        
        var settings = $.extend({
            plugString: '...',
            elipsisSelector: null,
            plugDotsClass: '__dots',
            srOnlyClass: '__cutter',
            initializedName: 'initialized',
            nameSpace: 'jplugin',
            maxLength: 33,
            srOnlyProperties: {
                'position': 'absolute',
                'width': '1px',
                'height': '1px',
                'padding': 0,
                'margin': '-1px',
                'overflow': 'hidden',
                'clip': 'rect(0,0,0,0)',
                'border': 0
            }
        }, options);

        
        /* Pętla po wszystkich znalezionych elipsisSelector */
    
        return this.each(function() {
            var self = $(this);
            
            var currentElipsisSelector = self.find(settings.elipsisSelector),
                currentElipsisText     = currentElipsisSelector.text();
                
            currentElipsisSelector.attr('data-'+pluginName+'', 
                                  '{"plugString": "' + settings.plugString + 
                                  '", "elipsisSelector":"' + settings.elipsisSelector + '"}' +
                                  '", "FullText": "' + currentElipsisText + '"}' +
                                  '", "maxLength": ' + settings.maxLength + '}');
            
            if (currentElipsisText.length > settings.maxLength) {
                
                var textCutting = currentElipsisText.substr(settings.maxLength, currentElipsisText.length - 1);
                
                currentElipsisText = currentElipsisText.substr( 0, settings.maxLength);
                currentElipsisSelector.text(currentElipsisText);
                
                
                /* W takim przypadku dodaję resztę uciętego tekstu */
                    currentElipsisSelector.append('<span class="'+pluginName + settings.srOnlyClass + '">' + textCutting + '</span>');
                    $('.' + pluginName + settings.srOnlyClass).css(settings.srOnlyProperties);
                
                /* W takim przypadku, dodaje element span, który przechowuje doty */
                    currentElipsisSelector.append('<span class="'+pluginName + settings.plugDotsClass + '">' + settings.plugString + '</span>');
                
            }

        });
        
    }
    
}( jQuery ));