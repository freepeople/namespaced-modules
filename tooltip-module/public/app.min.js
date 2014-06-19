var FP = window.FP || {};
FP.Tooltip = (/** @lends <global> */function($, window, document) {
    'use strict';

    var _tooltipTrigger = "[data-toggle='tooltip']";
    var _tooltipDiv = "[data-tooltip='tip']";
    var _tooltipClose = '.tooltip--close';
    var _tooltipContent = '.tooltip--content';
    var _activeCssClass = 'is-open';

    /**
     * @constructor Tooltip
     * @param {object} element - html element to be used as selector
     */
    var Tooltip = function($obj) {
        /** @member {Object} */
        this.$active = $obj;
        /** @member {Object} */
        this.settings = {
            event: 'hover',
            direction: 'top',
            autoClose: 1,
            url: '',
            offset: 45,
            width: 400,
            cssClasses: ''
        };
        /** @member {String} */
        this.cache = '';
        /** @member {String} */
        this.baseClassName = 'tooltip';
        // initialize
        this.getSettings();
        this.bindEvents();
    };

    /**
     * Hides tooltip
     * @private
     * @function closeOutside
     */
    var closeOutside = function () {
        $(_tooltipDiv).removeClass(_activeCssClass);
    };

    Tooltip.prototype = {
        /** @constructs */
        constructor: Tooltip,
        /**
         * Builds the tooltip html
         * @public
         * @method createTip
         * @memberof Tooltip
         */
        createTip: function () {
            var self = this;
            // remove prior tips
            $(_tooltipDiv).remove();
            // create elem
            var $tip = $('<div data-tooltip="tip"></div>');
            var $tipWrapper = $('<div class="tooltip-wrapper"></div>');
            var $content = $('<div></div>').addClass(_tooltipContent.substr(1));
            $tip
                .addClass(self.baseClassName)
                .append($tipWrapper)
                .width(self.settings.width);
            // check for css overrides
            if (this.settings.cssClasses.length > 0) {
                $tip.addClass(this.settings.cssClasses);
            }
            $tipWrapper.append($content);
            // check if auto close is set
            if (self.settings.autoClose === 0 || self.settings.event === 'click') {
                var $close = $('<a href="#">X</a>').addClass(_tooltipClose.substr(1));
                $tipWrapper.prepend($close);
            }
            // prepend to body
            $('body').prepend($tip);
        },
        /**
         * Loads the tooltip data
         * @public
         * @method loadTipData
         * @memberof Tooltip
         */
        loadTipData: function () {
            var self = this;
            // loading methods
            var methods = {
                ajax: function () {
                    if (self.cache === '') {
                        // load ajax into tooltip
                        $(_tooltipContent).load(self.settings.url, function (data) {
                            self.cache = data;
                            self.positionTip();
                        });
                    } else {
                        $(_tooltipContent).html(self.cache);
                        self.positionTip();
                    }
                },
                title: function () {
                    var $active = self.$active;
                    if (self.cache.length === 0) {
                        self.cache = $active.attr('title');
                    }
                    // load title content into tooltip
                    $(_tooltipContent).html(self.cache);
                    // remove title attribute
                    $active.removeAttr('title');
                    self.positionTip();
                }
            };
            var methodName = 'title';
            // check settings
            if (this.settings.url !== '') {
                methodName = 'ajax';
            }
            if (typeof methods[methodName] === 'function') {
                methods[methodName].call(this);
            } else {
                throw new Error('Cannot load tooltip data');
            }
        },
        /**
         * Positions the tooltip
         * @public
         * @method positionTip
         * @memberof Tooltip
         */
        positionTip: function () {
            // position tooltip based on direction and offset value
            var self = this;
            var $trigger = self.$active;
            var x, y;
            var methodName = self.settings.direction;
            var methods = {
                left: function () {
                    x = Math.floor($trigger.position().left) - $(_tooltipDiv).width() - parseInt(self.settings.offset);
                    y = $trigger.position().top - Math.floor($(_tooltipDiv).height() / 2);
                },
                right: function () {
                    x = Math.floor($trigger.position().left) + $trigger.width() + parseInt(self.settings.offset/2);
                    y = $trigger.position().top - Math.floor($(_tooltipDiv).height() / 2);
                },
                top: function () {
                    // top
                    x = Math.floor($trigger.position().left) - Math.floor($(_tooltipDiv).width() / 2);
                    y = Math.floor($trigger.position().top) - $(_tooltipDiv).height() - parseInt(self.settings.offset);
                },
                bottom: function () {
                    x = Math.floor($trigger.position().left) - Math.floor($(_tooltipDiv).width() / 2);
                    y = Math.floor($trigger.position().top) + parseInt(this.settings.offset);
                }
            };
            if (typeof methods[methodName] === 'function') {
                methods[methodName].call(this);
            } else {
                throw new Error('Cannot position tooltip');
            }
            // set max boundaries
            if (y < 0) {
                y = 0;
            } else if ((y + $(_tooltipDiv).height()) > $(window).height()) {
                y = $(window).height() - $(_tooltipDiv).height() - parseInt(self.settings.offset);
            }
            if (x < 0) {
                x = 0;
            } else if ((x + $(_tooltipDiv).width()) > $(window).width()) {
                x = $(window).width() - $(_tooltipDiv).width() - parseInt(self.settings.offset);
            }
            // update css
            $(_tooltipDiv).css({
                top: Math.floor(y) + 'px',
                left: Math.floor(x) + 'px'
            });
        },
        /**
         * Display the tooltip
         * @public
         * @method openTip
         * @memberof Tooltip
         */
        openTip: function () {
            var self = this;
            self.createTip();
            self.loadTipData();
            $(_tooltipDiv).addClass(_activeCssClass);
        },
        /**
         * Hides the tooltip
         * @public
         * @method closeTip
         * @memberof Tooltip
         */
        closeTip: function () {
            closeOutside();
        },
        /**
         * Get the JSON settings and merge with the tooltip defaults
         * @public
         * @method getSettings
         * @memberof Tooltip
         */
        getSettings: function () {
            var self = this;
            var $elem = self.$active;
            // get settings
            if ($elem.data('tooltip-settings') !== undefined) {
                var newOpts = $.extend({}, self.settings, $elem.data('tooltip-settings'));
                self.settings = newOpts;
            }
        },
        /**
         * Bind tooltip hover and click events
         * @public
         * @method bindEvents
         * @memberof Tooltip
         */
        bindEvents: function () {
            // bind events
            var self = this;
            var $elem = self.$active;
            switch (self.settings.event) {
                case 'hover':
                    $elem
                        .on('mouseenter.tooltip', $.proxy(self.openTip, self))
                        .on('mouseleave.tooltip', $.proxy(self.closeTip, self));
                    break;
                default:
                    // clicks
                    $elem.on('click.open.tooltip', $.proxy(self.openTip, self));
            }
        }
    };

    // event delegation
    $(document).on('click.close.tooltip', _tooltipClose, closeOutside);

    // create tooltip for each element
    return $(_tooltipTrigger).each(function () {
        return new Tooltip($(this));
    });

}(jQuery, window, document));