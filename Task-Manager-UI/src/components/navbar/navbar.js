import { renderUserMenu } from "/src/components/userMenu/userMenu.js";
import "./navbar.css"

const navbarHtmlString = `
    <nav class="navbar" id="navbar">
        <button id="hamburgerBtn" class="hamburger" aria-label="Toggle sidebar">☰</button>
        <a class="logo-container" href="/index.html">
            <img class="logo" src="/assets/images/Logo.png" alt="Logo">
        </a>
        <div id="navbarUser"></div>
    </nav>
`;

export async function renderUserNavbar(res) {
    const container = document.getElementById("navbarUser");

    if (res && res.ok) {
        const user = await res.json();
        renderUserMenu(container, user);
    } else {
        container.innerHTML = `
            <a class="btn login-btn" href="/login.html">Login</a>
        `;
    }
}

export async function loadNavbar(res) {
    try {
        document.body.insertAdjacentHTML('afterbegin', navbarHtmlString);
        const hamburger = document.getElementById("hamburgerBtn");
        const sideMenu = document.getElementById("sideMenu");
        renderUserNavbar(res);
        hamburger.addEventListener("click", () => {
            if (sideMenu) sideMenu.classList.toggle("open");
        });

    } catch (err) {
        console.error("Failed to load navbar:", err);
    }
}

