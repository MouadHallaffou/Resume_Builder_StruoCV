const userdonner = {
    contact: {
      nomComplet,
      profile,
      email,
      telephone,
      adresse,
      linkdIn,
      github,
      aboutMe,
      imageProfile,
    },
    experiences: [],
    education: [],
    certificats: [],
    skills: [],
    loisirs: [],
    langues: [],
  };
  
  function informationPersonnelle () {
      userdonner.contact = {
          nomComplet: document.getElementById("fullName").value,
          profile: document.getElementById("jobLocation").value,
          email: document.getElementById("email").value,
          telephone: document.getElementById("phone").value,
          adresse: document.getElementById("adresse").value,
          linkdIn: document.getElementById("linkedin").value,
          github: document.getElementById("github").value,
          aboutMe: document.getElementById("aboutMe").value,
          imageProfile: document.getElementById("profileImage").value,
      };
  }
  
  function addExperience() {
      const experiences = {
          mission: document.getElementById("experience-mission").value,
          sector: document.getElementById("experience-sector").value,
          startDate: document.getElementById("experience-start-date").value,
          endDate: document.getElementById("experience-end-date").value,
          company: document.getElementById("experience-company").value,
          location: document.getElementById("experience-location").value,
          description: document.getElementById("experience-description").value,
      };
      userdonner.experiences.push(experiences);
  }
  
  function addEducation() {
      const education = {
          institution: document.getElementById("education-institution").value,
          degree: document.getElementById("education-degree").value,
          startDate: document.getElementById("education-start-date").value,
          endDate: document.getElementById("education-end-date").value,
          description: document.getElementById("education-description").value,
      };
      userdonner.education.push(education);
  }
  
  function addCertificats() {
      const certificat = {
          nom: document.getElementById("certificat-name").value,
          organisime: document.getElementById("certificat-organization").value,
          datedebut: document.getElementById("certificat-start-date").value,
          dateFin: document.getElementById("certificat-end-date").value,
      };
      userdonner.certificats.push(certificat);
  }
  
  