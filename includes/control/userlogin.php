<?php

/*
 * This script is called in order to check for the user's login, it
 * is responsible for creating the session that will be persisted on
 * the clients side
 */

if ($_POST['action'] == 'login') {
	if ($rodinSession->userLoginAttempt($_POST['username'], sha1($_POST['password']))) {
		setInterfaceMessage(MESSAGE_KIND_INFO, 'Welcome ' . $rodinSession->getUserRealName());
		header('Location: index.php');
	} else {
		setInterfaceMessage(MESSAGE_KIND_ERROR, 'Wrong username/password pair, this is your ' . $rodinSession->getUserLoginAttempts() . ' attempt');
	}
}

if ($_GET['action'] == 'logout') {
	if ($rodinSession->isUserLoggedIn())
		$rodinSession->userLogout();
	// TODO How to deal with this probable attack?
}

?>
