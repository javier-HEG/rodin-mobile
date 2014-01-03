function Universe(data) {
	var jsonRepresentation = data;

	var id = jsonRepresentation.id;
	var name = jsonRepresentation.name;

	var initialized = false;

	var documentSources = [];
	var thesaurusSources = [];
	var lodSources = [];

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
	};

	this.getSources = function(type) {
		switch (type) {
			case Source.prototype.DOC_SOURCE_TYPE:
				return documentSources;
			case Source.prototype.THESAURUS_SOURCE_TYPE:
				return thesaurusSources;
			case Source.prototype.LOD_SOURCE_TYPE:
				return lodSources;
		}
	};

	this.getSourceInstanceId = function(sourcename, type) {
		var sourceList = null;

		switch (type) {
			case Source.prototype.DOC_SOURCE_TYPE:
				sourceList = documentSources;
				break;
			case Source.prototype.THESAURUS_SOURCE_TYPE:
				sourceList = thesaurusSources;
				break;
			case Source.prototype.LOD_SOURCE_TYPE:
				sourceList = lodSources;
				break;
		}

		for (var i = 0; i < sourceList.length; i++) {
			if (sourceList[i].name === sourcename)
				return sourceList[i].id;
		}

		return -1;
	};

	this.selectSource = function(element, sourceType) {
		var url = "sourceinstance";

		var data = {
			sourceName: $(element).text(),
			universe: this.toMiniJson(),
			type: sourceType
		};

		broker.makeRequest("POST", url, JSON.stringify(data), this.propagateNewSelection, this);
	};

	this.propagateNewSelection = function(data, status, xhr) {
		var url = xhr.getResponseHeader("Location");
		broker.makeRequest("GET", url, null, this.propagateNewSelectionInfo, this);
	};

	this.propagateNewSelectionInfo = function(data, status, xhr) {
		var source = new SourceInstance(data);
		var type = '';

		switch (data.type) {
			case Source.prototype.DOC_SOURCE_TYPE:
				documentSources.push(source);
				type = 'doc';
				break;
			case Source.prototype.THESAURUS_SOURCE_TYPE:
				thesaurusSources.push(source);
				type = 'the';
				break;
			case Source.prototype.LOD_SOURCE_TYPE:
				lodSources.push(source);
				type = 'lod';
				break;
		}

		currentUniverseObserver.notify();
	};

	this.unselectSource = function(instanceId) {
		var url = "sourceinstance/" + instanceId;
		broker.makeRequest("DELETE", url, null, this.propagateUnselection, this);

		for (var i = 0; i < documentSources.length; i++)
			if (documentSources[i].id === instanceId)
				documentSources.splice(i, 1);

		for (var i = 0; i < thesaurusSources.length; i++)
			if (thesaurusSources[i].id === instanceId)
				thesaurusSources.splice(i, 1);

		for (var i = 0; i < lodSources.length; i++)
			if (lodSources[i].id === instanceId)
				lodSources.splice(i, 1);
	};

	function saveUniverseInServer() {
		var url = "universe";
		var data = JSON.stringify(jsonRepresentation);

		broker.makeRequest("PUT", url, data, null, this);
	}

	this.wasInitialized = function() {
		return initialized;
	};

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
					documentSources.unshift(new SourceInstance(data[i]));
					break;
				case Source.prototype.THESAURUS_SOURCE_TYPE:
					thesaurusSources.unshift(new SourceInstance(data[i]));
					break;
				case Source.prototype.LOD_SOURCE_TYPE:
					lodSources.unshift(new SourceInstance(data[i]));
					break;
			}
		}

		user.notifyObservers();

		initialized = true;
	};

	/**
	 * Requests universe details from server, for now sources only
	 */
	this.init = function() {
		var url = "sourceinstance/query?universeId=" + this.getId();
		broker.makeRequest("GET", url, null, this.initUniverseSourcesCallback, this);
	};
}
