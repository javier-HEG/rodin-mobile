/**
 * Search class, observable
 * Conceptualizes searches, of all kinds
 */

Search.prototype = new Observable();
Search.prototype.constructor = Search;

function Search(query, type) {
	var searchId = null;
	var resourceUrl = null;
	var safe = 5;

	var results = [];

	var self = this;
	var broker = new Broker();

	this.checkIfDone = function(data, status, xhr) {
		var shouldStop = data.status === 'DONE';

		this.safe -= 1;

		if (shouldStop || this.safe < 0) {
			broker.makeRequest("GET", "result/query?searchId=" + searchId, null, this.saveResultsCallBack, this);
		} else {
			setTimeout(function() {
				self.updateStatus();
			}, 100);
		}
	}

	this.saveResultsCallBack = function(data, status, xhr) {
		switch (type) {
			case Search.prototype.SUBJECT_EXPANSION_TYPE:
				if (query !== "test2") {
					results.push("Primero");
					results.push("Segundo");
				}
			break;
		}

		this.notifyObservers();
	}

	this.getResults = function() {
		return results;
	}

	this.getSearchId = function() {
		return searchId;
	}

	/**
	 * Makes sequencial calls to the server to check the status of the query
	 */
	this.updateStatus = function() {
		broker.makeRequest("GET", resourceUrl, null, this.checkIfDone, this);
	};

	/**
	 * Saves the answer received from the Broker when creating the search
	 * @returns {void}
	 */
	this.saveLocationCallback = function(data, status, xhr) {
		resourceUrl = xhr.getResponseHeader("Location");
		searchId = resourceUrl.split('/').pop();

		this.updateStatus();
	};

	this.launch = function() {
		switch (type) {
			case Search.prototype.SUBJECT_EXPANSION_TYPE:
				user.newSubjectExpansionSearch(this);
			break;
		}

		this.notifyObservers();

		var jsonData = JSON.stringify({query: query, type: type, universe: user.getCurrentUniverse().toMiniJson()});
		broker.makeRequest("POST", "search", jsonData, this.saveLocationCallback, this);
	}
}

// Map to the source types in server enumeration
// GLOBAL, SINGLE_DATASOURCE, SUBJECT_EXPANSION, DOCUMENT_EXPANSION
Search.prototype.GLOBAL_TYPE = 0;
Search.prototype.SUBJECT_EXPANSION_TYPE = 2;
Search.prototype.DOCUMENT_EXPANSION_TYPE = 3;
