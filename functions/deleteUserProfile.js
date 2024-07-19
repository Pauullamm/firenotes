const functions = require('firebase-functions');


exports.deleteUserProfile = functions.auth.user().onDelete((user) => {
    const userId = user.displayName;
    const documentRef = admin.firestore().collection("users").doc(userId);

    return documentRef.delete().then(() => {
        console.log(`Successfully deleted document for user: ${userId}`);
        return null;
    }).catch((error) => {
        console.error(`Error deleting document for user: ${userId}`, error);
        throw new functions.https.HttpsError('internal', 'Unable to delete user profile');
    })
})


