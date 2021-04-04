let auth0 = null;


const login = async (targetUrl) => {
   targetUrl = window.location.href;
   try {
      const options = {
         redirect_uri: window.location.href
      };

      if (targetUrl) {
         options.appState = { targetUrl };
      }

      await auth0.loginWithRedirect(options);
   } catch (err) {
   }
};

const logout = async () => {
   const isAuthenticated = await auth0.isAuthenticated();
   if(isAuthenticated){
      try {
         auth0.logout({
            returnTo: window.location.origin
         });

      } catch (err) {
      }
   }else{
      localStorage.clear();
      document.location.reload();
   }
};

const configureClient = async () => {

   const config = {
      "domain": "geonight-dev.eu.auth0.com",
      "clientId": "1qo4JQchoKB1NdkWPbt5RLjHNWTpzdtN"
   }

   auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId
   });
};

const requireAuth = async (fn, targetUrl) => {
   const isAuthenticated = await auth0.isAuthenticated();

   if (isAuthenticated) {
      return fn();
   }

   return login(targetUrl);
};

// Will run when page finishes loading
window.onload = async () => {
   await configureClient();

   let isAuthenticated = await auth0.isAuthenticated();

   if(localStorage.getItem('user')){
      isAuthenticated = true;
   }

   if (isAuthenticated) {
      updateUI();
      return;
   }


   const query = window.location.search;
   const shouldParseResult = query.includes("code=") && query.includes("state=");

   if (shouldParseResult) {
      try {
         const result = await auth0.handleRedirectCallback();

         if (result.appState && result.appState.targetUrl) {
            showContentFromUrl(result.appState.targetUrl);
         }

      } catch (err) {
      }

      window.history.replaceState({}, document.title, window.location.pathname);
      const user = await auth0.getUser();
      localStorage.setItem('user', JSON.stringify(user));
   }

   updateUI();

};
