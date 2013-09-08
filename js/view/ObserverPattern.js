////////////////////////////////////
// OBSERVER PROTOTYPES TO EXTEND

/**
 * Default observable prototype
 */
function Observable() {
	var observers = [];

	this.registerObserver = function(observer) {
		// TODO Check the observer for notify() method
		observers.push(observer);
	};

	this.notifyObservers = function() {
		for (var i = 0; i < observers.length; i++) {
			observers[i].notify();
		}
		;
	};
}

/**
 * Defatul observer prototype
 */
function Observer() {
}
Observer.prototype.notify = function() {
};

////////////////////////
// OBSERVER CLASSES

/**
 * Tracking changes in the universe list, it only displays
 * something if the list of universes is not empty AND if
 * a universe is selected (both are checked because they
 * are asynchronous)
 */
UniverseListObserver.prototype = new Observer();
UniverseListObserver.prototype.constructor = UniverseListObserver;

function UniverseListObserver() {
}

UniverseListObserver.prototype.notify = function() {
	var universes = user.getUniverses();
	var selected = user.getCurrentUniverse();

	if (universes.length > 0 && selected !== null) {
		$("#menu-right").empty();
		$("#menu-right").append($("<ul></ul>"));
		$("#menu-right ul").append($('<li class="mm-label">Universe selection</li>'));

		for (var i = 0; i < universes.length; i++) {
			var universeItem = $('<a href="#">' + universes[i].getName() + "</a>");

			if (selected.getId() === universes[i].getId()) {
				$("#menu-right ul").append($('<li class="mm-selected"></li>').append(universeItem));
			} else {
				var element = $('<li></li>');
				element.addClass("mm-unselected");
				element.click(function() {
					user.setCurrentUniverse($.data(element, "universeId"));

					messageManager.addMessage("Changed current universe", MessageManager.prototype.INFO_MSG);
					messageManager.rollMessages();

					$('#menu-right').trigger('close');
				});

				$.data(element, 'universeId', universes[i].getId());

				$("#menu-right ul").append(element.append(universeItem));
			}
		}
	}

	// FIXME Only having a current universe should enable searches
};

/**
 * Tracking changes to what should be displayed about the current
 * universe
 */
CurrentUniverseObserver.prototype = new Observer();
CurrentUniverseObserver.prototype.constructor = CurrentUniverseObserver;

function CurrentUniverseObserver() {
}

CurrentUniverseObserver.prototype.notify = function() {
	var selected = user.getCurrentUniverse();

	if (selected != null)
		$("#header-universe-name").text(selected.getName());
};