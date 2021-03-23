var c = document.getElementById("game");
var ctx = c.getContext("2d");
var scale = 3;
ctx.canvas.width  = 100 * scale;
ctx.canvas.height = 100 * scale;
var squareSize = 20;
var frameRate = 10;
let canStart = true;
let gameInProgress = false;
let changingDirection = false;
let counter = 1;
var deathBy = "something";

function newGame() {
	resetScore();
	redraw();
	let startX = squareSize * scale;
	let startY = squareSize + squareSize * scale * 2;
	snake = [
		{x:startX + 80, y:startY},
		{x:startX + 60, y:startY},
		{x:startX + 40, y:startY},
		{x:startX + 20, y:startY},
		{x:startX, y:startY}]
	drawSnake();
	foodX = startX + squareSize * scale * 3;
	foodY = startY;
	drawFood();
}

//listen for key presses (also starts game)
document.addEventListener("keydown", changeDirection);


// start game
function startGame() {
	if ($('#dialog').dialog('isOpen')) {
		return;
	}
	gameInProgress = true;
	main();
}

// main function
function main() {
	if (isGameOver()) {
		//reset direction
		dx = speed;
		dy = 0;
		gameInProgress = false;
		gameOver();
		return; // stop main function
	}
	
	//run each game at framerate
	setTimeout(function onTick() {
		redraw();
		drawFood();
		//reset changing_direction variable to false on every 10th game tick
		if (counter == 10) {
			changingDirection = false;
			moveSnake();
			counter = 1;
		} else {
			counter ++;
		}
		drawSnake();  
		//repeat function
		main();
	}, frameRate)
}


// clear and redraw canvas background
function redraw() {
	ctx.clearRect(0, 0, c.width, c.height);
	//draw checkered background
	numCheckers = c.width / squareSize;
	for (let i = 0; i < numCheckers; i++) {
		for (let j = 0; j < numCheckers; j++) {
		  ctx.fillStyle = (i + j) & 1 ? colorOne : colorTwo;
		  ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
		}
	}
}

function isGameOver() {
	//check if snake touches itself
	for (let i = 4; i < snake.length; i++) {
	  	if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			 deathBy = "yourself";
			return true; 
		}
		
	}
	//check if snake touches wall
	const hitLeftWall = snake[0].x < 0;
	if (hitLeftWall) {deathBy = "the left wall"};
	const hitRightWall = snake[0].x > c.width - squareSize;
	if (hitRightWall) {deathBy = "the right wall"};
	const hitTopWall = snake[0].y < 0;
	if (hitTopWall) {deathBy = "the Top wall"};
	const hitBottomWall = snake[0].y > c.height - squareSize;
	if (hitBottomWall) {deathBy = "the Bottom wall"};
	return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}


//change direction event triggered by arrow keys
function changeDirection(event) {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40; 

	const keyPressed = event.keyCode;

	//start game when arrow key first pressed
	if (gameInProgress == false &&
		(keyPressed === LEFT_KEY ||
		keyPressed ===  UP_KEY ||
		keyPressed ===  RIGHT_KEY ||
		keyPressed ===  DOWN_KEY)) {
		startGame();
	}

	// prevent snake from reversing
	if (changingDirection) return;
	changingDirection = true;

	const goingUp = dy === -speed;
	const goingDown = dy === speed;
	const goingRight = dx === speed;
	const goingLeft = dx === -speed; 

	if (keyPressed === LEFT_KEY && !goingRight) {
		event.preventDefault();
		dx = -speed;
		dy = 0;
	} 
	if (keyPressed === UP_KEY && !goingDown) {
		event.preventDefault();
		dx = 0;
		dy = -speed;
	} 
	if (keyPressed === RIGHT_KEY && !goingLeft) {
		event.preventDefault();
		dx = speed;
		dy = 0;
	} 
	if (keyPressed === DOWN_KEY && !goingUp) {
		event.preventDefault();
		dx = 0;
		dy = speed;
	}
}

function gameOver() {
	if (score > highscore) {
		updateHighscore();
	} else {
		// jQuery dialog box with how you died, and score + high score
		$("#dialog").dialog('option', 'title', 'Game Over');
		$("#dialog-message").html("<br>Your score: " + score + "<br><br>High score: " + highscore +
		"<br><br>You died by crashing into " + deathBy);
		$("#dialog").dialog("open"); 
	}
}