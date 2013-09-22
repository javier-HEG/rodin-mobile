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
				if (query !== "empty") {
					results.push("Primero");
					results.push("Segundo");
				}
				break;
			case Search.prototype.GLOBAL_TYPE:
				if (query !== "empty") {
					var first = new Result(data);
					var second = new Result(data);

					results.push(first);
					results.push(second);
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
			case Search.prototype.GLOBAL_TYPE:
				user.newGlobalSearch(this);
				break;
		}

		this.notifyObservers();

		var jsonData = JSON.stringify({query: query, type: type, universe: user.getCurrentUniverse().toMiniJson()});
		broker.makeRequest("POST", "search", jsonData, this.saveLocationCallback, this);
	};

	// FIXME Analyze why if not implemented locally all instances of Search
	// shared the same observers
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

// Map to the source types in server enumeration
// GLOBAL, SINGLE_DATASOURCE, SUBJECT_EXPANSION, DOCUMENT_EXPANSION
Search.prototype.GLOBAL_TYPE = 0;
Search.prototype.SUBJECT_EXPANSION_TYPE = 2;
Search.prototype.DOCUMENT_EXPANSION_TYPE = 3;

/**
 * The global search kind of results
 */
function Result(data) {
	var title = "The influence of the time delay of information flow on an economy evolution. The stock market analysis";
	var authors = ["Janusz Miskiewicz"];
	var abstract = "The decision process requires information about the present state of the system, but in economy acquiring data and processing them is an expensive and time consuming process. Therefore the state of the system is measured and announced at the end of the well defined time intervals. The model of a stock market coupled with an economy is investigated and the role of the length of the time delay of information flow investigated. It is shown that increasing the time delay leads to collective behavior of agents and oscillations of autocorrelations in absolute log-returns.";
	var date = "20.09.2007";
	var url = "http://arxiv.org/abs/0709.3264v1";

	/**
	 * Prints itself into the jQuery div parameter
	 */
	this.displayInDiv = function(div) {
		var resultDiv = $('<div class="rodin-result"></div>');
		resultDiv.append($("<h1>" + title + "</h1>"));
		resultDiv.append($('<p class="authors">' + authors.join(", ") + "</p>"));
		resultDiv.append($('<p class="abstract">' + abstract + "</p>"));
		resultDiv.append($('<p class="publication"><span class="date">' + date + '</span> <a target="_blank" href="' + url + '"></a></p>'));

		div.append(resultDiv);
	};
}

