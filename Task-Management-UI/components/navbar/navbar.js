import { fetchWithAuth } from "../../js/api.js";

export async function loadNavbar() {
    try {
        const response = await fetch('components/navbar/navbar.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
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

        container.innerHTML = `
            <a class="user-info">
                <img src="${user.gravatar}" class="avatar">
                <span class="username">${user.username}</span>
            </a>
        `;

    } catch (err) {

        container.innerHTML = `
            <a class="login-btn" href="login.html">Login</a>
        `;
    }
}