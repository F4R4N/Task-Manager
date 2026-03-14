import { loadNavbar, renderUserNavbar } from '../components/navbar/navbar.js';
import { loadSideMenu } from "../components/sideMenu/sideMenu.js";
import { renderTasks } from "../components/taskCard.js"
async function init() {
    const appContainer = document.getElementById("app");
    await loadSideMenu(appContainer);
    await loadNavbar();
    await renderUserNavbar();
    await renderTasks();
}

init();
