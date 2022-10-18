import { FirebaseOptions, getApps, getApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, User } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
const firebaseConfig = {
//apikey data
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