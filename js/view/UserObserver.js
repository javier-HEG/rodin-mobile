/**
 * Observer class for the User entities, its responsible for keeping
 * track of changes in the universe list
 */
UserObserver.prototype = new Observer();
UserObserver.prototype.constructor = UserObserver;

function UserObserver() {}

UserObserver.prototype.notify = function() {
	// Add the available universes
	var universes = user.getUniverses();

	$("#menu-right").empty();
	$("#menu-right").append($("<ul></ul>"));
	$("#menu-right ul").append($('<li class="mm-label">Universe selection</li>'));

	for (var i = 0; i < universes.length; i++) {
		var universeItem = $('<a href="#">' + universes[i].getName() + "</a>");
		$("#menu-right ul").append($("<li></li>").append(universeItem)); 
	};
}