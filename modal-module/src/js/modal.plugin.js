(function($, window, document) {
    'use strict';

    var modalTrigger = "[data-toggle='modal']";
    var closeModal = "[data-modal='close']";
    var $body = $('body');

    var transEndEventNames = {
        'transition': 'transitionend',
        'OTransition': 'otransitionend',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    var escapeModal = function(e) {
        e.preventDefault();
        if (e.keyCode && e.keyCode === 27) {
            theModal.methods.close();
        }
    };

    var outsideClick = function(e) {
        var classes = e.target.className;
        if (classes.indexOf('is-open') > -1) {
            theModal.methods.close();
        }
    };

    var getExternalData = function(externalData) {
        // store the data in a temp cache
        // so when user clicks on the button 
        // multiple times it doesnt add to network
        // requests...
        if (!!!theModal.config.cache) {
            $.ajax(externalData).done(function(data) {
                theModal.config.cache = data;
                theModal.config.active
                    .find('.modal--content')
                    .append(theModal.config.cache);
            });
        }
    };

    var theModal = {
        config: {
            active: '',
            cache: ''
        },
        methods: {
            show: function(e) {
                var $modalButton = $(this);
                var contentSelector = $modalButton.data('modal').content;
                var externalData = $modalButton.data('modal').data;
                var $modal = theModal.config.active = $(contentSelector);
                if (!!externalData) {
                    getExternalData(externalData);
                }
                $modal.show(); // display block on modal
                $body.height(); // redraw
                $modal.addClass('is-open'); // show modal
            },
            close: function(e) {

                var $modal = theModal.config.active;
                var transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];
                $modal
                    .removeClass('is-open') // remove class
                .on(transitionEnd, function() {
                    // wait for css transition to end
                    // then hide the modal from screen 
                    // and remove transitionEnd event binding
                    $modal.hide().off(transitionEnd);
                });
            }
        }
    };

    $(document)
        .on('click.open.modal', modalTrigger, theModal.methods.show)
        .on('click.close.modal', closeModal, theModal.methods.close)
        .on('click.outside', outsideClick)
        .on('keydown.modal', escapeModal);

}(jQuery, window, document));