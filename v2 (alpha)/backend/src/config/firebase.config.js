const {initializeApp} = require('firebase/app')
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
}
function createFirebaseApp(config) {
  const firebaseApp = initializeApp(config)
  return firebaseApp
}
const firebaseApp = createFirebaseApp(firebaseConfig)
module.exports = {
  firebaseApp
}