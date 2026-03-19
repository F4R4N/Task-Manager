import { searchTask } from "./api.js";
import { renderModal } from "./mainModal.js";
import { createTaskCard } from "../components/Tasks.js";

async function addSearchResult(task) {
    const card = createTaskCard(task);
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.appendChild(card);
}

async function renderSearchResults(results) {
    if (results.length === 0) {
    const resultsContainer = document.querySelector(".search-results");
    const p = document.createElement("p");
    p.textContent = "No results";
    p.classList.add("no-results")
        resultsContainer.appendChild(p);
    }
    results.forEach(task => {
        addSearchResult(task);
    });
}

export async function renderSearchModal() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            clearSearchResults();
            const results = await searchTask(searchInput.value);
            renderSearchResults(results);
        }
    })
    const searchBtn = document.getElementById("searchBtn")
    searchBtn.addEventListener("click", () => {
        clearSearchResults();
        renderModal("search");
    })
}

function clearSearchResults() {
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.innerHTML = ``;

}
