<div class = "rodin-header">
	<div class = "container">
		<div class = "four column rodin-title">RODIN</div>
		<?php

		if ($rodinSession->isUserLoggedIn()) {

			?>
			<div class = "four column rodin-user" style="float:right; text-align: right;" onclick="$('#user_params').toggle();">
				<?php echo $rodinSession->getUserRealName(); ?>
			</div>
			<?php

		}

		?>
	</div>
</div>
<?php

if ($rodinSession->isUserLoggedIn()) {

	?>
	<div class="user-options" id="user_params" style="display:none;">
		<div class="container collapsed">
			<div class="sixteen column">
				<div class="one-third column">
					<button onclick="window.location.href = '';">User parameters</button>
					<button onclick="window.location.href = '';">Search configuration</button>
					<button onclick="window.location.href = 'index.php?action=logout';">Logout</button>
				</div>
			</div>
		</div>
	</div>

	<?php

}

?>
