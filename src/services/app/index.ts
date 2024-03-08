import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import { ISurgery } from '@interfaces/App/ISurgery'

function addSurgery(data: ISurgery) {
  return addDoc(collection(db, 'surgeries'), data)
}

function deleteSurgery(surgeryId: string) {
  return deleteDoc(doc(db, 'surgeries', surgeryId))
}

function setParticipantsAssistants(surgeryId: string, data: string[]) {
  return updateDoc(doc(db, 'surgeries', surgeryId), {
    participantsAssistants: data,
  })
}

function setPendingAssistants(surgeryId: string, data: string[]) {
  return updateDoc(doc(db, 'surgeries', surgeryId), {
    pendingAssistants: data,
  })
}

function getSurgery(surgeryId: string) {
  return getDoc(doc(db, 'surgeries', surgeryId))
}

export {
  addSurgery,
  deleteSurgery,
  setParticipantsAssistants,
  setPendingAssistants,
  getSurgery,
}
