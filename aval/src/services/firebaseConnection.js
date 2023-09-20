
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDP1N5fdQWZs0Tt763kAT7WDzPgDCH_U34",
  authDomain: "tickets-chamada.firebaseapp.com",
  projectId: "tickets-chamada",
  storageBucket: "tickets-chamada.appspot.com",
  messagingSenderId: "828356936930",
  appId: "1:828356936930:web:1b18314779af4923a88abb"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
