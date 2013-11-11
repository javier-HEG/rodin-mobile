<?php

$query = trim($_GET["query"]);

header('Content-type: application/json');

if ($query != '') {
	$suggestions = array("information", "networking", "economy", "bank", "switzerland", "world");
	$toReturn = array_slice($suggestions, strlen($query));
	shuffle($toReturn);
	echo json_encode($toReturn);
} else {
	echo json_encode(array());
}

?>
