import { fetchTasks } from './api.js';
import { renderTasks } from './ui.js';
import { loadNavbar, renderUserNavbar } from '../components/navbar/navbar.js';

async function init() {
    await loadNavbar();
    await renderUserNavbar();
    const tasks = await fetchTasks();
    renderTasks(tasks);
}

init();