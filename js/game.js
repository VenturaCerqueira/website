// Game logic for "Ache o Camarão"
document.addEventListener('DOMContentLoaded', function() {
    const cardsGrid = document.getElementById('cards-grid');
    const attemptsCount = document.getElementById('attempts-count');
    const gameStatus = document.getElementById('game-status');
    const restartBtn = document.getElementById('restart-btn');

    let attempts = 3;
    let gameActive = true;
    let shrimpCardIndex = -1;

    // Initialize the game
    function initGame() {
        attempts = 3;
        gameActive = true;
        shrimpCardIndex = Math.floor(Math.random() * 9); // Random card from 0-8

        attemptsCount.textContent = attempts;
        gameStatus.textContent = 'Clique em uma carta para começar!';
        gameStatus.style.color = '#92400e';

        // Clear existing cards
        cardsGrid.innerHTML = '';

        // Create 9 cards
        for (let i = 0; i < 9; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = i;

            const icon = document.createElement('i');
            icon.className = 'fas fa-question card-icon';
            card.appendChild(icon);

            card.addEventListener('click', () => handleCardClick(i, card));
            cardsGrid.appendChild(card);
        }
    }

    // Handle card click
    function handleCardClick(index, cardElement) {
        if (!gameActive || cardElement.classList.contains('flipped')) {
            return;
        }

        cardElement.classList.add('flipped');
        const icon = cardElement.querySelector('.card-icon');

        if (index === shrimpCardIndex) {
            // Found the shrimp!
            icon.className = 'fas fa-shrimp card-icon';
            cardElement.classList.add('correct');
            gameStatus.textContent = '🎉 Parabéns! Você encontrou o camarão!';
            gameStatus.style.color = '#16a34a';
            gameActive = false;

            // Disable all other cards
            document.querySelectorAll('.card:not(.correct)').forEach(card => {
                card.style.pointerEvents = 'none';
                card.style.opacity = '0.5';
            });
        } else {
            // Wrong card
            icon.className = 'fas fa-times card-icon';
            cardElement.classList.add('incorrect');
            attempts--;

            attemptsCount.textContent = attempts;

            if (attempts > 0) {
                gameStatus.textContent = `❌ Carta errada! Você tem ${attempts} tentativa${attempts > 1 ? 's' : ''} restante${attempts > 1 ? 's' : ''}.`;
                gameStatus.style.color = '#dc2626';
            } else {
                // Game over
                gameStatus.textContent = '💔 Fim de jogo! O camarão estava na carta certa.';
                gameStatus.style.color = '#dc2626';
                gameActive = false;

                // Reveal the shrimp card
                setTimeout(() => {
                    const shrimpCard = document.querySelector(`.card[data-index="${shrimpCardIndex}"]`);
                    if (shrimpCard && !shrimpCard.classList.contains('flipped')) {
                        shrimpCard.classList.add('flipped', 'correct');
                        shrimpCard.querySelector('.card-icon').className = 'fas fa-shrimp card-icon';
                    }
                }, 1000);

                // Disable all cards
                document.querySelectorAll('.card').forEach(card => {
                    card.style.pointerEvents = 'none';
                });
            }
        }
    }

    // Restart game
    restartBtn.addEventListener('click', initGame);

    // Mobile menu toggle (reuse from main.js)
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Initialize the game on page load
    initGame();
});
