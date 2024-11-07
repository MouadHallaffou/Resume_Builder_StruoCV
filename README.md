# Générateur de CV en Ligne

Ce projet est une application web permettant de créer, personnaliser et sauvegarder un CV à l'aide d'un formulaire à étapes avec une barre de progression et plusieurs modèles de CV. Les utilisateurs peuvent ajouter dynamiquement des informations personnelles et professionnelles, prévisualiser leurs choix et télécharger leur CV au format PDF.

## Contexte du Projet

Développé dans le cadre d'un exercice individuel à YouCode, ce projet met en œuvre des pratiques d'interface utilisateur modernes, l’optimisation des performances et la validation des formulaires côté client. Les fonctionnalités offrent une expérience utilisateur guidée, intuitive et interactive pour la création de CV.

## Fonctionnalités Clés

### 1. Formulaire à Étapes (Stepper Form) avec Validation
   - **Informations personnelles** : Nom, photo de profil, email, téléphone, adresse, LinkedIn, GitHub, portfolio, etc.
   - **Détails professionnels** : Titre du poste et résumé de profil.
   - **Compétences** : Sections pour les compétences techniques et interpersonnelles, avec la possibilité d'ajouter dynamiquement des compétences.
   - **Langues** : Liste des langues maîtrisées avec le niveau, avec la possibilité d’ajouter des langues supplémentaires.
   - **Loisirs et intérêts** : Liste des loisirs avec ajout dynamique.
   - **Cursus universitaire** : Formulaires dynamiques permettant d’ajouter plusieurs parcours académiques.
   - **Expériences professionnelles** : Détails des emplois précédents, avec ajout dynamique de plusieurs expériences.
   - **Certifications** : Liste des certifications avec noms et liens associés, ajout dynamique de nouvelles certifications.

### 2. Suivi de l’Avancement
   - Une barre de progression dynamique affiche l'avancement de l'utilisateur dans la création de son CV.

### 3. Modèles de CV Personnalisables
   - Offrir deux modèles de CV que l’utilisateur peut choisir et prévisualiser en temps réel.

### 4. Options de Sauvegarde
   - Enregistrement des CV créés dans l'application pour une utilisation future ou des modifications.

### 5. Validation des Champs
   - Validation selon le type de champ (email, téléphone, URL) pour garantir la précision des informations.

## Technologies Utilisées

- **HTML5**
- **Tailwind CSS**
- **JavaScript (DOM natif)**

## User Stories

### 1. Création du CV
   - En tant qu'utilisateur, je souhaite créer un CV en remplissant un formulaire à étapes.
   - **Critères d'acceptation** :
     - Le formulaire est structuré en étapes claires.
     - La navigation entre les étapes conserve les données saisies.

### 2. Formulaire à Étapes
   - En tant qu'utilisateur, je souhaite suivre un formulaire divisé en étapes pour une saisie guidée.
   - **Critères d'acceptation** :
     - Chaque étape est clairement définie, avec navigation fluide et barre de progression.

### 3. Formulaires Dynamiques pour Entrées Multiples
   - En tant qu'utilisateur, je souhaite ajouter dynamiquement des compétences, langues, expériences, etc.
   - **Critères d'acceptation** :
     - Boutons "Ajouter" pour chaque section pertinente.
     - Champs supplémentaires apparaissent instantanément.

### 4. Validation des Champs
   - En tant qu'utilisateur, je souhaite des messages d'erreur pour les champs invalides.
   - **Critères d'acceptation** :
     - Chaque champ est validé selon son type avec message d'erreur clair.
     - Impossible de passer à l'étape suivante si les champs sont invalides.

### 5. Suivi de l’Avancement
   - En tant qu'utilisateur, je souhaite une barre de progression qui montre mon avancement.
   - **Critères d'acceptation** :
     - Barre dynamique se met à jour avec l’avancée.

### 6. Choix du Modèle de CV
   - En tant qu'utilisateur, je souhaite choisir parmi deux modèles de CV.
   - **Critères d'acceptation** :
     - Prévisualisation des modèles avec possibilité de changer.

### 7. Téléchargement et Impression du CV
   - En tant qu'utilisateur, je souhaite télécharger ou imprimer mon CV.
   - **Critères d'acceptation** :
     - Boutons pour téléchargement en PDF et impression directe.
     - Mise en page respectée dans le fichier PDF.

## Modalités Pédagogiques

- **Travail** : Individuel.
- **Durée** : 6 jours.
- **Dates** : Lancement - 07/11/2024, Date limite de soumission - 15/11/2024 avant 12h30.

## Modalités d'Évaluation

- Présentation du travail en 20 minutes :
  - 5 minutes : Démonstration de l’application.
  - 15 minutes : Explication du code.
- Challenge de classe et QCM (1h15).

## Livrables

1. **Premier livrable** (avant le 07/11/2024 à 17h30) :
   - Lien vers la planification des tâches (Trello/Jira).
   - Lien vers le repository GitHub contenant le `README`.

2. **Deuxième livrable** (avant 15/11/2024 à 12h30) :
   - Lien vers le repository GitHub avec le code source complet.
   - Lien vers le site web hébergé sur GitHub Pages.

## Critères de Performance

- **Performance** : Navigation fluide, optimisation des éléments de la page, validation côté client, animations CSS légères.
- **Responsive Design** : Affichage fluide sur tous types d'écrans.
- **Accessibilité** : Score minimum de 90/100 sur Lighthouse pour les mobiles et tablettes.
- **Qualité du Code** : Code JavaScript optimisé, absence de fuites de mémoire et dépendances réduites.

## Installation

1. **Cloner le Repository** :
   ```bash
   git clone https://github.com/MouadHallaffou/Resume_Builder_StruoCV

## Author
----------

* [@MouadHallaffou](https://github.com/MouadHallaffou)
