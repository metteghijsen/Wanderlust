const cacheName="Wanderlust_cache";
//Just take into account that the "files" below are request-url's and not filenames perse. So for your root of your website yous should include "./" and if you use my site (or another plain HTML-site) also "index.html". If you use a server-side language and have friendly url's that could be something like "news/this-is-a-newsarticle/".
const appFiles=[
    "./",
    "manifest.json",
    "js/script.js",
    "css/stylesheet.css",
    "img/icons/icon-192x192.png",
    "img/icons/icon-256x256.png",
    "img/icons/icon-384x384.png",
    "img/icons/icon-512x512.png",
    "index.html"
];

self.addEventListener("install",(installing)=>{
    installing.waitUntil(
        caches.open(cacheName).then((cache)=>{
            return cache.addAll(appFiles);
        })
    );
});

self.addEventListener("activate",(activating)=>{
    console.log("Service Worker: All systems online, ready to go!");
});

//When fetching website information
self.addEventListener("fetch",(fetching)=>{
    fetching.respondWith(
        caches.match(fetching.request.url).then((response)=>{
            //console.log("Service Worker: Fetching resource "+fetching.request.url);
            return response||fetch(fetching.request).then((response)=>{
                console.log("Service Worker: Resource "+fetching.request.url+" not available in cache");
                return caches.open(cacheName).then((cache)=>{
                    //console.log("Service Worker: Caching (new) resource "+fetching.request.url);
                    // OUTCOMMENT THIS LINE FOR ADDING DOWNLOADED RESOURCES TO YOUR CACHE: cache.put(fetching.request,response.clone());
                    return response;
                });
            }).catch(function(){
                console.log("Service Worker: Fetching online failed, HAALLPPPP!!!");
                //Do something else with the request (for example: respond with a different cached file)
            })
        })
    );
});

self.addEventListener("push",(pushing)=>{
    console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
})
