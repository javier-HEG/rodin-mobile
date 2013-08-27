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
	 * When remote get is successful it returns the data.
	 * @param {type} data
	 * @param {type} status
	 * @param {type} xhr
	 * @returns {void}
	 */
	this.onGetSuccess = function(data, status, xhr) {
		this.onSuccessCall.apply(this.onSuccessContext, [data]);
	};

	/**
	 * Makes a rest call using JSON data
	 * @param {type} method
	 * @param {type} resourceName
	 * @param {type} jsonData stringified version of the data
	 * @param {function} onSuccess a function receiving parameters compatible with the request
	 * @returns {Array} [data, location]
	 */
	this.makeRequest = function(method, resource, jsonData, onSuccessCall, onSuccessContext) {
		this.onSuccessContext = onSuccessContext;
		this.onSuccessCall = onSuccessCall;

		var self = this;

		// Default request values
		var requestInfo = {
			type: method,
			url: (resource.indexOf(rodinResources) == -1 ? rodinResources + resource : resource),
			xhrFields: {withCredentials: true},
			contentType: "application/json",
			dataType: "json",
			context: self,
			error: function() {
				alert('Error');
			}
		};

		// Add data if not null
		if (jsonData !== null) {
			requestInfo.data = jsonData;
		}

		// If the goal is to create a resource
		// we would like to get the new resource URL
		if (method === 'POST') {
			requestInfo.success = function(data, status, xhr) {
				this.onPostSuccess(data, status, xhr);
			};
			var request = $.ajax(requestInfo);
		} else if (method === 'GET') {
			requestInfo.success = function(data, status, xhr) {
				this.onGetSuccess(data, status, xhr);
			};
			var request = $.ajax(requestInfo);
		}
	};
}

