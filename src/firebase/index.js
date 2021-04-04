import firebase from 'firebase';
import 'firebase/database';
import 'firebase/firebase-database';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY_QA,
  authDomain: process.env.VUE_APP_AUTHDOMAIN_QA,
  databaseURL: process.env.VUE_APP_DATABASE_URL_QA,
  projectId: process.env.VUE_APP_PROJECT_ID_QA,
  storageBucket: process.env.VUE_APP_STORAGE_QA,
  messagingSenderId: process.env.VUE_APP_MESSAGING_ID_QA,
  appId: process.env.VUE_APP_APPID_QA,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
