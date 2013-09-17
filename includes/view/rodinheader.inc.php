<?php

if ($rodinSession->isUserLoggedIn()) {

	?>

	<div id="interface-messages" class="rodin-message">
		<div class="container">
			<div class="column" id="message-container"></div>
		</div>
	</div>

	<header role="banner" class="clearfix">
		<div class="container">
			<h1 id="rodin-title" class="four column">RODIN</h1>
		</div>
	</header>

	<div class="universe-options">
		<div class="container header">
			<a href="#menu-left"></a>
			<span id="header-universe-name">&nbsp;</span>
			<a href="#menu-right" class="user-settings right"></a>
		</div>

		<nav id="menu-left">
			<ul>
				<li class="Label">Universe options</li>
				<li id="universe-selection-label" class="label">Universe selection</li>
				<li class="mm-unselected">Universe test 1</li>
				<li class="mm-selected">Universe test 2</li>
				<li id="config-current-universe-label" class="label">Configure current universe</li>
				<li>
					<span id="current-universe-label">Universe name</span>
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
							<span>LOD</span>
							<ul id="lod-sources-ul"></ul>
						</li>
					</ul>
				</li>
				<li class="label">Add new</li>
				<li>
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
								<input class="action" type="button" value="Cancel" />
								<input class="action" type="button" value="Save" />
							</span>
						</li>
					</ul>
				</li>			
			</ul>
		</nav>
		<script>
			$(function() {
				$("#universe-settings").submit(function() {
					user.getCurrentUniverse().setName($("#universe-name-setting").val());
					$("#universe-name-setting").blur();
					return false;
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
						<input class="language" type="button" value = "En" disabled="disabled" />
						<input class="language" type="button" value = "Fr" />
						<input class="language" type="button" value = "De" />
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
				$("#user-name-setting").submit(function() {
					user.setRealName($("#user-name-input").val());
					$("#user-name-input").blur();
					return false;
				});
			});
		</script>	
	</div>

	<?php

} else {

	?>

	<header role="banner" class="clearfix">
		<div class="container">
			<h1 id="rodin-title" class="four column">RODIN</h1>
		</div>
	</header>

	<?php

}

?>
