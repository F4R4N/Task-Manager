import { fetchTasks } from "../js/api.js";
import { capitalize, formatDate } from "../js/helper.js"
import { renderModal } from "../js/mainModal.js";
import { showDetailModal } from "../js/sideModal.js";


export function createTaskCard(task) {
    const template = document.getElementById("task-template");
    if (!template) return;
    // create clone of the template
    const clone = template.content.cloneNode(true);
    // fill title data
    const title = clone.querySelector(".card-title");
    title.textContent = task.title;
    title.title = task.title;
    // fill created at data
    clone.querySelector(".created-at").textContent = formatDate(task.created_at);
    // fill badge data
    const badge = clone.querySelector(".badge")
    badge.textContent = capitalize(task.priority);
    badge.classList.add("badge-" + task.priority);
    // fill assignee data
    if (task.assignee != null) {
        clone.querySelector(".assignee-username").textContent = task.assignee.username;
        const assigneeProfilePic = clone.querySelector(".assignee-profile-pic")
        assigneeProfilePic.src = task.assignee.gravatar;
        assigneeProfilePic.alt = task.assignee.username + " profile"
    } else {
        clone.querySelector(".assignee").remove()
    }

    const card = clone.querySelector(".card");
    card.dataset.id = task.id;
    card.addEventListener("click", (e) => {
        showDetailModal(e.currentTarget.dataset.id);
    });

    return clone;
}

function addCardToContainers(task) {
    const card = createTaskCard(task);

    const container = document.getElementById(task.status);
    container.querySelector(".cards").appendChild(card);
}

export async function renderAllTasks() {
    const tasks = await fetchTasks();
    tasks.forEach(task => addCardToContainers(task));
}

export async function showAddTaskButtons(res) {    
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
