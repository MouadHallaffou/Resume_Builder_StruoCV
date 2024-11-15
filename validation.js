function informationPersonal() {
  let isValid = true;
  const suivantBtnInfoPer = document.getElementById('nextBtnInfo');

  suivantBtnInfoPer.addEventListener('click', () => {
    // Validation pour l'email
    const emailValidation = document.getElementById('email');
    const emailErreur = document.getElementById('emailErreur');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailValidation.value)) {
      emailErreur.classList.remove('hidden');
      isValid = false;
    } else {
      emailErreur.classList.add('hidden');
    }

    // Validation pour le nom complet
    const fullName = document.getElementById('fullName');
    const fullNameError = fullName.nextElementSibling;
    if (fullName.value.trim().length < 3) {
      fullNameError.textContent = '*Veuillez entrer un nom valide (minimum 3 caractères).';
      fullNameError.classList.remove('hidden');
      isValid = false;
    } else {
      fullNameError.classList.add('hidden');
    }

    // Validation pour le téléphone
    const phoneValidation = document.getElementById('phone');
    const phoneError = document.getElementById('phoneErreur');
    const phonePattern = /^[0-9]{10}$/; 
    if (!phonePattern.test(phoneValidation.value)) {
      phoneError.textContent = '*Veuillez entrer un numéro de téléphone valide (10 chiffres).';
      phoneError.classList.remove('hidden');
      isValid = false;
    } else {
      phoneError.classList.add('hidden');
    }

    

    
    if (isValid) {
      alert('Tous les champs sont valides, vous pouvez continuer.');
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire avant de continuer.');
    }
  });
}












































































