// Gestionnaire principal des formulaires et de la navigation
// Ce fichier unifie toutes les fonctionnalités du formulaire

class FormManager {
  constructor() {
    // Variables globales pour stocker les données
    this.experiences = [];
    this.diplomesDonner = [];
    this.certificatesDonner = [];
    this.arrayHardSkills = [];
    this.arraySoftSkills = [];
    this.arrayLangues = [];
    this.arrayLoisirs = [];

    // Éléments DOM
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    // Boutons d'ajout
    this.addExperienceButton = document.getElementById("add-experience");
    this.addDiplomesButton = document.getElementById("add-diplome-button");
    this.addCertificateButton = document.getElementById(
      "add-certificate-button"
    );
    this.btnAadSoftSkills = document.getElementById("btnAadSoftSkills");
    this.btnAadHardSkills = document.getElementById("btnAadHardSkills");
    this.addLanguageInput = document.getElementById("addLanguageInput");
    this.addInteretInput = document.getElementById("addInteretInput");

    // Conteneurs
    this.experienceFormsContainer = document.getElementById(
      "experience-forms-container"
    );
    this.diplomesFormContainer = document.getElementById(
      "diplomes-form-container"
    );
    this.certificateFormContainer = document.getElementById(
      "certificate-form-container"
    );

    // Champs d'entrée
    this.softSkillInputsValue = document.getElementById("softSkillInputsValue");
    this.hardSkillInputsValue = document.getElementById("hardSkillInputsValue");
    this.langues = document.getElementById("languages");
    this.niveauLangue = document.getElementById("niveau");
    this.inputLoisir = document.getElementById("loisirs");

    // Listes d'affichage
    this.softSkillsList = document.getElementById("softSkillsList");
    this.hardSkillsList = document.getElementById("hardSkillsList");
    this.languesNiveauList = document.getElementById("languesNiveauList");
    this.LoisirLists = document.getElementById("LoisirLists");
  }

  setupEventListeners() {
    // Écouteurs pour les boutons d'ajout
    this.addExperienceButton?.addEventListener("click", () =>
      this.addExperienceForm()
    );
    this.addDiplomesButton?.addEventListener("click", (e) => {
      e.preventDefault();
      this.addDiplomesForm();
    });
    this.addCertificateButton?.addEventListener("click", (e) => {
      e.preventDefault();
      this.addCertificateForm();
    });
    this.btnAadSoftSkills?.addEventListener("click", () => this.addSoftSkill());
    this.btnAadHardSkills?.addEventListener("click", () => this.addHardSkill());
    this.addLanguageInput?.addEventListener("click", () => this.addLanguage());
    this.addInteretInput?.addEventListener("click", () => this.addLoisir());
  }

  // === GESTION DES EXPÉRIENCES ===
  addExperienceForm() {
    const formId = `experience-form-${this.experiences.length + 1}`;
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

    this.experienceFormsContainer.appendChild(experienceForm);
  }

  validateExperiences() {
    const forms = document.querySelectorAll("#experience-forms-container form");
    let isValid = true;

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
        isValid = false;
        return;
      }

      if (startDate > endDate) {
        isValid = false;
        return;
      }
    });

    return isValid;
  }

  saveExperiences() {
    this.experiences.length = 0;
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
        mission &&
        sector &&
        startDate &&
        endDate &&
        company &&
        location &&
        description
      ) {
        this.experiences.push({
          mission,
          sector,
          startDate,
          endDate,
          company,
          location,
          description,
        });
      }
    });
  }

  // === GESTION DES DIPLÔMES ===
  addDiplomesForm() {
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
        this.diplomesFormContainer.removeChild(diplomesItem);
      });

    this.diplomesFormContainer.appendChild(diplomesItem);
  }

  saveDiplomes() {
    this.diplomesDonner.length = 0;
    const formItems = this.diplomesFormContainer.querySelectorAll(".bg-white");

    formItems.forEach((item) => {
      const name = item.querySelector('[name="diplome-name"]').value;
      const specialty = item.querySelector('[name="diplome-specialty"]').value;
      const startDate = item.querySelector('[name="diplome-start"]').value;
      const endDate = item.querySelector('[name="diplome-end"]').value;
      const university = item.querySelector(
        '[name="diplome-university"]'
      ).value;
      const city = item.querySelector('[name="diplome-city"]').value;
      const description = item.querySelector(
        '[name="diplome-description"]'
      ).value;

      if (
        name &&
        specialty &&
        startDate &&
        endDate &&
        university &&
        city &&
        description
      ) {
        this.diplomesDonner.push({
          name,
          specialty,
          startDate,
          endDate,
          university,
          city,
          description,
        });
      }
    });
  }

  // === GESTION DES CERTIFICATS ===
  addCertificateForm() {
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
        this.certificateFormContainer.removeChild(certificateItem);
      });

    this.certificateFormContainer.appendChild(certificateItem);
  }

  saveCertificates() {
    this.certificatesDonner.length = 0;
    const formItems =
      this.certificateFormContainer.querySelectorAll(".bg-white");

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

        if (name && organism && start && end) {
          this.certificatesDonner.push({
            name,
            organism,
            startDate: start,
            endDate: end,
          });
        }
      }
    });
  }

  // === GESTION DES COMPÉTENCES ===
  addSoftSkill() {
    const softSkill = this.softSkillInputsValue.value.trim();
    if (softSkill) {
      this.arraySoftSkills.push(softSkill);
      this.softSkillInputsValue.value = "";
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
        <button class="ml-4 text-red-500" onclick="window.formManager.deleteSkillItem(this, 'soft')"><em class="fas fa-remove text-red-600"></em></button>
      `;
      this.softSkillsList.appendChild(softItem);
    }
  }

  addHardSkill() {
    const hardSkill = this.hardSkillInputsValue.value.trim();
    if (hardSkill) {
      this.arrayHardSkills.push(hardSkill);
      this.hardSkillInputsValue.value = "";
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
        <button class="ml-4 text-red-500" onclick="window.formManager.deleteSkillItem(this, 'hard')"><em class="fas fa-remove text-red-600"></em></button>
      `;
      this.hardSkillsList.appendChild(hardItem);
    }
  }

  deleteSkillItem(button, type) {
    const item = button.parentElement;
    const itemText = item.querySelector("span").textContent;

    if (type === "soft") {
      this.softSkillsList.removeChild(item);
      const index = this.arraySoftSkills.indexOf(itemText);
      if (index > -1) {
        this.arraySoftSkills.splice(index, 1);
      }
    } else if (type === "hard") {
      this.hardSkillsList.removeChild(item);
      const index = this.arrayHardSkills.indexOf(itemText);
      if (index > -1) {
        this.arrayHardSkills.splice(index, 1);
      }
    }
  }

  // === GESTION DES LANGUES ===
  addLanguage() {
    const languesValue = this.langues.value.trim();
    const niveauLangueValue = this.niveauLangue.value;

    if (languesValue && niveauLangueValue) {
      this.arrayLangues.push({
        langue: languesValue,
        niveau: niveauLangueValue,
      });
      this.langues.value = "";
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
        <button class="ml-4 text-red-500" onclick="window.formManager.deleteLanguageItem(this)">
          <em class="fas fa-remove"></em>
        </button>
      `;
      this.languesNiveauList.appendChild(langItem);
    }
  }

  deleteLanguageItem(button) {
    const item = button.parentElement;
    const itemText = item.querySelector("h1").textContent;
    this.languesNiveauList.removeChild(item);
    const index = this.arrayLangues.findIndex(
      (lang) => `${lang.langue} - ${lang.niveau}` === itemText
    );
    if (index > -1) {
      this.arrayLangues.splice(index, 1);
    }
  }

  // === GESTION DES LOISIRS ===
  addLoisir() {
    const valueInputLoisir = this.inputLoisir.value.trim();
    if (valueInputLoisir) {
      this.arrayLoisirs.push(valueInputLoisir);
      this.inputLoisir.value = "";
      this.updateLoisirsDisplay();
    }
  }

  updateLoisirsDisplay() {
    this.LoisirLists.innerHTML = `<p>${this.arrayLoisirs.join(", ")}</p>`;
  }

  // === MÉTHODES D'ACCÈS AUX DONNÉES ===
  getAllData() {
    // Sauvegarder toutes les données avant de les retourner
    this.saveExperiences();
    this.saveDiplomes();
    this.saveCertificates();

    return {
      experiences: this.experiences,
      diplomas: this.diplomesDonner,
      certificates: this.certificatesDonner,
      softSkills: this.arraySoftSkills,
      hardSkills: this.arrayHardSkills,
      languages: this.arrayLangues,
      hobbies: this.arrayLoisirs,
    };
  }
}

// Initialiser le gestionnaire de formulaires
window.formManager = new FormManager();

// Export pour utilisation externe
if (typeof module !== "undefined" && module.exports) {
  module.exports = FormManager;
}
