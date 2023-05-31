var CACHE_NAME = 'game-v1606403827137';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(["Ubuntu-Light.ttf",
"images/alphabet.svg",
"images/bigField.png",
"images/book.svg",
"images/book_animated.svg",
"images/center.png",
"images/change.svg",
"images/cross.svg",
"images/favicon.png",
"images/letters.png",
"images/menu.png",
"images/menu.svg",
"images/next.svg",
"images/timer.svg",
"images/word.png",
"images/word2.png",
"index.css",
"index.html",
"index.js",
"reset.min.css",
"vue.min.js",
"words.js",
]);
        })
    );
});
var CACHE_PREFIX = 'brainGame}';

this.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (0 === cacheName.indexOf(CACHE_PREFIX)
                        && cacheName !== CACHE_NAME) return caches.delete(cacheName);
                })
            );
        })
    );
});

this.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0 ||
        event.request.url.indexOf('an.yandex.ru') !== -1
    ) {
        return;
    }
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
