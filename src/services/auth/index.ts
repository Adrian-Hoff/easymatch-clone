import * as api from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@config/firebase'
import { ICreateUserOnFirebase } from '@interfaces/Auth/ICreateUserOnFirebase'

function signIn(email: string, password: string) {
  return api.signInWithEmailAndPassword(auth, email, password)
}

function signUp(email: string, password: string) {
  return api.createUserWithEmailAndPassword(auth, email, password)
}

function addUserOnFirestore(id: string, data: ICreateUserOnFirebase) {
  return setDoc(doc(db, 'users', id), data)
}

function confirmAccount(user: api.User) {
  return api.sendEmailVerification(user)
}

function updateAccount(user: api.User, displayName: string, photoURL: string) {
  return api.updateProfile(user, {
    displayName,
    photoURL,
  })
}

function resetPassword(email: string) {
  return api.sendPasswordResetEmail(auth, email)
}

function signOut() {
  return api.signOut(auth)
}

function getUser(userId: string) {
  return getDoc(doc(db, 'users', userId))
}

export {
  signIn,
  signUp,
  confirmAccount,
  updateAccount,
  resetPassword,
  addUserOnFirestore,
  signOut,
  getUser,
}
