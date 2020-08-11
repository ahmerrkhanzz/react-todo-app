import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAdozMewH9-4PoFwWOGaYNzmmzfFkUEM6U",
  authDomain: "todo-app-react-b8245.firebaseapp.com",
  databaseURL: "https://todo-app-react-b8245.firebaseio.com",
  projectId: "todo-app-react-b8245",
  storageBucket: "todo-app-react-b8245.appspot.com",
  messagingSenderId: "742869697938",
  appId: "1:742869697938:web:da9659543ce43897d22d4b",
  measurementId: "G-CGCP2VZ2JR",
});

const db = firebaseApp.firestore();

export default db;
