function Universe(data) {
	var jsonRepresentation = data;
	
	var id = jsonRepresentation.id;
	var name = jsonRepresentation.name;

	var initialized = false;

	var documentSourceNames = [];
	var lodSourceNames = [];

	var broker = new Broker();

	this.setName = function(newName) {
		name = newName;

		user.notifyObservers();

		if (jsonRepresentation.name !== newName) {
			jsonRepresentation.name = newName;
			saveUniverseInServer();
		}
	};

	this.getName = function() {
		return name;
	};

	this.getId = function() {
		return id;
	}

	this.getSources = function(type) {
		switch (type) {
			case Source.prototype.DOC_SOURCE_TYPE:
				return documentSourceNames;
			case Source.prototype.LOD_SOURCE_TYPE:
				return lodSourceNames;
		}
	}

	function saveUniverseInServer() {
		broker.makeRequest("PUT", "universe", JSON.stringify(jsonRepresentation), null, this);
	}

	this.wasInitialized = function() {
		return initialized;
	}

	/**
	 * Returns the most basic JSON version of the universe,
	 * used to launch a search
	 */
	this.toMiniJson = function() {
		return {id: jsonRepresentation.id};
	};

	/**
	 * Sets universe details loaded from server and notifyes user
	 * observers
	 */
	this.initUniverseSourcesCallback = function(data, status, xhr) {
		for (var i = 0; i < data.length; i++) {
			switch (data[i].type) {
				case Source.prototype.DOC_SOURCE_TYPE:
					documentSourceNames.unshift(data[i].sourceName);
					break;
				case Source.prototype.LOD_SOURCE_TYPE:
					lodSourceNames.unshift(data[i].sourceName);
					break;
			}
		}

		user.notifyObservers();

		initialized = true;
	}

	/**
	 * Requests universe details from server, for now sources only
	 */
	this.init = function() {
		var url = "sourceinstance/universe/" + this.getId();
		broker.makeRequest("GET", url, null, this.initUniverseSourcesCallback, this);
	}
}
