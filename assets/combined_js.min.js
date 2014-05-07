/*global window, FP, jQuery, console*/
(function (FP, $) {
    'use strict';
    var video = (function () {
        function embed(op, callback) {
            var defaults = {
                    selector: '',
                    dest: '.featured_video_holder',
                    videoWith: '100%',
                    videoHeight: '100%',
                    rel: 1,
                    controls: 1,
                    autohide: 1,
                    loop: 0, // Loops playlist
                    autoplay: 1,
                    showinfo: 1,
                    list: '',
                    hd: '1080'
                },
                $iframe = '',
                parent = '',
                vid = '',
                source = '',
                opts = {};
            try {
                opts = $.extend({}, defaults, op);
                
                if (opts.selector.length < 0) {    
                    console.log('Selector is required!');
                    return;
                }

                vid = $(opts.selector).attr('data-video');
                source = $(opts.selector).attr('data-source');
                parent = $(opts.selector).parent().find(opts.dest);
                $iframe = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                if (source === "vimeo"){
                    $iframe.attr({
                        'src': '//player.vimeo.com/video/' + vid + '?title=' + opts.showinfo + '&autoplay=' + opts.autoplay + '&loop=' + opts.loop
                    })
                    .width(opts.videoWith)
                    .height(opts.videoHeight);
                }
                else if (source === "youtube") {   
                    $iframe.attr({
                        'src': '//www.youtube.com/embed/'+ vid +'?rel='+ opts.rel +'&controls='+ opts.controls +'&autohide='+ opts.autohide + '&loop='+ opts.loop + '&autoplay=' + opts.autoplay + '&showinfo=' + opts.showinfo + '&vq=' + opts.hd + '&listType=playlist&list=' + opts.list 
                    })
                    .width(opts.videoWith)
                    .height(opts.videoHeight);

                }
                // embed within target element
                $(parent).html($iframe);
                // execute callback
                if (callback !== undefined) {
                    callback();
                }
            } catch (ex) {
                console.log('video.embed(): ' + ex);
            }
        }
        // public methods
        return {
            embed: embed
        };
    }());   

    FP.video = video;

    $.fn.videoEmbed = function (opts, callback) {
        // update opts to use current selector
        opts = $.extend({}, opts, {selector: this});

        return this.each(function (e) {
            $(this).on('click', function (e) {
                e.preventDefault();
                video.embed(opts, callback);
                $(this).css('visibility','hidden');
            });
        });
    };

}(FP = window.FP || {}, jQuery));


