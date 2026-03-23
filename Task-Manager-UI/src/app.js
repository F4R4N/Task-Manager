import { loadNavbar } from '/src/components/navbar/navbar.js';
import { loadSideMenu } from "/src/components/sideMenu/sideMenu.js";
import { renderAllTasks, showAddTaskButtons } from "/src/tasks/tasks.js"
import { fetchWithAuth } from '/src/api/api.js';
import { renderSearchModal } from '/src/modals/searchModal.js';
import { attachEventListeners } from '/src/utils/events.js';

async function init() {
    const appContainer = document.getElementById("app");
    loadSideMenu(appContainer);
    attachEventListeners();
    try{
        const res = await fetchWithAuth("/auth/account");
        loadNavbar(res);
        showAddTaskButtons(res);
    } catch (e){
        loadNavbar();
        showAddTaskButtons();
    }
    renderAllTasks();
    renderSearchModal();
}

init();
