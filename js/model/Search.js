function Search(query) {
	this.query = query;
	this.resourceUrl = '';
	this.updates = 5;

	var self = this;

	// - AJAX Create the search on server
	$.ajax({
		type: 'POST',
		url: rodinResources + 'search',
		data: JSON.stringify({query: this.query, universe: universe.toJSON()}),
		xhrFields: {
			withCredentials: true
		},
		contentType: 'application/json',
		dataType: 'json',
		context: self,
		success: function(data, status, xhr) {
			this.onPostSuccess(data, status, xhr);
		},
		error: function(xhr, type) {
			alert('Error creating Search on Server!');
		}
	});

	this.onPostSuccess = function(data, status, xhr) {
		this.resourceUrl = xhr.getResponseHeader("Location");
		this.updateStatus();
	};

	/**
	 * Will GET the search from server and update its status
	 * until the search is done.
	 * @returns {void}
	 */
	this.updateStatus = function() {
		$('#globalSearchQuery').val('Updating status');

		// - AJAX Create the search on server
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
			setTimeout(this.updateStatus(), 100);
		}
	};

	this.getStatus = function() {
		return this.status;
	};

	this.getQuery = function() {
		return this.query;
	};

}

function Result() {
	this.title = '';
	this.authors = array();

	this.setTitle = function(title) {
		this.title = title;
	};

	this.getTitle = function() {
		return title;
	};
}

function callOnPostSuccess(search, data, status, xhr) {
	search.onPostSuccess(data, status, xhr);
}