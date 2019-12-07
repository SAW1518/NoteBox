import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

let config = {
  apiKey: 'AIzaSyCkPTTovqDQHRByO7pV1rHEO_m2DMJnnPI',
  authDomain: 'notebox-52ceb.firebaseapp.com',
  databaseURL: 'https://notebox-52ceb.firebaseio.com',
  projectId: 'notebox-52ceb',
  storageBucket: 'notebox-52ceb.appspot.com',
};

firebase.initializeApp(config);

//export const provider = new firebase.auth.Google.AuthProvider();
//export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
