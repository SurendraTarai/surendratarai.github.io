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

      const updatedAt = new Date(repo.updated_at).toLocaleDateString();
      const createdAt = new Date(repo.created_at).toLocaleDateString();
      const licenseName = repo.license ? repo.license.name : "No license";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <ul>
          <li><strong>Language:</strong> ${repo.language || "N/A"}</li>
          <li><strong>Stars:</strong> ${repo.stargazers_count}</li>
          <li><strong>Forks:</strong> ${repo.forks_count}</li>
          <li><strong>Open Issues:</strong> ${repo.open_issues_count}</li>
          <li><strong>Watchers:</strong> ${repo.watchers_count}</li>
          <li><strong>License:</strong> ${licenseName}</li>
          <li><strong>Created:</strong> ${createdAt}</li>
          <li><strong>Updated:</strong> ${updatedAt}</li>
        </ul>
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