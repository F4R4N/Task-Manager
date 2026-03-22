import { login } from "../../js/api/api.js";

const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = loginForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await login(username, password);
        window.location.href = "../../index.html";

    } catch (err) {
        errorMsg.textContent = err.message || "An error occurred. Please try again.";
        submitBtn.disabled = false;
    }
});

