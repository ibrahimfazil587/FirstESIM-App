/* FirstESIM customer push worker. Keep this file in the same app folder as index.html. */
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) { data = { body: event.data ? event.data.text() : '' }; }
  const title = data.title || 'FirstESIM';
  const options = {
    body: data.body || 'Your eSIM update is available.',
    icon: new URL('0016DE22-5EB2-4EBC-834A-F545DBDBC423.png', self.registration.scope).href,
    badge: new URL('0016DE22-5EB2-4EBC-834A-F545DBDBC423.png', self.registration.scope).href,
    data: { url: data.url || self.registration.scope, orderId: data.orderId || '' },
    tag: data.tag || 'firstesim-update'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url || self.registration.scope;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windows) {
      if ('focus' in client) { await client.focus(); if ('navigate' in client) await client.navigate(target); return; }
    }
    if (self.clients.openWindow) await self.clients.openWindow(target);
  })());
});
