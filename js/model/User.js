/**
 * User class, observable
 */
User.prototype = new Observable();
User.prototype.constructor = User;

function User(username) {
	var realname = '';

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

	this.initUserDetailsCallback = function(data, status, xhr) {
		jsonRepresentation = data;
		realname = data.name;

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