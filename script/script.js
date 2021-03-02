// ready reveal in
setTimeout(function(){ 
		$('.ready').addClass('active');
}, 200);

// define variables
var c = document.getElementById("game");
var ctx = c.getContext("2d");
let dx = 10; // Horizontal velocity of snake - direction (x)
let dy = 0; // Vertical velocity of snake - direction (y)
//array of initial 5 snake coordinates
let snake = [{x:250, y:250},{x:240, y:250},{x:230, y:250},{x:220, y:250},{x:210, y:250}]
let score = 0;
let changingDirection = false;
let foodX;
let foodY;
let gameInProgress = false;

// draw canvas first frame
redraw();
drawSnake(); 

// start button initiates main method
document.getElementById("start").addEventListener("click", startGame);

//listen for key presses
document.addEventListener("keydown", changeDirection);


// start game
function startGame() {
	gameInProgress = true;
	snake = [{x:250, y:250},{x:240, y:250},{x:230, y:250},{x:220, y:250},{x:210, y:250}]
	createFood();
	main();
}

// each game tick 100ms
function main() {
	//check if isGameOver returns true, if so, stop main function
	if (isGameOver()) {
		//execute code here to show game over message
		//reset direction
		dx = 10;
		dy = 0;
		gameInProgress = false;
		return;
	}
	//reset changing_direction variable to false on each game tick
	changingDirection = false;
	//run each game tick 100ms 
	setTimeout(function onTick() {
		redraw();
		drawFood();
		moveSnake();
		drawSnake();  
		//repeat function
		main();
	}, 100)
}


function redraw() {
	ctx.fillStyle = 'white';
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillRect(0, 0, c.width, c.height);
}


// Draws the snake - run through snake array drawing each parts coordinates on the canvas
function drawSnake() {
	snake.forEach(drawSnakePart)
}

// Draw a snake part at the coordinates given in (snakePart) parameter
function drawSnakePart(snakePart) {
	ctx.fillStyle = 'green';
	ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}


//function to draw the created food on canvas
function drawFood() {
	ctx.fillStyle = 'red';
	ctx.strokestyle = 'darkred';
	ctx.fillRect(foodX, foodY, 10, 10);
	ctx.strokeRect(foodX, foodY, 10, 10);
}



// returns random number that is a multiple of 10
function randomTen(min, max) {
	return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}


// create food at random location 
function createFood() {
	// give foodX and foodY random multiple of 10 within canvas dimensions
	foodX = randomTen(0, c.width - 10);
	foodY = randomTen(0, c.height - 10); 
	//check if food is on snake part, and re run function if it is
	snake.forEach(function isFoodOnSnake(part) {
	  	const foodIsOnSnake = part.x == foodX && part.y == foodY
	 	if (foodIsOnSnake)
		createFood();
	});
}



function isGameOver() {
	//check if snake touches itself
	for (let i = 4; i < snake.length; i++) {
	  	if (snake[i].x === snake[0].x &&	snake[i].y === snake[0].y)
		return true;
	}
	//check if snake touches wall
	const hitLeftWall = snake[0].x < 0;
	const hitRightWall = snake[0].x > c.width - 10;
	const hitToptWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > c.height - 10;
	return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


//change direction event triggered by arrow keys
function changeDirection(event) {
	if (gameInProgress == false) {
		startGame();
	}
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40; 

	// prevent snake from reversing
	if (changingDirection) return;
	changingDirection = true;

	const keyPressed = event.keyCode;
	const goingUp = dy === -10;
	const goingDown = dy === 10;
	const goingRight = dx === 10;
	const goingLeft = dx === -10; 

	if (keyPressed === LEFT_KEY && !goingRight) {
		dx = -10;
		dy = 0;
	} 
	if (keyPressed === UP_KEY && !goingDown) {
		dx = 0;
		dy = -10;
	} 
	if (keyPressed === RIGHT_KEY && !goingLeft) {
		dx = 10;
		dy = 0;
	} 
	if (keyPressed === DOWN_KEY && !goingUp) {
		dx = 0;
		dy = 10;
	}
}

function moveSnake() {
	// Create the new Snake's head
	const head = {x: snake[0].x + dx, y: snake[0].y + dy};

	// Add the new head to the beginning of snake body
	snake.unshift(head);
	const has_eaten_food = snake[0].x === foodX && snake[0].y === foodY;

	if (has_eaten_food) {
	  score += 10;
	  document.getElementById('score').innerHTML = score;
	  createFood();
	} else {
	  // Remove the last part of snake body
	  snake.pop();
	}
  }