import { fetchWithAuth } from "./api.js";

export async function renderModal(action, task, status) {
    const modal = document.getElementById("modalOverlay");
    const closeBtn = modal.querySelector("#closeBtn")

    const usersRes = await fetchWithAuth("/users");
    const users = await usersRes.json();
    const assigneesSelect = modal.querySelector("#assigneeSelect")
    assigneesSelect.innerHTML = "";
    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = `${user.username} (${user.email})`;

        assigneesSelect.appendChild(option)
    });
    actionBtn.addEventListener('click', () => {
        readModalFields();
    });
    if (action === "create") {
        modal.querySelector("#modalHeader").textContent = "Create Task"
        modal.querySelector('#statusSelect').value = status;
        const actionBtn = modal.querySelector("#modalActionBtn")
        actionBtn.textContent = action[0].toUpperCase() + action.slice(1);


    } else {

    }
    modalOverlay.style.display = 'flex';

    closeBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });
}