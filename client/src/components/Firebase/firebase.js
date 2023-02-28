import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAuByNJ4fFRwTcN78q-mZQY_5hFag4WmDI",
  authDomain: "msci342-95a21.firebaseapp.com",
  databaseURL: "https://msci342-95a21-default-rtdb.firebaseio.com",
  projectId: "msci342-95a21",
  storageBucket: "msci342-95a21.appspot.com",
  messagingSenderId: "610970174799",
  appId: "1:610970174799:web:1fea90061fcf89a9d1713a"
};
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doGetIdToken = (bool) => {
    return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
  }

  doGetUserByEmail = email => this.auth.getUserByEmail(email);

}

export default Firebase;