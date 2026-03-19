import { fetchTask } from "./api.js";
import { formatDateTime } from "./helper.js";

export function closeTaskDetailModal(modal) {
    modal.classList.remove('is-visible');
    document.body.style.overflow = '';
}

function openTaskModal(modal, taskData) {
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
                    <span class="badge badge-${taskData.priority}">${taskData.priority}</span>
                </div>
                <div class="task-detail-item">
                    <strong>Status:</strong>
                    <span>${(taskData.status[0].toUpperCase() + taskData.status.slice(1)).replace("_", " ")}</span>
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
    const modal = document.getElementById("sideModal");
    const closeButton = modal.querySelector(".close-btn");

    modal.querySelector("#deleteBtn").dataset.id = taskId;
    modal.querySelector("#editBtn").dataset.id = taskId;

    const task = await fetchTask(taskId);
    openTaskModal(modal, task);
    // action buttons configs
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
    closeButton.addEventListener("click", () => {
        closeTaskDetailModal(modal);
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeTaskDetailModal(modal);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains('is-visible')) {
            closeTaskDetailModal(modal);
        }
    });
}
