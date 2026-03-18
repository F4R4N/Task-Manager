import { searchTask } from "./api.js";
import { addCloseModalEventListeners } from "./taskModal.js";
async function renderSearchResults(results) {
    const searchModal = document.querySelector(".search-results");

}

async function openSearchModal() {
    const modal = document.getElementById("modalOverlay")
    modal.style.display = "flex";
    modal.querySelector(".task-modal").style.display = "none";
    modal.querySelector(".search-modal").style.display = "flex";
    document.getElementById("modalActionBtn").style.display = "none";
    const searchInput = document.getElementById("searchInput");
    
    searchInput.addEventListener("keyup", async (e) => {
        if (e.key === "Enter"){
            e.preventDefault();
            const results = await searchTask(searchInput.value);
            await renderSearchResults(results);
            
        }
    })
    addCloseModalEventListeners();
}

export async function renderSearchModal() {
    const searchBtn = document.getElementById("searchBtn")
    searchBtn.addEventListener("click", () => {
        openSearchModal();
    })
}
