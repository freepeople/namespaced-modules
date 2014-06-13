(function($, window, document) {
  'use strict';

  var tabular = '[data-toggle="tab"]';

  var _private = {
    init: function() {
      var $tabular = $(tabular);
      $tabular.each(function() {
        var common = _private.common(this);
        var currentIndex = common.settings.activeIndex;
        var $tabContentId = $(common.settings.content);
        var $tabContent = $tabContentId.children();
        if (typeof currentIndex === 'number') {
          common.triggers
            .removeClass('is-active')
            .eq(currentIndex)
            .addClass('is-active');
          $tabContent
            .removeClass('is-active')
            .eq(currentIndex)
            .addClass('is-active');
        }
      });
    },
    common: function(self){
      var $nav = $(self);
      var $triggers = $nav.children();
      var settings = $nav.data('tabSettings');
      if (!settings) {
        throw new Error('Missing data-tab-settings');
      }
      var $tabContent = $(settings.content);
      var common = {
        nav: $nav,
        triggers: $triggers,
        settings: settings,
        tabContent: $tabContent
      };
      return common;
    }
  };

  var tab = {
    methods: {
      show: function(e) {
        e.preventDefault();
        var $selected = $(e.target);
        var common = _private.common(this);
        var activeTab = common.triggers
          .removeClass('is-active')
          .find($selected)
          .parent()
          .addClass('is-active')
          .filter('.is-active');

        var currentIndex = common.triggers.index(activeTab);

        common.tabContent
          .children()
          .removeClass('is-active')
          .eq(currentIndex)
          .addClass('is-active');

      }
    }
  };


  
  $(document).on('click.tab', tabular, tab.methods.show);

  return _private.init();


})(jQuery, window, document);