const CACHE_NAME = 'truelearner';
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
	'/js/script.js'
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

