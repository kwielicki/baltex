/* 
 * Clickable element
 * Requireds:
 ** Data atribute [data-element-clickable="true"] for clickable element
 ** Data atribute [data-element-anchor="$classAnchor"] for clickable element
 ** Data atribute [data-element-anchor="$classAnchor"] for clickable element
 */

(function ( $ ) {
    
    function slickJsSwipeHelper(selector, eventType) {
        selector.on(eventType, function(event, slick, direction) {
            selector.addClass('js-slick--' + event.type); // event.type === 'swipe'
            return event.type;
        });
    }
    
    if ($('[data-element-clickable]').length > 0) {
        var $ClickableElement = $('[data-element-clickable]');
        
        $ClickableElement.each(function() {
            var $this = $(this),
                $attrClickableName = 'data-element-clickable',
                $attrAnchorClassName = 'data-element-anchor',
                $attrAnchor = 'data-anchor-clickable',
                $anchorElement = $this.find('[data-anchor-clickable]'),
                $attrClikableValue = $this.attr($attrClickableName); // @string
                $attrAnchorValue = $this.attr($attrClickableName); // @string
                
            var $elementClasses = {
                elementClickable: 'element-clickable--initialized',
                elementAnchor: 'element-anchor--clickable'
            };
                
                
                if ($attrClikableValue === 'true') {
                    $this.addClass('element-clickable--initialized');
                }
                
                if ($anchorElement.attr($attrAnchor) === 'true' && $anchorElement.hasClass($this.attr($attrAnchorClassName))) {
                    $anchorElement.addClass('element-anchor--clickable');
                }
                
                if ($this.hasClass($elementClasses.elementClickable) && $anchorElement.hasClass($elementClasses.elementAnchor)) {
                    $this.on('click', function() {
                        if ($this.parents('.ct-js-slick').length > 0 && (!$this.parents('.ct-js-slick').hasClass('js-slick--swipe') || !$this.parents('.ct-js-slick').hasClass('js-slick--beforeChange'))) {
                            window.location = $anchorElement.attr('href');
                        }
                    });
                }
                
                
        });
        
        if ($('.ct-js-slick').length > 0) {
            var slickJs = $('.ct-js-slick');
            
            slickJs.each(function() {
                var $this = $(this);
                
                //- Addiding Class for clickable element on slick swipe event
                slickJsSwipeHelper($this, 'swipe');
                slickJsSwipeHelper($this, 'beforeChange');
                
                //- Removing Class for clickable element on slick swipe event
                $this.on('afterChange', function() {
                    $(this).removeClass('js-slick--swipe');
                    $(this).removeClass('js-slick--beforeChange');
                });
            });
        }
        
    }
    
})(jQuery);