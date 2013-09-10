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
	var self = this;

	this.formatAsSelected = function(element, instanceId) {
		$.data(element, "instanceId", instanceId);

		element.removeClass("mm-unselected");
		element.addClass("mm-selected");

		element.unbind('click');
		element.click(function() {
			unselectSource(element);
		});
	};

	this.formatAsUnselected = function(element) {
		$.removeData(element, "instanceId");

		element.removeClass("mm-selected");
		element.addClass("mm-unselected");

		element.unbind('click');
		element.click(function() {
			if ($(this).parent().attr("id") === "doc-sources-ul") {
				selectSource(this, Source.prototype.DOC_SOURCE_TYPE);
			} else if ($(this).parent().attr("id") === "lod-sources-ul") {
				selectSource(this, Source.prototype.LOC_SOURCE_TYPE);
			}
		});
	};

	function selectSource(element, type) {
		user.getCurrentUniverse().selectSource(element, type);
	}

	function unselectSource(element) {
		user.getCurrentUniverse().unselectSource($.data(element, "instanceId"));
		self.formatAsUnselected(element);
	}

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
			var docSourcesList = $("#doc-sources-ul");
			var lodSourcesList = $("#lod-sources-ul");

			for (var i = 0; i < allSources.length; i++) {
				var sourceName = allSources[i].name;

				// Add to document sources if available
				if (allSources[i].isDocumentSource) {
					var docSourceItem = $('<span>' + sourceName + "</span>");
					var element = $('<li id="doc-' + sourceName + '"></li>').append(docSourceItem);

					var sourceType = Source.prototype.DOC_SOURCE_TYPE;

					var sourceInstanceId = selected.getSourceInstanceId(sourceName, sourceType);
					if (sourceInstanceId !== -1) {
						this.formatAsSelected(element, sourceInstanceId);
					} else {
						this.formatAsUnselected(element);
					}

					docSourcesList.append(element);
				}

				// Add to LOD sources if available
				if (allSources[i].isLodSource) {
					var lodSourceItem = $('<span>' + sourceName + "</span>");
					var element = $('<li id="lod-' + sourceName + '"></li>').append(lodSourceItem);

					var sourceType = Source.prototype.LOD_SOURCE_TYPE;

					var sourceInstanceId = selected.getSourceInstanceId(sourceName, sourceType);
					if (sourceInstanceId !== -1) {
						this.formatAsSelected(element, sourceInstanceId);
					} else {
						this.formatAsUnselected(element);
					}

					lodSourcesList.append(element);
				}
			}
		}
	}
};
