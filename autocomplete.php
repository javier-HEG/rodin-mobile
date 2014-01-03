<?php

define('ROOT', getcwd() . DIRECTORY_SEPARATOR);

define('CONFIG', ROOT . 'config' . DIRECTORY_SEPARATOR);

define('TOOLS', 'tools' . DIRECTORY_SEPARATOR);
define('RODINCLIENT', TOOLS . 'rodin-client' . DIRECTORY_SEPARATOR);

// Load basic configuration
include_once(CONFIG . 'base.inc.php');

include_once(RODINCLIENT . 'RodinBroker.php');

$query = trim($_GET["query"]);

header('Content-type: application/json; charset=utf-8');

if ($query != '') {
	// $url = "http://suggestqueries.google.com/complete/search?client=firefox&q=" . $query;
	$url = "http://82.192.234.100:25834/-/rodin/xxl/app/u/AutoCompleteResponder.php?setversion=2012&user_id=11&query=" . $query;

	$proxy = $useProxy ? $proxyConfig : null;
	
	$response = RodinBroker::makeCall(RodinBroker::METHOD_GET, $url, null, $proxy);

	if ($response->code == 200) {
		$suggestions = $response->body->data;
		// $suggestions = $response->body;

		echo json_encode($suggestions);
	} else {
		echo json_encode(array());
	}
} else {
	echo json_encode(array());
}

?>
