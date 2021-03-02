// ready reveal in
setTimeout(function(){ 
		$('.ready').addClass('active');
}, 200);

// define variables
var c = document.getElementById("game");
var ctx = c.getContext("2d");
const squareSize = 20;
const speed = squareSize / 10;
let dx = speed; // Horizontal velocity of snake - direction (x)
let dy = 0; // Vertical velocity of snake - direction (y)
//array of initial 5 snake coordinates
let snake = [{x:280, y:240},{x:260, y:240},{x:240, y:240},{x:220, y:240},{x:200, y:240}];
let score = 0;
let changingDirection = false;
let counter = 0;
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
	snake = [{x:280, y:240},{x:260, y:240},{x:240, y:240},{x:220, y:240},{x:200, y:240}]
	createFood();
	main();
}

// each game tick 100ms
function main() {
	//check if isGameOver returns true, if so, stop main function
	if (isGameOver()) {
		//execute code here to show game over message
		//reset direction
		dx = speed;
		dy = 0;
		gameInProgress = false;
		return;
	}

	
	
	//run each game tick 100ms 
	setTimeout(function onTick() {
		redraw();
		drawFood();
		//reset changing_direction variable to false on every 10th game tick
		if (counter == 9) {
			changingDirection = false;
			moveSnake();
			counter = 0;
		} else {
			counter ++;
		}
		drawSnake();  
		console.log(counter);
		//repeat function
		main();
	}, 10)
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
	ctx.fillRect(snakePart.x, snakePart.y, squareSize, squareSize);
}


//function to draw the created food on canvas
function drawFood() {
	ctx.fillStyle = 'red';
	ctx.strokestyle = 'darkred';
	ctx.fillRect(foodX, foodY, squareSize, squareSize);
	ctx.strokeRect(foodX, foodY, squareSize, squareSize);
}



// returns random number that is a multiple of (squareSize)
function randomSquare(min, max) {
	return Math.round((Math.random() * (max-min) + min) / squareSize) * squareSize;
}


// create food at random location 
function createFood() {
	// give foodX and foodY random multiple of (squareSize) within canvas dimensions
	foodX = randomSquare(0, c.width - squareSize);
	foodY = randomSquare(0, c.height - squareSize); 
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
	  	if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
		return true;
	}
	//check if snake touches wall
	const hitLeftWall = snake[0].x < 0;
	const hitRightWall = snake[0].x > c.width - squareSize;
	const hitToptWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > c.height - squareSize;
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
	const goingUp = dy === -speed;
	const goingDown = dy === speed;
	const goingRight = dx === speed;
	const goingLeft = dx === -speed; 

	if (keyPressed === LEFT_KEY && !goingRight) {
		dx = -speed;
		dy = 0;
	} 
	if (keyPressed === UP_KEY && !goingDown) {
		dx = 0;
		dy = -speed;
	} 
	if (keyPressed === RIGHT_KEY && !goingLeft) {
		dx = speed;
		dy = 0;
	} 
	if (keyPressed === DOWN_KEY && !goingUp) {
		dx = 0;
		dy = speed;
	}
}

function moveSnake() {
	// Create the new Snake's head
	const head = {x: snake[0].x + (dx *10), y: snake[0].y + (dy * 10)};

	// Add the new head to the beginning of snake body
	snake.unshift(head);
	
	const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;

	if (hasEatenFood) {
	  score += 10;
	  document.getElementById('score').innerHTML = score;
	  createFood();
	} else {
	  // Remove the last part of snake body
	  snake.pop();
	}
  }


// save score on finish
//report how you died
//dont allow new game to start instantly
// make fully customisable to the user size, speed, etc
//add epic graphics
//animate frames inbetween each 10th
//add epic background tiles