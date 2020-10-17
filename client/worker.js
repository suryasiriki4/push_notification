const pg = require('pg');
const dust = require('dustjs-helpers');
const cons = require('consolidate');

console.log('Service worker loaded');

self.addEventListener('push', e => {
const data = e.data.json();
console.log('Push Recieved...');
self.registration.showNotification(data.title, {
    body: 'Notified by ziriki',
    icon: "https://images-platform.99static.com//64RVHLYKS-sAgw4WkNz2PauaEPQ=/117x65:1122x1070/fit-in/590x590/99designs-contests-attachments/121/121740/attachment_121740866",

});
});