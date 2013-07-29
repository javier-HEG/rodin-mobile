function RodinBroker()
{
}

RodinBroker.rodinResources = 'http://localhost:8080/rodin_server/resources/';

RodinBroker.restRequest = function(method, resourceName, jsonData) {
	$.ajax({
		type: 'POST',
		url: RodinBroker.rodinResources + resourceName,
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
};
