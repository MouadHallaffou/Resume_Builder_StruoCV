const heroSection = document.getElementById('heroSection')
    const startedBtn = document.getElementById('startedBtn')
    startedBtn.addEventListener('click',() =>{
      heroSection.style.display = 'none'
    })

// JavaScript pour afficher/masquer le formulaire d'expérience
document.getElementById("toggle-experience-form").addEventListener("click", function() {
  const form = document.getElementById("experience-form");
  // Si le formulaire est caché, on l'affiche; sinon, on le cache
  form.classList.toggle("hidden");
});

