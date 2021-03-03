// ready reveal in
setTimeout(function(){ 
		$('.ready').addClass('active');
}, 200);

// this initializes the dialog box using some common options
$(function() {
	$("#dialog").dialog({
		autoOpen : false,
		modal : true,
		show : "blind",
		hide : "blind",
		dialogClass: "no-close",
		buttons: [{ // Close the dialog.
			text: "Play again",
			click: function() {
				newGame();
				$(this).dialog("close");
			}
		}]
	});
});


// define variables
var c = document.getElementById("game");
var ctx = c.getContext("2d");
var colorOne = "#b7ffa1";
var colorTwo = "#78c262";
var scale = 3;
ctx.canvas.width  = 100 * scale;
ctx.canvas.height = 100 * scale;
var squareSize = 20;
var speed = 2; // speed at which snake moves
var frameRate = 10;
let dx = speed; // Horizontal velocity of snake - direction (x)
let dy = 0; // Vertical velocity of snake - direction (y)
let snake = [];
let canStart = true;
let gameInProgress = false;
let changingDirection = false;
let counter = 1;
let foodX;
let foodY;
var deathBy = "something";
let score = 0;

var highscore = localStorage.getItem("highscore");
if (highscore == null) {highscore = 0;}
document.getElementById('highscore').innerHTML = highscore;

var images = {};
var totalResources = 0;
var numResourcesLoaded = 0;

//load images
function loadImage(name) {
	images[name] = new Image();
	images[name].onload = function() {resourceLoaded()}
	images[name].src = "media/" + name + ".png";
}

totalResources ++; loadImage("snake_head");
totalResources ++; loadImage("snake_body");
totalResources ++; loadImage("food");


//initialise canvas when all resources are loaded
function resourceLoaded() {
	numResourcesLoaded += 1;
	if(numResourcesLoaded === totalResources) {
		newGame();
	}
}

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



// Draws the snake - run through snake array drawing each parts coordinates on the canvas
function drawSnake() {
	//copy snake array without first element to body variable
	var body = snake.slice(1);
	console.log(body);
	body.forEach(drawSnakePart)


	var head = snake[0];
	ctx.drawImage(images["snake_head"], head.x, head.y);
}

// Draw a snake part at the coordinates given in (snakePart) parameter
function drawSnakePart(snakePart) {
	ctx.drawImage(images["snake_body"], snakePart.x, snakePart.y);
}


//function to draw the created food on canvas
function drawFood() {
	ctx.drawImage(images["food"], foodX, foodY);
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


function updateHighscore() {
	let oldHighscore = highscore;
	localStorage.setItem("highscore", score);    
	highscore = localStorage.getItem("highscore");
	document.getElementById('highscore').innerHTML = highscore;
	// jQuery dialog box with new high score message
	$("#dialog").dialog('option', 'title', 'Congratulations!');
	$("#dialog-message").html("New high score: " + highscore + "<br><br>Previous best: " + oldHighscore);
	$("#dialog").dialog("open");  
}

function resetScore() {
	score = 0;
	document.getElementById('score').innerHTML = score;
}