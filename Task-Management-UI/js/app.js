import { loadNavbar } from '../components/navbar/navbar.js';
import { loadSideMenu } from "../components/sideMenu/sideMenu.js";
import { renderTasks, displayAddTask } from "../components/Tasks.js"
import { fetchWithAuth } from './api.js';

async function init() {
    const res = await fetchWithAuth("/auth/account");
    const appContainer = document.getElementById("app");
    await loadSideMenu(appContainer);
    await loadNavbar(res);
    await displayAddTask(res);
    await renderTasks();
}

init();
