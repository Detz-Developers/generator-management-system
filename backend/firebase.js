const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://genizest-default-rtdb.firebaseio.com" 
});

const db = admin.database(); 
module.exports = { admin, db };
