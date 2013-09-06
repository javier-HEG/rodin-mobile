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

	var broker = new Broker();

	this.getUserName = function() {
		return username;
	};

	this.getRealName = function() {
		return realname;
	};

	this.setRealName = function(aRealName) {
		realname = aRealName;
	};

	this.getUniverses = function() {
		return universes;
	};

	this.getCurrentUniverse = function() {
		return currentUniverse;
	};

	/**
	 * Since no predefined order exists between loading user details
	 * and the user universes, this method is called in both cases
	 * hoping that a universe id is set and the universes are loaded.
	 */
	function propagateCurrentUniverseId() {
		if (currentUniverseId !== null && universes.length > 0) {
			for (var i = 0; i < universes.length; i++)
				if (universes[i].getId() === currentUniverseId)
					currentUniverse = universes[i];
		}
	}

	this.initUserDetailsCallback = function(data, status, xhr) {
		realname = data.name;

		if (data.hasOwnProperty('universeid'))
			currentUniverseId = data.universeid;

		propagateCurrentUniverseId();
		this.notifyObservers();
	};

	this.initUniversesCallback = function(data, status, xhr) {
		for (var i = 0; i < data.length; i++) {
			var universe = new Universe(data[i].id);
			universe.setName(data[i].name);
			universes.push(universe);
		}

		propagateCurrentUniverseId();
		this.notifyObservers();
	};

	this.setCurrentUniverse = function(universeId) {
		currentUniverseId = universeId;
		propagateCurrentUniverseId();
		this.notifyObservers();
	};

	this.init = function() {
		// Load user-data
		var url = "user/" + this.getUserName();
		broker.makeRequest("GET", url, null, this.initUserDetailsCallback, this);

		// Load universes
		url = "universe/query?userId=" + this.getUserName();
		broker.makeRequest("GET", url, null, this.initUniversesCallback, this);
	};

	// Launch initialization
	this.init();
}