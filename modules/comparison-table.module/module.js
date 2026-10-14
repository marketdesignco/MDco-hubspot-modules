(function () {
  'use strict';

  var ROOT_SELECTOR = '.js-comparison-table';
  var TABLE_SELECTOR = '.js-comparison-table-grid';
  var TOGGLE_SELECTOR = '.js-comparison-toggle';

  function isOn(button) {
    return button.getAttribute('aria-pressed') === 'true';
  }

  function init(root) {
    if (root.getAttribute('data-comparison-ready') === 'true') { return; }
    root.setAttribute('data-comparison-ready', 'true');

    var table = root.querySelector(TABLE_SELECTOR);
    var toggles = root.querySelectorAll(TOGGLE_SELECTOR);
    if (!table || !toggles.length) { return; }

    function visibleCount() {
      var count = 0;
      for (var i = 0; i < toggles.length; i++) {
        if (isOn(toggles[i])) { count++; }
      }
      return count;
    }

    function setColumn(button, on) {
      var col = button.getAttribute('data-col');
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
      button.classList.toggle('is-on', on);
      table.classList.toggle('is-hide-col-' + col, !on);
    }

    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function () {
        var on = isOn(this);
        // Keep at least one package column visible.
        if (on && visibleCount() <= 1) { return; }
        setColumn(this, !on);
      });
    }
  }

  function boot() {
    var roots = document.querySelectorAll(ROOT_SELECTOR);
    for (var i = 0; i < roots.length; i++) {
      init(roots[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
