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

export async function renderUserNavbar(res) {
    const container = document.getElementById("navbar-user");

    if (res.ok) {
        const user = await res.json();
        renderUserMenu(container, user);
    } else {
        container.innerHTML = `
            <a class="btn login-btn" href="login.html">Login</a>
        `;
    }
}

export async function loadNavbar(res) {
    loadCSS();
    try {
        const response = await fetch('components/navbar/navbar.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
        const hamburger = document.getElementById("hamburger-btn");
        const sideMenu = document.getElementById("side-menu");
        renderUserNavbar(res);
        hamburger.addEventListener("click", () => {
            if (sideMenu) sideMenu.classList.toggle("open");
        });

    } catch (err) {
        console.error("Failed to load navbar:", err);
    }
}

