(function($, window, document, undefined) {
    'use strict';
    var moduleName = 'videoEmbed';
    var defaults = {
        youtube: 'http://www.youtube.com/embed/',
        vimeo: 'http://player.vimeo.com/video/',
        destination: '.featured_video_holder',
        videoWidth: '100%',
        videoHeight: '100%',
        rel: 1,
        controls: 1,
        autohide: 1,
        loop: 0,
        autoplay: 1,
        showinfo: 1,
        list: '',
        hd: '1080'
    };
    var videoName;
    var videoSource;
    var dst;
    /**
     * Video Class
     * @constructor
     * @param {object} element - html element to be used as selector
     * @param {object} options - key/value pairs to override defaults
     */
    var Video = function(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = moduleName;

        this.init();
    };
    /**
     * Initializes the plugin
     * @method init
     * @param {object} [config] - Optional configs can be mixed in.
     */
    Video.prototype.init = function() {
        var self = this;

        $(this.element).on('click', function(e) {
            e.preventDefault();
            var link;
            var $element = $(this);
            videoName = $element.attr('data-video');
            videoSource = $element.attr('data-source');
            dst = $element.prev();
            link = self.buildLink(videoSource);
            self.embedVideo(link);
        });
    };
    /**
     * Builds the iframe src
     * @method buildLink
     * @param {string} type - determines which player to
     * @param {object} dst - The destination of where to embed the video
     *
     */
    Video.prototype.buildLink = function(type) {
        var dynamicLink;
        var types = {
            'youtube': function() {
                return this.options.youtube + videoName + '?rel=' +
                    this.options.rel + '&controls=' + this.options.controls +
                    '&autohide=' + this.options.autohide +
                    '&loop=' + this.options.loop +
                    '&autoplay=' + this.options.autoplay +
                    '&showinfo=' + this.options.showinfo +
                    '&vq=' + this.options.hd +
                    '&listType=playlist&list=' + this.options.list;
            },
            'vimeo': function() {
                return this.options.vimeo + videoName + '?title=' +
                    this.options.showinfo + '&autoplay=' +
                    this.options.autoplay + '&loop=' + this.options.loop;
            }
        };
        if (typeof types[type] === 'function') {
            dynamicLink = types[type].call(this);
        }
        return dynamicLink;
    };
    /**
     * Embeds the dynamic link passed in to an iframe onto the page
     * @method embedVideo
     * @param {string} link - The dynamic link built
     *
     */
    Video.prototype.embedVideo = function(link) {
        // If no link, nothing to embed
        if (!link) {
            throw new Error('Must be either Youtube or Vimeo link');
        }

        var $iframe = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        $iframe.attr('src', link)
            .width(this.options.videoWidth)
            .height(this.options.videoHeight);

        dst.html($iframe);
        $(this.element).css('display', 'none');
    };
    /**
     * Create jQuery plugin
     * @method fn[moduleName]
     * @param {object} options - video embed options to initialize
     *
     */
    $.fn[moduleName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "module_" + moduleName)) {
                $.data(this, "module_" + moduleName,
                    new Video(this, options));
            }
        });
    };
}(jQuery, window, document));