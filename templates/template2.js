// Template 2 : CV Classic
export function renderTemplate2(data) {
  return `
    <section class="bg-white">
      <div class="a4-container border border-gray-400 shadow-md rounded-lg p-6">
        <div class="left-section w-1/3">
          <div class="section-item mt-2 flex flex-col items-center">
            <img src="${data.photo}" alt="Photo de profil" />
            <h2 class="text-lg font-bold text-center">${data.fullName}</h2>
            <p class="text-sm text-gray-700 text-center">${data.profile}</p>
          </div>
          <div class="section-item mt-2">
            <h3 class="section-title text-lg mx-4 text-center">Contacts:</h3>
            <p class="section-content text-sm flex items-center space-x-2 mx-4">
              <i class="fas fa-envelope"></i>
              <span>${data.email}</span>
            </p>
            <p class="section-content text-sm flex items-center space-x-2 mx-4">
              <i class="fas fa-phone"></i>
              <span>${data.phone}</span>
            </p>
            <p class="section-content text-sm flex items-center space-x-2 mx-4">
              <i class="fas fa-location"></i>
              <span>${data.address}</span>
            </p>
          </div>
          <div class="section-item mt-2">
            <h3 class="section-title text-lg text-center mx-4">Langues:</h3>
            <ul class="text-sm text-left mx-4 space-y-2">
              ${data.languages
                .map((lang) => `<li>${lang.langue} : ${lang.niveau}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
        <div class="right-section w-2/3">
          <div class="section-item mt-2">
            <h3 class="section-title text-lg">Expériences professionnelles:</h3>
            ${data.experiences
              .map(
                (exp) => `
              <div class="experience mb-2 text-sm">
                <p><strong>${exp.mission}</strong> || ${exp.company}</p>
                <p>${exp.sector} || ${exp.location}</p>
                <p>Depuis: ${exp.startDate} jusqu'à: ${exp.endDate}</p>
                <p>${exp.description}</p>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="section-item mt-2">
            <h3 class="section-title text-lg">Diplômes:</h3>
            ${data.diplomas
              .map(
                (diplome) => `
              <div class="degree mb-2 text-sm">
                <h6>${diplome.name} || ${diplome.specialty}</h6>
                <p>${diplome.university} || ${diplome.city}</p>
                <p>Depuis: ${diplome.startDate} jusqu'à: ${diplome.endDate}</p>
                <p>${diplome.description}</p>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="section-item mt-2">
            <h3 class="section-title text-lg">Certifications:</h3>
            ${data.certificates
              .map(
                (cert) => `
              <div class="certificate mb-2 text-sm">
                <p>Spécialité : ${cert.name} || Organisme : ${cert.organism}</p>
                <p>depuis: ${cert.startDate} jusqua: ${cert.endDate}</p>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="section-item mt-2">
            <h3 class="section-title text-lg">Compétences:</h3>
            <div class="skills">
              <div class="certificate mb-4">
                <h4 class="text-xs font-semibold">Compétences interpersonnelles:</h4>
                <ul class="list-none list-inside text-sm text-left">
                  ${data.softSkills
                    .map((skill) => `<li>${skill}</li>`)
                    .join("")}
                </ul>
              </div>
              <div class="certificate mb-4">
                <h4 class="text-xs font-semibold">Compétences techniques:</h4>
                <ul class="list-none list-inside text-sm text-left">
                  ${data.hardSkills
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
}
