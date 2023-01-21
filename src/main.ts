import { MedplumClient } from '@medplum/core';

const medplum = new MedplumClient({
  // Uncomment to use your own Medplum server
  // baseUrl: 'https://api.medplum.com/',

  // Replace this with your own client ID
  clientId: '8bb0d37a-bed4-47d2-b317-05192b1f651b',
  authorizeUrl: 'https://api.medplum.com/oauth2/authorize?scope=openid',
});

// The code check
// If the current URL includes a "code" query string param, then we can exchange it for a token
const code = new URLSearchParams(window.location.search).get('code');
if (code) {
  // Process the code
  // On success, remove the query string parameters
  medplum.processCode(code).then(() => (window.location.href = window.location.href.split('?')[0]));
}

// The login button handler
// The user can click this button to initiate the OAuth flow
$('login').addEventListener('click', async () => {
  medplum.signInWithRedirect();
});

// The userinfo button handler
// Use the access token to call the "/userinfo" to get current user details
// Display the output in the window
$('userinfo').addEventListener('click', () => {
  medplum.get('oauth2/userinfo').then(showOutput).catch(alert);
});

// The practitioners button handler
// Use the access token to call the "/userinfo" to get current user details
// Display the output in the window
$('practitioners').addEventListener('click', () => {
  medplum.search('Practitioner').then(showOutput).catch(alert);
});

function showOutput(obj: any) {
  $('output').innerHTML = JSON.stringify(obj, null, 2);
  return obj;
}

function $(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
