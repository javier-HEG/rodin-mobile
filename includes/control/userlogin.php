<?php

/*
 * This script is called in order to check for the user's login, it
 * is responsible for creating the session that will be persisted on
 * the clients side
 */

if ($_POST['action'] == 'login') {
	if ($rodinSession->newUserLogin($_POST['username'], sha1($_POST['password']))) {
		$_SESSION['message'] = 'Should have logged in';
		header('Location: index.php');
	} else {
		$_SESSION['message'] = 'False username/password pair';
	}
}

if ($_GET['action'] == 'logout') {
	$rodinSession->userLogout();
	break;
}

