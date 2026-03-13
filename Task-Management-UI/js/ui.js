export function renderTasks(tasks) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
    `;
        app.appendChild(taskDiv);
    });
}