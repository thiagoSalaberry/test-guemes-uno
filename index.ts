import * as express from "express";
import { firestore } from "./db";
import * as cors from "cors";
import {v4 as uuidv4} from "uuid";

const app = express();
const port = process.env.PORT || 4444;
app.use(express.static("./dist"));
app.use(express.json());
app.use(cors());

const usersCollection = firestore.collection("users");

//CREAR USUARIO NUEVO
app.post("/users", async(req, res)=>{
    const {name, lastName, dni} = req.body;
    try {
        const existingUser = await usersCollection.where("dni", "==", dni).get();
        if(!existingUser.empty) {
            return res.status(400).json({error: "El dni ya está en uso"});
        } else {
            const newUser = usersCollection.doc();
            await newUser.create({id: newUser.id, name, lastName, dni});
            res.status(201).json({
                message: `Jugador nuevo creado con id: ${newUser.id}`,
                id: newUser.id
            })
        }
    } catch(error) {
        console.error("Error al crear el jugador:",error);
        res.status(500).send("Error al crear el jugador en Firestore");
    }
});

//CONSEGUIR USUARIO POR DNI
app.get("/users/:dni", async (req, res)=>{
    try {
        const {dni} = req.params;
        const snapshot = await usersCollection.where("dni", "==", dni).get();
        if(snapshot.empty) {
            res.status(404).json({error:"Jugador no encontrado"});
        } else {
            const userData = snapshot.docs[0].data();
            res.status(200).json({
                userData
            })
        }
    } catch(error) {
        console.error("Error al buscar el jugador:",error);
        res.status(500).send("Error al buscar el jugador en Firestore");
    }
})

//CONSEGUIR TODOS LOS USUARIOS
app.get("/users", async(req,res)=>{
    try {
        const allUsersSnapshot = await usersCollection.get();
        let users = []
        allUsersSnapshot.forEach((userDoc)=>users.push({"id": userDoc.id,...userDoc.data()}));
        res.json(users)
    } catch(error) {
        console.error("Error al buscar el jugador:",error);
        res.status(500).send("Error al buscar el jugador en Firestore");
    }
})

app.get("*", (req, res)=>{
    res.sendFile(__dirname + "/dist/index.html");
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
});