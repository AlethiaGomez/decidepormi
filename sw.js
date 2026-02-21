const CACHE_NAME = 'decide-por-mi-v1'
const BASE_PATH = '/decidepormi'
const URLS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/vite.svg`,
  `${BASE_PATH}/manifest.json`
]

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  )
})

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache)
          })

        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request)
          .then(response => {
            return response || new Response('Offline - Resource not found', {
              status: 404,
              statusText: 'Not Found',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            })
          })
      })
  )
})
