const API_BASE_URL = "http://localhost:10000";
import {rtdb} from "./rtdb";

const state = {
    data: {},
    listeners: [],
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
        this.listeners.forEach(listener => listener());
        console.log(`Soy el state de ${location.pathname}`, this.data);
    },
    subscribe(callback) {
        this.listeners.push(callback);
    },
    async signUp(name:string, lastName:string, dni:string):Promise <boolean> {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name, lastName, dni})
        });
        if(response.status == 400) {
            return false;
        } else if (response.status == 201){
            const userData = {name, lastName, dni};
            this.setState({userData});
            return true;
        } else {
            return false;
        };
    },
    async login(dni:string):Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/users/${dni}`);
        if(response.status == 404) {
            return false;
        } else if(response.status == 200){
            const userData = await response.json() 
            this.setState(userData);
            return true;
        } else {
            return false;
        }
    },
    async getAllUsers() {
        const response = await fetch(`${API_BASE_URL}/users`);
        if(response.ok) {
            return await response.json();
        }
    }
};

export {state};