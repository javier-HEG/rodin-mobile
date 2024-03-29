////////////////////////
// VIEW CLASSES

function HelpView() {
	this.isAddUniverseHelpShowing = function() {
		return ($('#addAUniverseHelp').length > 0);
	}

	this.addAUniverseHelp = function(show) {
		if (show) {
			if (!this.isAddUniverseHelpShowing()) {
				var helpDiv = $('<div id="addAUniverseHelp" class="help-left" data-l10n-id="helpAddAUniverse" />');
				$('#header-universe-name').parent().append(helpDiv);

				document.l10n.localizeNode($('#addAUniverseHelp').get(0));
			}
		} else {
			$('#addAUniverseHelp').remove();
		}
	}

	this.isUniversePointerShowing = function() {
		return ($('#addDataSourcePointer').length > 0);
	}

	this.showUniversePointer = function(show) {
		if (show) {
			if (!this.isUniversePointerShowing()) {
				var pointerDiv = $('<div id="addDataSourcePointer" class="pointer-left" data-l10n-id="helpHerePointer"/>');
				$('#header-universe-name').parent().append(pointerDiv);

				document.l10n.localizeNode($('#addDataSourcePointer').get(0));
			}
		} else {
			$('#addDataSourcePointer').remove();
		}
	}

	this.addDataSourceHelp = function(show) {
		if (show && !this.isAddUniverseHelpShowing()) {
			if ($('#addDataSourceHelp').length === 0) {
				var messageItem = $('<div id="addDataSourceHelp" class="rodin-result"></div>');
				messageItem.append($('<p style="margin-right: 20px; margin-bottom: 0px;" data-l10n-id="helpAddDataSource"/>'));				
				messageItem.append($('<img style="position: absolute; bottom: 12px; right: 4px;" src="img/mimiGlyphs/61.png"/>'));				
				messageItem.bind('click', function() {
					if (helpView.isUniversePointerShowing())
						helpView.showUniversePointer(false);
					else
						helpView.showUniversePointer(true);
				});
				
				var messageItemContainer = $('<div class="sixteen columns"></div>');
				messageItemContainer.append(messageItem);

				$("#rodin-results").append(messageItemContainer);

				document.l10n.localizeNode($('[data-l10n-id="helpAddDataSource"]').get(0));
			}
		} else {
			$('#addDataSourceHelp').remove();
		}
	}
}

function UserView() {
	this.updateLocale = function() {
		document.l10n.requestLocales(user.getLanguage());

		$("input.language:button").prop("disabled", false);
		$("#language-select-" + user.getLanguage()).prop("disabled", true);
	}

	this.displayUser = function() {
		$("#user-name-input").val(user.getRealName());

		if (l10nReady) {
			l10nLanguageSet = true;
			this.updateLocale();
		} else {
			setTimeout("userObserver.notify();", 100);
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

function CurrentUniverseView() {
	var self = this;

	this.formatAsSelected = function(element, instanceId) {
		$.data(element, "instanceId", instanceId);

		element.removeClass("mm-unselected");
		element.addClass("mm-selected");

		element.unbind('click');
		element.click(function() {
			unselectSource(element);
		});
	};

	this.formatAsUnselected = function(element) {
		$.removeData(element, "instanceId");

		element.removeClass("mm-selected");
		element.addClass("mm-unselected");

		element.unbind('click');
		element.click(function() {
			switch ($(this).parent().attr("id")) {
				case "doc-sources-ul":
					selectSource(this, Source.prototype.DOC_SOURCE_TYPE);
					break;
				case "the-sources-ul":
					selectSource(this, Source.prototype.THESAURUS_SOURCE_TYPE);
					break;
				case "lod-sources-ul":
					selectSource(this, Source.prototype.LOD_SOURCE_TYPE);
					break;
			}
		});
	};

	function selectSource(element, type) {
		user.getCurrentUniverse().selectSource(element, type);
	}

	function unselectSource(element) {
		user.getCurrentUniverse().unselectSource($.data(element, "instanceId"));
		self.formatAsUnselected(element);
	}

	this.displayCurrentUniverse = function() {
		var selected = null;

		if (selected === null && user !== null)
			selected = user.getCurrentUniverse();

		if (selected !== null) {
			// Enable query field and button
			if ($("#global-search-query").prop("disabled")) {
				$("#global-search-query").val("");
			}

			$("#global-search-query").prop("disabled", false);
			$("#global-search-button").prop("disabled", false);

			// Set the universe name in the GUI
			$("#current-universe-label").text('Configure "' + selected.getName() + '"');
			$("#universe-name-setting").val(selected.getName());

			$("#current-universe-label").parent().show();
			$("#config-current-universe-label").show();
			$("#remove-current-label").parent().show();

			// Prepare the sources selection menus
			// - Empty both lists
			$('#doc-sources-ul li:not(.mm-subtitle)').remove();
			$('#the-sources-ul li:not(.mm-subtitle)').remove();
			$('#lod-sources-ul li:not(.mm-subtitle)').remove();
			// - Parse the list of available sources
			var allSources = user.getAvailableSources();
			if (allSources.length > 0) {
				var docSourcesList = $("#doc-sources-ul");
				var theSourcesList = $("#the-sources-ul");
				var lodSourcesList = $("#lod-sources-ul");

				var atLeastOneDocSource = false;

				for (var i = 0; i < allSources.length; i++) {
					var sourceName = allSources[i].name;

					// Add to document sources if available
					if (allSources[i].isDocumentSource) {
						var docSourceItem = $('<span>' + sourceName + "</span>");
						var element = $('<li id="doc-' + sourceName + '"></li>').append(docSourceItem);

						var sourceType = Source.prototype.DOC_SOURCE_TYPE;

						var sourceInstanceId = selected.getSourceInstanceId(sourceName, sourceType);
						if (sourceInstanceId !== -1) {
							this.formatAsSelected(element, sourceInstanceId);
							atLeastOneDocSource = true;
						} else {
							this.formatAsUnselected(element);
						}

						docSourcesList.append(element);
					}

					// Add to Thesauri sources if available
					if (allSources[i].isThesaurusSource) {
						var theSourceItem = $('<span>' + sourceName + "</span>");
						var element = $('<li id="the-' + sourceName + '"></li>').append(theSourceItem);

						var sourceType = Source.prototype.THESAURUS_SOURCE_TYPE;

						var sourceInstanceId = selected.getSourceInstanceId(sourceName, sourceType);
						if (sourceInstanceId !== -1) {
							this.formatAsSelected(element, sourceInstanceId);
						} else {
							this.formatAsUnselected(element);
						}

						theSourcesList.append(element);
					}

					// Add to LOD sources if available
					if (allSources[i].isLodSource) {
						var lodSourceItem = $('<span>' + sourceName + "</span>");
						var element = $('<li id="lod-' + sourceName + '"></li>').append(lodSourceItem);

						var sourceType = Source.prototype.LOD_SOURCE_TYPE;

						var sourceInstanceId = selected.getSourceInstanceId(sourceName, sourceType);
						if (sourceInstanceId !== -1) {
							this.formatAsSelected(element, sourceInstanceId);
						} else {
							this.formatAsUnselected(element);
						}

						lodSourcesList.append(element);
					}
				}

				if (atLeastOneDocSource)
					helpView.addDataSourceHelp(false);
				else
					helpView.addDataSourceHelp(true);
			}
		} else {
			$("#current-universe-label").parent().hide();
			$("#config-current-universe-label").hide();
			$("#remove-current-label").parent().hide();

			$("#global-search-query").val("Disabled");
			$("#global-search-query").prop("disabled", true);
			$("#global-search-button").prop("disabled", true);
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
