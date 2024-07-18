document.addEventListener("DOMContentLoaded", event => {
    const userName = localStorage.getItem("userName");

    if (userName) {
        const greetings = document.getElementById("greetings");
        greetings.innerHTML = `Hello ${userName}!`;
    }

    else {
        console.log("Error getting username")
    };
    
});


function retrieveNotes() {
    const db = firebase.firestore();
    const userName = localStorage.getItem("userName");
    if (!userName) {
        document.write("<h1>User name not found in localStorage</h1>");
        return;
    }
    const docRef = db.collection("users").doc(userName).collection("notes");
    docRef.get().then((snapshot) => {
        if (!snapshot.empty) {
            snapshot.forEach((doc) => {
                console.log("Document data:", doc.data());
                const notesDisplay = document.getElementById("notesDisplay");
                const noteTitle = document.createElement('H1')
                noteTitle.innerHTML = doc.data().title;
                const noteBody = document.createElement('P')
                noteBody.innerHTML = doc.data().body
                notesDisplay.appendChild(noteTitle)
                notesDisplay.appendChild(noteBody)

            });   
        }
        else {
            console.log("No notes found");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
};