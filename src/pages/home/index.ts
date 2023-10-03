import {Router} from "@vaadin/router";
class HomePage extends HTMLElement {
    connectedCallback() {
        this.render();
    };
    render() {
        this.innerHTML = `
            <div class="home-container">
                <h1 class="title">BPMG</h1>
                <h2 class="subtitle">Bienvenido</h2>
                <div class="buttons-container">
                    <button class="button" id="signup">Registrarse</button>
                    <button class="button" id="login">Iniciar Sesión</button>
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

            .buttons-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 35px;
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
        const loginEl:HTMLButtonElement = this.querySelector("#login")!;
        signupEl.addEventListener("click", ()=>{
            Router.go("/signup");
        });
        loginEl.addEventListener("click", ()=>{
            Router.go("/login");
        });
    }
};

customElements.define("home-page", HomePage);