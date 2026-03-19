import { loadNavbar } from '../components/navbar/navbar.js';
import { loadSideMenu } from "../components/sideMenu/sideMenu.js";
import { renderTasks, displayAddTask } from "../components/Tasks.js"
import { fetchWithAuth, deleteTask } from './api.js';
import { renderSearchModal } from './searchModal.js';
import { closeTaskDetailModal } from './taskDetailModal.js';
import { renderModal } from './taskModal.js';

async function init() {
    const res = await fetchWithAuth("/auth/account");
    const appContainer = document.getElementById("app");
    await loadSideMenu(appContainer);
    await loadNavbar(res);
    await displayAddTask(res);
    await renderTasks();
    await renderSearchModal();
    attachEventListeners();
}

function attachEventListeners() {
    const modal = document.getElementById("taskModal");

    document.addEventListener("click", (e) => {
        if (e.target.matches("#deleteBtn")) {
            console.log(modal)
            closeTaskDetailModal(modal);
            renderModal("delete", e.target.dataset.id)
        }
        if (e.target.matches('.confirm-delete')) {
            deleteTask(e.target.dataset.id);

        }
    });
}

init();
