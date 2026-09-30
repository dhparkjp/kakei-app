const C='kakei-5b178cf3';
const CORE=['./','index.html','manifest.webmanifest','icon-192-vbe223300.png','icon-512-vbe223300.png','apple-touch-icon-vbe223300.png','https://cdnjs.cloudflare.com/ajax/libs/echarts/5.6.0/echarts.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
  if(u.pathname.endsWith('data.enc')||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(u.pathname.endsWith('data.enc')?'data.enc':e.request,cp));return r}).catch(()=>caches.match(u.pathname.endsWith('data.enc')?'data.enc':e.request)));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
