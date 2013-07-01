/*!
 * ZeroClipTip
 *
 * Copyright 2013 Mayoto Yoshida.
 * Released under the MIT License.
 *
 * Dependencies
 *   jQuery: http://jquery.com
 *   ZeroClipboard: http://zeroclipboard.github.io/ZeroClipboard/
 *   tipsy: http://onehackoranother.com/projects/jquery/tipsy/
 *
 * Example
 *   <button class="copy-button" data-clipboard-text="Copy Me!">Copy to Clipboard</button>
 *   <button class="copy-button" title="copy to clipboard" data-copied-hint="copied!" data-clipboard-text="Copy Me!">Copy to Clipboard</button>
 *   <script>$('.copy-button').zerocliptip();</script>
 */
;(function($) {

  $.fn.zerocliptip = function(options) {
    var elements = this;
    var settings = $.extend({}, $.fn.zerocliptip.defaults, options);

    elements.each(function() {
      var $this = $(this);
      $this.data('zerocliptip', new ZeroClipTip($this, settings));
    });

    return this;
  };

  $.fn.zerocliptip.defaults = {
    path: '/flash/ZeroClipboard.swf',
    title: 'copy to clipboard',
    copied_hint: 'copied!',
    gravity: $.fn.tipsy.autoNS
  };

  function ZeroClipTip(root, settings) {
    var self = this;

    var initialize = function() {
      if (!root.attr('title')) {
        root.attr('title', settings.title);
      } else if (root.attr('title') !== settings.title) {
        root.attr('title', settings.title);
      }

      var clip = new ZeroClipboard(root, {
        moviePath: settings.path
      });

      clip.on('load', function(client) {
        $(clip.htmlBridge).tipsy({ gravity: settings.gravity });
        $(clip.htmlBridge).attr('title', settings.title);
      });

      clip.on('complete', function(client, args) {
        var copied_hint = $(this).data('copied-hint');
        if (!copied_hint) {
          copied_hint = settings.copied_hint;
        }

        $(clip.htmlBridge)
          .prop('title', copied_hint)
          .tipsy('show');
      });

      clip.on('noflash wrongflash', function(client) {
        root.hide();
      });

      return self;
    };

    return initialize();
  };


})(jQuery);
