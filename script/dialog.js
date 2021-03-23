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