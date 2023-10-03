"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://guemes-default-rtdb.firebaseio.com"
});
var firestore = admin.firestore();
exports.firestore = firestore;
