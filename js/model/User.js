/**
 * User class, observable
 */
User.prototype = new Observable();
User.prototype.constructor = User;

function User(username) {
	var realname = '';
	var universes = [];

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

	this.initUniversesCallBack = function(data, status, xhr) {
		for (var i = 0; i < data.length; i++) {
			var universe = new Universe(data[i].id);
			universe.setName(data[i].name);

			universes.push(universe);
		}

		this.notifyObservers();
	};

	this.init = function() {
		// Load universes
		var url = "universe/query?userId=" + this.getUserName();
		broker.makeRequest("GET", url, null, this.initUniversesCallBack, this);
	};

	// Launch initialization
	this.init();
}