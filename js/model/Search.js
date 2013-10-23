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

	if (type === Search.prototype.SUBJECT_EXPANSION_TYPE) {
		results = { narrower: [], broader: [], related: [] };
	}

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
					for (var i = 0; i < data.length; i++) {
						switch (data[i].keywords[0]) {
							case "NARROWER":
								results.narrower = results.narrower.concat(data[i].content.split(","));
								break;
							case "BROADER":
								results.broader = results.broader.concat(data[i].content.split(","));
								break;
							case "RELATED":
								results.related = results.related.concat(data[i].content.split(","));
								break;
						}
					}
				}
				break;
			case Search.prototype.GLOBAL_TYPE:
				if (query !== "empty") {
					for (var i = 0; i < data.length; i++) {
						results.push(new BasicResult(data[i]));
					}
				}
				break;
		}

		this.notifyObservers();
	}

	this.getQuery = function() {
		return query;
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
function BasicResult(data) {
	var title = data.title;
	var authors = data.authors;
	var summary = data.summary;
	var content = data.content;
	var date = new Date(data.pubDate);
	var url = data.documents[0].sourceLinkURL;

	/**
	 * Prints itself into the jQuery div parameter
	 */
	this.displayInDiv = function(div) {
		var resultDiv = $('<div class="rodin-result"></div>');
		resultDiv.append($("<h1>" + title + "</h1>"));
		resultDiv.append($('<p class="authors">' + authors.join(", ") + "</p>"));

		var summaryP = $('<p class="summary">' + summary + "</p>");
		summaryP.bind("click", function(){
			$(this).hide();
			$(this).siblings("p.content").show();
		});
		resultDiv.append(summaryP);

		var contentP = $('<p class="content" style="display: none;">' + content + "</p>");
		contentP.bind("click", function(){
			$(this).hide();
			$(this).siblings("p.summary").show();
		});
		resultDiv.append(contentP);

		var dateString = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
		resultDiv.append($('<p class="publication"><span class="date">' + dateString + '</span> <a target="_blank" href="' + url + '"></a></p>'));

		div.append(resultDiv);
	};
}

