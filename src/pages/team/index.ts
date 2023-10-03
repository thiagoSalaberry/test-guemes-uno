import {Router} from "@vaadin/router";
import { state } from "../../state";
import {rtdb} from "../../rtdb";
import {map} from "lodash";
type Player = {
    name:string,
    lastName:string,
    dni:string
};
class TeamPage extends HTMLElement {
    connectedCallback() {
        this.render();
    };
    name:string = "Nombre";
    lastName:string = "Apellido";
    dni:string = "DNI: 00.000.000";
    async render() {
        const allUsers = await state.getAllUsers();
        const currentState = state.getState();
        this.innerHTML = `
            <div class="home-container">
                <h1 class="title">Plantel</h1>
                <div class="players-list">
                    <div class="player"><div class="left">Nombre y Apellido</div><div class="right">DNI</div></div>
                        ${allUsers.map((player:Player)=>{
                            return `<div class="player"><div class="left">${player.name} ${player.lastName}</div><div class="right">${player.dni}</div></div>`}).join('')}
                </div>
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
            .players-list {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 2px;
                background-color: #eee;
            }
            .player {
                background-color: #fff;
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 5px;
            }
            .input-container {
                display: flex;
                flex-direction: column;
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

customElements.define("team-page", TeamPage);