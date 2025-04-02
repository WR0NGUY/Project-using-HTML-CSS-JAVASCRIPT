const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedPairs = 0;
let isGameOver = false;
let timer;
let time = 0;
const timerDisplay = document.createElement('div');
document.body.appendChild(timerDisplay);
timerDisplay.style.fontSize = '20px';
timerDisplay.style.marginTop = '20px';

// Function to start the game timer
function startTimer() {
  timer = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

// Function to flip a card
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !isGameOver) {
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Function to check if two flipped cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === cards.length / 2) {
      clearInterval(timer);
      alert(`You won! Total time: ${time}s`);
      isGameOver = true;
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Function to shuffle the cards
function shuffleCards() {
  const cardArray = Array.from(cards);
  cardArray.sort(() => Math.random() - 0.5);
  cardArray.forEach((card, index) => {
    card.style.order = index;
  });
}

// Add event listener for card click
cards.forEach(card => {
  card.addEventListener('click', () => flipCard(card));
});

// Initialize the game
shuffleCards();
startTimer();
