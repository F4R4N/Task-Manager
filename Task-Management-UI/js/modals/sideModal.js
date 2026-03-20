import { fetchTask } from "../api/api.js";
import { capitalize, formatDateTime } from "../utils/helper.js";

export function closeTaskDetailModal(modal) {
    modal.classList.remove('is-visible');
    document.body.style.overflow = '';
}

function openSideModal(modal, taskData) {
    const modalTaskContent = document.getElementById("modalTaskContent");
    modalTaskContent.innerHTML = '';
    if (taskData) {
        modalTaskContent.innerHTML = `
                <h2 class="task-title">${taskData.title}</h2>
                <div class="task-detail-item">
                    <strong>Description:</strong>
                    <p>${taskData.description || 'N/A'}</p>
                </div>
                <div class="task-detail-item">
                    <strong>Assignee:</strong>
                    ${taskData.assignee
                ? `<span>
                            <img src="${taskData.assignee.gravatar}" alt="${taskData.assignee.username} Profile Picture" class="assignee-avatar"> 
                            ${taskData.assignee.username}
                           </span>`
                : '<span>N/A</span>'
            }
                </div>
                <div class="task-detail-item">
                    <strong>Priority:</strong>
                    <span class="badge badge-${taskData.priority}">${capitalize(taskData.priority)}</span>
                </div>
                <div class="task-detail-item">
                    <strong>Status:</strong>
                    <span>${(capitalize(taskData.status)).replace("_", " ")}</span>
                </div>
                <div class="task-detail-item">
                    <strong>Created:</strong>
                    <span>${formatDateTime(taskData.created_at)} (Last Updated at: ${formatDateTime(taskData.updated_at)})</span>
                </div>
            `;
    } else {
        modalTaskContent.innerHTML = '<p>Could not load task details.</p>';
    }

    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
}

export async function showDetailModal(taskId) {
    const sideModal = document.getElementById("sideModal");
    document.getElementById("modalOverlay").style.display = "none";
    sideModal.querySelector("#deleteBtn").dataset.id = taskId;
    sideModal.querySelector("#editBtn").dataset.id = taskId;

    const task = await fetchTask(taskId);
    openSideModal(sideModal, task);
    renderActionButtons(sideModal, task);
}

function renderActionButtons(modal, task) {
    const user = JSON.parse(localStorage.getItem("user"));
    const actionContainer = modal.querySelector(".action-container");
    if (user != null) {
        if (task.owner.id === user.id) {
            actionContainer.style.display = "flex";
        } else {
            actionContainer.style.display = "none";
        }
    } else {
        actionContainer.style.display = "none";
    }
}
