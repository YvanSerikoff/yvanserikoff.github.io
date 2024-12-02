window.addEventListener('load', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = 1;
    let itemWidth = items[0].getBoundingClientRect().width;

    // Clone du premier et du dernier élément
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    // Ajout des clones au DOM
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // Recalculer la largeur des éléments après les clones
    itemWidth = items[0].getBoundingClientRect().width;

    // Mise à jour de l'offset initial
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

    // Création des indicateurs
    const indicators = items.map((_, index) => {
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            currentIndex = index + 1; // Décalage pour prendre en compte le clone
            updateCarousel();
            updateIndicators();
        });
        indicatorsContainer.appendChild(button);
        return button;
    });

    const updateIndicators = () => {
        indicators.forEach((button, index) => {
            button.classList.toggle('active', index === currentIndex - 1);
        });
    };

    const updateCarousel = (animate = true) => {
        track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    };

    // Événements pour les boutons
    nextButton.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
        if (currentIndex === items.length + 1) {
            setTimeout(() => {
                currentIndex = 1;
                updateCarousel(false);
            }, 500);
        }
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
        if (currentIndex === 0) {
            setTimeout(() => {
                currentIndex = items.length;
                updateCarousel(false);
            }, 500);
        }
    });

    // Redimensionnement dynamique pour conserver le carrousel adaptatif
    window.addEventListener('resize', () => {
        itemWidth = items[0].getBoundingClientRect().width;
        updateCarousel(false);
    });

    // Initialiser les indicateurs
    updateIndicators();
    // Mise à jour de la position du carrousel après le chargement de la page
    updateCarousel(false);
});
