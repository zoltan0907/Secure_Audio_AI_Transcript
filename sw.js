const CACHE_NAME = 'audio-ai-es-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com'
    // Die KI-Modelle werden von transformers.js automatisch gecacht.
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});