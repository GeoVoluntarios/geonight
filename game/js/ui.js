var startTime = null;
var accumulatedError = 0;

const eachElement = (selector, fn) => {
   for (let e of document.querySelectorAll(selector)) {
      fn(e);
   }
};

const showContent = (id) => {
   eachElement(".page", (p) => p.classList.add("hidden"));
   document.getElementById(id).classList.remove("hidden");
};

const updateUI = async () => {
   try {
      let isAuthenticated = await auth0.isAuthenticated();
      let user;
      if (isAuthenticated) {
         user = await auth0.getUser();
      }else if(localStorage.getItem('user')){
         user = JSON.parse(localStorage.getItem('user'));
         isAuthenticated = true;
      }

      if (isAuthenticated) {
         eachElement(".profile-image", (e) => (e.src = user.picture));
         eachElement(".user-name", (e) => (e.innerText = user.name));
         eachElement(".user-email", (e) => (e.innerText = user.email));
         eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
         eachElement(".auth-visible", (e) => e.classList.remove("hidden"));

         const teamName = localStorage.getItem('teamName');

         if(teamName){
            showContent("content-game");
            document.querySelector("#team-name span").innerText = teamName;
            startTime = moment(localStorage.getItem('startTime'));
            startTimer();
         }else{
            showContent("content-team-name");
         }
      } else {
         eachElement(".auth-invisible", (e) => e.classList.remove("hidden"));
         eachElement(".auth-visible", (e) => e.classList.add("hidden"));

         showContent("content-home");
      }
   } catch (err) {
      console.log("Error updating UI!", err);
      return;
   }

   console.log("UI updated");
};
