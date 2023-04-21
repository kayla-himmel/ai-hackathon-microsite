import OktaAuth from '@okta/okta-auth-js';
require('dotenv').config();

async function main() {
  // create OktaAuth instance
  var config = {
    issuer: OKTA_WILLOWTREE_URL,
    clientId: OKTA_CLIENT_ID,
    redirectUri: OKTO_SIGN_IN_URI,
    scopes: ['openid', 'email', 'profile'],
  };
  authClient = new OktaAuth(config);

  // Subscribe to authState change event.
  authClient.authStateManager.subscribe(function (authState) {
    // Logic based on authState is done here.
    if (!authState.isAuthenticated) {
      // render unathenticated view
      return;
    }

    // Render authenticated view
    // login variables
    const loginContainer = document.getElementById('login-container');
    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');
    const authedPageContent = document.getElementById('protected-content');

    // add click event to the login button
    loginButton.addEventListener('click', () => {
      OktaAuth.signInWithRedirect();
    });

    OktaAuth.isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          // User is authenticated, show protected content
          authedPageContent.style.display = 'block';
          loginContainer.style.display = 'none';
        } else {
          // User is not authenticated, redirect to login page
          OktaAuth.signInWithRedirect();
        }
      })
      .catch((error) => {
        loginError.style.display = 'block';
        console.log(error);
      });
  });

  // Handle callback
  if (authClient.token.isLoginRedirect()) {
    const { tokens } = await authClient.token.parseFromUrl();
    authClient.tokenManager.setTokens(tokens);
  }

  // normal app startup
  authClient.start(); // will update auth state and call event listeners
}
