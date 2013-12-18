/**
 * Search class, observable
 * Conceptualizes searches, of all kinds
 */

Search.prototype = new Observable();
Search.prototype.constructor = Search;
Search.prototype.pageSize = 10;

function Search(query, type) {
	var searchId = null;
	var resourceUrl = null;
	var resultCount = 0;
	
	this.safe = 10;

	var results = [];

	if (type === Search.prototype.SUBJECT_EXPANSION_TYPE) {
		results = { narrower: [], broader: [], related: [] };
	}

	var self = this;
	var broker = new Broker();

	this.getResultCount = function() {
		return resultCount;
	}

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
				switch (type) {
					case Search.prototype.SUBJECT_EXPANSION_TYPE:
						broker.makeRequest("GET", "result/query?searchId=" + searchId,
							null, this.saveSubjectExpansionResultsCallBack, this);	
						break;
					case Search.prototype.GLOBAL_TYPE:
						resultCount = data.resultCount;
						// Ask only for the first page of results
						broker.makeRequest("GET", "result/query?searchId=" + searchId + "&from=0&count=" + Search.prototype.pageSize,
							null, this.savePartialGlobalResultsCallBack, this);
						break;
				}
			} else {
				setTimeout(function() {
					self.updateStatus();
				}, 3000);
			}
		} else {
			switch (type) {
				case Search.prototype.SUBJECT_EXPANSION_TYPE:
					this.saveSubjectExpansionResultsCallBack(Array(), null, null);
					break;
				case Search.prototype.GLOBAL_TYPE:
					resultCount = 0;
					// Ask only for the first page of results
					this.savePartialGlobalResultsCallBack(Array(), null, null);
					break;
			}
		}
	}

	this.saveSubjectExpansionResultsCallBack = function(data, status, xhr) {
		if (type === Search.prototype.SUBJECT_EXPANSION_TYPE) {
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
		}

		this.notifyObservers();
	}

	this.savePartialGlobalResultsCallBack = function(data, status, xhr) {
		if (type === Search.prototype.GLOBAL_TYPE) {
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
		}

		this.notifyObservers();
	}

	this.getMoreResults = function() {
		// Only makes sense if global
		if (type === Search.prototype.GLOBAL_TYPE) {
			// Ask for another page of results (or at most a page size count)
			var countMin = Math.min(Search.prototype.pageSize, resultCount - results.length);
			broker.makeRequest("GET", "result/query?searchId=" + searchId + "&from=" + results.length + "&count=" + countMin,
				null, this.savePartialGlobalResultsCallBack, this);
		}
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
	var sourceName = null;

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

	this.setSourceName = function(aSourceName) {
		sourceName = aSourceName;
	}

	this.getSourceName = function() {
		return sourceName;
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

		if (typeof data.documents[0].sourceName === "string") {
			this.setSourceName(data.documents[0].sourceName);
		}
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

	// TODO improve implementation of this
	if (this.getSourceName() !== null) {
		var publicationPar = $('<p class="publication"></p>');
		publicationPar.append($('<span class="date">' + this.getDateString() + '</span>'));

		var sourceLink = $('<a target="_blank" class="source-' + this.getSourceName() + '" href="' + this.getUrl() + '"></a>');
		publicationPar.append(sourceLink);

		resultDiv.append(publicationPar);
	} else {
		resultDiv.append($('<p class="publication"><span class="date">' + this.getDateString() + '</span> <a target="_blank" href="' + this.getUrl() + '"></a></p>'));
	}


	div.append(resultDiv);
};

ArticleResult.prototype = new BasicResult();
function ArticleResult() {}
