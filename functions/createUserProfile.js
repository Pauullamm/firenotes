
const functions = require('firebase-functions');

exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
    try {
        // Extract user details
        const { uid, displayName, email } = user;

        // Reference to Firestore
        const userRef = admin.firestore().collection('users').doc(displayName);
        // Create or update user document
        await userRef.set({
            displayName: displayName || null,
            email: email || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Create subcollection 'notes'
        await userRef.collection('notes').add({
            // Add default notes or leave it empty
            title: 'First Note',
            body: 'Welcome! This is your first note.'
        });

        console.log(`User profile created for ${uid}`);
        return null;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw new functions.https.HttpsError('internal', 'Unable to create user profile');
    }
});
