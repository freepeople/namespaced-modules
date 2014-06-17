(function($, window, document) {
    'use strict';

    var _tooltipTrigger = "[data-toggle='tooltip']";
    var _tooltipDiv = "[data-tooltip='tip']";
    var _tooltipClose = "[data-tooltip='close']";
    var _tooltipContent = "[data-tooltip='content']";

    var Tooltip = function ($obj) {
        this.$active = $obj;
        this.settings = {
            event: 'hover',
            direction: 'top',
            autoClose: 0,
            url: '',
            xOffset: '20px',
            yOffset: '20px'
        };
        this.cssClassName = 'tooltip';
        this.caretCssClass = 'caret';
        this.openCssClassName = 'is-open';
        // initialize
        this.getSettings();
        this.bindEvents();
    };

    Tooltip.prototype = {
        createTip: function () {
            // check if tooltip element exists
            if (!$(this.cssClassName.length)) {
                // create elem
                var $tip = $('<div data-tooltip="tip"></div>');
                var $content = $('<div data-tooltip="content"></div>');
                $tip
                    .addClass(this.cssClassName)
                    .append($content);
                // check if auto close is set
                if (this.settings.autoClose === 1) {
                    var $close = $('<a href="#" data-tooltip="close"></a>');
                    $tip.prepend($close);
                }
                // prepend to body
                $('body').prepend($tip);
            }
        },
        loadTipData: function () {
            // create tooltip
            this.createTip();
            // loading methods
            var methods = {
                ajax: function () {
                    // load ajax into tooltip
                    $(_tooltipContent).html(this.$active.settings.url);
                },
                title: function () {
                    var $active = this.$active;
                    // load title content into tooltip
                    $(_tooltipContent).html($active.settings.attr('title'));
                    // remove title attribute
                    $active.removeAttr('title');
                }
            };
            var methodName = 'title';
            // check settings
            if (this.settings.url !== undefined) {
                methodName = 'ajax';
            }
            if (typeof methods[methodName] === 'function') {
                methods[methodName].call(this);
            } else {
                throw new Error('Cannot load data');
            }
        },
        positionTip: function () {
            // position tooltip based on offset x and y values
            var $trigger = this.$active;
            var x = $trigger.position.left + this.settings.xOffset  + 'px';
            var y = $trigger.position.top + this.settings.yOffset + 'px';
            $(_tooltipDiv).attr({
                top: y,
                left: x
            });
        },
        openTip: function () {
            this.createTip();
            this.loadTipData();
            this.positionTip();
            $(_tooltipDiv).addClass('is-open');
        },
        closeTip: function () {
            $(_tooltipDiv).removeClass('is-open');
        },
        getSettings: function () {
            var $this = this.$active;
            // get settings
            if ($this.data('tooltip-settings') !== undefined) {
                var newOpts = $.extend({}, $this.data('tooltip-settings'), this.settings);
                this.settings = newOpts;
            }
        },
        escapeModal: function (e) {
            e.preventDefault();
            if (e.keyCode && e.keyCode === 27) {
                this.closeTip();
            }
        },
        outsideClick: function (e) {
            var classes = e.target.className;
            if (classes.indexOf('is-open') > -1) {
                this.closeTip();
            }
        },
        bindEvents: function () {
            // bind events
            var $active = this.$active;
            switch (this.settings.event) {
                case 'hover':
                    $active
                        .on('mouseenter.tooltip', this.openTip)
                        .on('mouseleave.tooltip', this.closeTip);
                    break;
                default:
                    // click
                    $active
                        .on('click.open.tooltip', this.openTip)
                        .on('click.close.tooltip', this.openTip);
            }
            $(document)
                .on('click.close.tooltip', _tooltipClose, this.closeTip)
                .on('click.outside.tooltip', this.openCssClassName, this.outsideClick)
                .on('escape.tooltip', this.escapeModal);
        }
    };

    // create tooltip for each element
    return $(_tooltipTrigger).each(function () {
        return new Tooltip($(this));
    });

}(jQuery, window, document));