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

			<nav>
				<a data-toggle="collapse" class="btn btn-navbar">
					<span class="icon-user"></span>
				</a>

				<section id="menu" class="four column">
					<header>Settings for <u><?php echo $rodinSession->getUserRealName(); ?></u></header>
					<ul id="menu" class="overthrow">
						<li>
							<a href="#" tabindex="1">Parameters</a>
							<ul>
								<li><a href="#">Name</a></li>
								<li><a href="#">Password</a></li>
								<li><a href="#" >Language</a></li>
							</ul>
						</li>
						<li class="last-child"><a href="#" onclick="window.location.href = 'index.php?action=logout';" tabindex="2">Logout</a></li>
					</ul>
				</section>
			</nav>
		</div>
	</header>

	<div class="universe-options">
		<div class="container header">
			<a href="#menu-left"></a>
			<span id="header-universe-name">&nbsp;</span>
			<a href="#menu-right" class="friends right"></a>
		</div>

		<nav id="menu-left">
			<ul>
				<li class="Label">Universe configuration</li>
				<li>
					<span>Settings</span>
					<ul id="settings-ul">
						<li>
							<label>Name</label>
							<form id="universe-settings">
								<input id="universe-name-setting" type="text" />
							</form>
						</li>
					</ul>
				</li>
				<li>
					<span>Datasources</span>
					<ul id="doc-sources-ul"></ul>
				</li>
				<li>
					<span>LOD</span>
					<ul id="lod-sources-ul"></ul>
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

		<nav id="menu-right"></nav>
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
