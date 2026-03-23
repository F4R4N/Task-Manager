import "./sideMenu.css"

const sideMenuHtmlString = `
    <div id="sideMenu" class="side-menu">
        <div class="menu">
            <ul>
                <li><a href="/index.html">Tasks</a></li>
            </ul>
        </div>
    </div>
`;

export async function loadSideMenu(container) {
    try {
        container.insertAdjacentHTML('afterbegin', sideMenuHtmlString);
    } catch (err) {
        console.error("Failed to load side menu:", err);
    }
}