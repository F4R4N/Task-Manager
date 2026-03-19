import { fetchTasks } from "../js/api.js";
import { capitalize, formatDate } from "../js/helper.js"
import { renderModal } from "../js/mainModal.js";
import { showDetailModal } from "../js/sideModal.js";


export function fillTaskData(task) {
    const template = document.getElementById("task-template");
    if (!template) return;

    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".card");
    const title = clone.querySelector(".card-title")
    title.textContent = task.title;
    title.title = task.title;
    clone.querySelector(".created-at").textContent = formatDate(task.created_at);

    const badge = clone.querySelector(".badge")
    badge.textContent = capitalize(task.priority);
    badge.classList.add("badge-" + task.priority);
    if (task.assignee != null) {
        clone.querySelector(".assignee-username").textContent = task.assignee.username;
        const assigneeProfilePic = clone.querySelector(".assignee-profile-pic")
        assigneeProfilePic.src = task.assignee.gravatar;
        assigneeProfilePic.alt = task.assignee.username + " profile"
    } else {
        clone.querySelector(".assignee").remove()
    }
    card.dataset.id = task.id;

    card.addEventListener("click", (e) => {
        showDetailModal(e.currentTarget.dataset.id);
    })
    return clone;
}

export async function addTaskCard(task) {
    const card = fillTaskData(task);

    const container = document.getElementById(task.status);
    container.querySelector(".cards").appendChild(card);
}

export async function renderTasks() {
    const tasks = await fetchTasks();
    tasks.forEach(task => addTaskCard(task));
}

export async function displayAddTask(res) {    
    const addTaskBtns = document.querySelectorAll(".add");
    if (!res.ok) {
        addTaskBtns.forEach(btn => {
            btn.style.display = "none";
        });
    } else {
        addTaskBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                renderModal("create", null, btn.dataset.status);
            })
        });
    }
}
