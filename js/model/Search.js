/**
 * Conceptualizes searches, of every kind
 * @param {type} query description
 */
function Search(query, type) {
	var resourceUrl = '';
	var updates = 5;

	var self = this;
	var broker = new Broker();

	this.checkIfDone = function(data, status, xhr) {
		var shouldStop = data.status === 'DONE';

		this.updates -= 1;

		if (shouldStop || this.updates < 0) {
			$("#globalSearchQuery").prop("disabled", false);
		} else {
			setTimeout(function() {
				self.updateStatus();
			}, 100);
		}
	}

	/**
	 * Makes sequencial calls to the server to check the status of the query
	 */
	this.updateStatus = function() {
		broker.makeRequest("GET", this.resourceUrl, null, this.checkIfDone, this);
	};

	/**
	 * Saves the answer got from the Broker
	 * @returns {void}
	 */
	this.saveLocation = function(data, status, xhr) {
		this.resourceUrl = xhr.getResponseHeader("Location");
		$("#globalSearchQuery").prop("disabled", true);
		this.updateStatus();
	};

	// Code that runs when the prototype is clonned
	var jsonData = JSON.stringify({query: query, type: type, universe: user.getCurrentUniverse().toMiniJson()});
	broker.makeRequest("POST", "search", jsonData, this.saveLocation, this);
}

// Map to the source types in server enumeration
// GLOBAL, SINGLE_DATASOURCE, SUBJECT_EXPANSION, DOCUMENT_EXPANSION
Search.prototype.GLOBAL_TYPE = 0;
Search.prototype.SUBJECT_EXPANSION_TYPE = 2;
Search.prototype.DOCUMENT_EXPANSION_TYPE = 3;
