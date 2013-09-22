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

			<div id="mediateller">Media: </div>

			<!-- The search bar -->
			<div class="full-width" style="background-color: tan;">
				<div class="container">
					<div class="ten columns">
						<form id="global-search-form" onsubmit="return false;">
							<div id="search-history">
								<button id="history-back" />
								<button id="history-forward" />
							</div>
							<input id="global-search-query" type="text" />
							<button id="global-search-button" />
						</form>
						<script>
							$('#global-search-form').on('submit', function() {
								startGlobalSearch();
								return false;
							});
						</script>
					</div>

					<div id="rodin-expansion-header" class="six columns closed unavailable">
						<span id="rodin-expansion-count">Search refinement space</span>
						<span id="rodin-expansion-selection"></span>
					</div>
					<div id="rodin-expansion-terms" class="sixteen columns closed">
						<ul class="clearfix"></ul>
					</div>
					<script>
						$("#rodin-expansion-header").click(function() {
							if ($("#rodin-expansion-header").hasClass("unavailable")) {
								$("#rodin-expansion-header").addClass("closed");	
								$("#rodin-expansion-terms").addClass("closed");	
							} else {
								$("#rodin-expansion-header").toggleClass("closed");
								$("#rodin-expansion-terms").toggleClass("closed");
							}
						});
					</script>
				</div>
			</div>
			
			<!-- Where results show -->
			<div class="full-width">
				<div id="rodin-results" class="container">
					<div class="sixteen columns">
						<div class="rodin-result">Please launch a first search</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
