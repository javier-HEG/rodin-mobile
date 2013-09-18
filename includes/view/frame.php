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

			<!-- The search bar -->
			<div class="rodin-content" style="background-color: tan;">
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
							$('#global-search-form	').on('submit', function() {
								startGlobalSearch();
								return false;
							});
						</script>
					</div>

					<div id="rodin-expansion" class="one-third column closed">
						<header>17 Related terms found</header>
						<ul class="clearfix">
							<li class="selected">Information</li>
							<li>Excess</li>
						</ul>
						<script>
							$("#rodin-expansion header:first").click(function() {
								$("#rodin-expansion").toggleClass("closed");
							});
						</script>
					</div>
				</div>
			</div>
			
			<!-- Where results show -->
			<div class="rodin-content">
				<div class="container">
					<div class="rodin-result">
						<h1>Title</h1>
						<p class="authors">Authors</p>
						<p class="summary">Short-form of content</p>
						<div class="sources">
							<img src="<?php echo(FAMFAMFAM); ?>anchor.png" />
							<img src="<?php echo(FAMFAMFAM); ?>coins.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
