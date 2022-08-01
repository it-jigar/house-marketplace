import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABbztv76ejOivYj_dszN7K0V_Awj2nAjc',
  authDomain: 'house-marketplace-01.firebaseapp.com',
  projectId: 'house-marketplace-01',
  storageBucket: 'house-marketplace-01.appspot.com',
  messagingSenderId: '805814440358',
  appId: '1:805814440358:web:57b0466229a5192ef5ff67',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
