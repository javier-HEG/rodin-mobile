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

	this.newSubjectExpansionSearch = function(searchObject) {
		subjectExpansionSearches.push(searchObject);
	}

	this.newGlobalSearch = function(searchObject) {
		globalSearches.push(searchObject);
	}

	this.getLastSubjectExpansionSearch = function() {
		if (subjectExpansionSearches.length == 0) {
			return null;
		} else {
			return subjectExpansionSearches[subjectExpansionSearches.length-1];
		}
	}

	this.getLastGlobalSearch = function() {
		if (globalSearches.length == 0) {
			return null;
		} else {
			return globalSearches[globalSearches.length-1];
		}
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