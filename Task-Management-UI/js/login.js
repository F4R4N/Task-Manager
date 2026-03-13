const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://127.0.0.1:8000/auth/login/", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("access_token", data.access);
            window.location.href = "index.html";
        } else {
            errorMsg.textContent = data.detail || "Login failed";
        }

    } catch (err) {
        console.error(err);
        errorMsg.textContent = "An error occurred. Please try again.";
    }
});
