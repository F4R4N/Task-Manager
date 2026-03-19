import { searchTask } from "./api.js";
import { addCloseModalEventListeners } from "./taskModal.js";
import { fillTaskData } from "../components/Tasks.js";

async function addSearchResult(task) {
    const card = fillTaskData(task);

    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.appendChild(card);
}

async function renderSearchResults(results) {
    results.forEach(task => {
        addSearchResult(task);
    });
}

async function openSearchModal() {
    const modal = document.getElementById("modalOverlay")
    modal.style.display = "flex";
    modal.querySelector(".task-modal").style.display = "none";
    modal.querySelector(".search-modal").style.display = "flex";
    document.getElementById("modalActionBtn").style.display = "none";
}

export async function renderSearchModal() {
    addCloseModalEventListeners();
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            clearSearchResults();
            const results = await searchTask(searchInput.value);
            await renderSearchResults(results);

        }
    })
    const searchBtn = document.getElementById("searchBtn")
    searchBtn.addEventListener("click", () => {
        clearSearchResults();
        openSearchModal();
    })
}

function clearSearchResults() {
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.innerHTML = ``;

}
