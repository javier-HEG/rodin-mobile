<head>
	<meta charset="utf-8">
	<title><?php echo PAGE_TITLE; ?></title>
	<meta name="description" content="">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="cleartype" content="on">

	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/icons/rodin-144.png" />
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/icons/rodin-114.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/icons/rodin-72.png" />
	<link rel="apple-touch-icon-precomposed" href="img/icons/rodin-57.png" />
	<link rel="shortcut icon" type="image/png" href="img/icons/rodin-16.png" />

	<!-- Tile icon for Win8 (144x144 + tile color) -->
	<meta name="msapplication-TileImage" content="img/icons/rodin-144.png">
	<meta name="msapplication-TileColor" content="#000000">

	<!-- Logo font -->
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:800' rel='stylesheet' type='text/css'>

	<!-- CSS -->
	<!-- + Skeleton -->
	<link rel="stylesheet" href="tools/skeleton/stylesheets/base.css"/>
	<link rel="stylesheet" href="tools/skeleton/stylesheets/skeleton.css"/>
	<link rel="stylesheet" href="tools/skeleton/stylesheets/layout.css"/>
	<!-- + Mmenu -->
	<link rel="stylesheet" href="css/mmenu.css"/>
	<!-- + HTML5BP -->
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/main.css">
	<!-- + Responsive (ours) -->
	<link rel="stylesheet" href="css/atmosphere.css">
	<!--   - Media query dependent CSS -->
	<link  rel="stylesheet" href="css/mobile-nav.css">
	<!--   - More media queries (to add when design is stable) -->
	<!-- <link  rel="stylesheet" href="css/mobile-nav.css" media="screen and (min-width: 320px) and (max-width: 1024px)">
	<link  rel="stylesheet" href="css/smartphone.css" media="screen and (min-width:320px) and (max-width:480px)">
	<link  rel="stylesheet" href="css/tablet.css" media="screen and (min-width: 481px) and (max-width: 767px)">
	<link  rel="stylesheet" href="css/ipad.css" media="screen and (min-width: 768px) and (max-width: 1024px)">
	<link  rel="stylesheet" href="css/desktop.css" media="screen and (min-width: 1025px)"> -->

	<!-- Libraries -->
	<script src="js/vendor/jquery-1.7.2.min.js"></script>
	<script src="js/vendor/modernizr-2.6.2.min.js"></script>
	<script src="js/vendor/jquery.hoverIntent.js"></script>

	<?php

	if ($rodinSession->isUserLoggedIn()) {

		?>
		<script src="js/vendor/jquery.mmenu.js"></script>
		<script src="js/vendor/overthrow.js"></script>
		<script src="js/helper.js"></script>
		<script src="js/main.js"></script>
		<!-- Broker class -->
		<script src="js/Broker.js"></script>
		<!-- View class -->
		<script src="js/view/ObserverPattern.js"></script>
		<!-- Model classes -->
		<script src="js/model/User.js"></script>
		<script src="js/model/Universe.js"></script>
		<script src="js/model/Search.js"></script>
		<script src="js/model/Publisher.js"></script>
		<!-- Model instantiation -->
		<script>
			var user = new User("<?php echo $rodinSession->getUserName(); ?>");
			user.setRealName("<?php echo $rodinSession->getUserRealName(); ?>");

			// Add universe observer to user
			var universeListObserver = new UniverseListObserver();
			var currentUniverseObserver = new CurrentUniverseObserver();
			
			user.registerObserver(universeListObserver);
			user.registerObserver(currentUniverseObserver);
		</script>
		<?php

	}

	?>
</head>
