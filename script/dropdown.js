// resize buttons
$(document).ready(function () {
    $("#resize").hover(function () {
		$("#resize-content").toggleClass("dropdown-hover");
	});
	$(this).unbind("mouseenter mouseleave");
});

$('#20SizeBtn').bind('click', function() {resizeCanvas(2, this);});
$('#30SizeBtn').bind('click', function() {resizeCanvas(3, this);});
$('#40SizeBtn').bind('click', function() {resizeCanvas(4, this);});
$('#50SizeBtn').bind('click', function() {resizeCanvas(5, this);});
$('#60SizeBtn').bind('click', function() {resizeCanvas(6, this);});
$('#70SizeBtn').bind('click', function() {resizeCanvas(7, this);});
$('#80SizeBtn').bind('click', function() {resizeCanvas(8, this);});
$('#90SizeBtn').bind('click', function() {resizeCanvas(9, this);});
$('#100SizeBtn').bind('click', function() {resizeCanvas(10, this);});

function resizeCanvas(newScale, id) {
	$("#resize div").removeClass("active-div");
	$(id).addClass('active-div');
	scale = newScale;
	ctx.canvas.width  = 100 * scale;
	ctx.canvas.height = 100 * scale;
	newGame();
}




//speed buttons
$(document).ready(function () {
    $("#speed").hover(function () {
		$("#speed-content").toggleClass("dropdown-hover");
	});
	$(this).unbind("mouseenter mouseleave");
});

$('#slowSpeedBtn').bind('click', function() {changeSpeed(20, this);});
$('#mediumSpeedBtn').bind('click', function() {changeSpeed(10, this);});
$('#fastSpeedBtn').bind('click', function() {changeSpeed(8, this);});
$('#extremeSpeedBtn').bind('click', function() {changeSpeed(4, this);});
$('#absurdSpeedBtn').bind('click', function() {changeSpeed(1, this);});

function changeSpeed(newSpeed, id) {
	$("#speed div").removeClass("active-div");
	$(id).addClass('active-div');
	frameRate = newSpeed;
	newGame();
}




//bg color buttons
$(document).ready(function () {
    $("#bg-color").hover(function () {
		$("#bg-color-content").toggleClass("dropdown-hover");
	});
	$(this).unbind("mouseenter mouseleave");
});

$('#greenBgBtn').bind('click', function() {changeBackground("#b7ffa1", "#78c262");});
$('#blueBgBtn').bind('click', function() {changeBackground("#4484ce", "#326aaa");});
$('#purpleBgBtn').bind('click', function() {changeBackground("#7a3699", "#9249b4");});
$('#greyBgBtn').bind('click', function() {changeBackground("#94979b", "#7e8185");});
$('#whiteBgBtn').bind('click', function() {changeBackground("#FFFFFF", "#FFFFFF");});

function changeBackground(newColorOne, newColorTwo) {
	colorOne = newColorOne;
	colorTwo = newColorTwo;
	newGame();
}
