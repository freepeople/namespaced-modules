(function($, window, document) {
    'use strict';

    var _dropDownSelector = '[data-toggle="dropdown"]';

    var Dropdown = function(element, config) {
        this.element = element;
        this.parent = element.parent();
        this.bindEvents();
    };

    Dropdown.prototype = {
        constructor: Dropdown,
        toggleMenu: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $parent = this.parent;
            var isOpened = $parent.hasClass('is-opened');
            if (!isOpened) {
                $parent.addClass('is-opened');
                return;
            }
            $parent.removeClass('is-opened');
        },
        itemSelected: function(e) {
            e.preventDefault();
            var $item = $(e.target);
            var getText = $item.text();
            this.element.text(getText);
            this.parent.removeClass('is-opened');
        },
        keydown: function(e) {
            // if not up or down arrows or escape
            // then exit out 
            if (!/(38|40|27)/.test(e.keyCode)) {
                return;
            }
            var isOpened = this.parent.hasClass('is-opened');
            if (!isOpened || (isOpened && e.keyCode === 27)) {
                return this.closeMenu();
            }
            var $items = this.parent.find('[role="menu"] li a');
            if (!$items.length){ return;}

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
        closeMenu: function() {
            if (!this.parent.hasClass('is-opened')) {
                return;
            }
            this.parent.removeClass('is-opened');
        },
        bindEvents: function() {
            var $doc = $(document);
            this.element
                .on('click.toggleMenu.dropdown', $.proxy(this.toggleMenu, this))
                .closest('.dropdown')
                .on('click.item.dropdown', 'li', $.proxy(this.itemSelected, this));
            $doc
                .on('click.outside.dropdown', $.proxy(this.closeMenu, this))
                .on('keydown.dropdown', $.proxy(this.keydown, this));
        }
    };

    $(_dropDownSelector).each(function() {
        return new Dropdown($(this));
    });

})(jQuery, window, document);