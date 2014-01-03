<?php

/*
 * This script is used to include messages from the PHP implementation
 * to the interface, where there are managed by the Messages.js files
 */

if (isInterfaceMessageInitialized()) {
	echo '<script>';

	while (list($messageType, $message) = consumeInterfaceMessage()) {

		?>

		messageManager.addMessage('<?php echo $message; ?>', '<?php echo $messageType; ?>');

		<?php

	}

	echo '</script>';
}

?>
