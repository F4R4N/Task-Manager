const API_BASE = "http://127.0.0.1:8000";

export async function fetchTasks() {
    const response = await fetch(`${API_BASE}/task/`);
    return response.json();
}

export async function fetchTask(id) {
    const response = await fetch(`${API_BASE}/task/${id}`);
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_BASE}/task/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return response.json();
}

function getAccessToken() {
    return localStorage.getItem("access_token");
}

function setAccessToken(token) {
    localStorage.setItem("access_token", token);
}

async function refreshAccessToken() {
    const res = await fetch(`${API_BASE}/auth/refresh/`, {
        method: "POST",
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Refresh token invalid");
    }

    const data = await res.json();
    setAccessToken(data.access);

    return data.access;
}

export async function fetchWithAuth(url, options = {}) {

    const accessToken = getAccessToken();

    options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    };

    let res = await fetch(`${API_BASE}${url}`, options);

    if (res.status === 401) {

        try {
            const newToken = await refreshAccessToken();

            options.headers["Authorization"] = `Bearer ${newToken}`;

            res = await fetch(`${API_BASE}${url}`, options);

        } catch (err) {
            localStorage.removeItem("access_token");
            
        }
    }

    return res;
}

export async function logout() {
    try {
        const res = await fetch(`${API_BASE}/auth/logout/`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            console.warn("Logout request failed:", res.status);
        }

        localStorage.removeItem("access_token");

    } catch (err) {
        console.error("Error during logout:", err);
        localStorage.removeItem("access_token");
    }
}

export async function login(username, password) {
    try {
        const res = await fetch(`${API_BASE}/auth/login/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || "Login failed");
        }

        localStorage.setItem("access_token", data.access);

        return data;
    } catch (err) {
        throw err;
    }
}

export async function searchTask(input){
    const response = await fetch(`${API_BASE}/task/?search=${input}`);
    const res = await response.json()
    return res;

}