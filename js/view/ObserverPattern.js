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
			var universeItem = $('<span>' + universes[i].getName() + "</span>");

			if (selected.getId() === universes[i].getId()) {
				$("#menu-right ul").append($('<li class="mm-selected"></li>').append(universeItem));
			} else {
				var element = $('<li></li>');
				element.addClass("mm-unselected");
				element.click(function() {
					user.setCurrentUniverseId($.data(element, "universeId"));

					messageManager.addMessage("Changed current universe", MessageManager.prototype.INFO_MSG);
					messageManager.rollMessages();

					$('#menu-right').trigger('close');
				});

				$.data(element, 'universeId', universes[i].getId());

				$("#menu-right ul").append(element.append(universeItem));
				universeItem.css('cursor', 'pointer');
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

	if (selected !== null) {
		// Set the universe name in the GUI
		$("#header-universe-name").text(selected.getName());
		$("#universe-name-setting").val(selected.getName());

		// Prepare the sources selection menus
		// - Empty both lists
		$('#doc-sources-ul li:not(.mm-subtitle)').remove();
		$('#lod-sources-ul li:not(.mm-subtitle)').remove();
		// - Parse the list of available sources
		var allSources = user.getAvailableSources();
		if (allSources.length > 0) {
			var selectedDocumentSources = selected.getSources(Source.prototype.DOC_SOURCE_TYPE);
			var selectedLodSources = selected.getSources(Source.prototype.LOD_SOURCE_TYPE);

			var docSourcesList = $("#doc-sources-ul");
			var lodSourcesList = $("#lod-sources-ul");
			for (var i = 0; i < allSources.length; i++) {
				var docSourceItem = $('<a href="#">' + allSources[i].name + "</a>");
				var lodSourceItem = $('<a href="#">' + allSources[i].name + "</a>");

				// Add to document sources if available
				if (allSources[i].isDocumentSource) {
					if (selectedDocumentSources.indexOf(allSources[i].name) !== -1)
						docSourcesList.append($('<li class="mm-selected"></li>').append(docSourceItem));
					else
						docSourcesList.append($('<li class="mm-unselected"></li>').append(docSourceItem));
				}
				// Add to LOD sources if available
				if (allSources[i].isLodSource) {
					if (selectedLodSources.indexOf(allSources[i].name) !== -1)
						lodSourcesList.append($('<li class="mm-selected"></li>').append(lodSourceItem));
					else
						lodSourcesList.append($('<li class="mm-unselected"></li>').append(lodSourceItem));
				}
			}
		}
	}
};
