// Script.js

// Obtener referencias a los elementos del DOM
var startButton = document.getElementById("start-button");
var buttons = document.getElementsByClassName("button");

// Variables para almacenar el estado del juego
var gamePattern = [];
var userPattern = [];
var level = 0;
var isGameStarted = false;

// Función para iniciar el juego
function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;
    startButton.textContent = "Reset";
    nextSequence();
  } else {
    resetGame();
  }
}

// Función para generar la siguiente secuencia
function nextSequence() {
  userPattern = [];
  level++;
  updateLevelTitle();

  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = buttons[randomNumber];
  gamePattern.push(randomButton);

  flashButton(randomButton);
}

// Función para animar el destello de un botón
function flashButton(button) {
  button.classList.add("active");
  playSound(button.classList[1]);

  setTimeout(function() {
    button.classList.remove("active");
  }, 300);
}

// Función para reproducir un sonido
function playSound(color) {
  var audio = new Audio(color + ".mp3");
  audio.play();
}

// Función para manejar los clics del usuario
function handleClick(event) {
  if (isGameStarted) {
    var clickedButton = event.target;
    userPattern.push(clickedButton);
    flashButton(clickedButton);

    if (!checkPattern()) {
      gameOver();
    } else if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

// Función para verificar si el patrón del usuario es correcto
function checkPattern() {
  for (var i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

// Función para manejar el fin del juego
function gameOver() {
  isGameStarted = false;
  startButton.textContent = "Game Over! Play Again";
  document.body.classList.add("game-over");
  setTimeout(function() {
    document.body.classList.remove("game-over");
  }, 200);

  level = 0;
  gamePattern = [];
}

// Función para reiniciar el juego
function resetGame() {
  isGameStarted = false;
  startButton.textContent = "Start Game";

  level = 0;
  gamePattern = [];
  userPattern = [];
  updateLevelTitle();
}

// Función para actualizar el título del nivel
function updateLevelTitle() {
  document.querySelector("h1").textContent = "Level " + level;
}

// Asignar eventos a los elementos del DOM
startButton.addEventListener("click", startGame);

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleClick);
}
