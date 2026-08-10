 (function () {
      var BREAKPOINT = 768;
      var SELECTOR = '.js-outcomes-slider';

      function boot($) {
        var $slider = $(SELECTOR);
        if (!$slider.length) { return; }

        var $parent = $slider.parent();

        // Slick measures the element width at init time. If the wrapper is
        // still wider than the viewport, every slide inherits the wrong width
        // and the page gets horizontal scroll. Pin it to the real width.
        function lockWidth() {
          var available = $parent.width();
          if (available > 0) {
            $slider.css('max-width', available + 'px');
          }
        }

        function releaseWidth() {
          $slider.css('max-width', '');
        }

        function syncSlider() {
          var isMobile = window.innerWidth < BREAKPOINT;
          var isActive = $slider.hasClass('slick-initialized');

          if (isMobile && !isActive) {
            lockWidth();

            $slider.slick({
              dots: true,
              arrows: false,
              infinite: false,
              speed: 400,
              slidesToShow: 1,
              slidesToScroll: 1,
              adaptiveHeight: false,
              waitForAnimate: false
            });

            $slider.slick('setPosition');
          } else if (!isMobile && isActive) {
            $slider.slick('unslick');
            releaseWidth();
          } else if (isMobile && isActive) {
            lockWidth();
            $slider.slick('setPosition');
          }
        }

        var resizeTimer;
        function onResize() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(syncSlider, 150);
        }

        $(window).on('resize orientationchange', onResize);

        // Fonts change card height and can shift Slick measurements
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function () {
            if ($slider.hasClass('slick-initialized')) {
              $slider.slick('setPosition');
            }
          });
        }

        // Catch late layout shifts from images or lazy loaded content
        if (window.ResizeObserver) {
          new ResizeObserver(onResize).observe($parent[0]);
        }

        $(window).on('load', syncSlider);

        syncSlider();
      }

      // Slick and jQuery load globally from the theme, so wait for them
      var tries = 0;
      (function waitForSlick() {
        if (window.jQuery && window.jQuery.fn && window.jQuery.fn.slick) {
          boot(window.jQuery);
        } else if (tries++ < 100) {
          setTimeout(waitForSlick, 50);
        }
      })();
    })();