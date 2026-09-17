// Versión del cache
const CACHE_VERSION = 'v1.2.1';
const CACHE_NAME = `percentiles-cubanos-${CACHE_VERSION}`;

// Archivos a cachear
const FILES_TO_CACHE = [
  './',
  './index.html',
  './percentiles-cubanos.json',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './favicon.svg',
  './favicon-32.png',
  './favicon-16.png',
  './css/main.css',
  './js/config.js',
  './js/ota-updater.js',
  './js/storage.js',
  './js/percentiles.js',
  './js/ui.js',
  './js/app.js'
];

// Instalar Service Worker y cachear archivos
// NOTA: no se llama self.skipWaiting() aquí a propósito — se espera la
// confirmación del usuario (banner "Nueva versión disponible") antes de
// activar la versión nueva. Ver SKIP_WAITING más abajo.
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Instalando...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Cacheando archivos');
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => {
        console.error('[ServiceWorker] Error al cachear:', err);
      })
  );
});

// Activar Service Worker y limpiar cachés antiguas
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[ServiceWorker] Eliminando caché antigua:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Estrategia de fetch: Cache First con Network Fallback
self.addEventListener('fetch', event => {
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Si está en caché, devolverlo
        if (cachedResponse) {
          console.log('[ServiceWorker] Sirviendo desde caché:', event.request.url);
          
          // Actualizar en segundo plano
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, response));
              }
            })
            .catch(() => {
              // Falló la actualización, pero tenemos la versión cacheada
            });
          
          return cachedResponse;
        }

        // Si no está en caché, intentar obtenerlo de la red
        console.log('[ServiceWorker] Obteniendo de la red:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Verificar que sea una respuesta válida
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar la respuesta
            const responseToCache = response.clone();

            // Agregar al caché
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si falla la red y no está en caché, mostrar página offline
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
