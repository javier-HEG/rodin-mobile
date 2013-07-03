function Search(query) {
	this.query = query;

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
		success: function() {
			$('#globalSearchQuery').val('Launched it!');
		},
		error: function(xhr, type) {
			$('#globalSearchQuery').val('Error!');
		}
	});

	this.getStatus = function() {
		return this.status;
	}

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
