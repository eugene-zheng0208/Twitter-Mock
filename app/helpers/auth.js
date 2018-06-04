import { ref, firebaseAuth } from '../config/constants'

const auth = () => (
  firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
)

export const checkIfAuthed = (store) => (
  store.getState().users.isAuthed === true
)

export const logout = () => (
  firebaseAuth().signOut()
)

export const saveUser = (user) => (
  ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
)

export default auth
