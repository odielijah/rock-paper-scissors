let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  draws: 0,
};

updateScore();

function computerMove() {
  const moves = ["rock", "paper", "scissors"];
  const randomPickIndex = Math.floor(Math.random() * 3); // result (0,1, or 2)
  return moves[randomPickIndex];

  // THIS IS LOWKEY RIGGED CAUSE SCISSORS HAVE HIGHER CHANCE
  /* 
        const randomPick = Math.random();

        if (randomPick <= 0.3) {
          return "rock";
        }
        if (randomPick <= 0.6) {
          //randomPick > 0.3 && randomPick <= 0.6
          return "paper";
        }
        if (randomPick > 0.6) {
          return "scissors";
        }
        */
}

function playGame(playerMove) {
  const computerChoice = computerMove();
  let result = "";

  if (playerMove === "rock" && computerChoice === "rock") {
    result = "draw";
    score.draws++;
  } else if (playerMove === "rock" && computerChoice === "paper") {
    result = "you lose";
    score.losses++;
  } else if (playerMove === "rock" && computerChoice === "scissors") {
    result = "you win!";
    score.wins++;
  }

  if (playerMove === "paper" && computerChoice === "rock") {
    result = "you win!";
    score.wins++;
  } else if (playerMove === "paper" && computerChoice === "paper") {
    result = "draw";
    score.draws++;
  } else if (playerMove === "paper" && computerChoice === "scissors") {
    result = "you lose";
    score.losses++;
  }

  if (playerMove === "scissors" && computerChoice === "rock") {
    result = "you lose";
    score.losses++;
  } else if (playerMove === "scissors" && computerChoice === "paper") {
    result = "you win!";
    score.wins++;
  } else if (playerMove === "scissors" && computerChoice === "scissors") {
    result = "draw";
    score.draws++;
  }

  document.querySelector(".js-result").innerText = result;
  document.querySelector(".js-moves").innerHTML = `<div class="adjust-icon"> You 
  <img src="../images/${playerMove}.png" class="move-size" /> 
  <img src="../images/${computerChoice}.png" class="move-size" /> 
  Comp </div>`;
  updateScore();
}

function updateScore() {
  document.querySelector(
    ".js-scores"
  ).innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.draws}`;
  localStorage.setItem("score", JSON.stringify(score));
}

function showResetConfirmation() {
  document.querySelector(
    ".js-reset-decision"
  ).innerHTML = `Are you sure you want to reset the score?
        <div>
          <button class="js-yes-button yes-button">Yes</button>
          <button class="js-no-button no-button">No</button>
        </div>`;

  const yes = document.querySelector(".js-yes-button");
  const no = document.querySelector(".js-no-button");

  yes.addEventListener("click", () => {
    resetScore();
    document.querySelector(".js-reset-decision").innerHTML = "";
  });

  no.addEventListener("click", () => {
    document.querySelector(".js-reset-decision").innerHTML = "";
  });
  autoPlayElem.innerText = "Auto Play";
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.draws = 0;
  updateScore();
}

document.querySelector(".js-reset-score").addEventListener("click", () => {
  showResetConfirmation();
  clearInterval(intervalId);
});

const autoPlayElem = document.querySelector(".js-auto-play");
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    autoPlayElem.innerText = "Stop Playing";

    intervalId = setInterval(() => {
      // making the player the bot instead
      const playerMove = computerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoPlayElem.innerText = "Auto Play";
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

autoPlayElem.addEventListener("click", () => {
  autoPlay();
  document.querySelector(".js-reset-decision").innerHTML = "";
});
