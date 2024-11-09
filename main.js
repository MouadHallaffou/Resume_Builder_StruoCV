const heroSection = document.getElementById("heroSection");
const startedBtn = document.getElementById("startedBtn");
    startedBtn.addEventListener("click",() =>{
      heroSection.style.display = "none";
    })

// Sélection des éléments du formulaire et de la barre de progression
const progressBar = document.getElementById("progress-bar");

// Sélection des étapes du formulaire
const formInfoPersonelles = document.getElementById("step-1");
const formExperiences = document.getElementById("step-2");
const formDiplomes = document.getElementById("step-3");
const formCertificats = document.getElementById("step-4");
const formLangues = document.getElementById("step-5");

// Sélection des étapes de progression affichées dans l'interface
const stepExperience = document.getElementById("step2");
const stepDiplomes = document.getElementById("step3");
const stepCertificats = document.getElementById("step4");
const stepLangues = document.getElementById("step5");

// Sélection des boutons "Suivant" pour passer aux étapes suivantes
const buttonSuivantInfo = document.getElementById("nextBtnInfo");
const buttonSuivantExp = document.getElementById("nextBtnExp");
const buttonSuivantDiplomes = document.getElementById("nextBtnDiplomes");
const buttonSuivantCertificats = document.getElementById("nextBtnCertificats");

// Sélection des boutons "Précédent" pour revenir aux étapes précédentes
const precedentFormExp = document.getElementById('prevBtnExp');
const precedentFormDiplomes = document.getElementById('prevBtnDiplomes');
const precedentFormCertificats = document.getElementById('prevBtnCertificats');
const precedentFormLangues= document.getElementById('prevBtnLangues');

// Définition des styles pour les différentes étapes du formulaire
const styleStep0 = "flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const styleStep1 = "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const styleStep2 = "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const styleStep3 = "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";
const styleStep4 = "flex items-center justify-center w-10 h-10 bg-blue-200 text-white font-bold rounded-full transition-all duration-500 ease-in-out";

// Définition des styles pour la barre de progression à chaque étape
const styleProgressBar1 = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 w-0/5 transition-all duration-500 ease-in-out";
const styleProgressBar2 = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 w-1/5 transition-all duration-500 ease-in-out";
const styleProgressBar3 = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 w-2/5 transition-all duration-500 ease-in-out";
const styleProgressBar4 = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 w-3/5 transition-all duration-500 ease-in-out";
const styleProgressBar5 = "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 w-4/5 transition-all duration-500 ease-in-out";

// Fonction pour passer de l'étape "Informations Personnelles" à "Expériences"
buttonSuivantInfo.addEventListener("click",()=>{
    formInfoPersonelles.style.display = "none";
    formExperiences.style.display = "block";
    stepExperience.className = styleStep0;
    progressBar.className = styleProgressBar2;
})

// Fonction pour passer de l'étape "Expériences" à "Diplômes"
buttonSuivantExp.addEventListener("click",()=>{
  formExperiences.style.display = "none";
  formDiplomes.style.display = "block";
  stepDiplomes.className = styleStep0;
  progressBar.className = styleProgressBar3;
})

// Fonction pour passer de l'étape "Diplômes" à "Certificats"
buttonSuivantDiplomes.addEventListener("click",()=>{
  formDiplomes.style.display = "none";
  formCertificats.style.display = "block";
  stepCertificats.className = styleStep0;
  progressBar.className = styleProgressBar4;
})

// Fonction pour passer de l'étape "Certificats" à "Langues"
buttonSuivantCertificats.addEventListener("click",()=>{
  formCertificats.style.display = "none";
  formLangues.style.display = "block";
  stepLangues.className = styleStep0;
  progressBar.className = styleProgressBar5;
})

// Fonction pour revenir de "Expériences" à "Informations Personnelles"
precedentFormExp.addEventListener("click",()=>{
  formInfoPersonelles.style.display = "block";
  formExperiences.style.display = "none";
  stepExperience.className = styleStep1;
  progressBar.className = styleProgressBar1;
})

// Fonction pour revenir de "Diplômes" à "Expériences"
precedentFormDiplomes.addEventListener("click",()=>{
  formExperiences.style.display = "block";
  formDiplomes.style.display = "none";
  stepDiplomes.className = styleStep2;
  progressBar.className = styleProgressBar2;
})

// Fonction pour revenir de "Certificats" à "Diplômes"
precedentFormCertificats.addEventListener("click",()=>{
  formDiplomes.style.display = "block";
  formCertificats.style.display = "none";
  stepCertificats.className = styleStep3;
  progressBar.className = styleProgressBar3;
})

// Fonction pour revenir de "Langues" à "Certificats"
precedentFormLangues.addEventListener("click",()=>{
  formCertificats.style.display = "block";
  formLangues.style.display = "none";
  stepLangues.className = styleStep4;
  progressBar.className = styleProgressBar4;
})



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
    `;
    // Ajouter l'expérience à la liste
    experienceList.appendChild(experienceItem);
    // Réinitialiser le formulaire
    experienceForm.reset();
});

