// Version auf v5 erhöht, um Cache-Reset zu erzwingen
const CACHE_NAME = 'audio-ai-es-v5'; 

const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', event => {
    // skipWaiting erzwingt, dass der neue Service Worker sofort die Kontrolle übernimmt
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Alte Caches beim Aktivieren löschen
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Lösche alle Caches, die nicht dem aktuellen CACHE_NAME entsprechen
                    if (cacheName !== CACHE_NAME) {
                        console.log('Alter Cache wird gelöscht:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Übernimmt sofort die Kontrolle
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // Aus dem Cache laden
            }
            return fetch(event.request).catch(err => {
                console.log('Ressource offline nicht verfügbar:', event.request.url);
            });
        })
    );
});