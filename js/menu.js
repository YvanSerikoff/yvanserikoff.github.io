// Sélectionne tous les liens du menu
const menuLinks = document.querySelectorAll('header nav a, h1 a');

// Écouteur d'événements pour chaque lien
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut

        const targetId = link.getAttribute('href'); // Récupère l'ID de la section cible
        const targetSection = document.querySelector(targetId); // Sélectionne la section cible

        // Calcule la position de la section cible
        const topPosition = targetSection.offsetTop;

        // Défilement vers la section cible
        window.scrollTo({
            top: topPosition,
            behavior: 'smooth' // Défilement doux
        });
    });
});
