import { loadNavbar, renderUserNavbar } from '../components/navbar/navbar.js';
import { loadSideMenu } from "../components/sideMenu/sideMenu.js";

async function init() {
    const appContainer = document.getElementById("app");
    await loadSideMenu(appContainer);
    await loadNavbar();
    await renderUserNavbar();

}

init();