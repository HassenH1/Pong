const outerDiv = document.createElement("div");
const imgDiv = document.createElement("div");
const img = document.createElement("img");
const headingDiv = document.createElement("div");
const btnDiv = document.createElement("div");

document.getElementById("myCanvas").style.display = "none";
outerDiv.style.display = "";
document.body.style.backgroundColor = "#e8e8e8";
document.getElementById("canvas-div").style.textAlign = "center";

outerDiv.style.width = "45em";
outerDiv.style.textAlign = "center";
outerDiv.style.display = "flex";
outerDiv.style.margin = "10em auto";
outerDiv.style.flexDirection = "column";
outerDiv.style.justifyContent = "space-evenly";

img.src =
  "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/c9/45/69/c945690d-4ea1-8c64-b67b-7cf4ed666c7e/pong_phone1-1x_U007emarketing-0-6-0-0-85-220.png/246x0w.png";
imgDiv.appendChild(img);

btnDiv.style.marginTop = "3em";

var btn = document.createElement("button");
btn.innerHTML = "Player vs Comp";
btnDiv.appendChild(btn);

outerDiv.appendChild(headingDiv);
outerDiv.appendChild(imgDiv);
outerDiv.appendChild(btnDiv);

btnDiv.setAttribute("id", "btn");
document.body.appendChild(outerDiv);

btn.style.width = "15em";
btn.style.height = "2em";

btn.addEventListener("click", () => {
  document.getElementById("canvas-div").style.textAlign = "center";
  document.getElementById("canvas-div").style.margin = "10em auto";

  outerDiv.style.display = "none";
  document.getElementById("myCanvas").style.display = "";

  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  const KEY = {
    RIGHT: "Right",
    ARROWRIGHT: "ArrowRight",
    LEFT: "Left",
    ARROWLEFT: "ArrowLeft",
  };
  const ballRadius = 10;
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let dx = Math.random() < 0.5 ? -2 : 2;
  let dy = Math.random() < 0.5 ? -2 : 2;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;
  let paddleXComp = (canvas.width - paddleWidth) / 2;
  let rightPressed = false;
  let leftPressed = false;
  let ballColor = "black";

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key == KEY.RIGHT || e.key == KEY.ARROWRIGHT) {
      rightPressed = true;
    } else if (e.key == KEY.LEFT || e.key == KEY.ARROWLEFT) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == KEY.RIGHT || e.key == KEY.ARROWRIGHT) {
      rightPressed = false;
    } else if (e.key == KEY.LEFT || e.key == KEY.ARROWLEFT) {
      leftPressed = false;
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(x, y, w, h, fillStyle) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.closePath();
  }

  function drawDashedLines() {
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(7, 150);
    ctx.lineTo(canvas.width, 150);
    ctx.stroke();
  }

  function computerPaddleFakeAI() {
    if (x + dx > paddleXComp + paddleWidth) {
      paddleXComp += 2;
    } else if (x + dx < paddleXComp) {
      paddleXComp -= 2;
    }
  }

  function collisionDetection() {
    const bounceBackVel = 0.124;
    const red = "red";
    const blue = "#0095DD";
    // width detection
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    // height detection
    if (y + dy < ballRadius) {
      if (x > paddleXComp && x < paddleXComp + paddleWidth) {
        ballColor = red;
        dy = -dy + bounceBackVel;
      } else {
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        ballColor = blue;
        dy = -dy - bounceBackVel;
      } else {
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    }

    x += dx;
    y += dy;
  }

  function playerPaddleSpeed() {
    const paddleSpeed = 7;
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= paddleSpeed;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight,
      "#0095DD"
    ); // user paddle
    drawPaddle(paddleXComp, 0, paddleWidth, paddleHeight, "red"); // computer paddle
    drawDashedLines();
    computerPaddleFakeAI();
    collisionDetection();
    playerPaddleSpeed();
  }

  var interval = setInterval(draw, 10);
});
