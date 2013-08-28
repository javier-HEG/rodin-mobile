/**
 * Javascript broker
 */
function Broker() {
	var rodinResources = "http://localhost:8080/rodin_server/resources/";

	/**
	 * Makes a REST call to the resources on the server
	 * @param {type} method POST, GET, etc.
	 * @param {type} resource is either the name of the resource or a full URL
	 * @param {type} jsonData stringified version of the JSON data to pass
	 * @param {function} onSuccessCall the function to call on success
	 * @param {type} onSuccessContext the context on which the onSuccessCall should be called
	 * @returns {Array} [data, location]
	 */
	this.makeRequest = function(method, resource, jsonData, onSuccessCall, onSuccessContext) {
		// Default request values
		var requestInfo = {
			type: method,
			url: (resource.indexOf(rodinResources) === -1 ? rodinResources + resource : resource),
			xhrFields: {withCredentials: true},
			contentType: "application/json",
			dataType: "json",
			context: onSuccessContext,
			success: onSuccessCall,
			error: function() {
				alert('Error');
			}
		};

		// Add data if not null
		if (jsonData !== null) {
			requestInfo.data = jsonData;
		}

		$.ajax(requestInfo);
	};
}
