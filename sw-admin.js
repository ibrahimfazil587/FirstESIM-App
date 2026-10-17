/* FirstESIM admin push worker. Keep this file beside admin.html. */
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) { data = { body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(data.title || 'FirstESIM — Order نوێ', {
    body: data.body || 'A new order or update is available.',
    icon: new URL('0016DE22-5EB2-4EBC-834A-F545DBDBC423.png', self.registration.scope).href,
    data: { url: data.url || self.registration.scope },
    tag: data.tag || 'firstesim-admin'
  }));
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
