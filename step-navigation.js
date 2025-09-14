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
    // Utiliser le FormManager pour valider les expériences
    if (window.formManager && window.formManager.validateExperiences) {
      return window.formManager.validateExperiences();
    }
    return true; // Par défaut, permettre de passer
  }

  validateDiplomas() {
    // Sauvegarder les diplômes avant validation
    if (window.formManager && window.formManager.saveDiplomes) {
      window.formManager.saveDiplomes();
    }
    return true; // Permettre de passer même sans diplôme
  }

  validateCertificates() {
    // Sauvegarder les certificats avant validation
    if (window.formManager && window.formManager.saveCertificates) {
      window.formManager.saveCertificates();
    }
    return true; // Permettre de passer même sans certificat
  }

  validateSkills() {
    // Les compétences sont déjà sauvegardées en temps réel
    return true; // Permettre de passer même sans compétence
  }

  validateLanguages() {
    // Les langues sont déjà sauvegardées en temps réel
    return true; // Permettre de passer même sans langue
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
