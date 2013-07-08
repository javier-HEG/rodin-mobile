<?php

define('SESSION_MESSAGES', 'message');
define('MESSAGE_KIND_ERROR', 0);
define('MESSAGE_KIND_DEBUG', 1);
define('MESSAGE_KIND_INFO', 2);

function isInterfaceMessageInitialized() {
	return isset($_SESSION[SESSION_MESSAGES]);
}

function setInterfaceMessage($messageType, $message) {
	if (isInterfaceMessageInitialized()) {
		$_SESSION[SESSION_MESSAGES][] = array($messageType, $message);
	} else {
		$_SESSION[SESSION_MESSAGES] = array(array($messageType, $message));
	}
}

function consumeInterfaceMessage() {
	if (isInterfaceMessageInitialized()) {
		return array_pop($_SESSION[SESSION_MESSAGES]);
	} else {
		return false;
	}

	if (count($_SESSION[SESSION_MESSAGES]) == 0) {
		unset($_SESSION[SESSION_MESSAGES]);
	}
}

?>
