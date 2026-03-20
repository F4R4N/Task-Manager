import { renderUserMenu } from "../userMenu/userMenu.js";
import { loadComponentCSS } from "../../js/utils/helper.js";


export async function renderUserNavbar(res) {
    const container = document.getElementById("navbarUser");

    if (res && res.ok) {
        const user = await res.json();
        renderUserMenu(container, user);
    } else {
        container.innerHTML = `
            <a class="btn login-btn" href="components/login/login.html">Login</a>
        `;
    }
}

export async function loadNavbar(res) {
    loadComponentCSS("navbar", "components/navbar/navbar.css");
    try {
        const response = await fetch('components/navbar/navbar.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
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

