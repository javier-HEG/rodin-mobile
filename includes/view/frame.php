<!DOCTYPE html>
<html>
	<?php

	include_once('head.inc.php');

	?>
	<body>
		<?php

		include_once('rodinheader.inc.php');

		include_once('message.inc.php');

		?>

		<!-- The search bar -->
		<div class="rodin-content" style="background-color: tan;">
			<div class="container">
				<!--<div class="one-third column">-->
				<form method = "post" style="margin-bottom: 0px;">
					<input type = "text" name = "query" style="margin-bottom: 0px;" />
					<input type = "hidden" name = "action" value = "globalSearch" />
				</form>
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

		<script src="js/vendor/zepto.min.js"></script>
		<script src="js/helper.js"></script>

		<script type="text/javascript">
			MBP.preventZoom();
			MBP.hideUrlBarOnLoad();
			MBP.scaleFix();
		</script>
	</body>
</html>
