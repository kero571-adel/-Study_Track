/* eslint-disable no-restricted-globals */

const CACHE_NAME = "studytrack-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/css/main.css",
  "/image/download.png",
  "/manifest.json",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type === "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match("/index.html");
        });
    })
  );
});

// Background Sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-courses") {
    event.waitUntil(syncCourses());
  }
});

async function syncCourses() {
  try {
    const response = await fetch("/api/courses");
    const data = await response.json();

    const cache = await caches.open(CACHE_NAME);
    await cache.put("/api/courses", new Response(JSON.stringify(data)));
  } catch (error) {
    console.error("Sync failed:", error);
  }
}

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/image/download.png",
    badge: "/image/download.png",
    vibrate: [100, 50, 100],
  };

  event.waitUntil(self.registration.showNotification("StudyTrack", options));
});
