import { loadComponentCSS } from "../../js/utils/helper.js";


export async function loadSideMenu(container) {
    loadComponentCSS("sideMenuStyle", "components/sideMenu/sideMenu.css");
    try {
        const res = await fetch("components/sideMenu/sideMenu.html");
        const html = await res.text();
        container.insertAdjacentHTML("afterbegin", html);

    } catch (err) {
        console.error("Failed to load side menu:", err);
    }
}