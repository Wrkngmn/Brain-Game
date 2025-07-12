const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥝", "🍍", "🍓"];
let cards = [...symbols, ...symbols]; // duplicate symbols
let revealedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(symbol, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.symbol = symbol;
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
  card.textContent = card.dataset.symbol;
  revealedCards.push(card);

  if (revealedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = revealedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
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
      card1.textContent = "";
      card2.textContent = "";
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
  shuffle(cards);
  cards.forEach((symbol, i) => createCard(symbol, i));
}

startGame();
