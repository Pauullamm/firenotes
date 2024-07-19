const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addNote = functions.https.onRequest(async (req, res) => {

    //data to be sent in request should be written in this way:
    // {
    //     "note": 
    //         {
    //             "noteTitle": "title of note",
    //             "noteBody": "body text of note",
    //             "userName": "user's name"
    //     }
    // }
    try {
        if (!req.body || !req.body.note) {
            res.status(400).send('Invalid Request');
            return;
        }
        const { noteTitle, noteBody, userName } = req.body.note;

        if (!noteTitle || !noteBody || !userName) {
            res.status(400).send('Missing note or user details');
            return;
        }

        // push the new note into firestore using admin sdk
        const writeRes = await admin.firestore()
        .collection(`users/${userName}/notes`)
        .add({
            title: noteTitle,
            body: noteBody
        });
        res.json({ result: `Note from user: ${userName} added.`});
    } catch (error) {
        console.error('Error writing document:', error);
        req.status(500).send('Internal Server Error')
    }
});


