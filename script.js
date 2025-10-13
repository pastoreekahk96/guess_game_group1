let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let previousGuesses = [];

const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const resetGameBtn = document.getElementById('resetGame');
const attemptsDisplay = document.getElementById('attempts');
const previousGuessesDisplay = document.getElementById('previousGuesses');
const feedbackDisplay = document.getElementById('feedback');

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedbackDisplay.textContent = 'Please enter a valid number between 1 and 100.';
        feedbackDisplay.style.color = 'orange';
        return;
    }

    attempts++;
    previousGuesses.push(userGuess);

    attemptsDisplay.textContent = attempts;
    previousGuessesDisplay.textContent = previousGuesses.join(', ');

    if (userGuess === randomNumber) {
        feedbackDisplay.textContent = `Congratulations! You guessed it in ${attempts} attempts.`;
        feedbackDisplay.style.color = 'green';
        endGame();
    } else if (userGuess < randomNumber) {
        feedbackDisplay.textContent = 'Too low! Try again.';
        feedbackDisplay.style.color = 'red';
    } else {
        feedbackDisplay.textContent = 'Too high! Try again.';
        feedbackDisplay.style.color = 'red';
    }

    guessInput.value = '';
    guessInput.focus();
}

function endGame() {
    guessInput.disabled = true;
    submitGuess.disabled = true;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    previousGuesses = [];

    attemptsDisplay.textContent = '0';
    previousGuessesDisplay.textContent = '';
    feedbackDisplay.textContent = '';
    guessInput.value = '';

    guessInput.disabled = false;
    submitGuess.disabled = false;
    guessInput.focus();
}

submitGuess.addEventListener('click', checkGuess);
resetGameBtn.addEventListener('click', resetGame);
guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

 function resetGame() {
      // Clear localStorage and reset the game
      localStorage.removeItem("randomNumber");
      localStorage.removeItem("attempts");
      randomNumber = Math.floor(Math.random() * 100) + 1;
      localStorage.setItem("randomNumber", randomNumber);
      attempts = 0;
      localStorage.setItem("attempts", attempts);
      document.getElementById("attemptsCount").textContent = attempts;
      document.getElementById("result").textContent = "Game reset! Guess again.";
      document.getElementById("userGuess").value = "";
    }