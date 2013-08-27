/**
 * Mobiles broker class
 */
function Broker() {
	this.rodinResources = "http://localhost:8080/rodin_server/resources/";

	this.onSuccessContext = null;
	this.onSuccessCall = null;

	/**
	 * When remote post is successful it returns the location
	 * of the new resource.
	 * @param {type} data
	 * @param {type} status
	 * @param {type} xhr
	 * @returns {void}
	 */
	this.onPostSuccess = function(data, status, xhr) {
		this.onSuccessCall.apply(this.onSuccessContext, [xhr.getResponseHeader("Location")]);
	};

	/**
	 * Makes a rest call using JSON data
	 * @param {type} method
	 * @param {type} resourceName
	 * @param {type} jsonData stringified version of the data
	 * @param {function} onSuccess a function receiving parameters compatible with the request
	 * @returns {Array} [data, location]
	 */
	this.sendRequest = function(method, resourceName, jsonData, onSuccessCall, onSuccessContext) {
		this.onSuccessContext = onSuccessContext;
		this.onSuccessCall = onSuccessCall;

		var self = this;

		// Default request values
		var requestInfo = {
			type: method,
			url: rodinResources + resourceName,
			xhrFields: {withCredentials: true},
			contentType: "application/json",
			context: self
		};

		if (jsonData !== null) {
			requestInfo.dataType = "json";
			requestInfo.data = jsonData;
		}

		// If the goal is to create a resource
		// we would like to get the new resource URL
		if (method === 'POST') {
			requestInfo.success = function(data, status, xhr) {
				this.onPostSuccess(data, status, xhr);
			};
			requestInfo.error = function() {
				alert('Error');
			};

			var request = $.ajax(requestInfo);
		}
	};
}

