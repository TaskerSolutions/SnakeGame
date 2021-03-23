var speed = 2; // speed at which snake moves
let dx = speed; // Horizontal velocity of snake - direction (x)
let dy = 0; // Vertical velocity of snake - direction (y)
let snake = [];

// Draws the snake - run through snake array drawing each parts coordinates on the canvas
function drawSnake() {
	//copy snake array without first element to body variable
	var body = snake.slice(1);
	body.forEach(drawSnakePart);

	// draw head
	var head = snake[0];
	ctx.drawImage(images["snake_head"], head.x, head.y);
}

// Draw a snake part at the coordinates given in (snakePart) parameter
function drawSnakePart(snakePart) {
	ctx.drawImage(images["snake_body"], snakePart.x, snakePart.y);
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