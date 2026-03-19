import { fetchWithAuth, deleteTask } from "./api.js";

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
        const options = {
            method: "POST",
            body: JSON.stringify(data)
        }
        const res = await fetchWithAuth("/task/", options)
        console.log(res)
    }

}

export async function renderModal(action, taskId, status) {
    const modal = document.getElementById("modalOverlay");
    const actionBtn = modal.querySelector("#modalActionBtn");

    if (action === "delete") {
        modal.querySelector("#modalHeader").textContent = "Are you sure you want to delete this task?";
        const taskModal = modal.querySelector('.task-modal');
        taskModal.style.display = "none";
        actionBtn.textContent = action[0].toUpperCase() + action.slice(1);
        const confirmDeleteBtn = modal.querySelector("button");
        confirmDeleteBtn.dataset.id = taskId;
        confirmDeleteBtn.style.display = "block";
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
            actionBtn.textContent = action[0].toUpperCase() + action.slice(1);
            modal.querySelector(".task-modal").style.display = "block";

        }
    }

    modal.style.display = 'flex';
    modal.querySelector(".search-modal").style.display = "none !important";
    document.getElementById("modalActionBtn").style.display = "block";

}

export async function addCloseModalEventListeners() {
    const modal = document.getElementById("modalOverlay");
    const closeBtn = modal.querySelector("#closeBtn")
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}