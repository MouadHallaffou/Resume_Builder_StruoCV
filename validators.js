// Centralisation des fonctions de validation pour chaque section du formulaire

export function validatePersonalInfo(data) {
  let isValid = true;
  const errors = {};
  // Nom complet
  const fullNamePattern = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/;
  if (!fullNamePattern.test(data.fullName?.trim() || "")) {
    isValid = false;
    errors.fullName = "Nom complet invalide";
  }
  // Profil
  if (!data.profile || data.profile.trim() === "") {
    isValid = false;
    errors.profile = "Profil requis";
  }
  // Email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(data.email?.trim() || "")) {
    isValid = false;
    errors.email = "Email invalide";
  }
  // Téléphone
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(data.phone?.trim() || "")) {
    isValid = false;
    errors.phone = "Téléphone invalide";
  }
  // Adresse
  if (!data.address || data.address.trim() === "") {
    isValid = false;
    errors.address = "Adresse requise";
  }
  // LinkedIn
  const linkedinPattern =
    /^https:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  if (!linkedinPattern.test(data.linkedinUrl?.trim() || "")) {
    isValid = false;
    errors.linkedinUrl = "Lien LinkedIn invalide";
  }
  // GitHub
  const githubPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/;
  if (!githubPattern.test(data.githubUrl?.trim() || "")) {
    isValid = false;
    errors.githubUrl = "Lien GitHub invalide";
  }
  // À propos de moi
  if (
    !data.aboutMe ||
    data.aboutMe.trim().length < 50 ||
    data.aboutMe.trim().length > 1000
  ) {
    isValid = false;
    errors.aboutMe =
      "À propos de moi doit contenir entre 50 et 1000 caractères";
  }
  // Photo
  if (!data.photo) {
    isValid = false;
    errors.photo = "Photo de profil requise";
  }
  return { isValid, errors };
}

export function validateExperience(experiences) {
  let isValid = true;
  const errors = [];
  if (!Array.isArray(experiences) || experiences.length === 0) {
    isValid = false;
    errors.push("Au moins une expérience requise");
  }
  experiences.forEach((exp, idx) => {
    if (
      !exp.mission ||
      !exp.company ||
      !exp.sector ||
      !exp.location ||
      !exp.startDate ||
      !exp.endDate ||
      !exp.description
    ) {
      isValid = false;
      errors.push(`Expérience ${idx + 1} : tous les champs sont obligatoires`);
    }
    if (exp.startDate > exp.endDate) {
      isValid = false;
      errors.push(
        `Expérience ${idx + 1} : date de début supérieure à la date de fin`
      );
    }
  });
  return { isValid, errors };
}

export function validateDiplomas(diplomas) {
  let isValid = true;
  const errors = [];
  if (!Array.isArray(diplomas) || diplomas.length === 0) {
    isValid = false;
    errors.push("Au moins un diplôme requis");
  }
  diplomas.forEach((diplome, idx) => {
    if (
      !diplome.name ||
      !diplome.specialty ||
      !diplome.startDate ||
      !diplome.endDate ||
      !diplome.university ||
      !diplome.city ||
      !diplome.description
    ) {
      isValid = false;
      errors.push(`Diplôme ${idx + 1} : tous les champs sont obligatoires`);
    }
    if (diplome.startDate > diplome.endDate) {
      isValid = false;
      errors.push(
        `Diplôme ${idx + 1} : date de début supérieure à la date de fin`
      );
    }
  });
  return { isValid, errors };
}

export function validateCertificates(certificates) {
  let isValid = true;
  const errors = [];
  if (!Array.isArray(certificates) || certificates.length === 0) {
    isValid = false;
    errors.push("Au moins un certificat requis");
  }
  certificates.forEach((cert, idx) => {
    if (!cert.name || !cert.organism || !cert.startDate || !cert.endDate) {
      isValid = false;
      errors.push(`Certificat ${idx + 1} : tous les champs sont obligatoires`);
    }
    if (cert.startDate > cert.endDate) {
      isValid = false;
      errors.push(
        `Certificat ${idx + 1} : date de début supérieure à la date de fin`
      );
    }
  });
  return { isValid, errors };
}

export function validateSkills({ softSkills, hardSkills }) {
  let isValid = true;
  const errors = [];
  if (!Array.isArray(softSkills) || softSkills.length === 0) {
    isValid = false;
    errors.push("Au moins une compétence interpersonnelle requise");
  }
  if (!Array.isArray(hardSkills) || hardSkills.length === 0) {
    isValid = false;
    errors.push("Au moins une compétence technique requise");
  }
  return { isValid, errors };
}

export function validateLanguages(languages) {
  let isValid = true;
  const errors = [];
  if (!Array.isArray(languages) || languages.length === 0) {
    isValid = false;
    errors.push("Au moins une langue requise");
  }
  languages.forEach((lang, idx) => {
    if (!lang.langue || !lang.niveau) {
      isValid = false;
      errors.push(`Langue ${idx + 1} : tous les champs sont obligatoires`);
    }
  });
  return { isValid, errors };
}
