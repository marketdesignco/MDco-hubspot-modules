document.querySelectorAll('.faq-accordion__question').forEach(function (button) {
  button.addEventListener('click', function () {
    var item = button.closest('.faq-accordion__item');
    var isOpen = item.classList.contains('is-open');

    item.classList.toggle('is-open', !isOpen);
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});
