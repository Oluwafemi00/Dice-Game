// 1. Cache the DOM elements
const heading = document.querySelector("h1");
const playerDiceImg = document.querySelector(".img1");
const computerDiceImg = document.querySelector(".img2");
const playButton = document.querySelector("button");

// NEW: Cache the score elements
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");

// NEW: Initialize Application State (The Scores)
let playerScore = 0;
let computerScore = 0;

// 2. Load the sound effect
const diceSound = new Audio("sound/dice-roll.wav");

// 3. Helper functions
const rollDie = () => Math.floor(Math.random() * 6) + 1;
const getImagePath = (roll) => `images/dice${roll}.png`;

// 4. The Event Listener
playButton.addEventListener("click", () => {
  diceSound.currentTime = 0;
  diceSound.play();

  playerDiceImg.classList.add("shake-dice");
  computerDiceImg.classList.add("shake-dice");
  heading.textContent = "Rolling...";

  setTimeout(() => {
    playerDiceImg.classList.remove("shake-dice");
    computerDiceImg.classList.remove("shake-dice");

    const playerRoll = rollDie();
    const computerRoll = rollDie();

    playerDiceImg.setAttribute("src", getImagePath(playerRoll));
    computerDiceImg.setAttribute("src", getImagePath(computerRoll));

    // NEW: Update scores based on the winner
    if (playerRoll === computerRoll) {
      heading.textContent = "Draw! 😌";
      // Nobody gets a point
    } else if (playerRoll > computerRoll) {
      heading.textContent = "You Win! 😀";
      playerScore++; // Increase player score by 1
      playerScoreEl.textContent = `Player: ${playerScore}`; // Update the screen
    } else {
      heading.textContent = "Computer Wins! 🥴";
      computerScore++; // Increase computer score by 1
      computerScoreEl.textContent = `Computer: ${computerScore}`; // Update the screen
    }
  }, 500);
});

// 1. Select the new Reset button
const resetButton = document.querySelector(".btn-reset");

// 2. Add the Click Listener
resetButton.addEventListener("click", () => {
  // Reset the State Variables
  playerScore = 0;
  computerScore = 0;

  // Update the UI (Scoreboard)
  document.getElementById("player-score").textContent = "Player: 0";
  document.getElementById("computer-score").textContent = "Computer: 0";

  // Reset the Heading
  heading.textContent = "Start Game";

  //  Reset Dice images to default (6)
  playerDiceImg.setAttribute("src", "images/dice6.png");
  computerDiceImg.setAttribute("src", "images/dice6.png");
});
