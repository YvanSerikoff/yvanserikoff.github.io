/**
 * Gestion des onglets (tabs) pour les expériences et soft skills
 */
document.addEventListener('DOMContentLoaded', function() {
  // Gestion des onglets d'expériences
  const expTabButtons = document.querySelectorAll('.exp-tab-btn');
  const expTabContents = document.querySelectorAll('.exp-tab-content');

  expTabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Retirer la classe 'active' de tous les boutons et contenus
      expTabButtons.forEach(btn => btn.classList.remove('active'));
      expTabContents.forEach(content => content.classList.remove('active'));

      // Ajouter 'active' au bouton et contenu cliqué
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // Accessibilité : permettre la navigation au clavier (arrows)
  expTabButtons.forEach((button, index) => {
    button.addEventListener('keydown', function(e) {
      let nextButton;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextButton = expTabButtons[index + 1] || expTabButtons[0];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextButton = expTabButtons[index - 1] || expTabButtons[expTabButtons.length - 1];
      }
      if (nextButton) {
        nextButton.focus();
        nextButton.click();
      }
    });
  });
});

