<!DOCTYPE html>
<html>
	<?php

	include_once('head.inc.php');

	?>
	<body>
		
		<div>
			<?php

			include_once('rodinheader.inc.php');

			include_once('message.inc.php');

			?>

			<div id="mediateller">
				<span data-l10n-id="mediaName"></span>
				[<span data-l10n-id="currentWidth"></span>]
			</div>

			<!-- The search bar -->
			<div class="full-width" style="background-color: tan;">
				<div class="container">
					<div class="ten columns">
						<form id="global-search-form">
							<div id="search-history">
								<button id="history-back" type="button" />
								<button id="history-forward" type="button" />
							</div>
							<input id="global-search-query" type="text" />
							<button id="global-search-button" type="submit" />
						</form>
						<script>
							$(function(){
								$("#global-search-form").submit(function(event) {
									event.preventDefault();
									startGlobalSearch();
									return false;
								});
							});
						</script>
					</div>

					<div id="rodin-expansion-header" class="six columns closed unavailable">
						<span data-l10n-id="expansionSpace" id="rodin-expansion-count"></span>
						<span data-l10n-id="expansionSelection" id="rodin-expansion-selection-count"></span>
					</div>
					
					<div id="rodin-expansion-selection" class="sixteen columns closed">
						<ul class="termlist clearfix"></ul>
					</div>

					<div id="rodin-expansion-content" class="sixteen columns closed">
						<div id="rodin-expansion-categories">
							<span id="rodin-narrower-button">Narrower</span>
							<span id="rodin-broader-button">Broader</span>
							<span id="rodin-related-button">Related</span>
						</div>
						<div id="rodin-expansion-terms">
							<ul id="rodin-narrower-terms" class="termlist clearfix"></ul>
							<ul id="rodin-broader-terms" class="termlist clearfix"></ul>
							<ul id="rodin-related-terms" class="termlist clearfix"></ul>
						</div>
					</div>
					<script>
						$("#rodin-expansion-categories span").click(function() {
							if (!$(this).hasClass("selected")) {
								$("#rodin-expansion-categories span").removeClass("selected");
								$(this).addClass("selected");

								$("#rodin-expansion-terms ul").hide();
								$("#" + $(this).attr("id").replace("button", "terms")).show();
							}
						});

						$(function() {
							$("#rodin-narrower-button").click();
						});

						$("#rodin-expansion-header").click(function() {
							if ($("#rodin-expansion-header").hasClass("unavailable")) {
								$("#rodin-expansion-header").addClass("closed");	
								$("#rodin-expansion-selection").addClass("closed");
								$("#rodin-expansion-content").addClass("closed");
							} else {
								$("#rodin-expansion-header").toggleClass("closed");
								$("#rodin-expansion-selection").toggleClass("closed");
								$("#rodin-expansion-content").toggleClass("closed");
							}
						});
					</script>
				</div>
			</div>
			
			<!-- Where results show -->
			<div class="full-width">
				<div id="rodin-results" class="container"></div>
			</div>
		</div>
	</body>
</html>
