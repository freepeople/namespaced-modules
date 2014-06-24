(function($, window, document) {
    'use strict';

    var toggle = '[data-toggle="dropdown"]';
    var _private = {
        selected: function(e) {
            e.preventDefault();
            var $this = $(this);
            var getItemText = $this.text();
            var $toggle = $this.parent().siblings(toggle);
            $toggle
                .contents()[0]
                .textContent = getItemText;
        },
        keydown: function(e) {
            // if not up or down arrows or escape
            // then exit out 
            if (!/(38|40|27)/.test(e.keyCode)) {
                return;
            }
            var $this = $(this);
            var $parent = $this.parent();
            var isOpened = $parent.hasClass('is-opened');

            // if the escape button is pressed and and dropdown
            // is opend close it similar to a click outside
            // the dropdown...
            if (!isOpened || (isOpened && e.keyCode === 27)) {
                return $this.trigger('click');
            }

            var $items = $parent.find('[role="menu"] li a');
            if (!$items.length) {
                return;
            }
            var index = $items.index($items.filter(':focus'));

            if (e.keyCode === 38 && index > 0) {
                index--;
            }
            if (e.keyCode === 40 && index < $items.length - 1) {
                index++;
            }
            // if index is -1, use the
            // bitwise operator and set it zero
            if (!~index) {
                index = 0;
            }

            $items.eq(index).trigger('focus');

        },
        restore: function(e) {
            // Don't close if mouse right button click
            if (e && e.which === 3) {
                return;
            }
            $(toggle).each(function() {
                var $this = $(this);
                var $parent = $this.parent();
                if (!$parent.hasClass('is-opened')) {
                    return;
                }
                $parent.toggleClass('is-opened');
                $this.trigger('dropdown.hidden');
            });

        }
    };

    var dropDown = {
        methods: {
            init: function(e) {
                var $this = $(this);
                var $parent = $this.parent();
                var isOpened = $parent.hasClass('is-opened');

                _private.restore(e);
                if (!isOpened) {
                    $this.trigger('focus');
                    $parent.toggleClass('is-opened');
                    $this.trigger('dropdown.visible');
                }

                // prevent default browser action
                // and stop further event bubbling
                return false;
            }
        }
    };

    $.fn.dropDown = function() {
        return dropDown.methods.init.apply(this, arguments);
    };


    $(document)
        .on('click.dropdown', _private.restore)
        .on('click.dropdown', toggle, dropDown.methods.init)
        .on('click.dropdown', '[role="menu"] li', _private.selected)
        .on('keydown.dropdown', toggle + ', [role="menu"]', _private.keydown);

})(jQuery, window, document);