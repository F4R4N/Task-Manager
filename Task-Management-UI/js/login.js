import { login } from "./api.js";

const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await login(username, password);
        window.location.href = "index.html";

    } catch (err) {
        errorMsg.textContent = err.message || "An error occurred. Please try again.";
    }
});

