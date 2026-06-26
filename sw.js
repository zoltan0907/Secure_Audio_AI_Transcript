const CACHE_NAME = 'audio-ai-es-v3';

// Wir cachen hier nur unsere eigenen, lokalen Dateien!
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // 1. Wenn die Datei im Cache ist, gib sie zurück
            if (response) {
                return response;
            }
            
            // 2. Ansonsten lade sie normal aus dem Netz (z.B. Tailwind oder die KI-Modelle)
            return fetch(event.request).catch(err => {
                console.log('Ressource offline nicht verfügbar:', event.request.url);
            });
        })
    );
});