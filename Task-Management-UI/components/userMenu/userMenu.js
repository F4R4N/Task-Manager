import { logout } from "../../js/api/api.js";
import { loadComponentCSS } from "../../js/utils/helper.js";

export async function renderUserMenu(container, user) {
    loadComponentCSS("userMenuStyle", "components/userMenu/userMenu.css")
    try {
        const res = await fetch("components/userMenu/userMenu.html");
        const html = await res.text();

        container.innerHTML = html;

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