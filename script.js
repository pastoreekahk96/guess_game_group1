// --- Initialize Game Data ---
let randomNumber = localStorage.getItem("randomNumber")
  ? Number(localStorage.getItem("randomNumber"))
  : Math.floor(Math.random() * 100) + 1;

let attempts = localStorage.getItem("attempts")
  ? Number(localStorage.getItem("attempts"))
  : 0;

let previousGuesses = localStorage.getItem("previousGuesses")
  ? JSON.parse(localStorage.getItem("previousGuesses"))
  : [];

const guessInput = document.getElementById("guessInput");
const submitGuess = document.getElementById("submitGuess");
const resetGameBtn = document.getElementById("resetGame");
const attemptsDisplay = document.getElementById("attempts");
const previousGuessesDisplay = document.getElementById("previousGuesses");
const feedbackDisplay = document.getElementById("feedback");

// --- Update UI from saved data ---
attemptsDisplay.textContent = attempts;
previousGuessesDisplay.textContent = previousGuesses.join(", ");

// --- Save the random number initially if not saved ---
if (!localStorage.getItem("randomNumber")) {
  localStorage.setItem("randomNumber", randomNumber);
}

// --- Guess Checking Function ---
function checkGuess() {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    feedbackDisplay.textContent = "⚠️ Please enter a valid number between 1 and 100.";
    feedbackDisplay.style.color = "orange";
    return;
  }

  attempts++;
  previousGuesses.push(userGuess);

  // This our Update localStorage
  localStorage.setItem("attempts", attempts);
  localStorage.setItem("previousGuesses", JSON.stringify(previousGuesses));

  // Update UI
  attemptsDisplay.textContent = attempts;
  previousGuessesDisplay.textContent = previousGuesses.join(", ");

  if (userGuess === randomNumber) {
    feedbackDisplay.textContent = `🎉 Correct! You guessed it in ${attempts} attempts.`;
    feedbackDisplay.style.color = "green";
    endGame();
  } else if (userGuess < randomNumber) {
    feedbackDisplay.textContent = "📉 Too low! Try again.";
    feedbackDisplay.style.color = "blue";
  } else {
    feedbackDisplay.textContent = "📈 Too high! Try again.";
    feedbackDisplay.style.color = "red";
  }

  guessInput.value = "";
  guessInput.focus();
}

// --- This is Ending of the  Game ---
function endGame() {
  guessInput.disabled = true;
  submitGuess.disabled = true;
  localStorage.setItem("gameOver", "true");
}

// --- Reset Game ---
function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  previousGuesses = [];

  // Reset localStorage
  localStorage.setItem("randomNumber", randomNumber);
  localStorage.setItem("attempts", attempts);
  localStorage.setItem("previousGuesses", JSON.stringify(previousGuesses));
  localStorage.removeItem("gameOver");

  // Reset UI
  attemptsDisplay.textContent = "0";
  previousGuessesDisplay.textContent = "";
  feedbackDisplay.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  submitGuess.disabled = false;
  guessInput.focus();
}

// --- Restore Game State if Over ---
if (localStorage.getItem("gameOver") === "true") {
  feedbackDisplay.textContent = "🎉 You already won! Click Reset to play again.";
  feedbackDisplay.style.color = "green";
  guessInput.disabled = true;
  submitGuess.disabled = true;
}

// --- Event Listeners ---
submitGuess.addEventListener("click", checkGuess);
resetGameBtn.addEventListener("click", resetGame);
guessInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkGuess();
});
