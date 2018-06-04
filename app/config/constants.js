import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDVF2Fc1YcNzM73M9yGSXNz6g7iQQ0ZL4E',
  authDomain: 'duckr-4cd16.firebaseapp.com',
  databaseURL: 'https://duckr-4cd16.firebaseio.com',
  projectId: 'duckr-4cd16',
  storageBucket: 'duckr-4cd16.appspot.com',
  messagingSenderId: '931773586954',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
