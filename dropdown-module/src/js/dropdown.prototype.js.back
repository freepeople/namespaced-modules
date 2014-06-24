(function($, window, document) {
    'use strict';

    var _dropDownSelector = '[data-toggle="dropdown"]';

    var Dropdown = function($element, config) {
        this.element = $element;

        this.bindEvents();
    };

    Dropdown.prototype = {
        constructor: Dropdown,
        toggleMenu: function(e) {
            var $this = $(e.target);
            var $parent = $this.parent();
            var isOpened = $parent.hasClass('is-opened');

            this.dropDownRestore(e);
            if (!isOpened) {
                $this.trigger('focus');
                $parent.addClass('is-opened');
                $this.trigger('dropdown.visible');
            }

            // prevent default browser action
            // and stop further event bubbling
            return false;
        },
        itemSelected: function(e) {
           e.preventDefault();
           var $this = $(e.target);
           var getItemText = $this.text();
           var $toggle = $this.closest('.dropdown-container').siblings(_dropDownSelector);
           $this.parent().children().removeClass('is-active');
           $this.addClass('is-active');
           $toggle.text(getItemText);
        },
        keydown: function(e) {
            // if not up or down arrows or escape
            // then exit out 
            if (!/(38|40|27)/.test(e.keyCode)){ return; }

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
        dropDownRestore: function(e) {
            if (e && e.which === 3){ return; }

            $(_dropDownSelector).each(function() {
                var $this = $(this);
                var $parent = $this.parent();
                if (!$parent.hasClass('is-opened')){ return;}
                $parent.removeClass('is-opened');
                $this.trigger('dropdown.hidden');
            });

        },
        bindEvents: function() {
            var i;
            var $doc = $(document);
            var eventsMap = {
                'click.restore.dropdown': this.dropDownRestore,
                'click.toggle.dropdown': [_dropDownSelector, $.proxy(this.toggleMenu, this)],
                'click.dropdown.selected': ['[role="menu"] li', $.proxy(this.itemSelected, this)],
                'keydown.menu.dropdown': [_dropDownSelector + ', [role="menu"]', this.keydown]
            };
            for (i in eventsMap) {
                if (eventsMap.hasOwnProperty(i)) {
                    if ($.isArray(eventsMap[i])) {
                        $doc.on(i, eventsMap[i][0], eventsMap[i][1]);
                    } else {
                        $doc.on(i, eventsMap[i]);
                    }
                }
            }
        }
    };

    return new Dropdown($(_dropDownSelector));

})(jQuery, window, document);