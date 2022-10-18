var admin = require("firebase-admin");
var serviceAccount = require("./admin.json");
function createFirebaseAdmin() {
    const firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const firebaseAdmin = createFirebaseAdmin()
module.exports = {
  firebaseAdmin
}