/**
 * Timeline interactions — Gestion des toggles et accordéons
 */
(function () {
  // Gestion des toggles de timeline (expériences)
  const timelineToggles = document.querySelectorAll('.timeline-toggle');

  timelineToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const details = this.nextElementSibling;

      if (details && details.classList.contains('timeline-details')) {
        // Fermer les autres
        timelineToggles.forEach(t => {
          if (t !== this && t.getAttribute('aria-expanded') === 'true') {
            t.setAttribute('aria-expanded', 'false');
            const otherDetails = t.nextElementSibling;
            if (otherDetails && otherDetails.classList.contains('timeline-details')) {
              otherDetails.hidden = true;
            }
          }
        });

        // Basculer l'état actuel
        this.setAttribute('aria-expanded', String(!isExpanded));
        details.hidden = isExpanded;

        // Animer l'icône
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      }
    });
  });

  // Petite animation au scroll sur les cartes
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les cartes
  document.querySelectorAll('.pos-card, .timeline-content, .analysis-card, .soft-skill-card').forEach(card => {
    observer.observe(card);
  });

  // Ajouter l'animation CSS si elle n'existe pas
  if (!document.querySelector('style[data-animations="timeline"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'timeline');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .timeline-toggle i {
        transition: transform 0.3s cubic-bezier(0.34, 0.1, 0.64, 1);
      }
    `;
    document.head.appendChild(style);
  }
})();

