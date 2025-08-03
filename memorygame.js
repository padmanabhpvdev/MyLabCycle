const emojis = ['🍕','🍔','🍟','🍩','🍪','🍎','🍌','🍇'];
    let cards = [...emojis, ...emojis]; // 8 pairs = 16 cards
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let startTime;
    let timerInterval;

    const board = document.getElementById('game-board');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restart');

    function shuffle(array) {
      for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function startTimer() {
      startTime = new Date();
      timerInterval = setInterval(() => {
        const now = new Date();
        const seconds = Math.floor((now - startTime) / 1000);
        updateStatus(moves, seconds);
      }, 1000);
    }

    function updateStatus(moves, time) {
      status.textContent = `Moves: ${moves} | Time: ${time}s`;
    }

    function createBoard() {
      board.innerHTML = '';
      shuffle(cards);
      cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = '';
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
      });
    }

    function handleCardClick(e) {
      const card = e.target;

      if (card.classList.contains('flipped') || flippedCards.length === 2) return;

      card.textContent = card.dataset.emoji;
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        moves++;
        if (moves === 1) startTimer();

        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
          matchedPairs++;
          flippedCards = [];

          if (matchedPairs === emojis.length) {
            clearInterval(timerInterval);
            const timeTaken = Math.floor((new Date() - startTime) / 1000);
            setTimeout(() => {
              alert(`🎉 You win! Moves: ${moves}, Time: ${timeTaken}s`);
            }, 300);
          }
        } else {
          setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
          }, 800);
        }
      }
    }

    restartBtn.addEventListener('click', () => {
      moves = 0;
      matchedPairs = 0;
      flippedCards = [];
      clearInterval(timerInterval);
      updateStatus(0, 0);
      createBoard();
    });

    // Initialize game
    createBoard();