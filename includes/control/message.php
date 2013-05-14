<?php

define('SESSION_MESSAGE', 'message');
define('SESSION_MESSAGE_TYPE', 'messagetype');
define('MESSAGE_KIND_INFO', 0);
define('MESSAGE_KIND_ERROR', 1);

function isInterfaceMessageSet() {
	return isset($_SESSION[SESSION_MESSAGE]);
}

function setInterfaceMessage($messageType, $message) {
	$_SESSION[SESSION_MESSAGE] = $message;
	$_SESSION[SESSION_MESSAGE_TYPE] = $messageType;
}

function consumeInterfaceMessage() {
	if (isset($_SESSION[SESSION_MESSAGE])) {
		$message = $_SESSION[SESSION_MESSAGE];
		$messageType = $_SESSION[SESSION_MESSAGE_TYPE];

		unset($_SESSION[SESSION_MESSAGE]);
		unset($_SESSION[SESSION_MESSAGE_TYPE]);

		return array($messageType, $message);
	} else {
		return false;
	}
}

function cssMessageTypeClass($messageType) {
	switch ($messageType) {
		case MESSAGE_KIND_ERROR:
			return 'rodin-message-error';
		case MESSAGE_KIND_INFO:
		default :
			return 'rodin-message-info';
	}
}

function messageTypeTimer($messageType) {
	switch ($messageType) {
		case MESSAGE_KIND_ERROR:
			return 5000;
		case MESSAGE_KIND_INFO:
		default :
			return 2000;
	}
}

?>
