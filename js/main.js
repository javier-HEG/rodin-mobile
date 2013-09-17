/*
 * Personalized scripts are to be copied and modified directly in this file
 */

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

/*
 * Mmenu activation
 */
$(function() {
	//	The menu on the left
	$('nav#menu-left').mmenu();
	//	The menu on the right
	$('nav#menu-right').mmenu({
		position: 'right'
	});
});
