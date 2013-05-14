<?php ?>

<div class = "rodin-header">
	<div class = "container">
		<div class = "four column rodin-title">RODIN</div>
		<?php

		if ($rodinSession->isUserLoggedIn()) {
			echo '<div class = "four column rodin-user" style="float:right; text-align: right;">';
			echo $rodinSession->getUserRealName();
			echo '</div>';
		}

		?>
	</div>
</div>
</div>


