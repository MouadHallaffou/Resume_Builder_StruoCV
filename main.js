const heroSection = document.getElementById("heroSection");
const startedBtn = document.getElementById("startedBtn");
const formulaire = document.getElementById("formulaire");
startedBtn.addEventListener("click", () => {
  heroSection.style.display = "none";
  formulaire.style.display = "block";
});
// Sélection des éléments du formulaire et de la barre de progression
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
// Sélection des indicateurs de progression affichés dans l'interface
const steppers = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
  document.getElementById("step4"),
  document.getElementById("step5"),
  document.getElementById("step6"),
];
// Définition des styles pour les étapes actives et no active
const activeStepStyle =
  "flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const inactiveStepStyle =
  "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
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
showStep(currentStep);
updateProgressBar();

const experienceForm = document.getElementById("experience-form");
const experienceList = document.getElementById("experience-list");
const addExperienceButton = document.getElementById("add-experience");
let experiences = [];
addExperienceButton.addEventListener("click", () => {
  const mission = document.getElementById("experience-mission").value;
  const sector = document.getElementById("experience-sector").value;
  const startDate = document.getElementById("experience-start-date").value;
  const endDate = document.getElementById("experience-end-date").value;
  const company = document.getElementById("experience-company").value;
  const location = document.getElementById("experience-location").value;
  const description = document.getElementById("experience-description").value;
  const newExperience = {
    mission,
    sector,
    startDate,
    endDate,
    company,
    location,
    description,
  };
  experiences.push(newExperience);
  const experienceItem = document.createElement("div");
  experienceItem.classList.add(
    "bg-white",
    "p-4",
    "rounded-lg",
    "shadow",
    "experience-item"
  );
  experienceItem.innerHTML = `
        <h6 class="text-lg font-semibold">${mission} - ${company}</h6>
        <p class="text-sm text-gray-600">${sector} | ${location}</p>
        <p class="text-sm text-gray-600">${startDate} - ${endDate}</p>
        <p class="mt-2 text-gray-800">${description}</p>
        <button type="button" class="bg-red-400 text-white px-3 py-2 rounded-md hover:bg-red-600 remove-experience">remove</button>
    `;
  experienceList.appendChild(experienceItem);
  const removeButton = experienceItem.querySelector(".remove-experience");
  removeButton.addEventListener("click", () => {
    experienceList.removeChild(experienceItem);
    experiences = experiences.filter((exp) => exp !== newExperience); // Supprimer l'expérience du tableau
  });
  experienceForm.reset();
});

const diplomesFormContainer = document.getElementById(
  "diplomes-form-container"
);
const addDiplomesButton = document.getElementById("add-diplome-button");
let diplomesDonner = [];
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

addDiplomesButton.addEventListener("click", (e) => {
  e.preventDefault();
  addDiplomesForm();
});

function saveDiplomesDonner() {
  const formItems = diplomesFormContainer.querySelectorAll("div");
  diplomesDonner = [];

  formItems.forEach((item) => {
    const nameElement = item.querySelector('[name="diplome-name"]');
    const specialtyElement = item.querySelector('[name="diplome-specialty"]');
    const startElement = item.querySelector('[name="diplome-start"]');
    const endElement = item.querySelector('[name="diplome-end"]');
    const universityElement = item.querySelector('[name="diplome-university"]');
    const cityElement = item.querySelector('[name="diplome-city"]');
    const descriptionElement = item.querySelector('[name="diplome-description"]');

    if (
      nameElement &&
      specialtyElement &&
      startElement &&
      endElement &&
      universityElement &&
      cityElement &&
      descriptionElement
    ) {
      const name = nameElement.value;
      const specialty = specialtyElement.value;
      const start = startElement.value;
      const end = endElement.value;
      const university = universityElement.value;
      const city = cityElement.value;
      const description = descriptionElement.value;
      diplomesDonner.push({
        name,
        specialty,
        startDate: start,
        endDate: end,
        university,
        city,
        description,
      });
    }
  });
}

document.getElementById("nextBtnDiplomes").addEventListener("click", (e) => {
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
resetButton.innerText = "Réinitialiser les Compétences";
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
  confirmSelectionBtn.addEventListener("click", function () {
    const nomComplet = document.getElementById("fullName").value;
    const profile = document.getElementById("jobLocation").value;
    const email = document.querySelector("#email").value;
    const telephone = document.querySelector("#phone").value;
    const adresse = document.getElementById("adresse").value;
    const linkdIn = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;
    const aboutMe = document.getElementById("aboutMe").value;
    let inputPhotosUrl = document.querySelector("#profileImage").files[0];
    inputPhoto = URL.createObjectURL(inputPhotosUrl);

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
      if (selectedType.value === "Type 1") {
        cvTemplate.innerHTML = `
              <section class="bg-gray-100">
               <div class="a4-container border border-gray-300 shadow-lg rounded-lg p-4">
                  <!-- Partie gauche (30%) -->
                   <div class="left-section w-1/3">
                    <!-- Section : Image, Nom et Statut -->
                    <div class="section-item mt-2 flex flex-col items-center">
                        <img src="${inputPhoto}" alt="Photo de profil" />
                        <h2 class="text-sm font-bold text-center">${nomComplet}</h2>
                        <p class="text-xs text-gray-600 text-center">${profile}</p>
                    </div>

                    <!-- Section : À propos de moi -->
                    <div class="section-item mt-2">
                        <h3 class="section-title text-lg mx-4 text-center">Apros</h3>
                        <p class="section-content text-xs whitespace-normal text-left mx-4">${aboutMe}</p>
                    </div>

                    <!-- Section : Contacts -->
                    <div class="section-item mt-2">
                        <h3 class="section-title text-lg mx-4 text-center">Contacts</h3>
                        <p class="section-content text-sm flex items-start space-x-2 mx-4">
                            <i class="fas fa-envelope"></i>
                            <span>${email}</span>
                        </p>
                        <p class="section-content text-sm flex items-start space-x-2 mx-4">
                            <i class="fas fa-phone"></i>
                            <span>${telephone}</span>
                        </p>
                        <p class="section-content text-sm flex items-start space-x-2 mx-4">
                            <i class="fas fa-location"></i>
                            <span>${adresse}</span>
                        </p>
                        <div class="flex space-x-2 mt-1 flex-wrap justify-center">
                            <i class="fa-brands fa-github"></i><a href="${github}"class="text-sm">Github</a>
                            <i class="fa-brands fa-linkedin"></i><a href="${linkdIn}"class="text-sm">LinkedIn</a>
                        </div>
                    </div>

                    <!-- Section : Langues -->
                    <div class="section-item mt-2">
                        <h3 class="section-title text-lg text-center mx-4">Langues</h3>
                        <ul class="text-sm text-left mx-4 space-y-2" style="line-height: 1.6; list-style-type: none; margin-top: 0; padding-left: 0;">
                            ${arrayLangues
                              .map(
                                (langue) =>
                                  `<li class="text-sm">${langue.langue} : ${langue.niveau}</li>`
                              )
                              .join("")}
                        </ul>
                    </div>

                    <!-- Section : Loisirs -->
                    <div class="section-item mt-2">
                        <h3 class="section-title text-lg text-center mx-4">Loisirs</h3>
                        <ul class="text-sm text-left mx-4 space-y-2" style="line-height: 1.6; list-style-type: none; margin-top: 0; padding-left: 0;">
                            ${arrayLoisirs
                              .map((loisir) => `<li class="text-sm">${loisir}</li>`)
                              .join("")}
                        </ul>
                    </div>
                  </div>

                  <!-- Partie droite (70%) -->
                  <div class="right-section w-2/3">
                      <!-- Section : Expériences professionnelles -->
                      <div class="section-item mt-2">
                          <h3 class="section-title text-lg">Expériences professionnelles</h3>
                          ${experiences
                            .map(
                              (exp) => `
                              <div class="experience mb-2 text-sm">
                                  <p><strong>${exp.mission}</strong> || ${exp.company}</p>
                                  <p>${exp.sector} || ${exp.location}</p>
                                  <p>Depuis: ${exp.startDate} jusqua: ${exp.endDate}</p>
                                  <p>${exp.description}</p>
                              </div>
                          `
                            )
                            .join("")}
                      </div>

                      <!-- Section : Diplômes -->
                      <div class="section-item mt-2">
                          <h3 class="section-title text-lg">Diplômes</h3>
                          ${diplomesDonner
                            .map(
                              (diplome) => `
                              <div class="degree mb-2 text-sm">
                                  <h6>${diplome.name} - ${diplome.specialty}</h6>
                                  <p>${diplome.university} | ${diplome.city}</p>
                                  <p>Depuis: ${diplome.startDate}jusqua: ${diplome.endDate}</p>
                                  <p>${diplome.description}</p>
                              </div>
                          `
                            )
                            .join("")}
                      </div>

                      <!-- Section : Certifications -->
                      <div class="section-item mt-2">
                          <h3 class="section-title text-lg">Certifications</h3>
                          ${certificatesDonner
                            .map(
                              (cert) => `
                              <div class="certificate mb-2 text-sm">
                                  <p>Spécialité : ${cert.name} || Organisme : ${cert.organism}</p>
                                  <p>Dates : ${cert.startDate} - ${cert.endDate}</p>
                              </div>
                          `
                            )
                            .join("")}
                      </div>

                      <!-- Section : Compétences -->
                      <div class="section-item mt-2">
                          <h3 class="section-title text-lg">Compétences</h3>
                          <div class="skills">
                              <div class="certificate mb-4">
                                  <h4 class="text-xs font-semibold">Soft Skills :</h4>
                                  <ul class="list-none list-inside text-sm text-left">
                                      ${arraySoftSkills
                                        .map((skill) => `<li>${skill}</li>`)
                                        .join("")}
                                  </ul>
                              </div>
                              <div class="certificate mb-4">
                                  <h4 class="text-xs font-semibold">Hard Skills :</h4>
                                  <ul class="list-none list-inside text-sm text-left">
                                      ${arrayHardSkills
                                        .map((skill) => `<li>${skill}</li>`)
                                        .join("")}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        `;
      } else if (selectedType.value === "Type 2") {
        cvTemplate.innerHTML = `
        <section> 404 not found! </section>
        `;
      }
      document.body.appendChild(cvTemplate);
    } else {
      alert("Veuillez sélectionner un type de CV avant de continuer.");
    }
  });
});
