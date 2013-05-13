<?php

if (isset($_SESSION['message'])) {
	echo '<div>' . $_SESSION['message'] . '</div>';
	unset($_SESSION['message']);
	unset($_SESSION['message_type']);
}

?>
