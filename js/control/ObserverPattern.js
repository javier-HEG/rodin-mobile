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
 * Tracks changes to the user, used at least once at start
 */
UserObserver.prototype = new Observer();
UserObserver.prototype.constructor = UserObserver;

function UserObserver() {
}

UserObserver.prototype.updateLocale = function() {
	document.l10n.requestLocales(user.getLanguage());

	$("input.language:button").prop("disabled", false);
	$("#language-select-" + user.getLanguage()).prop("disabled", true);
};

UserObserver.prototype.notify = function() {
	$("#user-name-input").val(user.getRealName());

	if (l10nReady) {
		l10nLanguageSet = true;
		this.updateLocale();
	} else {
		setTimeout("userObserver.notify();", 100);
	}
};

/**
 * Tracking changes in the universe list, it only displays
 * something if the list of universes is not empty AND if
 * a universe is selected (both are checked because they
 * are asynchronous)
 */
UniverseListObserver.prototype = new Observer();
UniverseListObserver.prototype.constructor = UniverseListObserver;

function UniverseListObserver() {
	this.view = new UniverseListView();
}

UniverseListObserver.prototype.notify = function() {
	this.view.displayUserUniverses();
};

/**
 * Tracking changes to what should be displayed about the current
 * universe
 */
CurrentUniverseObserver.prototype = new Observer();
CurrentUniverseObserver.prototype.constructor = CurrentUniverseObserver;

function CurrentUniverseObserver() {
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
			switch ($(this).parent().attr("id")) {
				case "doc-sources-ul":
					selectSource(this, Source.prototype.DOC_SOURCE_TYPE);
					break;
				case "the-sources-ul":
					selectSource(this, Source.prototype.THESAURUS_SOURCE_TYPE);
					break;
				case "lod-sources-ul":
					selectSource(this, Source.prototype.LOD_SOURCE_TYPE);
					break;
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
}

CurrentUniverseObserver.prototype.notify = function() {
	var selected = null;

	if (selected === null && user !== null)
		selected = user.getCurrentUniverse();

	if (selected !== null) {
		// Enable query field and button
		if ($("#global-search-query").prop("disabled")) {
			$("#global-search-query").val("");
		}

		$("#global-search-query").prop("disabled", false);
		$("#global-search-button").prop("disabled", false);

		// Set the universe name in the GUI
		$("#current-universe-label").text('Configure "' + selected.getName() + '"');
		$("#universe-name-setting").val(selected.getName());

		$("#current-universe-label").parent().show();
		$("#config-current-universe-label").show();
		$("#remove-current-label").parent().show();

		// Prepare the sources selection menus
		// - Empty both lists
		$('#doc-sources-ul li:not(.mm-subtitle)').remove();
		$('#the-sources-ul li:not(.mm-subtitle)').remove();
		$('#lod-sources-ul li:not(.mm-subtitle)').remove();
		// - Parse the list of available sources
		var allSources = user.getAvailableSources();
		if (allSources.length > 0) {
			var docSourcesList = $("#doc-sources-ul");
			var theSourcesList = $("#the-sources-ul");
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

				// Add to Thesauri sources if available
				if (allSources[i].isThesaurusSource) {
					var theSourceItem = $('<span>' + sourceName + "</span>");
					var element = $('<li id="the-' + sourceName + '"></li>').append(theSourceItem);

					var sourceType = Source.prototype.THESAURUS_SOURCE_TYPE;

					var sourceInstanceId = selected.getSourceInstanceId(sourceName, sourceType);
					if (sourceInstanceId !== -1) {
						this.formatAsSelected(element, sourceInstanceId);
					} else {
						this.formatAsUnselected(element);
					}

					theSourcesList.append(element);
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
	} else {
		$("#current-universe-label").parent().hide();
		$("#config-current-universe-label").hide();
		$("#remove-current-label").parent().hide();

		$("#global-search-query").val("Disabled");
		$("#global-search-query").prop("disabled", true);
		$("#global-search-button").prop("disabled", true);
	}
};

/**
 * Tracks the subject expasion terms, it is responsible of showing/hiding the terms
 * list panel. Also, together with the global search it is responsible of enabling
 * or disabling the search field.
 */
SubjectExpansionObserver.prototype = new Observer();
SubjectExpansionObserver.prototype.constructor = SubjectExpansionObserver;

function SubjectExpansionObserver() {
	this.view = new SubjectExpansionView();
}

SubjectExpansionObserver.prototype.notify = function() {
	this.view.processResults();
};


/**
 * Tracks the search article results, it is responsible of showing the results
 * when they are ready. Also, together with the subject expansion search, it is
 * responsible of enabling or disabling the search field.
 */
SearchObserver.prototype = new Observer();
SearchObserver.prototype.constructor = SearchObserver;

function SearchObserver() {
	this.view = new GlobalSearchView();
}

SearchObserver.prototype.notify = function() {
	this.view.processResults();
	user.resetTemporalGlobalSearch();
};

