import {Router} from "@vaadin/router";
import { state } from "../../state";
class PlayerPage extends HTMLElement {
    connectedCallback() {
        this.render();
    };
    name:string = "Nombre";
    lastName:string = "Apellido";
    dni:string = "DNI: 00.000.000";
    render() {
        const currentState = state.getState();
        const {userData} = currentState;
        this.innerHTML = `
            <div class="home-container">
                <div class="foto"></div>
                <h1 class="name">${currentState.userData? currentState.userData.name : this.name} ${currentState.userData ? currentState.userData.lastName : this.lastName}</h1>
                <h2 class="dni">${currentState.userData? currentState.userData.dni : this.dni}</h2>
                <div class="buttons-container">
                    <button class="button" id="team">Equipo</button>
                    <button class="button" id="player">Jugador</button>
                </div>
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

            .foto {
                width: 250px;
                height: 250px;
                background: #555;
                border-radius: 50%;
            }

            .buttons-container {
                width: 100%;
                display: flex;
                justify-content: space-around;
            }

            .button {
                border: solid #aaa 1px;
                border-radius: 1px;
                box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
                padding: 20px 50px;
                width: 50%;
                font-size: 20px;
                color: #222;
            }
        `;
        this.appendChild(style);
        const teamEl:HTMLButtonElement = this.querySelector("#team")!;
        const playerEl:HTMLButtonElement = this.querySelector("#player")!;
        teamEl.addEventListener("click", ()=>{
            Router.go("/team")
        });
        playerEl.addEventListener("click", ()=>{
            Router.go("/player")
        });
    }
};

customElements.define("player-page", PlayerPage);