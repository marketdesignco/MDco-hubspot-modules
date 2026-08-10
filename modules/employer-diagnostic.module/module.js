(function(){
  function initDiagSlider(){
    if (window.innerWidth <= 768) {
      $('.eb-diag-grid').not('.slick-initialized').slick({
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
      });
    } else {
      if ($('.eb-diag-grid').hasClass('slick-initialized')) {
        $('.eb-diag-grid').slick('unslick');
      }
    }
  }
  $(document).ready(initDiagSlider);
  $(window).on('resize', initDiagSlider);
})();
