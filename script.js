let secretNumber;
let attempts;
let startTime;
let timerInterval;

// Initialisation du jeu
function initGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  updateText("#attempts", attempts);
  updateText("#timer", "0");
  updateMessage("", "var(--text-color)");

  document.querySelector("#guessInput").value = "";
}

// Mise à jour du chronomètre
function updateTimer() {
  const now = Date.now();
  const seconds = Math.floor((now - startTime) / 1000);
  updateText("#timer", seconds);
}

// Vérification de la proposition
function checkGuess() {
  const guess = parseInt(document.querySelector("#guessInput").value);

  if (isNaN(guess)  <  1  > 100) {
    updateMessage("Entre un nombre entre 1 et 100.", "orange");
    return;
  }

  attempts++;
  updateText("#attempts", attempts);

  if (guess === secretNumber) {
    clearInterval(timerInterval);
    const timeTaken = document.querySelector("#timer").textContent;
    updateMessage(`Bravo ! Tu as trouvé en ${attempts} essais et ${timeTaken}s.`, "var(--main-color)");
  } else if (guess < secretNumber) {
    updateMessage("Trop petit !", "red");
  } else {
    updateMessage("Trop grand !", "red");
  }
}

// Mise à jour des messages
function updateMessage(msg, color) {
  const msgBox = document.querySelector("#message");
  msgBox.textContent = msg;
  msgBox.style.color = color;
}

// Mise à jour du texte dans un élément
function updateText(selector, value) {
  document.querySelector(selector).textContent = value;
}

// Réinitialisation
function resetGame() {
  initGame();
}

// Démarrage après chargement de la page
window.onload = function () {
  initGame();

  // Si tu utilises des boutons sans "onclick" dans HTML :
  document.querySelector("#checkBtn").addEventListener("click", checkGuess);
  document.querySelector("#resetBtn").addEventListener("click", resetGame);
};