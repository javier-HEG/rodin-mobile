var user = null;

var universeListObserver = new UniverseListObserver();
var currentUniverseObserver = new CurrentUniverseObserver();
var userObserver = new UserObserver();

var subjectExpansionObserver = new SubjectExpansionObserver();
var searchObserver = new SearchObserver();

var autoCompleteObserver = new AutoCompleteObserver();
var autoComplete = new AutoComplete();
autoComplete.registerObserver();

/*
 * Personalized scripts are to be copied and modified directly in this file
 */

/**
 * Starts a global search after the user has entered one
 * @returns {void}
 */
function startGlobalSearch() {
	resetExpansion();

	$("#rodin-expansion-header").removeClass("unavailable");
	$("#rodin-expansion-count").attr("data-l10n-id", "expansionSearching");
	document.l10n.localizeNode($("#rodin-expansion-count").get(0));

	// Launch search from user
	user.launchNewSearch($('#global-search-query').val());
}

/**
 * Removes any expansion subject selection and closes the display
 */
function resetExpansion() {
	$("#rodin-expansion-terms ul li").remove();
	resetExpansionSelection();

	// Ensure closed status
	$("#rodin-expansion-header").addClass("closed");
	$("#rodin-expansion-selection").addClass("closed");
	$("#rodin-expansion-content").addClass("closed");
}

function styleExpansionSelection(selection) {
	if (selection) {
		$("#global-search-button").addClass("refresh");
		$("#rodin-expansion-header").addClass("withselection");
		$("#rodin-expansion-selection").addClass("withselection");
		$("#rodin-narrower-button").addClass("withselection");
	} else {
		$("#global-search-button").removeClass("refresh");
		$("#rodin-expansion-header").removeClass("withselection");
		$("#rodin-expansion-selection").removeClass("withselection");
		$("#rodin-narrower-button").removeClass("withselection");
	}
}

function resetExpansionSelection() {
	$("#rodin-expansion-selection ul li").remove();

	styleExpansionSelection(false);

	document.l10n.updateData( { "selectedTermsCount": 0 } );
	document.l10n.localizeNode($("#rodin-expansion-selection-count").get(0));
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
