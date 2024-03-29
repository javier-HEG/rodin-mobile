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
				<li data-l10n-id="universeOptions" class="Label"></li>
				<!-- Current universe options -->
				<li id="config-current-universe-label" class="label" data-l10n-id="universeOptionsAboutCurrent"></li>
				<li>
					<span id="current-universe-label" data-l10n-id="universeOptionsCurrent">Current universe</span>
					<ul id="settings-ul">
						<li class="label" data-l10n-id="universeOptionsName"></li>
						<li>
							<form id="universe-settings">
								<input id="universe-name-setting" type="text" value="Default" />
							</form>
						</li>
						<li class="label"  data-l10n-id="universeOptionsCurrentSources"></li>
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
					<span id="remove-current-label" data-l10n-id="universeOptionsRemoveUniverse">Remove universe</span>
					<ul id="remove-current-ul">
						<li class="label" data-l10n-id="universeOptionsRemoveWarning"></li>
						<li class="text"><p data-l10n-id="universeOptionsRemoveWarningText" /></li>
						<li class="label"></li>
						<li>
							<span style="height: 40px;">
								<input data-l10n-id="cancelButton" class="action" type="button" onclick="$('#remove-current-ul').trigger('close');" />
								<input data-l10n-id="removeButton" id="remove-current-button" class="action" type="button" />
							</span>
						</li>
					</ul>
				</li>
				<!-- Universe selection options -->
				<li id="universe-selection-label" class="label" data-l10n-id="universeOptionsUniverseSelection"></li>
				<li id="create-universe-option">
					<span data-l10n-id="universeOptionsCreateUniverse">Create universe</span>
					<ul id="new-universe-ul">
						<li class="label" data-l10n-id="universeOptionsName"></li>
						<li>
							<form id="new-universe-form">
								<input data-l10n-id="defaultInput" id="new-universe-name" type="text" value="" />
							</form>
						</li>
						<li class="label"></li>
						<li>
							<span style="height: 40px;">
								<input data-l10n-id="cancelButton" class="action" type="button" value="Cancel" onclick="$('#new-universe-ul').trigger('close');" />
								<input data-l10n-id="saveButton" class="action" type="button" value="Save" onclick="$('#new-universe-form').submit();" />
							</span>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<script>
			$(function() {
				//Necessary to attach a language id to the elements created by mmenu
				$("a.mm-subclose:contains(Current universe)").attr("data-l10n-id", "universeOptionsCurrent");
				$("a.mm-subclose:contains(Remove universe)").attr("data-l10n-id", "universeOptionsRemoveUniverse");
				$("a.mm-subclose:contains(Create universe)").attr("data-l10n-id", "universeOptionsCreateUniverse");

				$("#remove-current-button").click(function(event) {
					event.preventDefault();

					if (confirm(document.l10n.get("universeOptionsRemoveConfirm"))) {
						user.removeCurrentUniverse()
						$("#remove-current-ul").trigger("close");
					}

					return false;
				});

				$("#new-universe-form").submit(function(event) {
					event.preventDefault();

					if (confirm(document.l10n.get("universeOptionsCreateUniverseConfirm"))) {
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
				<li data-l10n-id="userOptions" class="Label"></li>
				<li data-l10n-id="userOptionsName" class="label"></li>
				<li>
					<form id="user-name-setting">
						<input id="user-name-input" type="text" />
					</form>
				</li>
				<li data-l10n-id="userOptionsPassword" class="label"></li>
				<li>
					<span data-l10n-id="userOptionsChangePassword" id="change-password-span">Change password</span>
					<ul>
						<li data-l10n-id="userOptionsOldPassword" class="label"></li>
						<li>
							<input id="old-password-input" type="password" />
						</li>
						<li data-l10n-id="userOptionsNewPassword" class="label"></li>
						<li style="height: auto; padding-bottom: 4px">
							<input id="new-password1-input" type="password" />
							<input id="new-password2-input" type="password" />
						</li>
						<li class="label"></li>
						<li>
							<span style="height: 40px;">
								<input data-l10n-id="cancelButton" class="action" type="button" />
								<input data-l10n-id="saveButton" class="action" type="button" />
							</span>
						</li>
					</ul>
				</li>
				<li data-l10n-id="userOptionsLanguage" class="label"></li>
				<li>
					<span style="height: 40px;">
						<input id="language-select-fr" class="language" type="button" data-l10n-id="userOptionsLanguageFrench"/>
						<input id="language-select-de" class="language" type="button" data-l10n-id="userOptionsLanguageGerman"/>
						<input id="language-select-it" class="language" type="button" data-l10n-id="userOptionsLanguageItalian"/>
						<input id="language-select-en" class="language" type="button" data-l10n-id="userOptionsLanguageEnglish"/>
					</span>
				</li>
				<li data-l10n-id="userOptionsSession" class="label"></li>
				<li>
					<input class="action" style="width: 90%;" type="button" onclick="window.location.href = 'index.php?action=logout';" data-l10n-id="userOptionsLogoutButton" />
				</li>
			</ul>
		</nav>
		<script>
			$(function() {
				//Necessary to attach a language id to the elements created by mmenu
				$("a.mm-subclose:contains(Change password)").attr("data-l10n-id", "userOptionsChangePassword");

				$("input.language:button").click(function() {
					user.setLanguage($(this).attr("id").split("-")[2].toLowerCase());
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
