const createUserProfile = require('./createUserProfile');
const deleteUserProfile = require('./deleteUserProfile');
const addNote = require('./addNote');
const admin = require('firebase-admin');


exports.createUserProfile = createUserProfile.createUserProfile;
exports.deleteUserProfile = deleteUserProfile.deleteUserProfile;
exports.addNote = addNote.addNote;