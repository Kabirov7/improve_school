import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyCs4wBkenI3_mQKkJupWe_0rG6hOMcBif0",
    authDomain: "improve-school.firebaseapp.com",
    projectId: "improve-school",
    storageBucket: "improve-school.appspot.com",
    messagingSenderId: "1053936762649",
    appId: "1:1053936762649:web:768c2d2828768b01fecf88",
    measurementId: "G-FGZQ895MFF"
}
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	firebase.auth().signInWithPopup(provider);
};

export const signInAnonymously = () => {
	firebase.auth().signInAnonymously()
}

export default firebase;