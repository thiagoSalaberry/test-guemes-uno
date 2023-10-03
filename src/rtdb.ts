import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "Ugnx1TNxmHiz6NwahxO3bs78nPwm2APWNZa2r5Di",
    authDomain: "guemes.firebaseapp",
    databaseURL: "https://guemes-default-rtdb.firebaseio.com"
});

const rtdb = firebase.database();
export {rtdb};