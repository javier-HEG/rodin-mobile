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

function UniverseListView() {
	var self = this;

	this.formatUniverseAsSelected = function(element) {
		element.removeClass("mm-unselected");
		element.addClass("mm-selected");

		element.unbind('click');
		element.css('cursor', 'default');
	};

	this.formatUniverseAsUnselected = function(element) {
		element.removeClass("mm-selected");
		element.addClass("mm-unselected");

		element.unbind('click');
		element.click(function() {
			user.setCurrentUniverseId($.data(element, "universeId"));
			self.formatUniverseAsSelected(element);
		});

		element.css('cursor', 'pointer');
	};

	this.displayUserUniverses = function() {
		var universes = user.getUniverses();
		var selected = user.getCurrentUniverse();

		$("#universe-selection-label").nextUntil("#create-universe-option").remove();
		if (universes.length > 0 && selected !== null) {
			helpView.addAUniverseHelp(false);

			$("#header-universe-name").text(selected.getName());

			for (var i = 0; i < universes.length; i++) {
				var universeItem = $('<li>' + universes[i].getName() + "</li>");
				$.data(universeItem, 'universeId', universes[i].getId());

				if (selected.getId() === universes[i].getId()) {
					this.formatUniverseAsSelected(universeItem);
				} else {
					this.formatUniverseAsUnselected(universeItem);
				}

				universeItem.insertAfter($("#universe-selection-label"));
			}
		} else {
			helpView.addAUniverseHelp(true);
			$("#header-universe-name").html("&nbsp;");
		}
	}
}

function SubjectExpansionView() {
	this.currentSearchId = null;

	var self = this;

	this.setNewTerms = function() {
		// Get the first 5 results only
		var results = user.getActualSubjectExpansionSearch().getResults();
		var narrower = results.narrower;
		var broader = results.broader;
		var related = results.related;

		// Reset expansion if moving through history
		resetExpansion();

		// Set the text for the total expansion terms count
		$("#rodin-expansion-count").attr("data-l10n-id", "expansionCount");

		var totalRelatedTermsCount = narrower.length + broader.length + related.length;
		document.l10n.updateData( { "relatedTermsCount": totalRelatedTermsCount } );
		document.l10n.localizeNode($("#rodin-expansion-count").get(0));

		if (totalRelatedTermsCount === 0) {
			setTimeout(function() {
				$("#rodin-expansion-header").addClass("unavailable");				
			}, 2000);
		} else {
			appendFirstTermsTo(narrower, "narrower", $("#rodin-narrower-terms"));
			appendFirstTermsTo(broader, "broader", $("#rodin-broader-terms"));
			appendFirstTermsTo(related, "related", $("#rodin-related-terms"));

			$("#narrower-count").text("(" + narrower.length + ")");
			$("#broader-count").text("(" + broader.length + ")");
			$("#related-count").text("(" + related.length + ")");

			$("#rodin-expansion-header").removeClass("unavailable");
		}
	};

	function appendFirstTermsTo(terms, cssClass, list) {
		var first = terms.slice(0, 5);
		var then = terms.slice(5);

		appendTermsTo(first, cssClass, list);

		if (then.length > 0) {
			var buttonId = "more-" + cssClass;
			var button = $('<li class="more-expansion">...</li>');
			button.attr("id", buttonId);
			button.click(function() {
				this.remove();
				appendTermsTo(then, cssClass, list);
			});

			button.appendTo(list);
		}
	}

	function appendTermsTo(terms, cssClass, list) {
		for (var i = 0; i < terms.length; i++) {
			var item = $("<li>" + terms[i] + "</li>");
			item.bind("click", function() {
				$(this).toggleClass("selected");

				if ($(this).hasClass("selected")) {
					var element = $(this).detach();
					element.addClass(cssClass);
					element.appendTo($("#rodin-expansion-selection ul:first"));
				} else {
					var element = $(this).detach();
					element.removeClass("related");

					if  ($("#" + list.attr("id") + " .more-expansion").length > 0) {
						element.insertBefore($("#" + list.attr("id") + " .more-expansion"));
					} else {
						element.appendTo(list);
					}
				}

				self.notify();
			});
			list.append(item);
		}
	}

	this.processResults = function() {
		var actualSearch = user.getActualSubjectExpansionSearch();

		if (actualSearch !== null) {
			if (actualSearch.getSearchId() === null) {
				// Nothing?
			} else {
				var actualSearchId = actualSearch.getSearchId();

				if (this.currentSearchId === actualSearchId) {
					var selectedTerms = $("#rodin-expansion-selection ul li").length;

					if (selectedTerms > 0) {
						styleExpansionSelection(true);

						document.l10n.updateData( { "selectedTermsCount": selectedTerms } );
						document.l10n.localizeNode($("#rodin-expansion-selection-count").get(0));

						user.refreshDocumentSearch(actualSearch.getQuery(), $.makeArray($("#rodin-expansion-selection ul li")));
					} else {
						styleExpansionSelection(false);

						document.l10n.updateData( { "selectedTermsCount": 0 } );
						document.l10n.localizeNode($("#rodin-expansion-selection-count").get(0));

						user.refreshDocumentSearch(actualSearch.getQuery(), null);
					}
				} else {
					this.currentSearchId = actualSearchId;
					this.setNewTerms();
				}
			}
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
