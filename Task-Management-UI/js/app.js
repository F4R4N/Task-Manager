import { loadNavbar } from '../components/navbar/navbar.js';
import { loadSideMenu } from "../components/sideMenu/sideMenu.js";
import { renderAllTasks, showAddTaskButtons } from "../js/Tasks.js"
import { fetchWithAuth, deleteTask } from './api.js';
import { renderSearchModal } from './searchModal.js';
import { renderModal, readModalFields } from './mainModal.js';
import { closeTaskDetailModal } from './sideModal.js';

async function init() {
    const res = await fetchWithAuth("/auth/account");
    const appContainer = document.getElementById("app");
    await loadSideMenu(appContainer);
    await loadNavbar(res);
    await showAddTaskButtons(res);
    await renderAllTasks();
    await renderSearchModal();
    attachEventListeners();
}

function attachEventListeners() {
    const mainModal = document.getElementById("modalOverlay");
    const sideModal = document.getElementById("sideModal");

    document.addEventListener("click", (e) => {
        if (e.target.matches("#deleteBtn")) {
            renderModal("delete", e.target.dataset.id)
        }
        if (e.target.matches("#editBtn")) {
            renderModal("edit", e.target.dataset.id)
        }
        if (e.target.matches('.confirm-delete')) {
            deleteTask(e.target.dataset.id);
        }
        if (e.target.matches("#closeBtn")) {
            mainModal.style.display = 'none'
        }
        if (e.target.matches("#modalOverlay")) {
            mainModal.style.display = 'none'
        }
        if (e.target.matches("#sideModal")) {
            if (e.target === sideModal) {
                closeTaskDetailModal(sideModal);
            }
        }
        if (e.target.matches("#sideModalCloseBtn")) {
            closeTaskDetailModal(sideModal);
        }

    });
    document.addEventListener("submit", (e) => {
        if (e.target.matches("#taskForm")) {
            e.preventDefault();
            const id = document.getElementById("editBtn").dataset.id;
            readModalFields(mainModal, id);
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sideModal.classList.contains('is-visible')) {
            closeTaskDetailModal(sideModal);
        }
    });
}

init();
