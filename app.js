document.addEventListener("DOMContentLoaded", () => {
  // Based on https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Mobile_touch
  const gameCanvas = document.querySelector("#gameCanvas");
  const outputDisplay = document.querySelector(".output");

  gameCanvas.addEventListener("touchstart", touchHandler);
  gameCanvas.addEventListener("touchmove", touchHandler);
  //document.addEventListener("touchend", handleEnd);
  //document.addEventListener("touchcancel", handleCancel);
  //gameCanvas.addEventListener("click", mouseHandler);
  gameCanvas.addEventListener("mousedown", mousedownHandler);
  gameCanvas.addEventListener("mouseup", mouseupHandler);
  gameCanvas.addEventListener("mousemove", mousemoveHandler);

  var playerX = 100;
  var playerY = 100;
  var playerWidth = 40;
  var playerHeight = 40;
  //var mouseMoved = false;
  var setIntervalId;
  var timeInterval = 1000 / 30;

  var mouseStartX = 0;
  var mouseStartY = 0;
  var mouseFinishX = 0;
  var mouseFinishY = 0;
  var xThreshold = 50;
  var yThreshold = 50;

  function touchHandler(e) {
    if (e.touches) {
      playerX = e.touches[0].pageX - gameCanvas.offsetLeft - playerWidth / 2;
      playerY = e.touches[0].pageY - gameCanvas.offsetTop - playerHeight / 2;
      outputDisplay.innerHTML =
        "Touch: " + " x: " + playerX + ", y: " + playerY;
      e.preventDefault();
    }
  }

  function mousedownHandler(e) {
    // playerX = e.clientX - gameCanvas.offsetLeft - playerWidth / 2;
    // playerY = e.clientY - gameCanvas.offsetTop - playerHeight / 2;
    playerX = e.clientX;
    playerY = e.clientY;
    mouseMove = true;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    outputDisplay.innerHTML = "Down: " + " x: " + playerX + ", y: " + playerY;
    e.preventDefault();
  }
  function mouseupHandler(e) {
    // playerX = e.clientX - gameCanvas.offsetLeft - playerWidth / 2;
    // playerY = e.clientY - gameCanvas.offsetTop - playerHeight / 2;
    playerX = e.clientX;
    playerY = e.clientY;
    mouseFinishX = e.clientX;
    mouseFinishY = e.clientY;
    mouseMove = false;
    outputDisplay.innerHTML =
      "mouseup: " + " x: " + playerX + ", y: " + playerY;
    interpretMouseDragAction();
    e.preventDefault();
  }

  function mousemoveHandler(e) {
    //outputDisplay.innerHTML += "*";
    e.preventDefault();
  }

  function interpretMouseDragAction() {
    var deltaX = mouseFinishX - mouseStartX;
    var deltaY = mouseFinishY - mouseStartY;

    //Understand users action
    outputDisplay.innerHTML += " deltaX: " + deltaX + " deltaY: " + deltaY;

    // only left, right, up, and down actions

    if (Math.abs(deltaX) > xThreshold && Math.abs(deltaY) <= yThreshold) {
      if (deltaX >= 0) {
        outputDisplay.innerHTML += " Move Right";
      } else if (deltaX < 0) {
        outputDisplay.innerHTML += " Move Left";
      }
    }

    if (Math.abs(deltaY) > yThreshold && Math.abs(deltaX) <= xThreshold) {
      if (deltaY >= 0) {
        outputDisplay.innerHTML += " Move Down";
      } else if (deltaY < 0) {
        outputDisplay.innerHTML += " Move Up";
      }
    }
  }

  function mouseHandler(e) {
    playerX = e.clientX - gameCanvas.offsetLeft - playerWidth / 2;
    playerY = e.clientY - gameCanvas.offsetTop - playerHeight / 2;
    outputDisplay.innerHTML = "Mouse: " + " x: " + playerX + ", y: " + playerY;
    e.preventDefault();
  }

  function displayGame() {
    var gCanvas = gameCanvas.getContext("2d");
    // Background
    gCanvas.beginPath();
    gCanvas.lineWidth = "1";
    gCanvas.fillStyle = "red";
    gCanvas.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Player
    gCanvas.beginPath();
    gCanvas.strokeStyle = "black";
    gCanvas.fillStyle = "white";
    gCanvas.arc(playerX, playerY, 20, 0, 2 * Math.PI);
    gCanvas.fill();
    gCanvas.stroke();

    // if (!mouseMoved) {
    //   gCanvas.beginPath();
    //   gCanvas.strokeStyle = "black";
    //   gCanvas.fillStyle = "yellow";
    //   gCanvas.fillRect(
    //     mouseStartX,
    //     mouseStartY,
    //     Math.abs(mouseStartX - mouseFinishX),
    //     Math.abs(mouseStartY - mouseFinishY)
    //   );
    // }

    // mouse
    gCanvas.beginPath();
    gCanvas.strokeStyle = "black";
    gCanvas.fillStyle = "green";
    gCanvas.arc(mouseStartX, mouseStartY, 5, 0, 2 * Math.PI);
    gCanvas.fill();
    gCanvas.stroke();

    gCanvas.beginPath();
    gCanvas.strokeStyle = "black";
    gCanvas.fillStyle = "blue";
    gCanvas.arc(mouseFinishX, mouseFinishY, 5, 0, 2 * Math.PI);
    gCanvas.fill();
    gCanvas.stroke();
  }

  function runGame() {
    displayGame();
    setIntervalId = setInterval(runGame, timeInterval);
  }

  runGame();
});
