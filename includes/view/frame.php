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
					<!--<div class="one-third column">-->
					<form style="margin-bottom: 0px;" id="globalSearchForm" onsubmit="return false;">
						<input id="globalSearchQuery" type="text" style="margin-bottom: 0px;" />
					</form>
					<script>
						$('#globalSearchForm').on('submit', function() {
							startGlobalSearch();
							return false;
						});
					</script>
					<!--</div>-->
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

			<script>
				MBP.preventZoom();
				MBP.hideUrlBarOnLoad();
				MBP.scaleFix();

				$(function() {
					messageManager.rollMessages();
				});
			</script>

		</div>
	</body>
</html>
