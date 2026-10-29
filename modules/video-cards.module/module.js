(function () {
  // HubSpot recommends fetching oEmbed client-side on pages so the embed is never stale.
  // Falls back to the cached oembed_response rendered in the <template> if the request fails.
  var players = document.querySelectorAll('.video-cards__player[data-embed-url]');

  function useFallback(player) {
    var fallback = player.querySelector('.video-cards__fallback');
    if (fallback && 'content' in fallback && !player.querySelector('iframe')) {
      player.appendChild(fallback.content.cloneNode(true));
    }
  }

  Array.prototype.forEach.call(players, function (player) {
    var url = player.getAttribute('data-embed-url');
    if (!url) {
      return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', '/_hcms/oembed?url=' + encodeURIComponent(url) + '&autoplay=0', true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        try {
          var data = JSON.parse(request.responseText);
          if (data && data.html) {
            var holder = document.createElement('div');
            holder.innerHTML = data.html;
            while (holder.firstChild) {
              player.appendChild(holder.firstChild);
            }
            return;
          }
        } catch (e) {}
      }
      useFallback(player);
    };
    request.onerror = function () {
      useFallback(player);
    };
    request.send();
  });
})();
