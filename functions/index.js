// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("/messages");


// Library to convert JSON to CSV
const json2csv = require("json2csv").parse;

function convertObjForCeltra(cards) {
    let objToSend = {};
    cards.forEach(obj => {
        const cardNumber = obj.cardNumber;
        delete obj.cardNumber;
        for (var key in obj) {
            var oldKey = key;
            var oldKeyAdjusted = 'Card' + cardNumber + oldKey.charAt(0).toUpperCase() + oldKey.slice(1);
            var newKey = (oldKey == 'placementName') ? 'condition:' + oldKeyAdjusted :'value:' + oldKeyAdjusted;
            if(!oldKey.startsWith("value:") && !oldKey.startsWith("condition")) {
                Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
                delete obj[oldKey];
            }
        }
        objToSend = {...objToSend, ...obj};
    });
    return objToSend;
}

//Sends a CSV if data exists
exports.getNative = functions.https.onRequest((req, res) => {
    const nativeId = req.query.id;

    // Return if ID not supplied or ill-formatted
    if (!nativeId) {
        res.send('Please provide the Native Gallery ID in the url. Example /getNative?id=1d9Ejd03jadf932')
    };

    admin.database().ref(`/nativeGalleries/${nativeId}`).on('value', (snapshot) => {
        const nativeObj = snapshot.val();
        const nativeCardsObj = nativeObj.nativeCards;
        // Return CSV if found
        if (nativeCardsObj) {
            objToSend = convertObjForCeltra(nativeCardsObj);
            console.log(objToSend);
            const csv = json2csv(objToSend)
            res.setHeader(
                "Content-disposition",
                `attachment; filename=Native-${nativeId}.csv`
            )
            res.set("Content-Type", "text/csv")
            res.status(200).send(csv)
        } 
        // Return if no match found
        else {
            res.send('Message not found');
        }
    });

});