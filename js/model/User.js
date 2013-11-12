/**
 * User class, observable
 */
User.prototype = new Observable();
User.prototype.constructor = User;

function User(username) {
	var realname = '';
	var language = '';

	var universes = [];
	var currentUniverseId = null;
	var currentUniverse = null;

	var availableSources = [];
	
	var jsonRepresentation = null;
	var broker = new Broker();

	var self = this;

	var globalSearches = [];
	var subjectExpansionSearches = [];
	var historyPosition = 0;

	var temporalGlobalSearch = null;

	this.getHistoryPosition = function() {
		return historyPosition;
	}

	this.getHistoryLength = function() {
		return Math.min(globalSearches.length, subjectExpansionSearches.length);
	}

	this.goBackInHistory = function() {
		historyPosition = historyPosition + 1;
		this.updateHistoryButtons();
		this.loadActualSearch();
	};

	this.goForwardInHistory = function() {
		historyPosition = historyPosition - 1;
		this.updateHistoryButtons();
		this.loadActualSearch();
	};

	this.loadActualSearch = function() {
		$('#global-search-query').val(this.getActualGlobalSearch().getQuery());

		this.getActualGlobalSearch().notifyObservers();
		this.getActualSubjectExpansionSearch().notifyObservers();
	}

	this.launchNewSearch = function(query) {
		var subjectExpansionSearch = new Search(query, Search.prototype.SUBJECT_EXPANSION_TYPE);
		subjectExpansionSearch.registerObserver(subjectExpansionObserver);
		subjectExpansionSearches.unshift(subjectExpansionSearch);
		
		var globalSearch = new Search(query, Search.prototype.GLOBAL_TYPE);
		globalSearch.registerObserver(searchObserver);
		globalSearches.unshift(globalSearch);

		historyPosition = 0;
		this.updateHistoryButtons();

		this.getActualGlobalSearch().launch();
		this.getActualSubjectExpansionSearch().launch();
	}

	this.refreshDocumentSearch = function(query, expansion) {
		var expansionString = query;
		
		if (expansion !== null && expansion.length > 0) {
			for (var i = 0; i < expansion.length; i++) {
				expansionString += " " + expansion[i].innerHTML;
			};
		}

		temporalGlobalSearch = new Search(expansionString, Search.prototype.GLOBAL_TYPE);
		temporalGlobalSearch.registerObserver(searchObserver);
		temporalGlobalSearch.launch();
	}

	this.updateHistoryButtons = function() {
		var historyLength = this.getHistoryLength();
		
		if (historyPosition > 0) {
			$("#history-forward").prop("disabled", false);

			if (historyPosition === historyLength - 1) {
				$("#history-back").prop("disabled", true);
			} else {
				$("#history-back").prop("disabled", false);
			}
		} else {
			$("#history-forward").prop("disabled", true);

			if (historyLength > 1) {
				$("#history-back").prop("disabled", false);
			} else {
				$("#history-back").prop("disabled", true);
			}
		}
	}

	this.getActualSubjectExpansionSearch = function() {
		if (subjectExpansionSearches.length == 0) {
			return null;
		} else {
			return subjectExpansionSearches[historyPosition];
		}
	}

	this.getActualGlobalSearch = function() {
		if (user.getTemporalSearch() !== null) {
			return temporalGlobalSearch;
		} else {
			if (globalSearches.length == 0) {
				return null;
			} else {
				return globalSearches[historyPosition];
			}
		}
	}

	this.getTemporalSearch = function() {
		return temporalGlobalSearch;
	}

	this.resetTemporalGlobalSearch = function() {
		temporalGlobalSearch = null;
	}

	this.getLanguage = function() {
		return language;
	}

	this.setLanguage = function(lang) {
		language = lang;

		// Save change in server
		if (jsonRepresentation.userlang !== language) {
			jsonRepresentation.userlang = language;
			saveUserInServer();
		}

		this.notifyObservers();
	}

	this.getUserName = function() {
		return username;
	};

	this.getRealName = function() {
		return realname;
	};

	this.setRealName = function(aRealName) {
		realname = aRealName;

		// Save change in server
		if (jsonRepresentation.name !== aRealName) {
			jsonRepresentation.name = aRealName;
			saveUserInServer();
		}

		this.notifyObservers();
	};

	this.getUniverses = function() {
		return universes;
	};

	this.getCurrentUniverse = function() {
		return currentUniverse;
	};

	this.setCurrentUniverseId = function(universeId) {
		currentUniverseId = universeId;

		for (var i = 0; i < universes.length; i++)
			if (universes[i].getId() === currentUniverseId)
				currentUniverse = universes[i];

		if (currentUniverse.wasInitialized())
			this.notifyObservers();		
		else
			currentUniverse.init();

		// Save change in server
		if (jsonRepresentation.universeid !== currentUniverseId) {
			jsonRepresentation.universeid = currentUniverseId;
			saveUserInServer();
		}
	};

	this.removeCurrentUniverse = function() {
		broker.makeRequest("DELETE", "universe/" + currentUniverseId, null, this.universeRemovedCallBack, this);
	}

	this.universeRemovedCallBack = function(data, status, xhr) {
		for (var i = 0; i < universes.length; i++) {
			if (universes[i].getId() === currentUniverseId) {
				universes.splice(i, 1);
			}
		}

		currentUniverseId = null;
		currentUniverse = null;

		if (universes.length > 0) {
			this.setCurrentUniverseId(universes[universes.length - 1].getId());
		} else {
			this.notifyObservers();
		}
	}

	this.createNewUniverse = function(universeName) {
		broker.makeRequest("POST", "universe", JSON.stringify({name: universeName, owner: this.toMiniJson()}), this.newUniverseCallback, this);
	}

	this.newUniverseCallback = function(data, status, xhr) {
		broker.makeRequest("GET", xhr.getResponseHeader("Location"), null, this.loadNewUniverseCallback, this);
	}

	this.loadNewUniverseCallback = function(data, status, xhr) {
		var newUniverse = new Universe(data);
		universes.push(newUniverse);

		this.setCurrentUniverseId(newUniverse.getId());
	}

	this.getAvailableSources = function() {
		return availableSources;
	};

	function saveUserInServer() {
		broker.makeRequest("PUT", "user", JSON.stringify(jsonRepresentation), null, this);
	}

	/**
	 * Since no predefined order exists between loading user details
	 * and the user universes, this method synchs setting the current
	 * universe instance.
	 */
	function propagateCurrentUniverseId() {
		if (currentUniverseId !== null && universes.length > 0)
			self.setCurrentUniverseId(currentUniverseId);
	}

	/**
	 * Returns the most basic JSON version of the user
	 */
	this.toMiniJson = function() {
		return {username: jsonRepresentation.username};
	};

	this.initUserDetailsCallback = function(data, status, xhr) {
		jsonRepresentation = data;
		realname = data.name;
		language = data.userlang;

		if (data.hasOwnProperty('universeid'))
			currentUniverseId = data.universeid;

		propagateCurrentUniverseId();
		this.notifyObservers();
	};

	this.initUniversesCallback = function(data, status, xhr) {
		for (var i = 0; i < data.length; i++) {
			var universe = new Universe(data[i]);
			universes.push(universe);
		}

		propagateCurrentUniverseId();
		this.notifyObservers();
	};

	this.initAvailableSources = function(data, status, xhr) {
		for (var i = 0; i < data.sources.length; i++) {
			var source = new Source(data.sources[i]);
			availableSources.unshift(source);
		}

		this.notifyObservers();
	}

	this.init = function() {
		// Prepare search history
		$("#history-back").click(function() {
			user.goBackInHistory();
		});

		$("#history-forward").click(function() {
			user.goForwardInHistory();
		});

		this.updateHistoryButtons();

		// Load user-data
		var url = "user/" + this.getUserName();
		broker.makeRequest("GET", url, null, this.initUserDetailsCallback, this);

		// Load universes
		url = "universe/query?userId=" + this.getUserName();
		broker.makeRequest("GET", url, null, this.initUniversesCallback, this);

		// Load available sources
		url = "source/query?username=" + this.getUserName();
		broker.makeRequest("GET", url, null, this.initAvailableSources, this);

	};

	// Launch initialization
	this.init();
}

/**
 * A class holding the autocomplete values
 */
function AutoComplete() {
	var suggestions = [];
	var isActive = true;

	this.updateSuggestions = function() {
		if (isActive) {
			var query = $("#global-search-query").val();

			if (query !== "") {
				var requestInfo = {
					type: "GET",
					url: "autocomplete.php?query=" + query,
					contentType: "application/json",
					dataType: "json",
					context: autoComplete,
					success: this.displaySuggestions,
					error: function() {
						alert('Auto-complete error');
					}
				};

				$.ajax(requestInfo);
			} else {
				$("#autocomplete-box").hide();
				$("#autocomplete-box ul li").remove();	
			}
		} else {
			$("#autocomplete-box").hide();
			$("#autocomplete-box ul li").remove();
		}
	};

	this.displaySuggestions = function(data, status, xhr) {
		$("#autocomplete-box").hide();
		$("#autocomplete-box ul li").remove();

		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var span = $('<span class="launch">' + data[i] + '</span>');
				span.click(function() {
					autoComplete.turnOff();
					$("#global-search-query").val(this.innerHTML);
					startGlobalSearch();
					autoComplete.turnOn();
				});

				var button = $('<button class="add" type="button"></button>');
				button.click(function() {
					$("#global-search-query").val(this.parentNode.children[0].innerHTML);
					$("#global-search-query").focus();
					autoComplete.updateSuggestions();
				});

				var item = $('<li class="clearfix"></li>');
				item.append(span);
				button.insertAfter(span);

				$("#autocomplete-box ul").append(item);
			};

			$("#autocomplete-box").show();
		}
	}

	this.hideMenu = function() {
		$("#autocomplete-box").hide();
		$("#autocomplete-box ul li").remove();
	}

	this.turnOff = function() {
		var isActive = false;
	}

	this.turnOn = function() {
		var isActive = true;
	}
}

