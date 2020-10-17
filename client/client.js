
const publicVapidKey = 'BHgtB9klKhhMaURVBMkl6nlHJzBFDUAky5oRbtE6lu9ccLZblnffRZK_RO9mNMdpVmaaKMutO_LDwvSSQYd-mt0';

//check for service worker 

function subscribe() {
  if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
  }
}

// register SW, Register Push, Send Push
async function send() {
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    console.log('Service Worker Registered..');

    //Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log('Push Registered...');

    //send push notification
    console.log('sending push..');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Send...');

}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
