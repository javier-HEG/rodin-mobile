/**
 * Conceptualizes searches, of every kind
 * @param {type} query description
 */
function Search(query) {
	this.query = query;
	this.resourceUrl = '';
	this.updates = 5;

	var self = this;

	/**
	 * Will GET the search from server and update its status
	 * until the search is done.
	 * @returns {void}
	 */
	this.updateStatus = function() {
		$("#globalSearchQuery").val("Updating status").prop("disabled", true);

		$.ajax({
			type: 'GET',
			url: this.resourceUrl,
			xhrFields: {
				withCredentials: true
			},
			dataType: 'json',
			success: function(data, status, xhr) {
				$('#globalSearchQuery').val(data.status);
			},
			error: function(xhr, type) {
				alert('Error updating search status!');
			}
		});

		this.updates -= 1;

		if (this.updates >= 0) {
			setTimeout(function() {
				self.updateStatus();
			}, 100);
		} else {
			$("#globalSearchQuery").prop("disabled", false);
		}
	};

	this.getStatus = function() {
		return this.status;
	};

	this.getQuery = function() {
		return this.query;
	};

	/**
	 * When remote post is successful it returns the location
	 * of the new resource.
	 * @returns {void}
	 */
	this.saveLocation = function(location) {
		this.resourceUrl = location;
		this.updateStatus();
	};

	// Code that runs when the prototype is clonned

	var broker = new Broker();
	var jsonData = JSON.stringify({query: this.query, universe: universe.toJSON()});
	broker.sendRequest("POST", "search", jsonData, this.saveLocation, this);
}
