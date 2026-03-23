import { loadComponentCSS } from "/src/utils/helper.js";


export async function loadSideMenu(container) {
    loadComponentCSS("sideMenuStyle", "/src/components/sideMenu/sideMenu.css");
    try {
        const res = await fetch("/src/components/sideMenu/sideMenu.html");
        const html = await res.text();
        container.insertAdjacentHTML("afterbegin", html);

    } catch (err) {
        console.error("Failed to load side menu:", err);
    }
}