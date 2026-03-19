import { fetchWithAuth, createTask } from "./api.js";
import { capitalize } from "./helper.js";

export async function readModalFields(modal) {
    const actionBtn = modal.querySelector("#modalActionBtn");
    const data = {
        "title": modal.querySelector("#title").value,
        "description": modal.querySelector("#description").value,
        "status": modal.querySelector("#statusSelect").value,
        "priority": modal.querySelector("#prioritySelect").value,
        "assignee_id": modal.querySelector("#assigneeSelect").value
    }
    if (actionBtn.dataset.action === "create") {
        createTask(data);
    }
}

function hideChildren(el) {
    el.classList.add("hide");
}

export async function renderModal(action, taskId, status) {
    const modal = document.getElementById("modalOverlay");
    const actionBtn = modal.querySelector("#modalActionBtn");
    modal.style.display = 'flex';

    Array.from(modal.querySelector(".modal-content").children).forEach(child => {
        hideChildren(child);
    });

    if (action === "delete") {
        modal.querySelector("#modalHeader").textContent = "Are you sure you want to delete this task?";
        const confirmDeleteBtn = modal.querySelector("button");
        confirmDeleteBtn.dataset.id = taskId;
        confirmDeleteBtn.classList.remove("hide");
    } else if (action === "search") {
        modal.querySelector("#modalHeader").textContent = "Search Task";
        modal.querySelector(".search-modal").classList.remove("hide");
        modal.querySelector("#searchInput").focus();
    } else {
        const usersRes = await fetchWithAuth("/users");
        const users = await usersRes.json();
        const assigneesSelect = modal.querySelector("#assigneeSelect")
        assigneesSelect.innerHTML = "";
        users.unshift({ id: null, username: null, email: null })
        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id || "";
            option.textContent = `${user.username || "--"} ${user.username ? `(${user.email})` : ""}`;
            assigneesSelect.appendChild(option)
        });
        actionBtn.dataset.action = action;
        if (action === "create") {
            modal.querySelector("#modalHeader").textContent = "Create Task"
            modal.querySelector('#statusSelect').value = status;
            actionBtn.textContent = capitalize(action);
            modal.querySelector(".task-modal").classList.remove("hide");
        }
    }

    document.getElementById("modalActionBtn").style.display = "block";

}
