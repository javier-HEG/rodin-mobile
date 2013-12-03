
function GlobalSearchView() {
	this.processResults = function() {
		var actualSearch = user.getActualGlobalSearch();

		if (actualSearch !== null) {
			if (actualSearch.getSearchId() === null) {
				// Although there is a search it has still not been finished
				$("#rodin-results div").remove();

				var messageItem = $('<div class="sixteen columns"></div>');
				messageItem.append($('<div class="rodin-result" data-l10n-id="globalSearching"></div>'));

				$("#rodin-results").append(messageItem);

				document.l10n.localizeNode($('[data-l10n-id="globalSearching"]').get(0));
			} else {
				var results = actualSearch.getResults();

				$("#rodin-results div").remove();
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
			}
		}
	}
}
