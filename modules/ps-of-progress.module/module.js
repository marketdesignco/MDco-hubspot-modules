   (function ($) {
      var BREAKPOINT = 768;
      var $slider = $('.js-pillars-slider');

      if (!$slider.length) {
        return;
      }

      function syncSlider() {
        var isMobile = window.innerWidth < BREAKPOINT;
        var isActive = $slider.hasClass('slick-initialized');

        if (isMobile && !isActive) {
          $slider.slick({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 400,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false
          });
        } else if (!isMobile && isActive) {
          $slider.slick('unslick');
        }
      }

      var resizeTimer;

      $(window).on('resize orientationchange', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncSlider, 150);
      });

      syncSlider();
    })(jQuery);