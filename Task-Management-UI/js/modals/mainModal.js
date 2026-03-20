import { fetchWithAuth, createTask, editTask } from "../api/api.js";
import { capitalize } from "../utils/helper.js";

export async function readModalFields(modal, id) {
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
    } else if (actionBtn.dataset.action === "edit") {
        editTask(id, data)
    }
}

function hideChildren(el) {
    el.classList.add("hide");
}

export async function renderModal(action, taskId, status) {
    const modal = document.getElementById("modalOverlay");
    const actionBtn = modal.querySelector("#modalActionBtn");
    actionBtn.dataset.action = action;
    actionBtn.textContent = capitalize(action);
    modal.style.display = 'flex';

    Array.from(modal.querySelector(".modal-content").children).forEach(child => {
        hideChildren(child);
    });

    if (action === "delete") {
        renderDeleteModal(modal, taskId);
    } else if (action === "search") {
        renderSearchModal(modal);
    } else {
        fillAssigneeSelect(modal);
        if (action === "create") {
            renderCreateModal(modal, status);
        } else if (action === "edit") {
            modal.querySelector("#modalHeader").textContent = "Edit Task";
            modal.querySelector(".task-modal").classList.remove("hide");
            const res = await fetchWithAuth(`/task/${taskId}`, { method: "GET" });
            const data = await res.json();
            fillEditForm(modal, data);
        }
    }
}

function fillEditForm(modal, data) {
    modal.querySelector("#title").value = data.title;
    modal.querySelector("#description").value = data.description;
    if (data.assignee !== null) {
        const assigneeSelect = modal.querySelector("#assigneeSelect");
        assigneeSelect.querySelector(`option[value="${data.assignee.id}"]`).selected = true;
    }
    const statusSelect = modal.querySelector("#statusSelect");
    statusSelect.querySelector(`option[value="${data.status}"]`).selected = true;
    const prioritySelect = modal.querySelector("#prioritySelect");
    prioritySelect.querySelector(`option[value="${data.priority}"]`).selected = true;
}

async function fillAssigneeSelect(modal) {
    const usersRes = await fetchWithAuth("/users");
    const users = await usersRes.json();
    const assigneesSelect = modal.querySelector("#assigneeSelect")
    assigneesSelect.innerHTML = "";
    users.unshift({ id: null, username: null, email: null })

    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id || "";
        option.textContent = `${user.username || "--"}${user.username ? ` (${user.email})` : ""}`;
        assigneesSelect.appendChild(option)
    });
}

function renderSearchModal(modal) {
    modal.querySelector("#modalHeader").textContent = "Search Task";
    modal.querySelector(".search-modal").classList.remove("hide");
    modal.querySelector("#searchInput").focus();
}

function renderDeleteModal(modal, taskId) {
    modal.querySelector("#modalHeader").textContent = "Are you sure you want to delete this task?";
    const confirmDeleteBtn = modal.querySelector("button");
    confirmDeleteBtn.dataset.id = taskId;
    confirmDeleteBtn.classList.remove("hide");
}

function renderCreateModal(modal, status) {
    clearModalInputs(modal);
    modal.querySelector("#modalHeader").textContent = "Create Task"
    modal.querySelector('#statusSelect').value = status;
    modal.querySelector(".task-modal").classList.remove("hide");
}

function clearModalInputs(modal) {
    modal.querySelector("#title").value = "";
    modal.querySelector("#description").value = "";

    const assigneeSelect = modal.querySelector("#assigneeSelect");
    assigneeSelect.querySelector('option:first-child').selected = true;
    
    const statusSelect = modal.querySelector("#statusSelect");
    statusSelect.querySelector('option[value="todo"]').selected = true;

    const prioritySelect = modal.querySelector("#prioritySelect");
    prioritySelect.querySelector('option[value="medium"]').selected = true;
}