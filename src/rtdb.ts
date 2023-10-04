import firebase from "firebase";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4444";

const app = firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL
});

const rtdb = firebase.database();
export {rtdb, API_BASE_URL};