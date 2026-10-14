(function () {
  var SELECTOR = '.js-blog-spotlight';

  function boot($) {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    $(SELECTOR).each(function () {
      var $slider = $(this);
      if ($slider.hasClass('slick-initialized')) { return; }

      var seconds = parseInt($slider.attr('data-autoplay'), 10);
      if (isNaN(seconds)) { seconds = 5; }

      $slider.slick({
        fade: true,
        speed: 600,
        cssEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        arrows: false,
        dots: true,
        infinite: true,
        adaptiveHeight: false,
        autoplay: !reduced && seconds > 0,
        autoplaySpeed: Math.max(seconds, 1) * 1000,
        pauseOnHover: true,
        pauseOnFocus: true,
        appendDots: $slider.closest('.blog-spotlight').find('.js-blog-spotlight-dots')
      });
    });
  }

  // jQuery and Slick are loaded globally by the theme (base.html); wait for them.
  var tries = 0;
  (function waitForSlick() {
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.slick) {
      boot(window.jQuery);
    } else if (tries++ < 100) {
      setTimeout(waitForSlick, 50);
    }
  })();
})();
