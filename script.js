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

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var ballRadius = 10;
  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var dx = 2;
  var dy = -2;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var paddleXComp = (canvas.width - paddleWidth) / 2;
  var rightPressed = false;
  var leftPressed = false;
  var ballColor = "black";

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
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
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddleComp() {
    ctx.beginPath();
    ctx.rect(paddleXComp, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
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

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddleComp();
    drawDashedLines();

    if (x + dx > paddleXComp + paddleWidth) {
      paddleXComp += 2;
    } else if (x + dx < paddleXComp) {
      paddleXComp -= 2;
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      if (x > paddleXComp && x < paddleXComp + paddleWidth) {
        ballColor = "red";
        dy = -dy + 0.124;
      } else {
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        ballColor = "#0095DD";
        dy = -dy - 0.124;
      } else {
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
  }

  var interval = setInterval(draw, 10);
});
