var rodinResources = 'http://localhost:8080/rodin_server/resources/';

/**
 * Starts a global search after the user has entered one
 * @returns {void}
 */
function startGlobalSearch() {
	globalSearch = new Search($('#globalSearchQuery').val());

	// - Create the JS search object
	//   + Attach an observer
	//   + Launch an update in the object
	// - The observer should update the view when search object changes status
	//   + If DONE then get & show results
}
