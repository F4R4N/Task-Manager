import { fetchWithAuth } from "./api.js";

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

export async function renderModal(action, task, status) {
    const modal = document.getElementById("modalOverlay");
    
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
    const actionBtn = modal.querySelector("#modalActionBtn");
    actionBtn.dataset.action = action;

    if (action === "create") {
        modal.querySelector("#modalHeader").textContent = "Create Task"
        modal.querySelector('#statusSelect').value = status;
        actionBtn.textContent = action[0].toUpperCase() + action.slice(1);

    } else {

    }

    modal.style.display = 'flex';
    modal.querySelector(".task-modal").style.display = "block";
    modal.querySelector(".search-modal").style.display = "none";
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