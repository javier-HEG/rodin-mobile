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

		<div class="container">
			<div class="sixteen column">
				<div class="one-third column">
					<a href='index.php?action=logout'>Logout</a>
				</div>
			</div>
		</div>

		<script src="js/vendor/zepto.min.js"></script>
		<script src="js/helper.js"></script>

		<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
		<!--
		<script>
			var _gaq = [["_setAccount", "UA-XXXXX-X"], ["_trackPageview"]];
			(function(d, t) {
				var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
				g.async = 1;
				g.src = ("https:" == location.protocol ? "//ssl" : "//www") + ".google-analytics.com/ga.js";
				s.parentNode.insertBefore(g, s)
			}(document, "script"));
		</script>
		-->
	</body>
</html>
