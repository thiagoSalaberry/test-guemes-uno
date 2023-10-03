import { state } from "../../state";
import {Router} from "@vaadin/router";
class SignupPage extends HTMLElement {
    connectedCallback() {
        this.render();
    };
    render() {
        this.innerHTML = `
            <div class="home-container">
                <h1 class="title">BPMG</h1>
                <h2 class="subtitle">Ingresá tus datos para registrarte</h2>
                <div class="inputs-container">
                    <label class="label">Nombre:</label>
                    <input type="text" id="name" class="input" placeholder="Ingresá tu nombre"/>
                    <label class="label">Apellido:</label>
                    <input type="text" id="lastName" class="input" placeholder="Ingresá tu apellido"/>
                    <label class="label">DNI:</label>
                    <input type="number" id="dni" class="input" placeholder="Ingresá tu DNI"/>
                </div>
                <p class="error-message" style="color: red; font-size: 25px; margin: 0;"></p>
                <button class="button" id="signup">Registrarse</button>
            </div>
        `;
        const style = document.createElement("style");
        style.innerHTML = `
            .home-container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100vh;
                padding: 0 25px;
                gap: 60px;
            }

            .inputs-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
                gap: 10px;
                width: 100%;
            }
            
            input {
                padding: 10px 5px;
                width: 100%;
            }

            .button {
                border: solid #aaa 1px;
                border-radius: 1px;
                box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
                padding: 20px 50px;
                min-width: 250px;
                font-size: 20px;
                color: #222;
            }
        `;
        this.appendChild(style);
        const signupEl:HTMLButtonElement = this.querySelector("#signup")!;
        signupEl.addEventListener("click", async ()=>{
            const nameEl:HTMLInputElement = this.querySelector("#name")!;
            const lastNameEl:HTMLInputElement = this.querySelector("#lastName")!;
            const dniEl:HTMLInputElement = this.querySelector("#dni")!;
            const errorMessageEl:HTMLParagraphElement = document.querySelector(".error-message")!;
            if(nameEl.value == "" || lastNameEl.value == "" || dniEl.value == "") {
                errorMessageEl.textContent = `Debes ingresar un nombre, un apellido y un dni para poder registrarte.`
            } else {
                const createNewUser = await state.signUp(nameEl.value, lastNameEl.value, dniEl.value);
                if(createNewUser) {
                    Router.go("/player");
                } else {
                    errorMessageEl.textContent = `El DNI que estás intentando ingresar corresponde a un usuario existente.`
                }
            }
        });
    }
};

customElements.define("signup-page", SignupPage);