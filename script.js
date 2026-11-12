const input = document.getElementById("guess");
const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");
const rangeText = document.getElementById("range");
const message = document.getElementById("message");
const attemptText = document.getElementById("attempts");

let answer = 0;
let lower = 1;
let upper = 100;
let attempts = 0;
let finished = false;

function renderGame() {
  rangeText.textContent = `${lower} ～ ${upper}`;
  attemptText.textContent = `已猜 ${attempts} 次`;
  guessButton.disabled = finished;
  input.disabled = finished;
}

function initializeGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  lower = 1;
  upper = 100;
  attempts = 0;
  finished = false;
  input.value = "";
  input.disabled = false;
  message.className = "message";
  message.textContent = "請輸入一個數字開始遊戲";
  renderGame();
  input.focus();
}

function checkGuess() {
  const rawValue = input.value.trim();
  const guess = Number(rawValue);

  if (rawValue === "" || !Number.isInteger(guess) || guess < lower || guess > upper) {
    message.className = "message error";
    message.textContent = "請輸入目前範圍內的整數";
    return;
  }

  attempts += 1;

  if (guess === answer) {
    finished = true;
    message.className = "message success";
    message.textContent = `答對了！答案就是 ${answer}。`;
    renderGame();
    return;
  }

  if (guess < answer) {
    lower = guess + 1;
    message.className = "message";
    message.textContent = "答案更大，請再試一次！";
  } else {
    upper = guess - 1;
    message.className = "message";
    message.textContent = "答案更小，請再試一次！";
  }

  renderGame();
  input.value = "";
  input.focus();
}

guessButton.addEventListener("click", () => {
  if (finished) {
    return;
  }

  checkGuess();

  if (!finished) {
    input.select();
  }
});

resetButton.addEventListener("click", initializeGame);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    guessButton.click();
  }
});

initializeGame();
