var user = null;

var universeListObserver = new UniverseListObserver();
var currentUniverseObserver = new CurrentUniverseObserver();
var userObserver = new UserObserver();

var subjectExpansionObserver = new SubjectExpansionObserver();
var searchObserver = new SearchObserver();

/*
 * Personalized scripts are to be copied and modified directly in this file
 */

/**
 * Starts a global search after the user has entered one
 * @returns {void}
 */
function startGlobalSearch() {
	// - Create the JS search-objects
	var subjectExpansionSearch = new Search($('#global-search-query').val(), Search.prototype.SUBJECT_EXPANSION_TYPE);
	subjectExpansionSearch.registerObserver(subjectExpansionObserver);
	subjectExpansionSearch.launch();
	
	var globalSearch = new Search($('#global-search-query').val(), Search.prototype.GLOBAL_TYPE);
	globalSearch.registerObserver(searchObserver);
	globalSearch.launch();
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
