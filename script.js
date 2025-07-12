const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

const numPairs = 8;
let images = [];
for (let i = 0; i < numPairs; i++) {
  const seed = Math.random().toString(36).substring(7);
  images.push(`https://picsum.photos/seed/${seed}/200/200`);
}
let cards = [...images, ...images]; // duplicate for pairs
let revealedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(imageUrl, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.imageUrl = imageUrl;
  card.dataset.index = index;
  card.addEventListener("click", () => handleCardClick(card));
  gameBoard.appendChild(card);
}

function handleCardClick(card) {
  if (
    card.classList.contains("revealed") ||
    card.classList.contains("matched") ||
    revealedCards.length >= 2
  ) {
    return;
  }

  card.classList.add("revealed");
  card.style.backgroundImage = `url(${card.dataset.imageUrl})`;
  revealedCards.push(card);

  if (revealedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = revealedCards;
  if (card1.dataset.imageUrl === card2.dataset.imageUrl) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    statusText.textContent = "Match!";
    if (matchedCards.length === cards.length) {
      statusText.textContent = "🎉 You won! Refresh to play again.";
    }
  } else {
    statusText.textContent = "No match. Try again.";
    setTimeout(() => {
      card1.classList.remove("revealed");
      card2.classList.remove("revealed");
      card1.style.backgroundImage = "";
      card2.style.backgroundImage = "";
      statusText.textContent = "";
    }, 1000);
  }
  revealedCards = [];
}

function startGame() {
  gameBoard.innerHTML = "";
  statusText.textContent = "";
  matchedCards = [];
  revealedCards = [];
  // Regenerate random images each game
  images = [];
  for (let i = 0; i < numPairs; i++) {
    const seed = Math.random().toString(36).substring(7);
    images.push(`https://picsum.photos/seed/${seed}/200/200`);
  }
  cards = [...images, ...images];
  shuffle(cards);
  cards.forEach((imageUrl, i) => createCard(imageUrl, i));
}

startGame();
