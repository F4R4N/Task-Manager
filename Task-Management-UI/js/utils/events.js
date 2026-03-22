
import { renderModal, readModalFields } from '../modals/mainModal.js';
import { closeTaskDetailModal } from '../modals/sideModal.js';
import { deleteTask } from '../api/api.js';

export function attachEventListeners() {
    const mainModal = document.getElementById("modalOverlay");
    const sideModal = document.getElementById("sideModal");

    document.addEventListener("click", async (e) => {
        if (e.target.matches("#deleteBtn")) {
            renderModal("delete", e.target.dataset.id)
        }
        if (e.target.matches("#editBtn")) {
            renderModal("edit", e.target.dataset.id)
        }
        if (e.target.matches('.confirm-delete')) {
            const confirmDeleteBtn = document.querySelector(".confirm-delete")
            confirmDeleteBtn.disabled = true;
            await deleteTask(e.target.dataset.id);
            confirmDeleteBtn.disabled = false;
            window.location.href = "index.html";
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
            const actionBtn = document.getElementById("modalActionBtn");
            actionBtn.disabled = true;
            const id = document.getElementById("editBtn").dataset.id;
            readModalFields(mainModal, id);
            actionBtn.disabled = false;
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sideModal.classList.contains('is-visible')) {
            closeTaskDetailModal(sideModal);
        }
    });
}
