const heroSection = document.getElementById("heroSection");
const startedBtn = document.getElementById("startedBtn");
    startedBtn.addEventListener("click",() =>{
      heroSection.style.display = "none";
    })

// Variables pour les éléments
const experienceForm = document.getElementById("experience-form");
const experienceList = document.getElementById("experience-list");
const addExperienceButton = document.getElementById("add-experience");
// Fonction pour ajouter une nouvelle expérience
addExperienceButton.addEventListener("click", () => {
    // Récupérer les valeurs des champs
    const mission = document.getElementById("experience-mission").value;
    const sector = document.getElementById("experience-sector").value;
    const startDate = document.getElementById("experience-start-date").value;
    const endDate = document.getElementById("experience-end-date").value;
    const company = document.getElementById("experience-company").value;
    const location = document.getElementById("experience-location").value;
    const description = document.getElementById("experience-description").value;
    // Créer une nouvelle section d'expérience
    const experienceItem = document.createElement("div");
    experienceItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow");
    // Ajouter le contenu de l'expérience
    experienceItem.innerHTML = `
        <h3 class="text-lg font-semibold">${mission} - ${company}</h3>
        <p class="text-sm text-gray-600">${sector} | ${location}</p>
        <p class="text-sm text-gray-600">${startDate} - ${endDate}</p>
        <p class="mt-2 text-gray-800">${description}</p>
    `;
    // Ajouter l'expérience à la liste
    experienceList.appendChild(experienceItem);
    // Réinitialiser le formulaire
    experienceForm.reset();
});

