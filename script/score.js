let score = 0;

var highscore = localStorage.getItem("highscore");
if (highscore == null) {highscore = 0;}
document.getElementById('highscore').innerHTML = highscore;

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