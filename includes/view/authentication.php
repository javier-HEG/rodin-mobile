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
			<div class="four columns">
				<?php

				if ($rodinSession->timeSinceLastAttempt() > 60)
					$rodinSession->resetLogginAttempts();

				if ($rodinSession->getUserLoginAttempts() > 5) {

					?>
					<h3>Login page</h3>
					<p>Wait one minute before trying again</p>
					<?php

				} else {

					?>
					<h3>Login page</h3>
					<form method = "post">
						<label for = "username">Username</label>
						<input type = "text" name = "username" />
						<label for = "password">Password</label>
						<input type = "password" name = "password" />

						<input type = "hidden" name = "action" value = "login" />

						<button type = "submit">Submit</button>
					</form>
					<?php

				}

				?>
			</div>
		</div>

		<script src = "js/vendor/zepto.min.js"></script>
		<script src="js/helper.js"></script>

		<script type="text/javascript">
			MBP.preventZoom();
		</script>

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
