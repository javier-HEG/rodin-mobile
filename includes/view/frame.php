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
					<div class="two-thirds column">
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

					<div id="rodin-expansion" class="one-third column closed unavailable">
						<header><span id="rodin-expansion-count">&nbsp;</span><span id="rodin-expansion-selection"></span></header>
						<ul class="clearfix"></ul>
						<script>
							$("#rodin-expansion header").click(function() {
								if ($("#rodin-expansion").hasClass("unavailable")) {
									$("#rodin-expansion").addClass("closed");	
								} else {
									$("#rodin-expansion").toggleClass("closed");
								}
							});
						</script>
					</div>
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
