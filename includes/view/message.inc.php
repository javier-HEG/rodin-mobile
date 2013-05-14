<?php

if (isInterfaceMessageSet()) {
	list($messageType, $message) = consumeInterfaceMessage();

	?>
	<div id="interface-messages" class="rodin-message <?php echo messageTypeCssClass($messageType); ?>">
		<div class="container">
			<div class="column">
				<?php echo $message; ?>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		function hideInterfaceMessage() {
			$('#interface-messages').hide()
		}

		setTimeout("hideInterfaceMessage()", <?php echo messageTypeTimer($messageType); ?>);
	</script>
	<?php

}

?>
