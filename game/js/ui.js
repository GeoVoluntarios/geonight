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

const supportWebGl = function () {
    // Create canvas element. The canvas is not added to the
    // document itself, so it is never displayed in the
    // browser window.
    var canvas = document.createElement("canvas");
    // Get WebGLRenderingContext from canvas element.
    var gl = canvas.getContext("webgl")
    || canvas.getContext("experimental-webgl");
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
        return true;
    } else {
        return false;
    }
}

const updateUI = async () => {
    if(!supportWebGl()){
        // alert("No soporta");
        showContent("content-requirements");
        return;
    }
    try {
        let isAuthenticated = await auth0.isAuthenticated();
        let user;
        if (isAuthenticated) {
            user = await auth0.getUser();
        }else if(localStorage.getItem('user')){
            user = JSON.parse(localStorage.getItem('user'));
            isAuthenticated = true;
        }
        //   debugger
        if (isAuthenticated) {
            eachElement(".profile-image", (e) => (e.src = user.picture));
            eachElement(".user-name", (e) => (e.innerText = user.name));
            eachElement(".user-email", (e) => (e.innerText = user.email));
            eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
            eachElement(".auth-visible", (e) => e.classList.remove("hidden"));

            const teamName = localStorage.getItem('teamName');
            const accumulatedError = localStorage.getItem('accumulatedError') || 0;
            //
            if(teamName){
                showContent("content-game");
                document.querySelector("#team-name span").innerText = teamName;
                document.querySelector("#team-error span").innerText = accumulatedError;
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

    //    console.log("UI updated");
};
