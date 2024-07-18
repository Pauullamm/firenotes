document.addEventListener("DOMContentLoaded", event => {
    db = firebase.firestore();
});

// google authentication button function
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    //promise
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        localStorage.setItem('userName', user.displayName)
        window.location.href = 'dashboard.html';

    })
    .catch(error => {
        console.log(error);
    })
};
