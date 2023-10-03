import firebase from "firebase";

let API_BASE_URL:string;
if(process.env.ENV_NODE == "production") {
    API_BASE_URL = "";
} else {
    API_BASE_URL = "http://localhost:4444";
}

const app = firebase.initializeApp({
    apiKey: "Ugnx1TNxmHiz6NwahxO3bs78nPwm2APWNZa2r5Di",
    authDomain: "guemes.firebaseapp",
    databaseURL: "https://guemes-default-rtdb.firebaseio.com"
});

const rtdb = firebase.database();
export {rtdb, API_BASE_URL};