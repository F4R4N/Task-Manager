import { logout } from "../../js/api.js";
function loadCSS() {
    if (!document.getElementById("user-menu")) {
        const link = document.createElement("link");
        link.id = "user-menu";
        link.rel = "stylesheet";
        link.href = "components/userMenu/userMenu.css";
        document.head.appendChild(link);
    }
}

export async function renderUserMenu(container, user) {
    loadCSS();
    try {
        const res = await fetch("components/userMenu/userMenu.html");
        const html = await res.text();

        container.innerHTML = html;

        const userMenu = container.querySelector("#user-menu");
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
        const logoutBtn = userMenu.querySelector("#logout-btn");
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            await logout();
            window.location.href = "login.html";
        });

    } catch (err) {
        console.error("Error loading user menu:", err);
    }
}