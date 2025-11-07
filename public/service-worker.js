// ──────────────────────────────────────────────────────────────────────────────
// Service Worker for Offline PWA Support
// Implements country pack caching and offline-first strategy
// ──────────────────────────────────────────────────────────────────────────────

const CACHE_VERSION = 'v2.0.0';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const COUNTRY_CACHE = `country-packs-${CACHE_VERSION}`;

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/favicon.ico'
];

// Country pack resources
const COUNTRY_PACK_PATTERNS = {
  config: /\/countries\/[A-Z]{2}\/config\.ts$/,
  translations: /\/i18n\/locales\/[a-z-]+\/common\.json$/,
  fx: /\/api\/fx\?/
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== COUNTRY_CACHE
            ) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle country pack resources
  if (isCountryPackResource(url.pathname)) {
    event.respondWith(countryPackStrategy(request));
    return;
  }

  // Handle API requests (FX rates)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle static assets
  if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Default: network first, fallback to cache
  event.respondWith(networkFirstStrategy(request));
});

// Strategy: Cache first, fallback to network
async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Strategy: Network first, fallback to cache
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    // Return offline page or error
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }

    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Strategy: Country pack (cache first with TTL)
async function countryPackStrategy(request) {
  const cached = await caches.match(request);

  // Check cache age
  if (cached) {
    const cacheDate = cached.headers.get('sw-cache-date');

    if (cacheDate) {
      const age = Date.now() - new Date(cacheDate).getTime();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

      if (age < maxAge) {
        return cached;
      }
    }
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(COUNTRY_CACHE);

      // Add cache date header
      const clonedResponse = response.clone();
      const headers = new Headers(clonedResponse.headers);
      headers.set('sw-cache-date', new Date().toISOString());

      const newResponse = new Response(clonedResponse.body, {
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers
      });

      cache.put(request, newResponse.clone());

      return newResponse;
    }

    return response;
  } catch (error) {
    if (cached) {
      return cached;
    }

    return new Response('Country pack unavailable', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Check if URL is a country pack resource
function isCountryPackResource(pathname) {
  return Object.values(COUNTRY_PACK_PATTERNS).some(pattern => pattern.test(pathname));
}

// Message handler for downloading country packs
self.addEventListener('message', event => {
  if (event.data.type === 'DOWNLOAD_COUNTRY_PACK') {
    const { countryIso2 } = event.data;
    console.log('Service Worker: Downloading country pack:', countryIso2);

    event.waitUntil(
      downloadCountryPack(countryIso2)
        .then(() => {
          event.ports[0].postMessage({ success: true, countryIso2 });
        })
        .catch(error => {
          console.error('Failed to download country pack:', error);
          event.ports[0].postMessage({ success: false, countryIso2, error: error.message });
        })
    );
  }

  if (event.data.type === 'DELETE_COUNTRY_PACK') {
    const { countryIso2 } = event.data;
    console.log('Service Worker: Deleting country pack:', countryIso2);

    event.waitUntil(
      deleteCountryPack(countryIso2)
        .then(() => {
          event.ports[0].postMessage({ success: true, countryIso2 });
        })
        .catch(error => {
          console.error('Failed to delete country pack:', error);
          event.ports[0].postMessage({ success: false, countryIso2, error: error.message });
        })
    );
  }

  if (event.data.type === 'GET_CACHE_SIZE') {
    event.waitUntil(
      getCacheSize()
        .then(size => {
          event.ports[0].postMessage({ size });
        })
    );
  }
});

// Download all resources for a country pack
async function downloadCountryPack(countryIso2) {
  const cache = await caches.open(COUNTRY_CACHE);

  const resources = [
    `/countries/${countryIso2}/config.ts`,
    `/api/fx?base=${countryIso2}&quote=GBP`,
    `/api/fx?base=${countryIso2}&quote=USD`,
    `/api/fx?base=${countryIso2}&quote=EUR`
  ];

  const promises = resources.map(async url => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set('sw-cache-date', new Date().toISOString());

        const newResponse = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers
        });

        await cache.put(url, newResponse);
      }
    } catch (error) {
      console.error(`Failed to cache ${url}:`, error);
    }
  });

  await Promise.all(promises);
}

// Delete all resources for a country pack
async function deleteCountryPack(countryIso2) {
  const cache = await caches.open(COUNTRY_CACHE);
  const keys = await cache.keys();

  const deletePromises = keys
    .filter(request => {
      const url = new URL(request.url);
      return url.pathname.includes(`/${countryIso2}/`) ||
             url.searchParams.get('base') === countryIso2 ||
             url.searchParams.get('quote') === countryIso2;
    })
    .map(request => cache.delete(request));

  await Promise.all(deletePromises);
}

// Calculate total cache size
async function getCacheSize() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
  return 0;
}
