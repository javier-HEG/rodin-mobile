<?php

if ($rodinSession->isUserLoggedIn()) {

	?>

	<div id="interface-messages" class="rodin-message" style="display:none">
		<div class="container">
			<div class="sixteen columns" id="message-container"></div>
		</div>
	</div>

	<header role="banner" class="clearfix">
		<div class="container">
			<div class="sixteen columns">
				<h1 id="rodin-title">RODIN</h1>
			</div>
		</div>
	</header>

	<div class="sliding-panels">
		<div class="container header">
			<a href="#menu-left"></a>
			<span id="header-universe-name">&nbsp;</span>
			<a href="#menu-right" class="user-settings right"></a>
		</div>

		<nav id="menu-left">
			<ul>
				<li class="Label">Universe options</li>
				<!-- Current universe options -->
				<li id="config-current-universe-label" class="label">About current universe</li>
				<li>
					<span id="current-universe-label">Current universe</span>
					<ul id="settings-ul">
						<li class="label">Name</li>
						<li>
							<form id="universe-settings">
								<input id="universe-name-setting" type="text" value="Default" />
							</form>
						</li>
						<li class="label">Sources</li>
						<li>
							<span>Datasources</span>
							<ul id="doc-sources-ul"></ul>
						</li>
						<li>
							<span>Thesauri</span>
							<ul id="the-sources-ul"></ul>
						</li>
						<li>
							<span>LODs</span>
							<ul id="lod-sources-ul"></ul>
						</li>
					</ul>
				</li>
				<li>
					<span id="remove-current-label">Remove universe</span>
					<ul id="remove-current-ul">
						<li class="label">Warning</li>
						<li class="text">
							<p>Are you sure you want to remove the current universe?</p>
						</li>
						<li class="label">Action</li>
						<li>
							<span style="height: 40px;">
								<input class="action" type="button" value="Cancel" onclick="$('#remove-current-ul').trigger('close');" />
								<input id="remove-current-button" class="action" type="button" value="Remove" />
							</span>
						</li>
					</ul>
				</li>
				<!-- Universe selection options -->
				<li id="universe-selection-label" class="label">Universe selection</li>
				<li id="create-universe-option">
					<span>Create universe</span>
					<ul id="new-universe-ul">
						<li class="label">Name</li>
						<li>
							<form id="new-universe-form">
								<input id="new-universe-name" type="text" value="Default" />
							</form>
						</li>
						<li class="label">Action</li>
						<li>
							<span style="height: 40px;">
								<input class="action" type="button" value="Cancel" onclick="$('#new-universe-ul').trigger('close');" />
								<input class="action" type="button" value="Save" onclick="$('#new-universe-form').submit();" />
							</span>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<script>
			$(function() {

				$("#remove-current-button").click(function(event) {
					event.preventDefault();

					if (confirm("This action cannot be reverted!")) {
						user.removeCurrentUniverse()
						$("#remove-current-ul").trigger("close");
					}

					return false;
				});

				$("#new-universe-form").submit(function(event) {
					event.preventDefault();

					if (confirm("Are you sure you want to create a new universe?\n(It will be selected by default)")) {
						user.createNewUniverse($("#new-universe-name").val());
						$("#new-universe-ul").trigger("close");
					}

					return false;
				});
				

				$("#universe-settings").submit(function(event) {
					event.preventDefault();

					user.getCurrentUniverse().setName($("#universe-name-setting").val());

					var form = $("#universe-settings").get(0);
					if ($.data(form, "bluring")) {
						$.removeData(form, "bluring");
					} else {
						$("#universe-name-setting").blur();
					}

					return false;
				});

				$("#universe-name-setting").blur(function() {
					var form = $("#universe-settings").get(0);
					$.data(form, "bluring", true);
					$("#universe-settings").submit();
				});
			});
		</script>

		<nav id="menu-right">
			<ul>
				<li class="Label">User options</li>
				<li class="label">Name</li>
				<li>
					<form id="user-name-setting">
						<input id="user-name-input" type="text" />
					</form>
				</li>
				<li class="label">Password</li>
				<li>
					<span>Change password</span>
					<ul>
						<li class="label">Old password</li>
						<li>
							<input id="old-password-input" type="password" />
						</li>
						<li class="label">New password</li>
						<li style="height: auto; padding-bottom: 4px">
							<input id="new-password1-input" type="password" />
							<input id="new-password2-input" type="password" />
						</li>
						<li class="label">Action</li>
						<li>
							<span style="height: 40px;">
								<input class="action" type="button" value="Cancel" />
								<input class="action" type="button" value="Save" />
							</span>
						</li>
					</ul>
				</li>
				<li class="label">Language</li>
				<li>
					<span style="height: 40px;">
						<input id="language-select-en" class="language" type="button" value = "En" />
						<input id="language-select-fr" class="language" type="button" value = "Fr" />
						<input id="language-select-de" class="language" type="button" value = "De" />
					</span>
				</li>
				<li class="label">Session</li>
				<li>
					<input class="action" style="width: 90%;" type="button" onclick="window.location.href = 'index.php?action=logout';" value="Logout" />
				</li>
			</ul>
		</nav>
		<script>
			$(function() {
				$("input.language:button").click(function() {
					user.setLanguage($(this).val().toLowerCase());
				});

				$("#user-name-setting").submit(function(event) {
					event.preventDefault();

					user.setRealName($("#user-name-input").val());
					
					var form = $("#user-name-setting").get(0);
					if ($.data(form, "bluring")) {
						$.removeData(form, "bluring");
					} else {
						$("#user-name-input").blur();
					}

					return false;
				});

				$("#user-name-input").blur(function() {
					var form = $("#user-name-setting").get(0);
					$.data(form, "bluring", true);
					$("#user-name-setting").submit();
				});
			});
		</script>
	</div>

	<?php

} else {

	?>

	<header role="banner" class="clearfix">
		<div class="container">
			<div class="sixteen columns">
				<h1 id="rodin-title">RODIN</h1>
			</div>
		</div>
	</header>

	<?php

}

?>
