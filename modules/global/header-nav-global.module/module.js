$(document).ready(function () {

  //   header_color_static = $('.header').data('color-static');
  //   header_color_fixed = $('.header').data('color-fixed');
  header_color_static = '#fff';
  header_color_fixed = '#fff';

  updateColorHeader();
  $(window).bind('scroll', function () {
    updateColorHeader();
  });
});


function updateColorHeader() {
  if ($(window).scrollTop() > 40) {
    $('.header').css("background-color", header_color_fixed);
    $('.header').css("box-shadow", "0px 12px 40px 0px #3A0CA314");
    $('.header').css("top", "0px");
  }
  else {
    $('.header').css("background-color", header_color_static);
    $('.header').css("box-shadow", "none");
    $('.header').css("top", "0px");
  }
}