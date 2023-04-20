// /*
// IT Ticket info:
// We could certainly create an app in Okta for this. In order to support this, you would need to leverage OpenID connect in your app, working with the Okta authorization server using the methods described here: https://developer.okta.com/docs/concepts/auth-servers/ and here https://developer.okta.com/docs/concepts/oauth-openid/

// Note that, even though the documentation might talk about custom authorization servers, our Okta instance doesn’t support it. So the issuer you’d be communicating with is simply https://willowtree.okta.com/, and if you wanted to get more details about the authorization server your app can hit this endpoint: https://willowtree.okta.com/.well-known/openid-configuration. We would create an OIDC app in Okta, give you the client ID and any other bits you need for the interop to work. Once you have it set up, only people we assign to the app on the Okta backend would be able to authenticate and access your app.

// Okta offers free dev instances you can experiment with here where you can set up a test ODIC app: https://www.okta.com/developers . When you get it working in this environment, you could share the configuration you have for your test app in the dev instance with us, and we can add it in prod for you. Again, do note that some features like custom authorization servers aren’t supported in our prod instance. Dev instances create a custom auth server called “default” automatically when they are provisioned so you’ll want to avoid using it.

// I do not know what kind of bandwidth he has so I can’t commit him as a resource per se, but I will say that Phil Stammler is working on a separate ChatWT app that leverages OIDC and I think he got it worked out for that either late last week or earlier this week. From an engineering perspective, he might be able to help you out as well.
// */

// import OktaAuth from '@okta/okta-auth-js';
// require('dotenv').config();

// async function main() {
//   // create OktaAuth instance
//   var config = {
//     issuer: OKTA_ISSUER, // URL from Justin
//     clientId: OKTA_CLIENT_ID, // value from our Okta Dev app's client ID
//     // redirectUri: 'https://willowtreeapps.github.io/ai-hackathon/', // value from our Okta Dev app's sign-in redirect URI
//     // redirectUri: window.location.origin + '/login/callback',
//     redirectUri: OKTO_SIGN_IN_URI,
//     scopes: ['openid', 'email', 'profile'], // not sure if need this--chatGPT suggested it but it's not in the okta-auth-js samples (it is an option we can include but may not need to our our SPA)
//   };
//   authClient = new OktaAuth(config);

//   // Subscribe to authState change event.
//   authClient.authStateManager.subscribe(function (authState) {
//     // Logic based on authState is done here.
//     if (!authState.isAuthenticated) {
//       // render unathenticated view
//       return;
//     }

//     // Render authenticated view
//   });

//   // Handle callback
//   if (authClient.token.isLoginRedirect()) {
//     const { tokens } = await authClient.token.parseFromUrl();
//     authClient.tokenManager.setTokens(tokens);
//   }

//   // normal app startup
//   authClient.start(); // will update auth state and call event listeners
// }

// // login variables
// const loginContainer = document.getElementById('login-container');
// const loginButton = document.getElementById('login-button');
// const loginError = document.getElementById('login-error');
// const authedPageContent = document.getElementById('protected-content');

// // add click event to the login button
// loginButton.addEventListener('click', () => {
//   OktaAuth.signInWithRedirect();
// });

// if (loginContainer.checkVisibility(true) === true)
//   OktaAuth.isAuthenticated()
//     .then((isAuthenticated) => {
//       if (isAuthenticated) {
//         // User is authenticated, show protected content
//         authedPageContent.style.display = 'block';
//         loginContainer.style.display = 'none';
//       } else {
//         // User is not authenticated, redirect to login page
//         OktaAuth.signInWithRedirect();
//       }
//     })
//     .catch((error) => {
//       loginError.style.display = 'block';
//       console.log(error);
//     });
