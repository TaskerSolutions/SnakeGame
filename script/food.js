let foodX;
let foodY;

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