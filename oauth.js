/* 
We could certainly create an app in Okta for this. In order to support this, you would need to leverage OpenID connect in your app, working with the Okta authorization server using the methods described here: https://developer.okta.com/docs/concepts/auth-servers/ and here https://developer.okta.com/docs/concepts/oauth-openid/

Note that, even though the documentation might talk about custom authorization servers, our Okta instance doesn’t support it. So the issuer you’d be communicating with is simply https://willowtree.okta.com/, and if you wanted to get more details about the authorization server your app can hit this endpoint: https://willowtree.okta.com/.well-known/openid-configuration. We would create an OIDC app in Okta, give you the client ID and any other bits you need for the interop to work. Once you have it set up, only people we assign to the app on the Okta backend would be able to authenticate and access your app.

Okta offers free dev instances you can experiment with here where you can set up a test ODIC app: https://www.okta.com/developers . When you get it working in this environment, you could share the configuration you have for your test app in the dev instance with us, and we can add it in prod for you. Again, do note that some features like custom authorization servers aren’t supported in our prod instance. Dev instances create a custom auth server called “default” automatically when they are provisioned so you’ll want to avoid using it.

I do not know what kind of bandwidth he has so I can’t commit him as a resource per se, but I will say that Phil Stammler is working on a separate ChatWT app that leverages OIDC and I think he got it worked out for that either late last week or earlier this week. From an engineering perspective, he might be able to help you out as well.
*/

const oktaAuth = new OktaAuth({
  // config
});

async function main() {
  // create OktaAuth instance
  var config = {
    issuer: 'https://willowtree.okta.com', // URL from Justin
    clientId: '0oa965vz1r9XBnakY5d7', // our Okta Dev app's client ID
    redirectUri: 'https://acme.com/oauth2/callback/home', // NEED TO UPDATE STILL
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
  });

  // Handle callback
  if (authClient.token.isLoginRedirect()) {
    const { tokens } = await authClient.token.parseFromUrl(); // remember to "await" this async call
    authClient.tokenManager.setTokens(tokens);
  }

  // normal app startup
  authClient.start(); // will update auth state and call event listeners
}
