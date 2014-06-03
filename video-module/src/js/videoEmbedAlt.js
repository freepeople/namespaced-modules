(function($, window, document, undefined) {

  'use strict';
  
  var videoEmbed = {
    // default options
    config: {
      youtube: 'http://www.youtube.com/embed/',
      vimeo: 'http://player.vimeo.com/video/',
      dst: '', // $('.featured_video_holder')
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
    },

    methods: {
      /**
       * Initializes the plugin
       * @method init
       * @param {object} [config] - Optional configs can be mixed in.
       */
      init: function(config) {
        if (config && typeof config === 'object') {
          $.extend(videoEmbed.config, config);
        }
        var $element = $(this);
        $element.on('click', function(e) {
          e.preventDefault();
          var videoCode = $element.attr('data-video');
          var videoSource = $element.attr('data-source');
          var dst = videoEmbed.config.dst || $element.prev();
          var link = videoEmbed.methods.buildLink(videoSource, videoCode);
          videoEmbed.methods.embedVideo.call(this, link, dst);
        });
      },
      /**
       * Builds a dynamic link for video source
       * @method buildLink
       * @param {string} videoSource - The source of video ie: youtube,etc.
       * @param {string} videoCode - Video code representing actual video.
       * @returns {string} dynamic string
       */
      buildLink: function(videoSource, videoCode) {
        var dynamicLink;
        var types = {
          'youtube': function() {
            return videoEmbed.config.youtube + videoCode + '?rel=' +
              videoEmbed.config.rel + '&controls=' + videoEmbed.config.controls +
              '&autohide=' + videoEmbed.config.autohide +
              '&loop=' + videoEmbed.config.loop +
              '&autoplay=' + videoEmbed.config.autoplay +
              '&showinfo=' + videoEmbed.config.showinfo +
              '&vq=' + videoEmbed.config.hd +
              '&listType=playlist&list=' + videoEmbed.config.list;
          },
          'vimeo': function() {
            return videoEmbed.config.vimeo + videoCode + '?title=' +
              videoEmbed.config.showinfo + '&autoplay=' +
              videoEmbed.config.autoplay + '&loop=' + videoEmbed.config.loop;
          }

        };
        if (typeof types[videoSource] === 'function') {
          dynamicLink = types[videoSource].call(this);
        }
        return dynamicLink;
      },
      /**
       * Embeds the dynamic link passed in to an iframe onto the page
       * @method embedVideo
       * @param {string} link - The dynamic link built
       * @param {object} dst - The destination of where to embed the video
       * 
       */
      embedVideo: function(link, dst) {
        // If no link, nothing to embed
        if (!link) return;

        var $iframe = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        $iframe.attr('src', link)
          .width(videoEmbed.config.videoWidth)
          .height(videoEmbed.config.videoHeight);

        dst.html($iframe);
        $(this).css('visibility', 'hidden');
      }
    }

  };

  $.fn.videoEmbed = function(method) {

    if (typeof videoEmbed.methods[method] === 'function') {
      return videoEmbed.methods[method].apply(this, [].slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return videoEmbed.methods.init.apply(this, arguments);
    } else {
      throw new Error('unknown method ":' + method + '"');
    }


  };


}(jQuery, window, document));