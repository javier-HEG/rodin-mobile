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
					<h1>Login page</h1>
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
	</body>
</html>
