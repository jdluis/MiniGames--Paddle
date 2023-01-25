// - canvas configuration
const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 800;
canvas.style.backgroundColor = "black";
const ctx = canvas.getContext("2d");

// - variables globales
//Panel Before Game start
const btnStart = document.getElementById("startGame");
const panelSetup = document.getElementById("panelStart");

//Game Settings
let isGameOn = false;
let velocityIncrement = 0.3;
const levelCounter = document.getElementById('levelCounter');
let level = 0;

//ball
let ballX = 50;
let ballY = 50;
let isBallGoingRight = true;
let isBallGoingDown = true;
let ballVelocity = 2;
let colorBall = "white";

//paddle
let paddelWidth = 100;
let paddelHeight = 15;
let paddelVelocity = 14;

let paddelX = 250;
const padYgap = 5;
let paddelY = 800 - (paddelHeight + padYgap); 

// - funciones

const moveBall = () => {
  if (isBallGoingRight === true) {
    ballX = ballX + ballVelocity;
  } else {
    ballX = ballX - ballVelocity;
  }

  if (isBallGoingDown === true) {
    ballY = ballY + ballVelocity;
  } else {
    ballY = ballY - ballVelocity;
  }
};

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = colorBall;
    ctx.fill();
    ctx.closePath();
};

const setColorBall = () => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    colorBall = `#${randomColor}`;
}

const movePaddle = (direction) => {
  if (direction === "left" && paddelX > 0) {
    paddelX = paddelX - paddelVelocity;
  } else if (direction === "right" && paddelX + paddelWidth < canvas.width) {
    paddelX = paddelX + paddelVelocity;
  }
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.fillRect(paddelX, paddelY, paddelWidth, paddelHeight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
};

const collisionBall = () => {
    //posicion de la pelota en el eje X
    if (ballX > canvas.width - 15) {
      isBallGoingRight = false;
    }
  
    if (ballX < 0 + 15) {
      isBallGoingRight = true;
    }
  
    //posicion de la pelota en el eje Y
    if (ballY > canvas.height - 15) {
      isBallGoingDown = false;
    }
  
    if (ballY < 0 + 15) {
      isBallGoingDown = true;
    }
};

const collisionBallPaddle = () => {
  if (ballY > paddelY - padYgap && ballX > paddelX && ballX < paddelX + paddelWidth) {
    isBallGoingDown = false;
    ballVelocity += velocityIncrement;
    level++;
    levelCounter.innerText = `Level: ${level}`;
    setColorBall();
  }
};

const gameOver = () => {
  if (ballY > canvas.height - paddelHeight) {
    isGameOn = false;
    level = 0;
    panelSetup.style.display = "flex";
  }
};

const resetGame = () => {
    if (isGameOn === false) {
        isGameOn = true;
        ballX = 50;
        ballY = 50;
        isBallGoingDown = true;
        ballVelocity = 2;
        gameLoop();
    }
}

// - funcion de recursion
const gameLoop = () => {
  // clean Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // movimientos y acciones
  moveBall();
  collisionBall();
  movePaddle();
  collisionBallPaddle();
  gameOver();
  // render elements
  drawBall();
  drawPaddle();
  //recursion
  if (isGameOn) {
    requestAnimationFrame(gameLoop);
  }
};

// - addEventListener

window.addEventListener("keydown", (e) => {
  let keyPress = e.key;

  if (keyPress === "a" ||keyPress === "A") {
    movePaddle("left");
  }

  if (keyPress === "d" || keyPress === "D") {
    movePaddle("right");
  }
});

btnStart.addEventListener('click', () => {
    resetGame();
    panelSetup.style.display = "none";
})

/* Siguiente Version
Niveles
No iniciar siempre de la misma posicion
¿Como cambiar el color de la bola solo?
*/