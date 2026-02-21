<<<<<<< HEAD
const CACHE_NAME = 'emv-bazar-v1';
const urlsToCache = [
    '/',
    '/partials/navbar',
    // Add other critical assets here
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
=======
const CACHE_NAME = "emvBazar-cache-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/image/icon-192x192.png",
  "/image/icon-512x512.png",
  // add other static assets
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
>>>>>>> 5a11d4f8de4cf541bfa150114d4353dcd0ae1f91
