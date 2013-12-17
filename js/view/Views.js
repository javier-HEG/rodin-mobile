function HelpView() {
	this.addAUniverseHelp = function(show) {
		if (show) {
			if ($('#addAUniverseHelp').length === 0) {
				var helpDiv = $('<div id="addAUniverseHelp" class="help-left" data-l10n-id="helpAddAUniverse" />');
				$('#header-universe-name').parent().append(helpDiv);

				document.l10n.localizeNode($('#addAUniverseHelp').get(0));
			}
		} else {
			$('#addAUniverseHelp').remove();
		}
	}
}

/**
 * The view responsible for displaying and updating the list of results
 * in the interface.
 */
function GlobalSearchView() {
	this.processResults = function() {
		var actualSearch = user.getActualGlobalSearch();

		// Test first that the user has launched at least a first search
		if (actualSearch !== null) {
			if (actualSearch.getSearchId() === null) {
				// Searches ID is null until it is finished, if not finished
				// show a "In progress message"
				$.removeData($("#rodin-results"));
				$("#rodin-results div").remove();
				$("#more-results-button").remove();

				var messageItem = $('<div class="sixteen columns"></div>');
				messageItem.append($('<div class="rodin-result" data-l10n-id="globalSearching"></div>'));

				$("#rodin-results").append(messageItem);

				document.l10n.localizeNode($('[data-l10n-id="globalSearching"]').get(0));
			} else {
				var resultsHolder = $("#rodin-results");

				if ($.hasData(resultsHolder)
					&& $.data(resultsHolder, "currentSearchId") === actualSearch.getSearchId()) {
					// If search is the same then update the view with perhaps new results in the model
					$("#more-results-button").remove();

					alert('Getting more!');
					
					var results = actualSearch.getResults();

					for (var i = $("#rodin-results div").length; i < results.length; i++) {
						var resultItem = $('<div class="eight columns"></div>');
						results[i].displayInDiv(resultItem);

						$("#rodin-results").append(resultItem);
					}

					// Check if there are more results and show the "More results button"
					if (actualSearch.getResultCount() > results.length) {
						this.appendMoreResultsButton($("#rodin-results"));
					}
				} else {
					// Replace results with results from a different search from that shown
					$.data(resultsHolder, "currentSearchId", actualSearch.getSearchId());

					var results = actualSearch.getResults();

					$("#rodin-results div").remove();
					$("#more-results-button").remove();

					if (results.length === 0) {
						var messageItem = $('<div class="sixteen columns"></div>');
						messageItem.append($('<div class="rodin-result" data-l10n-id="globalNoResults"></div>'));

						$("#rodin-results").append(messageItem);

						document.l10n.localizeNode($('[data-l10n-id="globalNoResults"]').get(0));
					} else {
						for (var i = 0; i < results.length; i++) {
							var resultItem = $('<div class="eight columns"></div>');
							results[i].displayInDiv(resultItem);

							$("#rodin-results").append(resultItem);
						}
					}

					// Check if there are more results and show the "More results button"
					if (actualSearch.getResultCount() > results.length) {
						this.appendMoreResultsButton($("#rodin-results"));
					}
				}
			}
		}
	}

	this.appendMoreResultsButton = function(here) {
		var moreResultsButton = $('<button id="more-results-button" class="sixteen columns" data-l10n-id="globalMoreResults"/>');
		moreResultsButton.click(function() {
			user.getActualGlobalSearch().getMoreResults();
		});

		here.append(moreResultsButton);

		document.l10n.localizeNode($('[data-l10n-id="globalMoreResults"]').get(0));
	}
}
