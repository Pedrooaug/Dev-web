import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { firebaseConfig } from '../keys/firebase_key'

export default class Firebase {
    constructor () {
        this.app = initializeApp(firebaseConfig)
    }
    getFirestoredb () {
        return getFirestore(this.app)
    }
}