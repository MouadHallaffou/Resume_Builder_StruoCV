// Script de test pour vérifier le système de validation
console.log("=== TEST DU SYSTÈME DE VALIDATION ===");

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé, début des tests...");

  // Test 1: Vérifier que le système de validation est chargé
  if (window.validationSystem) {
    console.log("✅ Système de validation chargé avec succès");
  } else {
    console.error("❌ Système de validation non trouvé");
    return;
  }

  // Test 2: Vérifier les champs principaux
  const fields = ["fullName", "profile", "email", "phone"];
  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      console.log(`✅ Champ ${fieldId} trouvé`);
    } else {
      console.warn(`⚠️ Champ ${fieldId} non trouvé`);
    }
  });

  // Test 3: Tester la validation en temps réel (après 2 secondes)
  setTimeout(() => {
    console.log("Test de validation en temps réel...");

    // Simuler une saisie incorrecte
    const emailField = document.getElementById("email");
    if (emailField) {
      emailField.value = "email-invalide";
      emailField.dispatchEvent(new Event("blur"));
      console.log("Test email invalide déclenché");
    }

    // Simuler une saisie correcte
    setTimeout(() => {
      if (emailField) {
        emailField.value = "test@example.com";
        emailField.dispatchEvent(new Event("blur"));
        console.log("Test email valide déclenché");
      }
    }, 1000);
  }, 2000);

  // Test 4: Vérifier SweetAlert
  if (typeof Swal !== "undefined") {
    console.log("✅ SweetAlert disponible");
  } else {
    console.warn("⚠️ SweetAlert non disponible");
  }

  console.log("Tests initialisés. Vérifiez la console pour les résultats.");
});
