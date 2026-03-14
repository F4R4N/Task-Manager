import { fetchWithAuth } from "../../js/api.js";
import { renderUserMenu } from "../userMenu/userMenu.js";

function loadCSS() {
    if (!document.getElementById("navbar")) {
        const link = document.createElement("link");
        link.id = "navbar";
        link.rel = "stylesheet";
        link.href = "components/navbar/navbar.css";
        document.head.appendChild(link);
    }
}

export async function loadNavbar() {
    loadCSS();
    try {
        const response = await fetch('components/navbar/navbar.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
        const hamburger = document.getElementById("hamburger-btn");
        const sideMenu = document.getElementById("side-menu");

        hamburger.addEventListener("click", () => {
            if (sideMenu) sideMenu.classList.toggle("open");
        });

    } catch (err) {
        console.error("Failed to load navbar:", err);
    }
}

export async function renderUserNavbar() {

    const container = document.getElementById("navbar-user");

    try {
        const res = await fetchWithAuth("/auth/account");

        if (!res.ok) {
            throw new Error("Not authenticated");
        }

        const user = await res.json();

        renderUserMenu(container, user);

    } catch (err) {

        container.innerHTML = `
            <a class="login-btn" href="login.html">Login</a>
        `;
    }
}