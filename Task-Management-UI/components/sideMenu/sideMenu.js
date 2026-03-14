function loadCSS() {
    if (!document.getElementById("side-menu-css")) {
        const link = document.createElement("link");
        link.id = "side-menu-css";
        link.rel = "stylesheet";
        link.href = "components/sideMenu/sideMenu.css";
        document.head.appendChild(link);
    }
}

export async function loadSideMenu(container) {
    loadCSS();
    try {
        const res = await fetch("components/sideMenu/sideMenu.html");
        const html = await res.text();
        container.insertAdjacentHTML("afterbegin", html);

    } catch (err) {
        console.error("Failed to load side menu:", err);
    }
}