// This is the service worker with the Cache-first network

const CACHE = "js13kPWA-v2.1";
const precacheFiles = ["/pwa-vue/", "/pwa-vue/index.html"];

// self.addEventListener("install", function(event) {
//   console.log("[PWA Builder] Install Event processing");

//   console.log("[PWA Builder] Skip waiting on install");
//   self.skipWaiting();

//   event.waitUntil(
//     caches.open(CACHE).then(function(cache) {
//       console.log("[PWA Builder] Caching pages during install");
//       return cache.addAll(precacheFiles);
//     })
//   );
// });
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(contentToCache);
    })
  );
});

// Allow sw to control of current page
// self.addEventListener("activate", function(event) {
//   console.log("[PWA Builder] Claiming clients for current page");
//   event.waitUntil(self.clients.claim());
// });
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(function(response) {
          return caches.open(CACHE).then(function(cache) {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
// self.addEventListener("fetch", function(event) {
//   if (event.request.method !== "GET") return;

//   event.respondWith(
//     fromCache(event.request).then(
//       function(response) {
//         // The response was found in the cache so we responde with it and update the entry

//         // This is where we call the server to get the newest version of the
//         // file to use the next time we show view
//         event.waitUntil(
//           fetch(event.request).then(function(response) {
//             return updateCache(event.request, response);
//           })
//         );

//         return response;
//       },
//       function() {
//         // The response was not found in the cache so we look for it on the server
//         return fetch(event.request)
//           .then(function(response) {
//             // If request was success, add or update it in the cache
//             event.waitUntil(updateCache(event.request, response.clone()));

//             return response;
//           })
//           .catch(function(error) {
//             console.log(
//               "[PWA Builder] Network request failed and no cache." + error
//             );
//           });
//       }
//     )
//   );
// });

self.addEventListener("push", function(e) {
  console.log("Push notification recieved!", e);
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request).then(function(matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function(cache) {
    return cache.put(request, response);
  });
}
