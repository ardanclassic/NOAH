let CACHE_NAME = 'truelearner';
let urlsToCache = [
	'/',
	'/index.html',
	'/pages/nav.html',
	'/pages/home/home.html',
	'/pages/home/home.css',
	'/pages/kisah/kisah.html',
	'/pages/kisah/kisah.css',
	'/pages/dalil/dalil.html',
	'/pages/dalil/dalil.css',
	'/pages/fakta/fakta.html',
	'/pages/fakta/fakta.css',
	'/pages/pesan/pesan.html',
	'/pages/pesan/pesan.css',
	'/pages/referensi/referensi.html',
	'/pages/referensi/referensi.css',
	'/js/materialize.min.js',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/script.js',
    
    /** image assets */
    'assets/illustration/ark3.jpg',
    'assets/illustration/ark4.jpg',
    'assets/illustration/books.jpg',
    'assets/illustration/noah ark.jpg',
    'assets/illustration/statue.jpg',
    'assets/icon/book.png',
    'assets/icon/compass.png',
    'assets/icon/home.png',
    'assets/icon/icon.png',
    'assets/icon/icon-32.png',
    'assets/icon/icon-48.png',
    'assets/icon/icon-144.png',
    'assets/icon/icon-152.png',
    'assets/icon/icon-192.png',
    'assets/icon/icon-256.png',
    'assets/icon/icon-512.png',
    'assets/icon/logo.png',
    'assets/icon/memory.png',
    'assets/icon/morality.png',
    'assets/icon/research.png',
    'assets/icon/scroll.png',
    'assets/icon/up.png',
    'assets/gif/drown.gif',
    'assets/gif/sail.gif',
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				// console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			// console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

