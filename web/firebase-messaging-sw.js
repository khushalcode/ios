importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyC7Ra0wdqkgtj0Za-NFXEHJWXl45DD1Z-0",
  authDomain: "nc-mart.firebaseapp.com",
  databaseURL: "https://ammart-8885e-default-rtdb.firebaseio.com",
  projectId: "nc-mart",
  storageBucket: "nc-mart.firebasestorage.app",
  messagingSenderId: "896275073198",
  appId: "1:896275073198:web:427d62b62b1e3395d4853f",
  measurementId: "G-BCR36GZMT1"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});