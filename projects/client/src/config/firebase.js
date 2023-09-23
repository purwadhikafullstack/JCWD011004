import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCRtVLIl5m30I0Y0ML7AxkntRFs9klMoDU',
  authDomain: 'multiwarehouse-ecommerce.firebaseapp.com',
  projectId: 'multiwarehouse-ecommerce',
  storageBucket: 'multiwarehouse-ecommerce.appspot.com',
  messagingSenderId: '183869208940',
  appId: '1:183869208940:web:15117cc6bc5c851a0c9b49',
  measurementId: 'G-GJ1Q65HZZD'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
