document.addEventListener("DOMContentLoaded", function () {
  const projectLinks = document.querySelectorAll(".project-link");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const projectDetailsSection = document.getElementById("projectDetails");
  const projectContentContainer = document.getElementById("projectContent");
  const backButton = document.getElementById("backButton");
  const closeButton = document.querySelector(".close-button");
  const grid = document.querySelector(".grid");
  const menuToggle = document.getElementById("menuToggle");
  const retourButton = document.getElementById("retourButton");

  if (grid) {
    document.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;
      grid.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  }

  function closeModal() {
    if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  }

  async function loadProjectContent(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("Erreur lors du chargement du projet.");
      projectContentContainer.innerHTML = await response.text();
      projectDetailsSection.style.display = "block";
      projectDetailsSection.scrollIntoView({ behavior: "smooth" });

      const projectsSection = document.querySelector(".projects");
      if (projectsSection) projectsSection.style.display = "none";
    } catch (error) {
      console.error(error);
      modalTitle.textContent = "Erreur";
      modalDescription.textContent = "Impossible de charger le projet.";
      modal.style.display = "block";
    }
  }

  projectLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      if (link.href.includes("canva.com")) return;

      e.preventDefault();
      e.stopPropagation();

      const projectItem = this.closest(".project-item");
      if (!projectItem) return;

      const title = projectItem.getAttribute("data-title");
      const filePath = projectItem.getAttribute("data-file");

      if (["Projet 1", "Projet 2", "Projet 3", "Mon Jeu"].includes(title) && filePath) {
        window.location.href = filePath;
      } else if (filePath) {
        loadProjectContent(filePath);
      } else {
        modalTitle.textContent = title || "Titre inconnu";
        modalDescription.textContent = projectItem.getAttribute("data-description") || "Pas de description disponible.";
        modal.style.display = "block";
      }
    });
  });

  if (backButton) {
    backButton.addEventListener("click", function () {
      projectDetailsSection.style.display = "none";
      projectContentContainer.innerHTML = "";
      const projectsSection = document.querySelector(".projects");
      if (projectsSection) {
        projectsSection.style.display = "block";
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (closeButton) closeButton.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.querySelector("nav")?.classList.toggle("active");
    });
  }

  if (retourButton) {
    retourButton.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
});

function toggleDetails(btn) {
  const card = btn.closest(".affiche-card");
  const details = card?.querySelector(".affiche-details");

  if (details) {
    details.classList.toggle("show");
    btn.textContent = details.classList.contains("show") ? "Moins" : "Plus";
  } else {
    console.error("Élément .affiche-details non trouvé !");
  }
}



