<?php

$query = $_GET["query"];

header('Content-type: application/json');

if ($query != '') {
	$suggestions = array("information", "networking", "economy", "bank", "switzerland", "world");
	echo json_encode(array_slice($suggestions, strlen($query)));
} else {
	echo json_encode(array());
}

?>
