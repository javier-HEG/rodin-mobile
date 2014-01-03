<?php

define('ROOT', getcwd() . DIRECTORY_SEPARATOR);

define('CONFIG', ROOT . 'config' . DIRECTORY_SEPARATOR);

define('INCLUDES', ROOT . 'includes' . DIRECTORY_SEPARATOR);
define('VIEW', INCLUDES . 'view' . DIRECTORY_SEPARATOR);
define('CONTROL', INCLUDES . 'control' . DIRECTORY_SEPARATOR);

define('TOOLS', 'tools' . DIRECTORY_SEPARATOR);
define('RODINCLIENT', TOOLS . 'rodin-client' . DIRECTORY_SEPARATOR);

define('STATUS', 'development');

switch (STATUS) {
	case 'production':
		ini_set('display_errors', 'Off');
		break;
	case 'development':
	default:
}

// Load basic configuration
include_once(CONFIG . 'base.inc.php');

// Application logic
// - Start the client
include_once(TOOLS . 'rodin-client/RodinSession.php');
$rodinSession = new RodinSession();
$rodinSession->setBaseUrl($localResourceBaseUrl);

// - Include interface messaging methods
include_once(CONTROL . 'message.php');

// - Call the user session management script
//   (it should redirect if needed)
include_once(CONTROL . 'userlogin.php');

// - Check if user is logged in
if (!$rodinSession->isUserLoggedIn()) {
	define('PAGE_TITLE', 'Login page');
	include_once(VIEW . 'authentication.php');
} else {
	// If logged in present the normal page
	define('PAGE_TITLE', 'RODIN Mobile');
	include_once(VIEW . 'frame.php');
}

