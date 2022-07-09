const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const player1Score = document.querySelector("#score--0");
const player2Score = document.querySelector("#score--1");
const playersScore = document.querySelectorAll(".score");
const player1CurrentScore = document.querySelector("#current--0");
const player2CurrentScore = document.querySelector("#current--1");
const currentScore = document.querySelectorAll(".current-score");
const diceImg = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const btn = document.querySelectorAll(".btn");
let score = 0;
let scoreOfPlayers = 0;

const randomNumber = (minimum, maximum) => {
  const randomNumber = Math.floor(
    Math.random() * (maximum - minimum + 1) + minimum
  );
  return randomNumber;
};

const diceImgDisplay = (img) => {
  img.classList.add("hidden");
};
diceImgDisplay(diceImg);

player1CurrentScore.textContent = score;
player2CurrentScore.textContent = score;

const changePlayers = (player) => {
  player.classList.toggle("player--active");
  score = 0;
  for (const element of currentScore) {
    element.textContent = score;
  }
  scoreOfPlayers = 0;
};

rollBtn.addEventListener("click", () => {
  const random = randomNumber(1, 6);
  diceImg.classList.remove("hidden");
  diceImg.src = `./src/images/dice-${random}.png`;
  if (random == 1) {
    changePlayers(player1);
    changePlayers(player2);
  }
  if (random >= 2) {
    if (player1.classList.contains("player--active")) {
      score += random;
      player1CurrentScore.textContent = score;
    }
    if (player2.classList.contains("player--active")) {
      score += random;
      player2CurrentScore.textContent = score;
    }
  }
});

player1Score.textContent = scoreOfPlayers;
player2Score.textContent = scoreOfPlayers;

const highScoreOfPlayers = () => {
  if (scoreOfPlayers >= 100) {
    if (player1.classList.contains("player--active")) {
      player1.classList.add("player--winner");
    }
    if (player2.classList.contains("player--active")) {
      player2.classList.add("player--winner");
    }
    diceImgDisplay(diceImg);
    for (let elements = 1; elements < btn.length; elements++) {
      const element = btn[elements];
      element.classList.add("hidden");
    }
  }
};

holdBtn.addEventListener("click", () => {
  if (player1.classList.contains("player--active")) {
    scoreOfPlayers = +player1Score.textContent;
    scoreOfPlayers += score;
    player1Score.textContent = scoreOfPlayers;
  }
  if (player2.classList.contains("player--active")) {
    scoreOfPlayers = +player2Score.textContent;
    scoreOfPlayers += score;
    player2Score.textContent = scoreOfPlayers;
  }
  highScoreOfPlayers();
  changePlayers(player1);
  changePlayers(player2);
});

newBtn.addEventListener("click", () => {
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  for (let elements = 1; elements < btn.length; elements++) {
    const element = btn[elements];
    element.classList.remove("hidden");
  }
  diceImgDisplay(diceImg);
  score = 0;
  scoreOfPlayers = 0;
  for (const element of currentScore) {
    element.textContent = 0;
  }
  for (const element of playersScore) {
    element.textContent = 0;
  }
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
});
