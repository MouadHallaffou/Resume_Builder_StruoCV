// Step-by-Step Form Navigation System
class StepNavigator {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 6; // Ajustez selon le nombre d'étapes
    this.steps = [
      "step-1", // Informations personnelles
      "step-2", // Expériences
      "step-3", // Diplômes
      "step-4", // Certificats
      "step-5", // Compétences
      "step-6", // Langues
    ];
    this.stepIndicators = [
      "step1", // Indicateurs dans la barre de progression
      "step2",
      "step3",
      "step4",
      "step5",
      "step6",
    ];
    this.init();
  }

  init() {
    this.hideAllSteps();
    this.showStep(1);
    this.setupNavigationButtons();
    this.updateProgressBar();
    this.updateStepIndicators();
  }

  hideAllSteps() {
    this.steps.forEach((stepId) => {
      const stepElement = document.getElementById(stepId);
      if (stepElement) {
        stepElement.style.display = "none";
        stepElement.classList.remove("fade-in");
      }
    });
  }

  showStep(stepNumber) {
    this.hideAllSteps();

    const stepId = this.steps[stepNumber - 1];
    const stepElement = document.getElementById(stepId);

    if (stepElement) {
      stepElement.style.display = "block";
      // Animation d'apparition
      setTimeout(() => {
        stepElement.classList.add("fade-in");
      }, 50);
    }

    this.currentStep = stepNumber;
    this.updateProgressBar();
    this.updateStepIndicators();
    this.updateNavigationButtons();
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.showStep(this.currentStep + 1);
      } else {
        // Dernière étape - génerer le CV
        this.generateCV();
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.showStep(this.currentStep - 1);
    } else {
      // Retour au hero section
      this.returnToHero();
    }
  }

  validateCurrentStep() {
    const currentStepId = this.steps[this.currentStep - 1];
    const currentStepElement = document.getElementById(currentStepId);

    if (!currentStepElement) return true;

    // Nettoyer les erreurs précédentes
    if (window.validationSystem) {
      window.validationSystem.clearAllErrors();
    }

    // Validation spécifique selon l'étape
    switch (this.currentStep) {
      case 1:
        return this.validatePersonalInfo();
      case 2:
        return this.validateExperiences();
      case 3:
        return this.validateDiplomas();
      case 4:
        return this.validateCertificates();
      case 5:
        return this.validateSkills();
      case 6:
        return this.validateLanguages();
      default:
        return true;
    }
  }

  validatePersonalInfo() {
    if (!window.validationSystem) {
      // Fallback vers l'ancienne validation
      return this.validatePersonalInfoFallback();
    }

    const fields = [
      "fullName",
      "profile",
      "email",
      "phone",
      "address",
      "linkedinUrl",
      "githubUrl",
      "aboutMe",
    ];

    let isValid = true;
    const errors = [];

    // Valider chaque champ individuellement
    fields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (field) {
        // Validation spécifique par champ
        const fieldValid = this.validatePersonalInfoField(fieldId, field);
        if (!fieldValid) {
          isValid = false;
        }
      }
    });

    // Validation de la photo
    const photoInput = document.getElementById("photo");
    if (photoInput && !photoInput.files?.[0]) {
      window.validationSystem.showFieldError(
        "photo",
        "Une photo de profil est requise"
      );
      errors.push("Photo de profil manquante");
      isValid = false;
    }

    // Afficher un résumé si des erreurs existent
    if (!isValid) {
      // Collecter tous les messages d'erreur visibles
      const errorMessages = [];
      document.querySelectorAll(".error-message").forEach((errorEl) => {
        const message = errorEl.textContent.trim();
        if (message) errorMessages.push(message);
      });

      if (errorMessages.length > 0) {
        window.validationSystem.showValidationSummary(
          errorMessages,
          currentStepId
        );
      }
    }

    return isValid;
  }

  validatePersonalInfoField(fieldId, field) {
    const value = field.value?.trim() || "";

    switch (fieldId) {
      case "fullName":
        if (!value) {
          window.validationSystem.showFieldError(
            fieldId,
            "Le nom complet est obligatoire"
          );
          return false;
        }
        if (value.length < 2) {
          window.validationSystem.showFieldError(
            fieldId,
            "Le nom doit contenir au moins 2 caractères"
          );
          return false;
        }
        if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value)) {
          window.validationSystem.showFieldError(
            fieldId,
            "Le nom ne peut contenir que des lettres"
          );
          return false;
        }
        break;

      case "profile":
        if (!value) {
          window.validationSystem.showFieldError(
            fieldId,
            "Le profil professionnel est obligatoire"
          );
          return false;
        }
        if (value.length < 10) {
          window.validationSystem.showFieldError(
            fieldId,
            "Le profil doit contenir au moins 10 caractères"
          );
          return false;
        }
        break;

      case "email":
        if (!value) {
          window.validationSystem.showFieldError(
            fieldId,
            "L'email est obligatoire"
          );
          return false;
        }
        if (!window.validationSystem.isValidEmail(value)) {
          window.validationSystem.showFieldError(
            fieldId,
            "Veuillez saisir un email valide"
          );
          return false;
        }
        break;

      case "phone":
        if (!value) {
          window.validationSystem.showFieldError(
            fieldId,
            "Le téléphone est obligatoire"
          );
          return false;
        }
        if (!/^[\+]?[\d\s\-\(\)]{8,15}$/.test(value.replace(/\s/g, ""))) {
          window.validationSystem.showFieldError(
            fieldId,
            "Veuillez saisir un numéro de téléphone valide"
          );
          return false;
        }
        break;

      case "address":
        if (!value) {
          window.validationSystem.showFieldError(
            fieldId,
            "L'adresse est obligatoire"
          );
          return false;
        }
        if (value.length < 5) {
          window.validationSystem.showFieldError(
            fieldId,
            "L'adresse doit contenir au moins 5 caractères"
          );
          return false;
        }
        break;

      case "linkedinUrl":
        if (value && !value.includes("linkedin.com")) {
          window.validationSystem.showFieldError(
            fieldId,
            "Veuillez saisir un lien LinkedIn valide"
          );
          return false;
        }
        break;

      case "githubUrl":
        if (value && !value.includes("github.com")) {
          window.validationSystem.showFieldError(
            fieldId,
            "Veuillez saisir un lien GitHub valide"
          );
          return false;
        }
        break;

      case "aboutMe":
        if (!value) {
          window.validationSystem.showFieldError(
            fieldId,
            'La section "À propos" est obligatoire'
          );
          return false;
        }
        if (value.length < 50) {
          window.validationSystem.showFieldError(
            fieldId,
            "La description doit contenir au moins 50 caractères"
          );
          return false;
        }
        if (value.length > 1000) {
          window.validationSystem.showFieldError(
            fieldId,
            "La description ne peut pas dépasser 1000 caractères"
          );
          return false;
        }
        break;
    }

    // Si on arrive ici, le champ est valide
    window.validationSystem.showFieldSuccess(fieldId);
    return true;
  }

  validatePersonalInfoFallback() {
    // Ancienne méthode de validation en fallback
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    if (!fullName?.value.trim()) {
      this.showError("Le nom complet est requis");
      fullName?.focus();
      return false;
    }

    if (!email?.value.trim() || !this.isValidEmail(email.value)) {
      this.showError("Un email valide est requis");
      email?.focus();
      return false;
    }

    if (!phone?.value.trim()) {
      this.showError("Le numéro de téléphone est requis");
      phone?.focus();
      return false;
    }

    return true;
  }

  validateExperiences() {
    if (!window.validationSystem) {
      // Fallback vers l'ancienne validation
      if (window.formManager && window.formManager.validateExperiences) {
        return window.formManager.validateExperiences();
      }
      return true;
    }

    // Vérifier qu'il y a au moins une expérience
    const experienceContainers = document.querySelectorAll(
      '[id^="experience-"]'
    );
    if (experienceContainers.length === 0) {
      const errors = ["Au moins une expérience professionnelle est requise"];
      window.validationSystem.showValidationSummary(errors, "step-2");
      return false;
    }

    let isValid = true;
    const errors = [];

    // Valider chaque expérience
    experienceContainers.forEach((container, index) => {
      const fields = {
        mission: container.querySelector('[name="mission"]'),
        company: container.querySelector('[name="company"]'),
        sector: container.querySelector('[name="sector"]'),
        location: container.querySelector('[name="location"]'),
        startDate: container.querySelector('[name="startDate"]'),
        endDate: container.querySelector('[name="endDate"]'),
        description: container.querySelector('[name="description"]'),
      };

      // Valider chaque champ de l'expérience
      Object.entries(fields).forEach(([fieldName, field]) => {
        if (field && !field.value?.trim()) {
          window.validationSystem.showFieldError(
            field.id || `${fieldName}-${index}`,
            `${this.getFieldLabel(
              fieldName
            )} est obligatoire pour l'expérience ${index + 1}`
          );
          isValid = false;
        }
      });

      // Validation des dates
      if (fields.startDate?.value && fields.endDate?.value) {
        const startDate = new Date(fields.startDate.value);
        const endDate = new Date(fields.endDate.value);

        if (startDate > endDate) {
          window.validationSystem.showFieldError(
            fields.endDate.id || `endDate-${index}`,
            "La date de fin doit être postérieure à la date de début"
          );
          isValid = false;
        }
      }
    });

    if (!isValid) {
      const errorMessages = [];
      document.querySelectorAll(".error-message").forEach((errorEl) => {
        const message = errorEl.textContent.trim();
        if (message) errorMessages.push(message);
      });

      if (errorMessages.length > 0) {
        window.validationSystem.showValidationSummary(errorMessages, "step-2");
      }
    }

    return isValid;
  }

  validateDiplomas() {
    if (!window.validationSystem) {
      // Fallback
      if (window.formManager && window.formManager.saveDiplomes) {
        window.formManager.saveDiplomes();
      }
      return true;
    }

    // Vérifier qu'il y a au moins un diplôme
    const diplomaContainers = document.querySelectorAll('[id^="diplome-"]');
    if (diplomaContainers.length === 0) {
      const errors = ["Au moins un diplôme ou formation est requis"];
      window.validationSystem.showValidationSummary(errors, "step-3");
      return false;
    }

    let isValid = true;

    // Valider chaque diplôme
    diplomaContainers.forEach((container, index) => {
      const fields = {
        name: container.querySelector('[name="name"]'),
        specialty: container.querySelector('[name="specialty"]'),
        university: container.querySelector('[name="university"]'),
        city: container.querySelector('[name="city"]'),
        startDate: container.querySelector('[name="startDate"]'),
        endDate: container.querySelector('[name="endDate"]'),
        description: container.querySelector('[name="description"]'),
      };

      // Valider chaque champ du diplôme
      Object.entries(fields).forEach(([fieldName, field]) => {
        if (field && !field.value?.trim()) {
          window.validationSystem.showFieldError(
            field.id || `${fieldName}-${index}`,
            `${this.getFieldLabel(fieldName)} est obligatoire pour le diplôme ${
              index + 1
            }`
          );
          isValid = false;
        }
      });

      // Validation des dates
      if (fields.startDate?.value && fields.endDate?.value) {
        const startDate = new Date(fields.startDate.value);
        const endDate = new Date(fields.endDate.value);

        if (startDate > endDate) {
          window.validationSystem.showFieldError(
            fields.endDate.id || `endDate-${index}`,
            "La date de fin doit être postérieure à la date de début"
          );
          isValid = false;
        }
      }
    });

    if (!isValid) {
      const errorMessages = [];
      document.querySelectorAll(".error-message").forEach((errorEl) => {
        const message = errorEl.textContent.trim();
        if (message) errorMessages.push(message);
      });

      if (errorMessages.length > 0) {
        window.validationSystem.showValidationSummary(errorMessages, "step-3");
      }
    }

    return isValid;
  }

  validateCertificates() {
    if (!window.validationSystem) {
      return true; // Fallback permissif
    }

    // Les certificats sont optionnels, mais s'ils existent, ils doivent être valides
    const certContainers = document.querySelectorAll('[id^="certificate-"]');
    let isValid = true;

    certContainers.forEach((container, index) => {
      const fields = {
        name: container.querySelector('[name="name"]'),
        organism: container.querySelector('[name="organism"]'),
        startDate: container.querySelector('[name="startDate"]'),
        endDate: container.querySelector('[name="endDate"]'),
      };

      // Valider les champs obligatoires
      Object.entries(fields).forEach(([fieldName, field]) => {
        if (field && field.value?.trim() && fieldName !== "endDate") {
          // endDate peut être vide pour les certificats permanents
          // Field validation logic here
        } else if (field && !field.value?.trim() && fieldName !== "endDate") {
          window.validationSystem.showFieldError(
            field.id || `${fieldName}-${index}`,
            `${this.getFieldLabel(
              fieldName
            )} est obligatoire pour le certificat ${index + 1}`
          );
          isValid = false;
        }
      });
    });

    return isValid;
  }

  validateSkills() {
    if (!window.validationSystem) {
      return true; // Fallback permissif
    }

    let isValid = true;
    const errors = [];

    // Vérifier les compétences techniques
    const hardSkillsContainer = document.querySelector("#hardSkillsContainer");
    const hardSkills = hardSkillsContainer
      ? hardSkillsContainer.querySelectorAll(".skill-item")
      : [];

    if (hardSkills.length === 0) {
      errors.push("Au moins une compétence technique est requise");
      isValid = false;
    }

    // Vérifier les compétences interpersonnelles
    const softSkillsContainer = document.querySelector("#softSkillsContainer");
    const softSkills = softSkillsContainer
      ? softSkillsContainer.querySelectorAll(".skill-item")
      : [];

    if (softSkills.length === 0) {
      errors.push("Au moins une compétence interpersonnelle est requise");
      isValid = false;
    }

    if (!isValid) {
      window.validationSystem.showValidationSummary(errors, "step-5");
    }

    return isValid;
  }

  validateLanguages() {
    if (!window.validationSystem) {
      return true; // Fallback permissif
    }

    // Vérifier qu'il y a au moins une langue
    const languageContainers = document.querySelectorAll('[id^="language-"]');
    if (languageContainers.length === 0) {
      const errors = ["Au moins une langue est requise"];
      window.validationSystem.showValidationSummary(errors, "step-6");
      return false;
    }

    let isValid = true;

    // Valider chaque langue
    languageContainers.forEach((container, index) => {
      const langField = container.querySelector('[name="langue"]');
      const levelField = container.querySelector('[name="niveau"]');

      if (langField && !langField.value?.trim()) {
        window.validationSystem.showFieldError(
          langField.id || `langue-${index}`,
          `La langue est obligatoire pour l'entrée ${index + 1}`
        );
        isValid = false;
      }

      if (levelField && !levelField.value?.trim()) {
        window.validationSystem.showFieldError(
          levelField.id || `niveau-${index}`,
          `Le niveau est obligatoire pour l'entrée ${index + 1}`
        );
        isValid = false;
      }
    });

    if (!isValid) {
      const errorMessages = [];
      document.querySelectorAll(".error-message").forEach((errorEl) => {
        const message = errorEl.textContent.trim();
        if (message) errorMessages.push(message);
      });

      if (errorMessages.length > 0) {
        window.validationSystem.showValidationSummary(errorMessages, "step-6");
      }
    }

    return isValid;
  }

  getFieldLabel(fieldName) {
    const labels = {
      mission: "Le poste/mission",
      company: "L'entreprise",
      sector: "Le secteur",
      location: "Le lieu",
      startDate: "La date de début",
      endDate: "La date de fin",
      description: "La description",
      name: "Le nom",
      specialty: "La spécialité",
      university: "L'établissement",
      city: "La ville",
      organism: "L'organisme",
      langue: "La langue",
      niveau: "Le niveau",
    };
    return labels[fieldName] || fieldName;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(message) {
    // Utiliser SweetAlert si disponible, sinon alert simple
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "error",
        title: "Erreur de validation",
        text: message,
        confirmButtonColor: "#3B82F6",
      });
    } else {
      alert(message);
    }
  }

  updateProgressBar() {
    const progressBar = document.querySelector(".bg-blue-500");
    if (progressBar) {
      const progressPercentage = (this.currentStep / this.totalSteps) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    }
  }

  updateStepIndicators() {
    this.stepIndicators.forEach((indicatorId, index) => {
      const indicator = document.getElementById(indicatorId);
      if (indicator) {
        const stepNumber = index + 1;

        // Retirer toutes les classes d'état
        indicator.classList.remove("active", "completed", "pending");

        if (stepNumber < this.currentStep) {
          // Étape complétée
          indicator.classList.add("completed");
        } else if (stepNumber === this.currentStep) {
          // Étape actuelle
          indicator.classList.add("active");
        } else {
          // Étape future
          indicator.classList.add("pending");
        }
      }
    });
  }

  updateNavigationButtons() {
    // Mettre à jour le bouton "Précédent"
    const prevButtons = document.querySelectorAll(".prev-btn, .previousBtn");
    prevButtons.forEach((btn) => {
      btn.style.display = this.currentStep === 1 ? "none" : "inline-flex";
    });

    // Mettre à jour le bouton "Suivant"
    const nextButtons = document.querySelectorAll(
      ".next-btn, .nextBtn, .nextBtnInfo"
    );
    nextButtons.forEach((btn) => {
      if (this.currentStep === this.totalSteps) {
        btn.textContent = "Générer CV";
        btn.classList.add("bg-green-500", "hover:bg-green-600");
        btn.classList.remove("bg-blue-500", "hover:bg-blue-600");
      } else {
        btn.textContent = "Suivant";
        btn.classList.add("bg-blue-500", "hover:bg-blue-600");
        btn.classList.remove("bg-green-500", "hover:bg-green-600");
      }
    });
  }

  setupNavigationButtons() {
    // Boutons "Suivant"
    const nextButtons = document.querySelectorAll(
      ".next-btn, .nextBtn, .nextBtnInfo"
    );
    nextButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.nextStep();
      });
    });

    // Boutons "Précédent"
    const prevButtons = document.querySelectorAll(".prev-btn, .previousBtn");
    prevButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.previousStep();
      });
    });

    // Bouton Submit spécial (génération CV)
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.generateCV();
      });
    }

    // Navigation par les indicateurs d'étapes
    this.stepIndicators.forEach((indicatorId, index) => {
      const indicator = document.getElementById(indicatorId);
      if (indicator) {
        indicator.style.cursor = "pointer";
        indicator.addEventListener("click", () => {
          const targetStep = index + 1;
          if (
            targetStep <= this.currentStep ||
            this.canSkipToStep(targetStep)
          ) {
            this.showStep(targetStep);
          }
        });
      }
    });
  }

  canSkipToStep(stepNumber) {
    // Permettre de revenir à une étape précédente ou d'avancer si toutes les validations sont OK
    if (stepNumber <= this.currentStep) return true;

    // Valider toutes les étapes jusqu'à l'étape cible
    for (let i = 1; i < stepNumber; i++) {
      const tempStep = this.currentStep;
      this.currentStep = i;
      if (!this.validateCurrentStep()) {
        this.currentStep = tempStep;
        return false;
      }
    }
    this.currentStep = stepNumber;
    return true;
  }

  generateCV() {
    // Validation finale avant génération
    let allValid = true;
    for (let i = 1; i <= this.totalSteps; i++) {
      const tempStep = this.currentStep;
      this.currentStep = i;
      if (!this.validateCurrentStep()) {
        allValid = false;
        this.showError(
          `Veuillez compléter l'étape ${i} avant de générer le CV`
        );
        this.showStep(i);
        return;
      }
      this.currentStep = tempStep;
    }

    if (allValid) {
      // Directement déclencher la sélection de template
      this.showTypeSelection();
    }
  }

  showTypeSelection() {
    const step6Section = document.getElementById("step-6");
    const typeSelectionSection = document.querySelector(
      ".type-selection-section"
    );

    if (step6Section && typeSelectionSection) {
      step6Section.style.display = "none";
      typeSelectionSection.style.display = "flex";
      typeSelectionSection.classList.remove("hidden");
    }
  }

  returnToHero() {
    const heroSection = document.getElementById("heroSection");
    const formSection = document.getElementById("formulaire");

    if (heroSection && formSection) {
      formSection.style.display = "none";
      heroSection.style.display = "block";
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Méthode publique pour aller à une étape spécifique
  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.showStep(stepNumber);
    }
  }
}

// CSS pour les animations
const stepStyles = document.createElement("style");
stepStyles.textContent = `
    .fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .step-indicator {
        transition: all 0.3s ease;
        transform: scale(1);
    }
    
    .step-indicator:hover {
        transform: scale(1.1);
    }
    
    .step-form {
        min-height: 400px;
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(stepStyles);

// Initialiser le navigateur d'étapes quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
  // Attendre un peu pour que les autres scripts se chargent
  setTimeout(() => {
    window.stepNavigator = new StepNavigator();
    console.log("✅ Step Navigator initialized successfully!");
  }, 100);
});

// Export pour utilisation externe
if (typeof module !== "undefined" && module.exports) {
  module.exports = StepNavigator;
}
