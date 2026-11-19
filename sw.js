// Caches every page so the installed app opens offline. Bump VERSION after changing files.
var VERSION = "v8";
var FILES = [
  "./", "index.html", "shim.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png",
  "widgets/counter.html", "widgets/timer.html", "widgets/stopwatch.html", "widgets/pomodoro.html",
  "widgets/todo.html", "widgets/notes.html", "widgets/scoreboard.html", "widgets/poll.html",
  "widgets/mood-check-in.html", "widgets/dice.html", "widgets/coin-flip.html", "widgets/random-picker.html",
  "widgets/spinning-wheel.html", "widgets/team-shuffler.html", "widgets/rock-paper-scissors.html"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: "reload" }); })); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Network first, so updates show up when online; cache when offline.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" }).then(function (r) {
      var copy = r.clone();
      caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
      return r;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
