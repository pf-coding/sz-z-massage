// const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   }),
//   databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`, // Ha Firestore-t használsz, ezt ne használd, elég az auth
// });

// const firestore = admin.firestore();
// const auth = admin.auth();

// module.exports = { firestore, auth };

const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(
  fs.readFileSync("/etc/secrets/firebase-admin-config.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const firestore = admin.firestore();
const auth = admin.auth();

module.exports = { firestore, auth };
