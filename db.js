"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});
var firestore = admin.firestore();
exports.firestore = firestore;
