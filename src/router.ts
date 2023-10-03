import {Router} from "@vaadin/router";
const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "home-page"},
    {path: "/signup", component: "signup-page"},
    {path: "/login", component: "login-page"},
    {path: "/home", component: "home-page"},
    {path: "/player", component: "player-page"},
    {path: "/team", component: "team-page"},
])