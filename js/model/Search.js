/**
 * Search class, observable
 * Conceptualizes searches, of all kinds
 */

Search.prototype = new Observable();
Search.prototype.constructor = Search;

function Search(query, type) {
	var searchId = null;
	var resourceUrl = null;
	
	this.safe = 30;

	var results = [];

	if (type === Search.prototype.SUBJECT_EXPANSION_TYPE) {
		results = { narrower: [], broader: [], related: [] };
	}

	var self = this;
	var broker = new Broker();

	this.getQuery = function() {
		return query;
	}

	this.killSafe = function() {
		this.safe = -1;
	};

	this.checkIfDone = function(data, status, xhr) {
		var shouldStop = data.status === 'DONE';
		
		self.safe -= 1;

		if (self.safe > 0) {
			if (shouldStop) {
				broker.makeRequest("GET", "result/query?searchId=" + searchId, null, this.saveResultsCallBack, this);
			} else {
				setTimeout(function() {
					self.updateStatus();
				}, 1000);
			}
		} else {
			this.saveResultsCallBack(array(), null, null);
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
						switch (data[i].type) {
							case "ARTICLE":
								// var article = new ArticleResult();
								// article.initWithData(data[i]);
								
								// results.push(article);
								// break;
							default:
								var basic = new BasicResult();
								basic.initWithData(data[i]);
								
								results.push(basic);
								break;
						}
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
function BasicResult() {
	var title = "";
	var authors = [];
	var summary = "";
	var content = "";
	var date = null;
	var url = null;

	this.setTitle = function(aTitle) {
		title = aTitle;
	}

	this.getTitle = function() {
		return title;
	}

	this.setAuthors = function(anAuthorList) {
		authors = anAuthorList;
	}

	this.getAuthors = function() {
		return authors;
	}

	this.setSummary = function(aSummary) {
		summary = aSummary;
	}

	this.getSummary = function() {
		return summary;
	}

	this.setContent = function(aContent) {
		content = aContent;
	}

	this.getContent = function() {
		return content;
	}

	this.setPubDate = function(aDate) {
		date = aDate;
	}
	this.getPubDate = function() {
		return date;
	}

	this.setUrl = function(aUrl) {
		url = aUrl;
	}

	this.getUrl = function() {
		return url;
	}

	this.getAuthorsString = function() {
		return authors.join(", ");
	}

	this.getDateString = function() {
		return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
	}

	this.initWithData = function(data) {
		this.setTitle(data.title);
		this.setAuthors(data.authors);
		this.setSummary(data.summary);
		this.setContent(data.content);
		this.setPubDate(new Date(data.pubDate));
		this.setUrl(data.documents[0].sourceLinkURL);
	}
}

/**
 * Prints itself into the jQuery div parameter
 */
BasicResult.prototype.displayInDiv = function(div) {
	var resultDiv = $('<div class="rodin-result"></div>');
	resultDiv.append($("<h1>" + this.getTitle() + "</h1>"));

	if (this.getAuthors().length > 0) {
		resultDiv.append($('<p class="authors">' + this.getAuthorsString() + "</p>"));
	}

	if (this.getSummary() !== "") {
		var summaryP = $('<p class="summary">' + this.getSummary() + "</p>");
		summaryP.bind("click", function(){
			$(this).hide();
			$(this).siblings("p.content").show();
		});
		resultDiv.append(summaryP);
	}

	if (this.getContent() !== "") {
		var contentP = $('<p class="content" style="display: none;">' + this.getContent() + "</p>");
		contentP.bind("click", function(){
			$(this).hide();
			$(this).siblings("p.summary").show();
		});
		resultDiv.append(contentP);
	}

	resultDiv.append($('<p class="publication"><span class="date">' + this.getDateString() + '</span> <a target="_blank" href="' + this.getUrl() + '"></a></p>'));

	div.append(resultDiv);
};

ArticleResult.prototype = new BasicResult();
function ArticleResult() {}
