(function(){
  function initSvcSlider(){
    if (window.innerWidth <= 768) {
      $('.eb-svc .eb-svc-grid').not('.slick-initialized').slick({
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
      });
    } else {
      if ($('.eb-svc .eb-svc-grid').hasClass('slick-initialized')) {
        $('.eb-svc .eb-svc-grid').slick('unslick');
      }
    }
  }
  $(document).ready(initSvcSlider);
  $(window).on('resize', initSvcSlider);
})();