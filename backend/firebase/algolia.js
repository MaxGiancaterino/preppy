const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = 'QD7MYQO8BN';
const ALGOLIA_ADMIN_KEY = 'a740577a139a86f35aea84b2447ec838';
const ALGOLIA_SEARCH_KEY = 'f4d57770805ca08eae59a491febf3ac4';

const ALGOLIA_INDEX_NAME = 'recipes';

exports.onNoteCreated = functions.firestore.document('recipe/micro/data/{noteId}').onCreate((snap, context) => {
	const note = snap.data();

	note.objectID = context.params.noteId;

	const index = client.initIndex(ALGOLIA_INDEX_NAME);
	return index.saveObject(note);
});

var client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
var index = client.initIndex('recipes');

module.exports = index;