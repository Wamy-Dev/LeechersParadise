import { FirebaseOptions, getApps, getApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, User } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBLXAgU_JHdFL-6Nfj-MOiPHE4AH7WLElY",
  authDomain: process.env.authDomain,
  projectId: "leechersparadise",
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: "1:563386738993:web:6dd3c250a078c9ae766810",
  measurementId: process.env.measurementId,
}
function createFirebaseApp(config: FirebaseOptions) {
  if (!getApps.length) {
    const firebaseApp = initializeApp(config)
    if (typeof window !== 'undefined') {
      if ('measurementId' in firebaseConfig) {
        getAnalytics()
      }
      return firebaseApp
    }
    return firebaseApp
  } else {
    return getApp()
  }
}
const firebaseApp = createFirebaseApp(firebaseConfig)
export const fireAuth = getAuth(firebaseApp)
export const fireStore = getFirestore(firebaseApp)
export const fireStorage = getStorage(firebaseApp)
export const auth = {
  currentUser: null as (User | null),
  token : ''
}