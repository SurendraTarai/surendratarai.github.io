const username = "SurendraTarai"; // Change to your GitHub username
const container = document.getElementById("repo-container");

async function fetchRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await res.json();

    // Sort by most recently updated
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    container.innerHTML = "";

    repos.forEach(repo => {
      if (repo.fork) return; // skip forks if desired

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <p>⭐ ${repo.stargazers_count}</p>
        <a href="${repo.html_url}" target="_blank">View Project</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = "<p>Failed to load projects.</p>";
    console.error(error);
  }
}

fetchRepos();