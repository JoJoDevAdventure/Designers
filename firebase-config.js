// firebase-config.js
import firebase from "firebase/app";
import "firebase/compat/storage";

const firebaseConfig = {
    // ...
    storageBucket: '[your-storage-bucket-url]'
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage as storage };

