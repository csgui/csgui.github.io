(function () {
  var activeTag = null;
  var tags      = document.querySelectorAll('.tag[data-tag]');
  var entries   = document.querySelectorAll('.archive-entry');
  var countEl   = document.querySelector('.archive-count');
  var total     = entries.length;

  function applyFilter(tag) {
    var visible = 0;
    entries.forEach(function (e) {
      var entryTags = (e.dataset.tags || '')
        .split(',')
        .map(function (t) { return t.trim(); });
      var show = !tag || entryTags.indexOf(tag) !== -1;
      e.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (countEl) {
      countEl.textContent = tag
        ? visible + ' of ' + total + ' entries'
        : total + ' entries';
    }
  }

  tags.forEach(function (t) {
    t.addEventListener('click', function () {
      var clicked = t.dataset.tag;
      if (activeTag === clicked) {
        activeTag = null;
        tags.forEach(function (u) { u.classList.remove('active'); });
      } else {
        activeTag = clicked;
        tags.forEach(function (u) {
          u.classList.toggle('active', u.dataset.tag === clicked);
        });
      }
      applyFilter(activeTag);
    });
  });
}());
