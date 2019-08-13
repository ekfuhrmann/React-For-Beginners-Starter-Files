import Rebase from 're-base';
import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD6GVBO6PmmcdrNKbS4hGOauaYrh3in_Cc',
  authDomain: 'catch-of-the-day-12e16.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-12e16.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
