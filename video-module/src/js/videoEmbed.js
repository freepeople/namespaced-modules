(function($, window, document, undefined) {

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


    var Video = function(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = moduleName;

        this.init();
    };

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

    Video.prototype.embedVideo = function(link) {
        // If no link, nothing to embed
        if (!link) return;

        var $iframe = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        $iframe.attr('src', link)
            .width(this.options.videoWidth)
            .height(this.options.videoHeight);

        dst.html($iframe);
        $(this.element).css('visibility', 'hidden');
    };



    $.fn[moduleName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "module_" + moduleName)) {
                $.data(this, "module_" + moduleName,
                    new Video(this, options));
            }
        });
    };


}(jQuery, window, document));