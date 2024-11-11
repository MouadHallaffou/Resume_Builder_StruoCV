const heroSection = document.getElementById("heroSection");
const startedBtn = document.getElementById("startedBtn");
const formulaire = document.getElementById("formulaire");
    startedBtn.addEventListener("click",() =>{
      heroSection.style.display = "none";
      formulaire.style.display="block";
    })

// Sélection des éléments du formulaire et de la barre de progression
const progressBar = document.getElementById("progress-bar");

// Sélection des étapes du formulaire dans un tableau
const forms = [
  document.getElementById("step-1"),
  document.getElementById("step-2"),
  document.getElementById("step-3"),
  document.getElementById("step-4"),
  document.getElementById("step-5"),
  document.getElementById("step-6")
];

// Sélection des indicateurs de progression affichés dans l'interface
const steppers = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
  document.getElementById("step4"),
  document.getElementById("step5"),
  document.getElementById("step6")
];

// Définition des styles pour les étapes actives et no active
const activeStepStyle = "flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const inactiveStepStyle = "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";

// Initialisation du compteur d'étape
let currentStep = 0;

// Fonction pour mettre à jour la barre de progression et les étapes visuelles
const updateProgressBar = () => {
  const progressPercentage = ((currentStep + 1) / forms.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Mettre à jour les styles des steppers
  steppers.forEach((step, index) => {
    step.className = index <= currentStep ? activeStepStyle : inactiveStepStyle;
  });
};

// Fonction pour afficher une étape spécifique
const showStep = (index) => {
  forms.forEach((form, idx) => {
    form.style.display = idx === index ? "block" : "none";
  });
};

// Fonction pour passer à l'étape suivante
const Suivantstep = () => {
  if (currentStep < forms.length - 1) {
    currentStep++;
    showStep(currentStep);
    updateProgressBar();
  }
};

// Fonction pour revenir à l'étape précédente
const precedentStep = () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
    updateProgressBar();
  }
};

// Ajout des écouteurs d'événements pour les boutons "Suivant" et "Précédent"
document.getElementById("nextBtnInfo").addEventListener("click", Suivantstep);
document.getElementById("nextBtnExp").addEventListener("click", Suivantstep);
document.getElementById("nextBtnDiplomes").addEventListener("click", Suivantstep);
document.getElementById("nextBtnCertificats").addEventListener("click", Suivantstep);
document.getElementById("nextBtnCompetences").addEventListener("click", Suivantstep);

document.getElementById("prevBtnExp").addEventListener("click", precedentStep);
document.getElementById("prevBtnDiplomes").addEventListener("click", precedentStep);
document.getElementById("prevBtnCertificats").addEventListener("click", precedentStep);
document.getElementById("prevBtnCompetances").addEventListener("click", precedentStep);
document.getElementById("prevBtnLangues").addEventListener("click", precedentStep);

// Initialisation : afficher la première étape et mettre à jour la barre de progression
showStep(currentStep);
updateProgressBar();


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
        <button type="button" class="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-600 remove-experience">remove</button>
    `;

    experienceList.appendChild(experienceItem);
    
    const removeButton = experienceItem.querySelector(".remove-experience");
    removeButton.addEventListener("click", () => {
        experienceList.removeChild(experienceItem); 
    });

    experienceForm.reset();
});


const diplomesFormContainer = document.getElementById("diplomes-form-container");
const addDiplomesButton = document.getElementById("add-diplome-button");


function addDiplomesForm() {
    const diplomesItem = document.createElement("div");
    diplomesItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow", "space-y-2");

    
    diplomesItem.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-800">Nouveau Diplôme</h3>
            <button type="button" class="remove-diplomes text-red-600 hover:text-red-800 text-lg font-semibold">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Nom du diplôme</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="licence, master ...">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Spécialité</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Informatique, Gestion ...">
            </label>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Date de début</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Date de fin</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200">
            </label>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Université</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Hassan II, Mohammed IV">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Ville</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Casa, Rabat ...">
            </label>
        </div>
        <div class="flex">
            <label class="w-full">
                <span class="text-gray-700">Description</span>
                <textarea class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" rows="3" placeholder="Apropos de votre formation..."></textarea>
            </label>
        </div>
    `;

    diplomesItem.querySelector(".remove-diplomes").addEventListener("click", () => {
        diplomesFormContainer.removeChild(diplomesItem);
    });
 
    diplomesFormContainer.appendChild(diplomesItem);
}

addDiplomesButton.addEventListener("click", (e) => {
    e.preventDefault();  
    addDiplomesForm();    
});

const certificateFormContainer = document.getElementById("certificate-form-container");
const addCertificateButton = document.getElementById("add-certificate-button");

function addCertificateForm() {
    const certificateItem = document.createElement("div");
    certificateItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow", "space-y-2");
    certificateItem.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-800">Nouveau Certificat</h3>
            <button type="button" class="remove-certificate text-red-600 hover:text-red-800 text-lg font-semibold">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Nom du certificat</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Certificat en Gestion, en developpement">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Organisme dilivre</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="YouCode, Coursera ,Google ...">
            </label>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Date de début</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Date de fin</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200">
            </label>
        </div>
    `;
    certificateItem.querySelector(".remove-certificate").addEventListener("click", () => {
        certificateFormContainer.removeChild(certificateItem);
    });

    certificateFormContainer.appendChild(certificateItem);
}
addCertificateButton.addEventListener("click", (e) => {
    e.preventDefault();  
    addCertificateForm(); 
});

const btnAadSoftSkills = document.getElementById('btnAadSoftSkills');
const btnAadHardSkills = document.getElementById('btnAadHardSkills');
const softSkillInputsValue = document.getElementById('softSkillInputsValue');
const hardSkillInputsValue = document.getElementById('hardSkillInputsValue');

// Tableaux pour stocker les compétences
const arrayHardSkills = [];
const arraySoftSkills = [];

btnAadSoftSkills.addEventListener('click', () => {
  const softSkill = softSkillInputsValue.value.trim();

  if (softSkill) {
    arraySoftSkills.push(softSkill);

    softSkillInputsValue.value = '';
    const softItem = document.createElement('li');
    softItem.classList.add('flex', 'items-center', 'text-lg', 'font-medium', 'text-gray-700');
    softItem.innerHTML = `
      <span>${softSkill}</span>
      <button class="ml-4 text-red-500" onclick="deleteItem(this, 'softSkillsList', arraySoftSkills)">Supprimer</button>
    `;

    document.getElementById('softSkillsList').appendChild(softItem);
  }
});

btnAadHardSkills.addEventListener('click', () => {
  const hardSkill = hardSkillInputsValue.value.trim();
  if (hardSkill) {
    arrayHardSkills.push(hardSkill);
    hardSkillInputsValue.value = '';
    const hardItem = document.createElement('li');
    hardItem.classList.add('flex', 'items-center', 'text-lg', 'font-medium', 'text-gray-700');
    hardItem.innerHTML = `
      <span>${hardSkill}</span>
      <button class="ml-4 text-red-500" onclick="deleteItem(this, 'hardSkillsList', arrayHardSkills)">Supprimer</button>
    `;
    document.getElementById('hardSkillsList').appendChild(hardItem);
  }
});

function deleteItem(button, listId, array) {
  const item = button.parentElement;
  const itemText = item.querySelector('span').textContent;

  document.getElementById(listId).removeChild(item);

  const index = array.indexOf(itemText);
  if (index > -1) {
    array.splice(index, 1);
  }
}

