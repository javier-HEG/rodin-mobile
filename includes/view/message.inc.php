<?php

if (isInterfaceMessageInitialized()) {

	?>
	<div id="interface-messages" class="rodin-message">
		<div class="container">
			<div class="column" id="message-container"></div>
		</div>
	</div>
	<script type="text/javascript">
		var messageCSSClass = [];
		messageCSSClass[<?php echo MESSAGE_KIND_ERROR; ?>] = 'rodin-message-error';
		messageCSSClass[<?php echo MESSAGE_KIND_DEBUG; ?>] = 'rodin-message-debug';
		messageCSSClass[<?php echo MESSAGE_KIND_INFO; ?>] = 'rodin-message-info';

		var messageTimeout = [];
		messageTimeout[<?php echo MESSAGE_KIND_ERROR; ?>] = 5000;
		messageTimeout[<?php echo MESSAGE_KIND_DEBUG; ?>] = 3000;
		messageTimeout[<?php echo MESSAGE_KIND_INFO; ?>] = 2000;

		var interfaceMessages = [];
	<?php

	while (list($messageType, $message) = consumeInterfaceMessage()) {

		?>
			var singleMessage = {
				type: <?php echo $messageType; ?>,
				content: "<?php echo $message; ?>"
			}

			interfaceMessages[interfaceMessages.length] = singleMessage;
		<?php

	}

	?>
		function rollInterfaceMessage() {
			$('#interface-messages').hide();

			if (interfaceMessages.length > 0) {
				message = interfaceMessages.pop();
				$('#message-container').html(message.content + '[' + interfaceMessages.length + ']');
				$('#interface-messages').removeClass();
				$('#interface-messages').addClass('rodin-message ' + messageCSSClass[message.type]);
				$('#interface-messages').show();

				setTimeout("rollInterfaceMessage()", messageTimeout[message.type]);
			}
		}

		rollInterfaceMessage();
	</script>
	<?php

}

?>
