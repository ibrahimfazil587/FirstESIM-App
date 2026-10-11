
self.addEventListener('push', function (event) {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      title: 'FirstESIM — Order نوێ 🔔',
      body: event.data ? event.data.text() : 'Order ـێکی نوێ دروست کرا.'
    };
  }

  const title = data.title || 'FirstESIM — Order نوێ 🔔';

  const options = {
    body: data.body || 'کڕیارێکی نوێ Order ـی دروست کرد.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.tag || 'firstesim-admin-order',
    renotify: true,
    data: {
      url: data.url || 'https://firstesim.net/admin.html',
      orderId: data.orderId || ''
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const targetUrl =
    event.notification.data?.url ||
    'https://firstesim.net/admin.html';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function (windows) {
      for (const client of windows) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      return clients.openWindow(targetUrl);
    })
  );
});
