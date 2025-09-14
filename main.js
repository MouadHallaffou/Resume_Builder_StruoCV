// page principale de la platforme
const heroSection = document.getElementById("heroSection");
const startedBtn = document.getElementById("startedBtn");
const formulaire = document.getElementById("formulaire");

// Fonction pour corriger les erreurs d'affichage
function hideAllErrors() {
  const errorElements = document.querySelectorAll('[id$="Error"]');
  errorElements.forEach((element) => {
    element.classList.add("hidden");
  });
}

startedBtn.addEventListener("click", (e) => {
  e.preventDefault();
  heroSection.style.display = "none";
  formulaire.style.display = "flex";
  hideAllErrors();
});

/**
 * Gestion de la validation du formulaire et de la navigation entre les étapes
 * Ce code est utilisé pour un formulaire multi-étapes avec des validations spécifiques pour chaque champ.
 */

// Sélection de la barre de progression
const progressBar = document.getElementById("progress-bar");

// Sélection des étapes du formulaire dans un tableau
const forms = [
  document.getElementById("step-1"),
  document.getElementById("step-2"),
  document.getElementById("step-3"),
  document.getElementById("step-4"),
  document.getElementById("step-5"),
  document.getElementById("step-6"),
];

// Importer les fonctions de validation
import {
  validatePersonalInfo,
  validateExperience,
  validateDiplomas,
  validateCertificates,
  validateSkills,
  validateLanguages,
} from "./validators.js";

// Sélection des indicateurs de progression dans l'interface
const steppers = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
  document.getElementById("step4"),
  document.getElementById("step5"),
  document.getElementById("step6"),
];

// Définition des styles pour les étapes actives et inactives
const activeStepStyle =
  "flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const inactiveStepStyle =
  "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";

// Initialisation de l'étape actuelle
let currentStep = 0;

/**
 * Met à jour la barre de progression et les indicateurs visuels.
 */
const updateProgressBar = () => {
  const progressPercentage = ((currentStep + 1) / forms.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Met à jour le style des indicateurs de progression (steppers)
  steppers.forEach((step, index) => {
    step.className = index <= currentStep ? activeStepStyle : inactiveStepStyle;
  });
};

/**
 * Affiche une étape spécifique du formulaire.
 * @param {number} index - L'index de l'étape à afficher.
 */
const showStep = (index) => {
  forms.forEach((form, idx) => {
    form.style.display = idx === index ? "block" : "none";
  });
};

/**
 * Passe à l'étape suivante après validation.
 */
const Suivantstep = () => {
  // Masquer toutes les erreurs précédentes
  hideAllErrors();

  // Validation de l'étape actuelle
  if (!validateForm()) {
    return;
  }

  // Passe à l'étape suivante si elle est valide
  if (currentStep < forms.length - 1) {
    currentStep++;
    showStep(currentStep);
    updateProgressBar();
  }
};

/**
 * Revient à l'étape précédente.
 */
const precedentStep = () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
    updateProgressBar();
  }
};

/**
 * Valide tous les champs du formulaire pour l'étape actuelle.
 * @returns {boolean} - `true` si tous les champs sont valides, sinon `false`.
 */
const validateForm = () => {
  // Validation centralisée par étape
  let result = { isValid: true, errors: {} };

  if (currentStep === 0) {
    // Infos personnelles
    const data = {
      fullName: document.getElementById("fullName")?.value || "",
      profile: document.getElementById("jobLocation")?.value || "",
      email: document.getElementById("email")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      address: document.getElementById("adresse")?.value || "",
      linkedinUrl: document.getElementById("linkedin")?.value || "",
      githubUrl: document.getElementById("github")?.value || "",
      aboutMe: document.getElementById("aboutMe")?.value || "",
      photo: document.getElementById("profileImage")?.files[0],
    };

    result = validatePersonalInfo(data);

    // Affichage des erreurs pour les infos personnelles
    if (!result.isValid) {
      Object.keys(result.errors).forEach((key) => {
        const errorSpan = document.getElementById(key + "Error");
        if (errorSpan) {
          errorSpan.textContent = result.errors[key];
          errorSpan.classList.remove("hidden");
        }
      });
    }
  }

  if (currentStep === 1) {
    result = validateExperience(experiences);
    if (!result.isValid) {
      Swal.fire({
        icon: "error",
        title: "Erreur - Expériences",
        text: result.errors.join(" | "),
      });
    }
  }

  if (currentStep === 2) {
    result = validateDiplomas(diplomesDonner);
    if (!result.isValid) {
      Swal.fire({
        icon: "error",
        title: "Erreur - Diplômes",
        text: result.errors.join(" | "),
      });
    }
  }

  if (currentStep === 3) {
    result = validateCertificates(certificatesDonner);
    if (!result.isValid) {
      Swal.fire({
        icon: "error",
        title: "Erreur - Certificats",
        text: result.errors.join(" | "),
      });
    }
  }

  if (currentStep === 4) {
    result = validateSkills({
      softSkills: arraySoftSkills,
      hardSkills: arrayHardSkills,
    });
    if (!result.isValid) {
      Swal.fire({
        icon: "error",
        title: "Erreur - Compétences",
        text: result.errors.join(" | "),
      });
    }
  }

  if (currentStep === 5) {
    result = validateLanguages(arrayLangues);
    if (!result.isValid) {
      Swal.fire({
        icon: "error",
        title: "Erreur - Langues",
        text: result.errors.join(" | "),
      });
    }
  }

  return result.isValid;
};

// Gestion des événements des boutons "Suivant" et "Précédent"
document.getElementById("nextBtnInfo").addEventListener("click", Suivantstep);
document.getElementById("nextBtnExp").addEventListener("click", Suivantstep);
document
  .getElementById("nextBtnDiplomes")
  .addEventListener("click", Suivantstep);
document
  .getElementById("nextBtnCertificats")
  .addEventListener("click", Suivantstep);
document
  .getElementById("nextBtnCompetences")
  .addEventListener("click", Suivantstep);

document.getElementById("prevBtnExp").addEventListener("click", precedentStep);
document
  .getElementById("prevBtnDiplomes")
  .addEventListener("click", precedentStep);
document
  .getElementById("prevBtnCertificats")
  .addEventListener("click", precedentStep);
document
  .getElementById("prevBtnCompetances")
  .addEventListener("click", precedentStep);
document
  .getElementById("prevBtnLangues")
  .addEventListener("click", precedentStep);

// Initialisation : affiche la première étape et met à jour la barre de progression
showStep(currentStep);
updateProgressBar();

// Ajout des écouteurs d'événements pour les boutons "Suivant" et "Précédent"
document.getElementById("nextBtnInfo").addEventListener("click", Suivantstep);
document.getElementById("nextBtnExp").addEventListener("click", Suivantstep);
document.getElementById("prevBtnExp").addEventListener("click", precedentStep);

// Afficher la première étape et mettre à jour la barre de progression
showStep(currentStep);
updateProgressBar();

const experiences = [];
const addExperienceButton = document.getElementById("add-experience");
const experienceFormsContainer = document.getElementById(
  "experience-forms-container"
);
const nextBtn = document.getElementById("nextBtnExp");

// Fonction pour afficher la liste des expériences enregistrées
function displayExperiences() {
  const experienceListContainer = document.getElementById("experience-list");
  experienceListContainer.innerHTML = "";

  experiences.forEach((experience) => {
    const experienceItem = document.createElement("div");
    experienceItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow");
    experienceItem.innerHTML = `
      <h6 class="text-lg font-semibold">${experience.mission} - ${experience.company}</h6>
      <p class="text-sm text-gray-600">${experience.sector} | ${experience.location}</p>
      <p class="text-sm text-gray-600">${experience.startDate} - ${experience.endDate}</p>
      <p class="mt-2 text-gray-800">${experience.description}</p>
    `;
    experienceListContainer.appendChild(experienceItem);
  });
}

// Ajouter un formulaire dynamique pour une nouvelle expérience
addExperienceButton.addEventListener("click", () => {
  const formId = `experience-form-${experiences.length + 1}`;
  const experienceForm = document.createElement("form");
  experienceForm.id = formId;
  experienceForm.classList.add(
    "relative",
    "space-y-6",
    "border",
    "p-4",
    "rounded-lg",
    "bg-gray-100"
  );

  experienceForm.innerHTML = `
    <div class="relative p-0 rounded-lg">
      <button 
        type="button" 
        class="absolute top-0 right-0 mb-12 text-red-500 hover:text-red-700 transition duration-300" 
        title="Supprimer"
      >
        <i class="fas fa-trash"></i>
      </button>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="${formId}-mission" class="block mb-2 text-sm font-medium text-gray-800">Mission</label>
          <input 
            type="text" 
            id="${formId}-mission" 
            name="experience_mission" 
            class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full h-12 text-sm text-gray-700 placeholder-gray-400" 
            placeholder="Entrez la mission" 
            required
          />
        </div>
        <div>
          <label for="${formId}-sector" class="block mb-2 text-sm font-medium text-gray-800">Secteur</label>
          <input 
            type="text" 
            id="${formId}-sector" 
            name="experience_sector" 
            class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full h-12 text-sm text-gray-700 placeholder-gray-400" 
            placeholder="Entrez le secteur" 
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label for="${formId}-start-date" class="block mb-2 text-sm font-medium text-gray-800">Date de Début</label>
          <input 
            type="date" 
            id="${formId}-start-date" 
            name="experience_start_date" 
            class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full h-12 text-sm text-gray-700 placeholder-gray-400" 
            required
          />
        </div>
        <div>
          <label for="${formId}-end-date" class="block mb-2 text-sm font-medium text-gray-800">Date de Fin</label>
          <input 
            type="date" 
            id="${formId}-end-date" 
            name="experience_end_date" 
            class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full h-12 text-sm text-gray-700 placeholder-gray-400" 
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label for="${formId}-company" class="block mb-2 text-sm font-medium text-gray-800">Nom de l'Entreprise</label>
          <input 
            type="text" 
            id="${formId}-company" 
            name="experience_company" 
            class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full h-12 text-sm text-gray-700 placeholder-gray-400" 
            placeholder="Entrez le nom de l'entreprise" 
            required
          />
        </div>
        <div>
          <label for="${formId}-location" class="block mb-2 text-sm font-medium text-gray-800">Lieu</label>
          <input 
            type="text" 
            id="${formId}-location" 
            name="experience_location" 
            class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full h-12 text-sm text-gray-700 placeholder-gray-400" 
            placeholder="Entrez le lieu" 
            required
          />
        </div>
      </div>

      <div>
        <label for="${formId}-description" class="block mb-2 text-sm font-medium text-gray-800">Description</label>
        <textarea 
          id="${formId}-description" 
          name="experience_description" 
          rows="4" 
          class="form-input border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 w-full text-sm text-gray-700 placeholder-gray-400" 
          placeholder="Entrez une description" 
          required
        ></textarea>
      </div>
    </div>
  `;

  const deleteButton = experienceForm.querySelector(
    "button[title='Supprimer']"
  );
  deleteButton.addEventListener("click", () => {
    experienceForm.remove();
  });

  experienceFormsContainer.appendChild(experienceForm);
});

nextBtn.addEventListener("click", () => {
  const forms = document.querySelectorAll("#experience-forms-container form");

  forms.forEach((form) => {
    const mission = form.querySelector("[name='experience_mission']").value;
    const sector = form.querySelector("[name='experience_sector']").value;
    const startDate = form.querySelector(
      "[name='experience_start_date']"
    ).value;
    const endDate = form.querySelector("[name='experience_end_date']").value;
    const company = form.querySelector("[name='experience_company']").value;
    const location = form.querySelector("[name='experience_location']").value;
    const description = form.querySelector(
      "[name='experience_description']"
    ).value;

    if (
      !mission ||
      !sector ||
      !startDate ||
      !endDate ||
      !company ||
      !location ||
      !description
    ) {
      Swal.fire({
        icon: "error",
        title: "Tous les champs doivent être remplis",
        text: "Veuillez compléter tous les champs du formulaire.",
      });
      return;
    }

    if (startDate > endDate) {
      Swal.fire({
        icon: "error",
        title: "Erreur de dates",
        text: "La date de début ne peut pas être supérieure à la date de fin.",
      });
      return;
    }

    const experience = {
      mission,
      sector,
      startDate,
      endDate,
      company,
      location,
      description,
    };

    experiences.push(experience);
    form.reset();
  });

  displayExperiences();
});

const diplomesDonner = [];
const diplomesFormContainer = document.getElementById(
  "diplomes-form-container"
);
const addDiplomesButton = document.getElementById("add-diplome-button");
const nextBtnDiplomes = document.getElementById("nextBtnDiplomes");

// Vérification de l'existence des éléments DOM
if (!diplomesFormContainer || !addDiplomesButton || !nextBtnDiplomes) {
  console.error("Certains éléments DOM nécessaires sont introuvables.");
}

function addDiplomesForm() {
  const diplomesItem = document.createElement("div");
  diplomesItem.classList.add(
    "bg-white",
    "p-4",
    "rounded-lg",
    "shadow",
    "space-y-2"
  );
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
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="licence, master ..." name="diplome-name">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Spécialité</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Informatique, Gestion ..." name="diplome-specialty">
            </label>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Date de début</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" name="diplome-start">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Date de fin</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" name="diplome-end">
            </label>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Université</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Université, nom..." name="diplome-university">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Ville</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Ville..." name="diplome-city">
            </label>
        </div>
        <div class="flex">
            <label class="w-full">
                <span class="text-gray-700">Description</span>
                <textarea class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" rows="3" name="diplome-description" placeholder="A propos de votre formation..."></textarea>
            </label>
        </div>
    `;

  diplomesItem
    .querySelector(".remove-diplomes")
    .addEventListener("click", () => {
      diplomesFormContainer.removeChild(diplomesItem);
    });

  diplomesFormContainer.appendChild(diplomesItem);
}

// Ajout d'un formulaire de diplôme
addDiplomesButton?.addEventListener("click", (e) => {
  e.preventDefault();
  addDiplomesForm();
});

function validateDiplomesForm() {
  const formItems = diplomesFormContainer.querySelectorAll(".bg-white");
  let isValid = true;
  let invalidFields = [];

  formItems.forEach((item) => {
    const fields = item.querySelectorAll("input, textarea");
    fields.forEach((field) => {
      if (!field.value) {
        isValid = false;
        invalidFields.push(`${field.name} est obligatoire.`);
      }
    });

    const startDate = item.querySelector('[name="diplome-start"]');
    const endDate = item.querySelector('[name="diplome-end"]');
    if (
      startDate &&
      endDate &&
      new Date(startDate.value) > new Date(endDate.value)
    ) {
      isValid = false;
      invalidFields.push("La date de début doit être avant la date de fin.");
    }
  });

  if (!isValid) {
    Swal.fire({
      icon: "error",
      title: "Erreur de validation",
      text: invalidFields.join(" | "),
    });
  }

  return isValid;
}

function saveDiplomesDonner() {
  if (!validateDiplomesForm()) return;

  diplomesDonner.length = 0;

  const formItems = diplomesFormContainer.querySelectorAll(".bg-white");
  formItems.forEach((item) => {
    const name = item.querySelector('[name="diplome-name"]').value;
    const specialty = item.querySelector('[name="diplome-specialty"]').value;
    const startDate = item.querySelector('[name="diplome-start"]').value;
    const endDate = item.querySelector('[name="diplome-end"]').value;
    const university = item.querySelector('[name="diplome-university"]').value;
    const city = item.querySelector('[name="diplome-city"]').value;
    const description = item.querySelector(
      '[name="diplome-description"]'
    ).value;

    diplomesDonner.push({
      name,
      specialty,
      startDate,
      endDate,
      university,
      city,
      description,
    });
  });
  console.log(diplomesDonner);
}

nextBtnDiplomes?.addEventListener("click", (e) => {
  e.preventDefault();
  saveDiplomesDonner();
});

const certificateFormContainer = document.getElementById(
  "certificate-form-container"
);
const addCertificateButton = document.getElementById("add-certificate-button");
let certificatesDonner = [];
function addCertificateForm() {
  const certificateItem = document.createElement("div");
  certificateItem.classList.add(
    "bg-white",
    "p-4",
    "rounded-lg",
    "shadow",
    "space-y-2"
  );
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
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="Certificat en Gestion, en développement" name="certificate-name">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Organisme délivrant</span>
                <input type="text" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" placeholder="YouCode, Coursera, Google ..." name="certificate-organism">
            </label>
        </div>
        <div class="flex space-x-4">
            <label class="flex-1">
                <span class="text-gray-700">Date de début</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" name="certificate-start">
            </label>
            <label class="flex-1">
                <span class="text-gray-700">Date de fin</span>
                <input type="date" class="mt-1 block w-full px-4 py-2 border border-blue-500 rounded-md bg-gray-200" name="certificate-end">
            </label>
        </div>
    `;

  certificateItem
    .querySelector(".remove-certificate")
    .addEventListener("click", () => {
      certificateFormContainer.removeChild(certificateItem);
    });
  certificateFormContainer.appendChild(certificateItem);
}

addCertificateButton.addEventListener("click", (e) => {
  e.preventDefault();
  addCertificateForm();
});

function saveCertificatesDonner() {
  const formItems = certificateFormContainer.querySelectorAll("div");
  certificatesDonner = [];
  formItems.forEach((item) => {
    const nameInput = item.querySelector('[name="certificate-name"]');
    const organismInput = item.querySelector('[name="certificate-organism"]');
    const startInput = item.querySelector('[name="certificate-start"]');
    const endInput = item.querySelector('[name="certificate-end"]');
    if (nameInput && organismInput && startInput && endInput) {
      const name = nameInput.value;
      const organism = organismInput.value;
      const start = startInput.value;
      const end = endInput.value;

      certificatesDonner.push({
        name,
        organism,
        startDate: start,
        endDate: end,
      });
    }
  });
}

document.getElementById("nextBtnCertificats").addEventListener("click", (e) => {
  e.preventDefault();
  saveCertificatesDonner();
});

const btnAadSoftSkills = document.getElementById("btnAadSoftSkills");
const btnAadHardSkills = document.getElementById("btnAadHardSkills");
const softSkillInputsValue = document.getElementById("softSkillInputsValue");
const hardSkillInputsValue = document.getElementById("hardSkillInputsValue");
const arrayHardSkills = [];
const arraySoftSkills = [];
btnAadSoftSkills.addEventListener("click", () => {
  const softSkill = softSkillInputsValue.value.trim();
  if (softSkill) {
    arraySoftSkills.push(softSkill);
    softSkillInputsValue.value = "";
    const softItem = document.createElement("li");
    softItem.classList.add(
      "flex",
      "items-center",
      "text-lg",
      "gap-4",
      "font-medium",
      "text-gray-700"
    );
    softItem.innerHTML = `
      <span>${softSkill}</span>
      <button class="ml-4 text-red-500" onclick="deleteItem(this, 'softSkillsList', arraySoftSkills)"><em class="fas fa-remove text-red-600"></em></button>
    `;
    document.getElementById("softSkillsList").appendChild(softItem);
  }
});

btnAadHardSkills.addEventListener("click", () => {
  const hardSkill = hardSkillInputsValue.value.trim();
  if (hardSkill) {
    arrayHardSkills.push(hardSkill);
    hardSkillInputsValue.value = "";
    const hardItem = document.createElement("li");
    hardItem.classList.add(
      "flex",
      "items-center",
      "text-lg",
      "gap-4",
      "font-medium",
      "text-gray-700"
    );
    hardItem.innerHTML = `
      <span>${hardSkill}</span>
      <button class="ml-4 text-red-500" onclick="deleteItem(this, 'hardSkillsList', arrayHardSkills)"><em class="fas fa-remove text-red-600"></em></button>
    `;
    document.getElementById("hardSkillsList").appendChild(hardItem);
  }
});

function deleteItem(button, listId, array) {
  const item = button.parentElement;
  const itemText = item.querySelector("span").textContent;
  document.getElementById(listId).removeChild(item);
  const index = array.indexOf(itemText);
  if (index > -1) {
    array.splice(index, 1);
  }
}
function resetSkills() {
  arraySoftSkills.length = 0;
  arrayHardSkills.length = 0;
  document.getElementById("softSkillsList").innerHTML = "";
  document.getElementById("hardSkillsList").innerHTML = "";
  softSkillInputsValue.value = "";
  hardSkillInputsValue.value = "";
}
const resetButton = document.createElement("button");
resetButton.classList.add(
  "bg-red-500",
  "text-white",
  "px-3",
  "py-2",
  "rounded-md",
  "hover:bg-red-600"
);
resetButton.innerText = "Reinitialiser tout!";
resetButton.addEventListener("click", resetSkills);
const formContainer = document.getElementById("dynamicSkillsForm");
formContainer.appendChild(resetButton);

const arrayLangues = [];
const langues = document.getElementById("languages");
const languesNiveauList = document.getElementById("languesNiveauList");
const niveauLangue = document.getElementById("niveau");
document.getElementById("addLanguageInput").addEventListener("click", () => {
  const languesValue = langues.value.trim();
  const niveauLangueValue = niveauLangue.value;
  if (languesValue && niveauLangueValue) {
    arrayLangues.push({ langue: languesValue, niveau: niveauLangueValue });
    langues.value = "";
    const langItem = document.createElement("li");
    langItem.classList.add(
      "flex",
      "items-center",
      "text-lg",
      "gap-4",
      "font-medium",
      "text-gray-700"
    );
    langItem.innerHTML = `
      <h1>${languesValue} - ${niveauLangueValue}</h1>
      <button class="ml-4 text-red-500" onclick="deleteItem(this, 'languesNiveauList', arrayLangues)">
        <em class="fas fa-remove"></em>
      </button>
    `;
    languesNiveauList.appendChild(langItem);
    console.log(arrayLangues);
  }
});

function deleteItem(button, listId, array) {
  const item = button.parentElement;
  const itemText = item.querySelector("h1").textContent;
  document.getElementById(listId).removeChild(item);
  const index = array.indexOf(itemText);
  if (index > -1) {
    array.splice(index, 1);
  }
}

const arrayLoisirs = [];
const LoisirLists = document.getElementById("LoisirLists");
const addInteretInput = document.getElementById("addInteretInput");
const inputLoisir = document.getElementById("loisirs");
addInteretInput.addEventListener("click", () => {
  const valueInputLoisir = inputLoisir.value.trim();
  arrayLoisirs.push(valueInputLoisir);
  inputLoisir.value = "";
  const loisirItem = document.createElement("li");
  LoisirLists.classList.add(
    "flex",
    "item-center",
    "text-lg",
    "gap-4",
    "font-medium",
    "text-gray-700"
  );
  LoisirLists.innerHTML = `
    <p>${arrayLoisirs}</p>
  `;
  LoisirLists.appendChild(loisirItem);
});

const submitBtn = document.getElementById("submitBtn");
const step6Section = document.getElementById("step-6");
const typeSelectionSection = document.querySelector(".type-selection-section");
function showTypeSelection() {
  step6Section.style.display = "none";
  typeSelectionSection.classList.remove("hidden");
  typeSelectionSection.classList.add("flex");
}
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  showTypeSelection();
});

document.addEventListener("DOMContentLoaded", function () {
  const confirmSelectionBtn = document.getElementById("confirmSelectionBtn");
  confirmSelectionBtn.addEventListener("click", async function () {
    // Récupérer toutes les données du formulaire
    const data = {
      fullName: document.getElementById("fullName").value,
      profile: document.getElementById("jobLocation").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("adresse").value,
      linkedinUrl: document.getElementById("linkedin").value,
      githubUrl: document.getElementById("github").value,
      aboutMe: document.getElementById("aboutMe").value,
      photo: document.querySelector("#profileImage").files[0]
        ? URL.createObjectURL(document.querySelector("#profileImage").files[0])
        : "",
      linkedinUsername: (document
        .getElementById("linkedin")
        .value.match(/https:\/\/www\.linkedin\.com\/in\/([^\/]+)/) || [""])[1],
      githubUsername: (document
        .getElementById("github")
        .value.match(/https:\/\/github\.com\/([^\/]+)/) || [""])[1],
      experiences,
      diplomas: diplomesDonner,
      certificates: certificatesDonner,
      softSkills: arraySoftSkills,
      hardSkills: arrayHardSkills,
      languages: arrayLangues,
      hobbies: arrayLoisirs,
    };

    // Import dynamique du template selon le choix
    const selectedType = document.querySelector(
      'input[name="typeSelection"]:checked'
    );
    if (selectedType) {
      document.querySelector(".type-selection-section").classList.add("hidden");
      menuPrincipale.style.display = "none";
      const telechargerCV = document.getElementById("telechargerCV");
      telechargerCV.style.display = "block";
      const cvTemplate = document.getElementById("cvTemplete");
      cvTemplate.classList.add("cv-template");

      let htmlCV = "";
      if (selectedType.value === "Type 1") {
        const module = await import("./templates/template1.js");
        htmlCV = module.renderTemplate1(data);
      } else if (selectedType.value === "Type 2") {
        const module = await import("./templates/template2.js");
        htmlCV = module.renderTemplate2(data);
      } else {
        htmlCV = `<section>Template non trouvé !</section>`;
      }
      cvTemplate.innerHTML = htmlCV;
      document.body.appendChild(cvTemplate);
    } else {
      alert("Veuillez sélectionner un type de CV avant de continuer.");
    }
  });
});
//telechargement du cv par bibliothque jsPDF
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const cvContainer = document.querySelector(".a4-container");

  const pdf = new jsPDF("p", "mm", "a4");

  const canvas = await html2canvas(cvContainer, {
    scale: 3,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

  // Récupérer le nom de l'utilisateur
  const userNameInput = document.getElementById("fullName");
  const userName = userNameInput ? userNameInput.value.trim() : "Utilisateur";

  const fileName = `CV_${userName}.pdf`;
  pdf.save(fileName);
}

// Fonction globale pour la génération de CV appelée depuis step-navigation.js
function startCVGeneration() {
  // Déclencher la sélection de template
  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) {
    // Créer un événement click artificiel
    const clickEvent = new Event("click", { bubbles: true });
    submitBtn.dispatchEvent(clickEvent);
  } else {
    console.error("Bouton submitBtn non trouvé");
  }
}
