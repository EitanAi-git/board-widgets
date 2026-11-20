// Stand-in for the whiteboard's appifactEmbed API so each widget runs on its own.
// State is kept per page in localStorage; onLoad fires when another tab saves.
(function () {
  // No blue tap highlight on Android, and no focus ring after a tap (keyboard focus still shows)
  var st = document.createElement("style");
  st.textContent = "*{-webkit-tap-highlight-color:transparent}:focus:not(:focus-visible){outline:none}";
  (document.head || document.documentElement).appendChild(st);

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
    onLoad: function (fn) { listeners.push(fn); },
    // Settings edited from the details pop-up. Returns defaults merged with what's
    // saved; onChange gets the new merged object whenever the pop-up changes them.
    settings: function (defaults, onChange) {
      var skey = "settings:" + location.pathname;
      function get() {
        var s = {};
        try { s = JSON.parse(localStorage.getItem(skey) || "{}") || {}; } catch (e) {}
        var out = {};
        for (var k in defaults) out[k] = (k in s) ? s[k] : defaults[k];
        return out;
      }
      if (onChange) window.addEventListener("storage", function (e) { if (e.key === skey) onChange(get()); });
      return get();
    }
  };
  // Full-screen version (?full=1&w=..&h=..): scale the widget up to fill the screen, centred.
  var q = new URLSearchParams(location.search);
  if (q.has("full")) {
    var bw = +q.get("w") || 340, bh = +q.get("h") || 340;
    var fit = function () {
      var vw = window.innerWidth, vh = window.innerHeight;
      var s = Math.min(vw / bw, vh / bh) * 0.96;
      var de = document.documentElement, b = document.body;
      de.style.background = "#1c1c1e";
      de.style.zoom = s;
      de.style.height = "100%";
      if (!b) return;
      b.style.width = bw + "px";
      b.style.height = bh + "px";
      b.style.margin = Math.max(0, (vh / s - bh) / 2) + "px auto 0";
      b.style.overflow = "hidden";
    };
    document.addEventListener("DOMContentLoaded", fit);
    window.addEventListener("resize", fit);
    fit();
  }

  window.addEventListener("storage", function (e) {
    if (e.key !== key) return;
    var v = read();
    listeners.forEach(function (fn) { fn(v); });
  });
})();
