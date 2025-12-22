import { getAnime, addAnime, updateAnime, deleteAnime } from "./api.js";

/* ===================== AUTH GUARD ===================== */
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

/* ===================== DOM REFERENCES ===================== */
const animeList = document.getElementById("animeList");
const searchResults = document.getElementById("searchResults");
const animeForm = document.getElementById("animeForm");
const titleInput = document.getElementById("title");
const seasonInput = document.getElementById("season");
const episodeInput = document.getElementById("episode");
const statusInput = document.getElementById("status");
const sortSelect = document.getElementById("sort");
const tabs = document.querySelectorAll(".tab");
const logoutBtn = document.getElementById("logout");
const searchInput = document.getElementById("search");

let currentTab = "watching";
let currentSearch = "";
let cache = [];

/* ===================== TAB SWITCH ===================== */
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    renderLists();
  });
});

/* ===================== FETCH + CACHE ===================== */
async function loadAnime() {
  cache = await getAnime();
}

/* ===================== RENDER HELPERS ===================== */
function createAnimeLi(a) {
  const li = document.createElement("li");

  const totalEps = (a.season || 1) * 24;
  const progress = Math.max(
    0,
    Math.min(100, Math.round((a.episode / totalEps) * 100))
  );

  li.innerHTML = `
    <div class="card-left">
      <div class="anime-title">${a.title}</div>
      <div class="anime-time">${new Date(a.updated_at).toLocaleString()}</div>
    </div>
    <div class="card-right">
      <div class="card-ep-block">
        <span class="anime-ep">S${a.season} • EP ${a.episode}</span>
        <div class="card-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%;"></div>
          </div>
          <span class="progress-text">${a.episode} eps • ${progress}%</span>
        </div>
      </div>

      <div class="card-controls">
        <button class="ep-minus">-</button>
        <button class="ep-plus">+</button>

        <select class="status">
          <option value="watching" ${a.status === "watching" ? "selected" : ""}>Watching</option>
          <option value="completed" ${a.status === "completed" ? "selected" : ""}>Completed</option>
          <option value="paused" ${a.status === "paused" ? "selected" : ""}>On Hold</option>
        </select>

        <button class="danger">X</button>
      </div>
    </div>
  `;

  // - EPISODE BUTTON
  li.querySelector(".ep-minus").addEventListener("click", async () => {
    const nextEp = Math.max(0, a.episode - 1);
    if (nextEp === a.episode) return;
    await updateAnime(a.id, { episode: nextEp });
    await refresh();
  });

  // + EPISODE BUTTON
  li.querySelector(".ep-plus").addEventListener("click", async () => {
    await updateAnime(a.id, { episode: a.episode + 1 });
    await refresh();
  });

  // STATUS DROPDOWN
  li.querySelector(".status").addEventListener("change", async (e) => {
    await updateAnime(a.id, { status: e.target.value });
    await refresh();
  });

  // DELETE
  li.querySelector(".danger").addEventListener("click", async () => {
    if (confirm("Delete this anime?")) {
      await deleteAnime(a.id);
      await refresh();
    }
  });

  return li;
}

/* ===================== RENDER SEARCH + TABS ===================== */
function renderLists() {
  // sort once based on cache
  let sorted = [...cache];

  if (sortSelect.value === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  // SEARCH RESULTS (all statuses)
  searchResults.innerHTML = "";
  if (currentSearch.trim() !== "") {
    const q = currentSearch.toLowerCase();
    const matches = sorted.filter((a) =>
      a.title.toLowerCase().includes(q)
    );

    matches.forEach((a) => {
      const li = createAnimeLi(a);
      searchResults.appendChild(li);
    });
  }

  // TABBED LIST (by status, not affected by search)
  animeList.innerHTML = "";
  const tabAnime = sorted.filter((a) => a.status === currentTab);
  
  if (tabAnime.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent =
      currentTab === "watching"
        ? "No anime in Watching yet."
        : currentTab === "completed"
        ? "No anime in Completed yet."
        : "No anime On Hold yet.";
    animeList.appendChild(empty);
    return;
  }
  
  tabAnime.forEach((a) => {
    const li = createAnimeLi(a);
    animeList.appendChild(li);
  });
}

/* ===================== REFRESH FLOW ===================== */
async function refresh() {
  await loadAnime();
  renderLists();
}

/* ===================== ADD ANIME ===================== */
animeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addAnime({
    title: titleInput.value,
    season: Number(seasonInput.value),
    episode: Number(episodeInput.value),
    status: statusInput.value,
  });

  animeForm.reset();
  await refresh();
});

/* ===================== SORT ===================== */
sortSelect.addEventListener("change", () => {
  renderLists();
});

/* ===================== SEARCH ===================== */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    renderLists();
  });
}

/* ===================== LOGOUT ===================== */
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

/* ===================== INIT ===================== */
refresh();
