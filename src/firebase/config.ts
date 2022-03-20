import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  useFirebaseEmulator: window.location.hostname === 'localhost',
};
// init firebase
firebase.initializeApp(firebaseConfig);
// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFunctions = firebase.app().functions();

//timestamp
const timestamp = firebase.firestore.Timestamp;
const provider = new firebase.auth.GoogleAuthProvider();

// functions側でfirebase emulator:startするなら意味がない？
const isEmulating = firebaseConfig.useFirebaseEmulator;
if (isEmulating) {
  firebase.functions().useEmulator('localhost', 5001);
}

export {
  firebase,
  projectFirestore,
  projectAuth,
  projectStorage,
  projectFunctions,
  timestamp,
  provider,
  isEmulating,
};
