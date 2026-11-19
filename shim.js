// Stand-in for the whiteboard's appifactEmbed API so each widget runs on its own.
// State is kept per page in localStorage; onLoad fires when another tab saves.
(function () {
  var key = "widget:" + location.pathname;
  var listeners = [];
  function read() {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  window.appifactEmbed = {
    load: read,
    save: function (obj) {
      try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {}
    },
    onLoad: function (fn) { listeners.push(fn); }
  };
  window.addEventListener("storage", function (e) {
    if (e.key !== key) return;
    var v = read();
    listeners.forEach(function (fn) { fn(v); });
  });
})();
