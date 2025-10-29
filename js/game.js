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
            gameStatus.textContent = '🎉 Você ganhou uma lembrancinha! Vá ao stand do BFT Camarão e pegue sua recompensa!';
            gameStatus.style.color = '#16a34a';
            gameActive = false;

            // Disable all other cards
            document.querySelectorAll('.card:not(.correct)').forEach(card => {
                card.style.pointerEvents = 'none';
                card.style.opacity = '0.5';
            });

            // Show win modal after a short delay
            setTimeout(() => {
                // Trigger confetti animation
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                showModal('Parabéns!', 'Você ganhou uma lembrancinha! Vá ao stand do BFT Camarão e pegue sua recompensa!', 'fas fa-trophy', true);
            }, 1000);
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
                gameStatus.textContent = '💔 Não foi dessa vez! Mas não desanime, tente novamente mais tarde!';
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

                // Show lose modal after revealing the shrimp
                setTimeout(() => {
                    showModal('Que pena!', 'Não foi dessa vez! Mas não desanime, tente novamente mais tarde!', 'fas fa-heart-broken', false);
                }, 2000);
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

    // Modal functionality
    function showModal(title, message, iconClass, isWin) {
        const modal = document.getElementById('game-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const modalIcon = document.getElementById('modal-icon');
        const modalRestartBtn = document.getElementById('modal-restart-btn');

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalIcon.className = iconClass;

        // Set modal colors based on win/lose
        if (isWin) {
            modalTitle.style.color = 'white';
            modalIcon.style.color = '#16a34a';
        } else {
            modalTitle.style.color = 'white';
            modalIcon.style.color = '#dc2626';
        }

        modal.style.display = 'block';

        // Close modal when clicking the close button
        document.querySelector('.game-modal-close').onclick = function() {
            modal.style.display = 'none';
        };

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        // Restart game from modal
        modalRestartBtn.onclick = function() {
            modal.style.display = 'none';
            initGame();
        };
    }

    // Initialize the game on page load
    initGame();
});
