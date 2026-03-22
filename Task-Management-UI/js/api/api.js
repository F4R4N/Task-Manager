const API_BASE = "http://backend.far-tmanager.runflare.run";
// const API_BASE = "http://127.0.0.1:8000";


export async function fetchTasks() {
    const response = await fetch(`${API_BASE}/task/`);
    return response.json();
}

export async function fetchTask(id) {
    const response = await fetch(`${API_BASE}/task/${id}`);
    return response.json();
}

export async function createTask(task) {
    const response = await fetchWithAuth('/task/', {
        method: "POST",
        body: JSON.stringify(task)
    });
    return response.json();
}

function getAccessToken() {
    return localStorage.getItem("access_token");
}

function setAccessToken(token) {
    localStorage.setItem("access_token", token);
}

function removeLocalStorageItem(item) {
    localStorage.removeItem(item);
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
            removeLocalStorageItem("access_token");
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
            const d = await res.json();
            console.warn("Logout request failed:", d);
        }

        removeLocalStorageItem("access_token");
        removeLocalStorageItem("user");
    } catch (err) {
        console.error("Error during logout:", err);
        removeLocalStorageItem("access_token");
        removeLocalStorageItem("user");
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

        setAccessToken(data.access);
        localStorage.setItem("user", JSON.stringify(data.user))

        return data;
    } catch (err) {
        throw err;
    }
}

export async function searchTask(input) {
    const response = await fetch(`${API_BASE}/task/?search=${input}`);
    const res = await response.json()
    return res;

}

export async function deleteTask(id) {
    const options = {
        method: "DELETE"
    }
    const res = await fetchWithAuth(`/task/${id}/`, options);
    return res;
}

export async function editTask(id, data) {
    const options = {
        method: "PUT",
        body: JSON.stringify(data)
    }
    const res = await fetchWithAuth(`/task/${id}/`, options);
    return res;
}
