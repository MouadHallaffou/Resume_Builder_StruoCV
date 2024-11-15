// Sélection les elements du formulaire informations personnelles

const form = document.querySelector("#formInfoPersonnelle");
const nextBtnInfo = document.getElementById("nextBtnInfo");

const fullName = document.getElementById("fullName");
const jobLocation = document.getElementById("jobLocation");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const adresse = document.getElementById("adresse");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const aboutMe = document.getElementById("aboutMe");
const profileImage = document.getElementById("profileImage");

const fullNameError = document.getElementById("fullNameError");
const jobLocationError = document.getElementById("jobLocationError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const adresseError = document.getElementById("adresseError");
const linkedinError = document.getElementById("linkedinError");
const githubError = document.getElementById("githubError");
const aboutMeError = document.getElementById("aboutMeError");
const profileImageError = document.getElementById("profileImageError");

const validateForm = () => {
  let isValid = true;

  if (fullName.value.trim() === "") {
    fullNameError.classList.remove("hidden");
    isValid = false;
  } else {
    fullNameError.classList.add("hidden");
  }

  if (jobLocation.value.trim() === "") {
    jobLocationError.classList.remove("hidden");
    isValid = false;
  } else {
    jobLocationError.classList.add("hidden");
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    emailError.classList.add("hidden");
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone.value.trim())) {
    phoneError.classList.remove("hidden");
    isValid = false;
  } else {
    phoneError.classList.add("hidden");
  }

  if (adresse.value.trim() === "") {
    adresseError.classList.remove("hidden");
    isValid = false;
  } else {
    adresseError.classList.add("hidden");
  }

  if (linkedin.value.trim() === "") {
    linkedinError.classList.remove("hidden");
    isValid = false;
  } else {
    linkedinError.classList.add("hidden");
  }

  if (github.value.trim() === "") {
    githubError.classList.remove("hidden");
    isValid = false;
  } else {
    githubError.classList.add("hidden");
  }

  if (aboutMe.value.trim().length < 50 || aboutMe.value.trim().length > 1000) {
    aboutMeError.classList.remove("hidden");
    isValid = false;
  } else {
    aboutMeError.classList.add("hidden");
  }

  if (!profileImage.files.length) {
    profileImageError.classList.remove("hidden");
    isValid = false;
  } else {
    profileImageError.classList.add("hidden");
  }

  return isValid;
};
nextBtnInfo.addEventListener("click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    Suivantstep();
  }
});

document.getElementById("add-experience").addEventListener("click", function () {
  const startDate = document.getElementById("experience-start-date").value.trim();
  const endDate = document.getElementById("experience-end-date").value.trim();
  // YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate)) {
      alert("La Date de Début n'est pas dans un format valide (YYYY-MM-DD).");
      return;
  }
  if (!dateRegex.test(endDate)) {
      alert("La Date de Fin n'est pas dans un format valide (YYYY-MM-DD).");
      return;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
      alert("La Date de Début ne peut pas être postérieure à la Date de Fin.");
      return;
  }
  alert("Les dates sont valides !");
});
