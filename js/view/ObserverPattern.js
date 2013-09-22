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

UserObserver.prototype.notify = function() {
	$("#user-name-input").val(user.getRealName());
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
	var self = this;

	this.formatUniverseAsSelected = function(element) {
		element.removeClass("mm-unselected");
		element.addClass("mm-selected");

		element.unbind('click');
		element.css('cursor', 'default');
	};

	this.formatUniverseAsUnselected = function(element) {
		element.removeClass("mm-selected");
		element.addClass("mm-unselected");

		element.unbind('click');
		element.click(function() {
			user.setCurrentUniverseId($.data(element, "universeId"));
			self.formatUniverseAsSelected(element);
		});

		element.css('cursor', 'pointer');
	};
}

UniverseListObserver.prototype.notify = function() {
	var universes = user.getUniverses();
	var selected = user.getCurrentUniverse();

	$("#universe-selection-label").nextUntil("#create-universe-option").remove();
	if (universes.length > 0 && selected !== null) {
		for (var i = 0; i < universes.length; i++) {
			var universeItem = $('<li>' + universes[i].getName() + "</li>");
			$.data(universeItem, 'universeId', universes[i].getId());

			if (selected.getId() === universes[i].getId()) {
				this.formatUniverseAsSelected(universeItem);
			} else {
				this.formatUniverseAsUnselected(universeItem);
			}

			universeItem.insertAfter($("#universe-selection-label"));
		}
	}
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
		$("#header-universe-name").text(selected.getName());
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
		$("#header-universe-name").text("<--- No universe, create one");

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
	this.currentSearchId = null;

	var self = this;

	this.setNewTerms = function(terms) {
		if (terms.length === 0) {
			$("#rodin-expansion-count").text("No related terms found");
			
			setTimeout(function() {
				$("#rodin-expansion-header").addClass("unavailable");
			}, 2000);
		} else {
			$("#rodin-expansion-terms ul li").remove();
			for (var i = 0; i < terms.length; i++) {
				var item = $("<li>" + terms[i] + "</li>");
				item.bind("click", function() {
					$(this).toggleClass("selected");
					self.notify();
				});
				$("#rodin-expansion-terms ul:first").append(item);
			}
			;

			if (terms.length > 1) {
				$("#rodin-expansion-count").text(terms.length + " related terms");
			} else {
				$("#rodin-expansion-count").text("1 related term");
			}

			$("#rodin-expansion-header").removeClass("unavailable");
		}
	};
}

SubjectExpansionObserver.prototype.notify = function() {
	console.log("SubjectExpansionObserver was notified");

	var lastSearch = user.getLastSubjectExpansionSearch();

	if (lastSearch !== null) {
		if (lastSearch.getSearchId() === null) {
			$("#rodin-expansion-header").removeClass("unavailable");
			$("#rodin-expansion-header").addClass("closed");
			$("#rodin-expansion-count").text("Searching related terms ...");
		} else {
			var lastSearchId = lastSearch.getSearchId();

			if (this.currentSearchId === lastSearchId) {
				if ($("#rodin-expansion-terms ul li.selected").length > 0) {
					$("#rodin-expansion-selection").text("(" + $("#rodin-expansion-terms ul li.selected").length + " selected)");
					$("#global-search-button").addClass("refresh");
				} else {
					$("#rodin-expansion-selection").text("");
					$("#global-search-button").removeClass("refresh");
				}
			} else {
				this.currentSearchId = lastSearchId;
				this.setNewTerms(lastSearch.getResults());
			}
		}
	}
};

/**
 * Tracks the search article results, it is responsible of showing the results
 * when they are ready. Also, together with the subject expansion search, it is
 * responsible of enabling or disabling the search field.
 */
SearchObserver.prototype = new Observer();
SearchObserver.prototype.constructor = SearchObserver;

function SearchObserver() {
}

SearchObserver.prototype.notify = function() {
	console.log("SearchObserver was notified");

	var lastSearch = user.getLastGlobalSearch();

	if (lastSearch !== null) {
		if (lastSearch.getSearchId() === null) {
			$("#rodin-results div").remove();

			var messageItem = $('<div class="sixteen columns"></div>');
			messageItem.append($('<div class="rodin-result">Searching ...</div>'));

			$("#rodin-results").append(messageItem);
		} else {
			var results = lastSearch.getResults();

			$("#rodin-results div").remove();
			if (results.length === 0) {
				var messageItem = $('<div class="sixteen columns"></div>');
				messageItem.append($('<div class="rodin-result">No results</div>'));

				$("#rodin-results").append(messageItem);
			} else {
				for (var i = 0; i < results.length; i++) {
					var resultItem = $('<div class="eight columns"></div>');
					results[i].displayInDiv(resultItem);

					$("#rodin-results").append(resultItem);
				}
			}
		}
	}
};

