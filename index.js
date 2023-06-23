// Get canvas and its context
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load background image
const background = new Image();
background.src = "images/space.png";

// Set user spaceship properties
const userSpaceship = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 200, // Set spaceship position
  width: 200,
  height: 150,
  hull: 20, // Set spaceship health
  firepower: 5, // Set spaceship attack power
  accuracy: 0.7, // Set spaceship attack accuracy
};

// Set alien spaceship properties
const alienSpaceship = {
  x: canvas.width / 2 - 45,
  y: 50, // Set alien spaceship position
  width: 110,
  height: 120,
  hull: getRandomValue(3, 6), // Set alien spaceship health randomly
  firepower: getRandomValue(2, 4), // Set alien spaceship attack power randomly
  accuracy: getRandomValue(0.6, 0.8, 10), // Set alien spaceship attack accuracy randomly
};

// Initialize alien fleet
let alienFleet = [];
const fleetSize = 6;
let currentAlienIndex = 0;
let isGameOver = false;

function initializeAlienFleet() {
  for (let i = 0; i < fleetSize; i++) {
    const alienShip = {
      x: canvas.width / 2 - 100,
      y: 50, // Set alien spaceship position
      width: 200,
      height: 200,
      hull: getRandomValue(3, 6), // Set alien spaceship health randomly
      firepower: getRandomValue(2, 4), // Set alien spaceship attack power randomly
      accuracy: getRandomValue(0.6, 0.8, 10), // Set alien spaceship attack accuracy randomly
    };
    alienFleet.push(alienShip);
  }
}

initializeAlienFleet();

// Load user spaceship image
const userSpaceshipImg = new Image();
userSpaceshipImg.src = "images/spaceship.png";

// Load alien spaceship image
const alienSpaceshipImg = new Image();
alienSpaceshipImg.src = "images/enemy.png";

// Set button properties
const shootButton = {
  x: canvas.width - 210,
  y: canvas.height - 100,
  width: 150,
  height: 60,
};

const retreatButton = {
  x: 110,
  y: canvas.height - 100,
  width: 150,
  height: 60,
};

let isGameStarted = false;

userSpaceshipImg.onload = function () {
  updateCanvas();
};

background.onload = function () {
  updateCanvas();
};

// Draw the game canvas
function updateCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background image
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  if (isGameStarted) {
    // Draw the alien spaceship
    drawAlienSpaceship();
    // Draw the alien spaceship attributes
    drawAlienSpaceshipAttributes();
    // Draw the user spaceship
    drawUserSpaceship();
    // Draw the user spaceship attributes
    drawUserSpaceshipAttributes();
    // Draw the shoot button
    drawShootButton();
    // Draw the retreat button
    drawRetreatButton();
    // Draw the alien fleet count
    drawAlienFleetCount();
  } else {
    // Draw the start screen
    drawStartScreen();
  }

  if (isGameOver) {
    // Draw the end screen
    drawEndScreen();
  }
}

// Draw the user spaceship
function drawUserSpaceship() {
  ctx.drawImage(userSpaceshipImg, userSpaceship.x, userSpaceship.y, userSpaceship.width, userSpaceship.height);
}

// Draw the user spaceship attributes
function drawUserSpaceshipAttributes() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Hull: ${userSpaceship.hull}`, 20, userSpaceship.y + 20);
  ctx.fillText(`Firepower: ${userSpaceship.firepower}`, 20, userSpaceship.y + 40);
  ctx.fillText(`Accuracy: ${userSpaceship.accuracy.toFixed(1)}`, 20, userSpaceship.y + 60);
}

// Draw the alien spaceship
function drawAlienSpaceship() {
  ctx.drawImage(alienSpaceshipImg, alienSpaceship.x, alienSpaceship.y, alienSpaceship.width, alienSpaceship.height);
}

// Draw the alien spaceship attributes
function drawAlienSpaceshipAttributes() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Hull: ${alienSpaceship.hull}`, 20, alienSpaceship.y + alienSpaceship.height - 20);
  ctx.fillText(`Firepower: ${alienSpaceship.firepower}`, 20, alienSpaceship.y + alienSpaceship.height - 40);
  ctx.fillText(`Accuracy: ${alienSpaceship.accuracy.toFixed(1)}`, 20, alienSpaceship.y + alienSpaceship.height - 60);
}

// Draw the shoot button
function drawShootButton() {
  ctx.fillStyle = "red";
  ctx.fillRect(shootButton.x, shootButton.y, shootButton.width, shootButton.height);
  ctx.fillStyle = "white";
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";
  ctx.fillText("SHOOT", shootButton.x + shootButton.width / 2, shootButton.y + shootButton.height / 2 + 5);
}

// Draw the retreat button
function drawRetreatButton() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(retreatButton.x, retreatButton.y, retreatButton.width, retreatButton.height);
  ctx.fillStyle = "black";
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";
  ctx.fillText("RETREAT", retreatButton.x + retreatButton.width / 2, retreatButton.y + retreatButton.height / 2 + 5);
}

// Draw the start screen
function drawStartScreen() {
  ctx.fillStyle = "white";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Save The Universe", canvas.width / 2, canvas.height / 2 - 100);
  ctx.font = "bold 24px Arial";
  ctx.fillText("Click to start", canvas.width / 2, canvas.height / 2);
}

// Draw the end screen
function drawEndScreen() {
  ctx.fillStyle = "white";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  if (userSpaceship.hull > 0) {
    ctx.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 50);
  } else {
    ctx.fillText("YOU LOSE!", canvas.width / 2, canvas.height / 2 - 50);
  }
  ctx.font = "bold 24px Arial";
  ctx.fillText("Click to restart", canvas.width / 2, canvas.height / 2 + 50);
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 + 100);
}

// Draw the alien fleet count
function drawAlienFleetCount() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Aliens left: ${fleetSize-currentAlienIndex}`, canvas.width-20, 40);
}

// Start game when canvas is clicked
canvas.addEventListener("click", function (event) {
  if (!isGameStarted && !isGameOver) {
    isGameStarted = true;
    playRound();
  }
});

// Play round when canvas is clicked on the shoot button
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  if (isGameStarted && clickX >= shootButton.x && clickX <= shootButton.x + shootButton.width &&
      clickY >= shootButton.y && clickY <= shootButton.y + shootButton.height) {
    playRound();
  } else if (isGameStarted && clickX >= retreatButton.x && clickX <= retreatButton.x + retreatButton.width &&
      clickY >= retreatButton.y && clickY <= retreatButton.y + retreatButton.height) {
    isGameOver = true;
    updateCanvas();
  } else if (isGameOver) {
    // Reset game when canvas is clicked on the end screen
    isGameOver = false;
    currentAlienIndex = 0;
    initializeAlienFleet();
    userSpaceship.hull = 20;
    userSpaceship.firepower = 5;
    userSpaceship.accuracy = 0.7;
    updateCanvas();
  }
});

// Play a round of the game
function playRound() {
  const userAttackChance = Math.random();
  const alienAttackChance = Math.random();

  if (userAttackChance <= userSpaceship.accuracy) {
    alienSpaceship.hull -= userSpaceship.firepower;
  }

  if (alienSpaceship.hull > 0) {
    if (alienAttackChance <= alienSpaceship.accuracy) {
      userSpaceship.hull -= alienSpaceship.firepower;
    }
  } else {
    currentAlienIndex++;
    if (currentAlienIndex < fleetSize) {
      alienSpaceship.hull = alienFleet[currentAlienIndex].hull;
      alienSpaceship.firepower = alienFleet[currentAlienIndex].firepower;
      alienSpaceship.accuracy = alienFleet[currentAlienIndex].accuracy;
    } else {
      isGameOver = true;
    }
  }

  if (userSpaceship.hull <= 0) {
    isGameOver = true;
  }

  updateCanvas();
}

// Get a random value within a range
function getRandomValue(min, max, decimalPlaces = 0) {
  const factor = 10 ** decimalPlaces;
  return Math.floor((Math.random() * (max - min) + min) * factor) / factor;
}
