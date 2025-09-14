// ==========================================
// SYSTÈME DE VALIDATION AVANCÉ AVEC UX PROFESSIONNELLE
// ==========================================

class ValidationSystem {
  constructor() {
    this.errors = new Map();
    this.fieldValidators = new Map();
    this.realTimeValidation = true;
    this.init();
  }

  init() {
    this.setupRealTimeValidation();
    this.setupCustomValidators();
  }

  // ==========================================
  // AFFICHAGE DES ERREURS
  // ==========================================

  /**
   * Affiche une erreur sous un champ spécifique
   * @param {string} fieldId - ID du champ
   * @param {string} message - Message d'erreur
   */
  showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Supprimer l'erreur existante
    this.clearFieldError(fieldId);

    // Ajouter la classe d'erreur au champ
    field.classList.add("input-error");
    field.classList.remove("input-valid");

    // Créer le conteneur d'erreur
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-message";
    errorContainer.id = `${fieldId}-error`;
    errorContainer.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;

    // Insérer l'erreur après le champ
    const fieldContainer = field.closest(".form-field") || field.parentNode;
    if (fieldContainer) {
      fieldContainer.appendChild(errorContainer);
    } else {
      field.parentNode.insertBefore(errorContainer, field.nextSibling);
    }

    // Ajouter l'icône d'erreur
    this.addFieldIcon(field, "error");
  }

  /**
   * Supprime l'erreur d'un champ
   * @param {string} fieldId - ID du champ
   */
  clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Supprimer les classes d'erreur
    field.classList.remove("input-error");

    // Supprimer le message d'erreur
    const errorMessage = document.getElementById(`${fieldId}-error`);
    if (errorMessage) {
      errorMessage.remove();
    }

    // Supprimer l'icône d'erreur
    this.removeFieldIcon(field);
  }

  /**
   * Affiche un message de succès pour un champ
   * @param {string} fieldId - ID du champ
   * @param {string} message - Message de succès (optionnel)
   */
  showFieldSuccess(fieldId, message = null) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Supprimer les erreurs existantes
    this.clearFieldError(fieldId);

    // Ajouter la classe de succès
    field.classList.add("input-valid");
    field.classList.remove("input-error");

    // Ajouter l'icône de succès
    this.addFieldIcon(field, "valid");

    // Afficher message de succès si fourni
    if (message) {
      const successContainer = document.createElement("div");
      successContainer.className = "success-message";
      successContainer.id = `${fieldId}-success`;
      successContainer.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      `;

      const fieldContainer = field.closest(".form-field") || field.parentNode;
      if (fieldContainer) {
        fieldContainer.appendChild(successContainer);
      }

      // Auto-supprimer après 3 secondes
      setTimeout(() => {
        if (successContainer && successContainer.parentNode) {
          successContainer.remove();
        }
      }, 3000);
    }
  }

  /**
   * Ajoute une icône au champ (erreur ou succès)
   * @param {HTMLElement} field - Élément du champ
   * @param {string} type - Type d'icône ('error' ou 'valid')
   */
  addFieldIcon(field, type) {
    this.removeFieldIcon(field);

    const icon = document.createElement("i");
    icon.className = `field-icon ${type}`;

    if (type === "error") {
      icon.classList.add("fas", "fa-exclamation-circle");
    } else if (type === "valid") {
      icon.classList.add("fas", "fa-check-circle");
    }

    // Positionner l'icône
    const fieldContainer = field.closest(".form-field") || field.parentNode;
    if (fieldContainer) {
      fieldContainer.style.position = "relative";
      fieldContainer.appendChild(icon);
    }
  }

  /**
   * Supprime l'icône du champ
   * @param {HTMLElement} field - Élément du champ
   */
  removeFieldIcon(field) {
    const fieldContainer = field.closest(".form-field") || field.parentNode;
    if (fieldContainer) {
      const existingIcon = fieldContainer.querySelector(".field-icon");
      if (existingIcon) {
        existingIcon.remove();
      }
    }
  }

  // ==========================================
  // RÉSUMÉ DE VALIDATION GLOBAL
  // ==========================================

  /**
   * Affiche un résumé des erreurs de validation
   * @param {Array} errors - Liste des erreurs
   * @param {string} containerId - ID du conteneur où afficher le résumé
   */
  showValidationSummary(errors, containerId = null) {
    if (!errors || errors.length === 0) return;

    const summaryHtml = `
      <div class="validation-summary">
        <h4>
          <i class="fas fa-exclamation-triangle"></i>
          Veuillez corriger les erreurs suivantes :
        </h4>
        <ul>
          ${errors.map((error) => `<li>${error}</li>`).join("")}
        </ul>
      </div>
    `;

    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = summaryHtml + container.innerHTML;
      }
    }

    // Afficher également avec SweetAlert
    this.showSweetAlertErrors(errors);
  }

  /**
   * Affiche les erreurs avec SweetAlert de manière professionnelle
   * @param {Array} errors - Liste des erreurs
   */
  showSweetAlertErrors(errors) {
    if (typeof Swal === "undefined") return;

    const errorList = errors.map((error) => `• ${error}`).join("<br>");

    Swal.fire({
      icon: "error",
      title: "Validation échouée",
      html: `
        <div style="text-align: left; margin-top: 1rem;">
          <p style="margin-bottom: 1rem; color: #374151;">
            Veuillez corriger les erreurs suivantes avant de continuer :
          </p>
          <div style="
            background: rgba(239, 68, 68, 0.05);
            border-left: 4px solid #ef4444;
            padding: 1rem;
            border-radius: 0.25rem;
            font-size: 0.9rem;
            line-height: 1.5;
          ">
            ${errorList}
          </div>
        </div>
      `,
      confirmButtonText: "J'ai compris",
      confirmButtonColor: "#3B82F6",
      customClass: {
        popup: "validation-popup",
        title: "validation-title",
        content: "validation-content",
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

  /**
   * Affiche un message de succès global
   * @param {string} title - Titre du message
   * @param {string} message - Contenu du message
   */
  showSuccessAlert(title, message) {
    if (typeof Swal === "undefined") return;

    Swal.fire({
      icon: "success",
      title: title,
      text: message,
      confirmButtonText: "Continuer",
      confirmButtonColor: "#10B981",
      timer: 3000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInUp",
      },
    });
  }

  // ==========================================
  // VALIDATION EN TEMPS RÉEL
  // ==========================================

  /**
   * Configure la validation en temps réel
   */
  setupRealTimeValidation() {
    // Validation sur saisie (avec debounce)
    document.addEventListener(
      "input",
      this.debounce((e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
          this.validateFieldRealTime(e.target);
        }
      }, 500)
    );

    // Validation sur perte de focus
    document.addEventListener(
      "blur",
      (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
          this.validateFieldRealTime(e.target);
        }
      },
      true
    );

    // Validation sur changement (pour select, checkbox, radio)
    document.addEventListener("change", (e) => {
      if (["SELECT", "INPUT"].includes(e.target.tagName)) {
        this.validateFieldRealTime(e.target);
      }
    });
  }

  /**
   * Valide un champ en temps réel
   * @param {HTMLElement} field - Champ à valider
   */
  validateFieldRealTime(field) {
    if (!this.realTimeValidation) return;

    const fieldId = field.id;
    if (!fieldId) return;

    // Ajouter l'état de validation en cours
    field.classList.add("validating");

    setTimeout(() => {
      field.classList.remove("validating");

      // Effectuer la validation
      const isValid = this.validateSingleField(field);

      if (isValid) {
        this.showFieldSuccess(fieldId);
      }
    }, 300);
  }

  /**
   * Valide un champ individuel
   * @param {HTMLElement} field - Champ à valider
   * @returns {boolean} - True si valide
   */
  validateSingleField(field) {
    const fieldType = field.type || field.tagName.toLowerCase();
    const value = field.value?.trim() || "";
    const fieldId = field.id;

    // Vérifications de base
    if (field.hasAttribute("required") && !value) {
      this.showFieldError(fieldId, "Ce champ est obligatoire");
      return false;
    }

    // Validations spécifiques par type
    switch (fieldType) {
      case "email":
        if (value && !this.isValidEmail(value)) {
          this.showFieldError(fieldId, "Veuillez saisir un email valide");
          return false;
        }
        break;

      case "tel":
        if (value && !this.isValidPhone(value)) {
          this.showFieldError(
            fieldId,
            "Veuillez saisir un numéro de téléphone valide"
          );
          return false;
        }
        break;

      case "url":
        if (value && !this.isValidUrl(value)) {
          this.showFieldError(fieldId, "Veuillez saisir une URL valide");
          return false;
        }
        break;

      case "date":
        if (value && !this.isValidDate(value)) {
          this.showFieldError(fieldId, "Veuillez saisir une date valide");
          return false;
        }
        break;
    }

    // Validations personnalisées
    const customValidator = this.fieldValidators.get(fieldId);
    if (customValidator) {
      const result = customValidator(value, field);
      if (result !== true) {
        this.showFieldError(fieldId, result);
        return false;
      }
    }

    this.clearFieldError(fieldId);
    return true;
  }

  // ==========================================
  // VALIDATEURS UTILITAIRES
  // ==========================================

  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  isValidDate(date) {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  }

  /**
   * Debounce function pour optimiser les performances
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ==========================================
  // VALIDATEURS PERSONNALISÉS
  // ==========================================

  /**
   * Configure les validateurs personnalisés
   */
  setupCustomValidators() {
    // Validateur pour nom complet
    this.addFieldValidator("fullName", (value) => {
      if (value.length < 2) return "Le nom doit contenir au moins 2 caractères";
      if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(value))
        return "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes";
      return true;
    });

    // Validateur pour LinkedIn
    this.addFieldValidator("linkedinUrl", (value) => {
      if (value && !value.includes("linkedin.com"))
        return "Veuillez saisir un lien LinkedIn valide";
      return true;
    });

    // Validateur pour GitHub
    this.addFieldValidator("githubUrl", (value) => {
      if (value && !value.includes("github.com"))
        return "Veuillez saisir un lien GitHub valide";
      return true;
    });

    // Validateur pour description "À propos"
    this.addFieldValidator("aboutMe", (value) => {
      if (value.length < 50)
        return "La description doit contenir au moins 50 caractères";
      if (value.length > 1000)
        return "La description ne peut pas dépasser 1000 caractères";
      return true;
    });
  }

  /**
   * Ajoute un validateur personnalisé pour un champ
   * @param {string} fieldId - ID du champ
   * @param {function} validator - Fonction de validation
   */
  addFieldValidator(fieldId, validator) {
    this.fieldValidators.set(fieldId, validator);
  }

  // ==========================================
  // MÉTHODES PUBLIQUES
  // ==========================================

  /**
   * Valide tous les champs d'un formulaire
   * @param {string} formId - ID du formulaire
   * @returns {object} - Résultat de validation
   */
  validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return { isValid: false, errors: ["Formulaire non trouvé"] };

    const fields = form.querySelectorAll("input, textarea, select");
    const errors = [];
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateSingleField(field)) {
        isValid = false;
        const errorMessage = document.getElementById(`${field.id}-error`);
        if (errorMessage) {
          errors.push(errorMessage.textContent.trim());
        }
      }
    });

    return { isValid, errors };
  }

  /**
   * Nettoie toutes les erreurs de validation
   */
  clearAllErrors() {
    // Supprimer tous les messages d'erreur
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll(".success-message").forEach((el) => el.remove());
    document
      .querySelectorAll(".validation-summary")
      .forEach((el) => el.remove());

    // Supprimer toutes les classes d'erreur
    document.querySelectorAll(".input-error").forEach((el) => {
      el.classList.remove("input-error");
    });

    document.querySelectorAll(".input-valid").forEach((el) => {
      el.classList.remove("input-valid");
    });

    // Supprimer toutes les icônes
    document.querySelectorAll(".field-icon").forEach((el) => el.remove());
  }

  /**
   * Active/désactive la validation en temps réel
   * @param {boolean} enabled - Activer ou non
   */
  setRealTimeValidation(enabled) {
    this.realTimeValidation = enabled;
  }
}

// Export de la classe et création d'une instance globale
window.ValidationSystem = ValidationSystem;
window.validationSystem = new ValidationSystem();

// Export pour modules ES6
export { ValidationSystem };
