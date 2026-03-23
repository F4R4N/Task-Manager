import { logout } from "/src/api/api.js";
import './userMenu.css';

const userMenuHtml = `
    <div class="user-info" id="userMenu">
        <div class="user-toggle">
            <img src="" class="avatar">
            <span class="username"></span>
        </div>
        <div class="user-dropdown">
            <a href="#" id="logoutBtn" class="no-pico btn">Logout</a>
        </div>
    </div>
`;

export async function renderUserMenu(container, user) {
    try {
        container.innerHTML = userMenuHtml;

        const userMenu = container.querySelector("#userMenu");
        const avatar = userMenu.querySelector(".avatar");
        const username = userMenu.querySelector(".username");

        avatar.src = user.gravatar;
        username.textContent = user.username;

        userMenu.addEventListener("click", (e) => {
            e.preventDefault();
            userMenu.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!userMenu.contains(e.target)) {
                userMenu.classList.remove("active");
            }
        });

        // Logout
        const logoutBtn = userMenu.querySelector("#logoutBtn");
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            await logout();
            window.location.href = "index.html";
        });

    } catch (err) {
        console.error("Error loading user menu:", err);
    }
}