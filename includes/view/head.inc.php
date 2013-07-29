<head>
	<meta charset="utf-8">
	<title><?php echo PAGE_TITLE; ?></title>
	<meta name="description" content="">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="cleartype" content="on">

	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/touch/apple-touch-icon-144x144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/touch/apple-touch-icon-114x114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/touch/apple-touch-icon-72x72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="img/touch/apple-touch-icon-57x57-precomposed.png">
	<link rel="shortcut icon" href="img/touch/apple-touch-icon.png">

	<link rel="apple-touch-icon" href="<?php echo SKELETON; ?>images/apple-touch-icon.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo SKELETON; ?>images/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo SKELETON; ?>images/apple-touch-icon-114x114.png">

	<!-- Tile icon for Win8 (144x144 + tile color) -->
	<meta name="msapplication-TileImage" content="img/touch/apple-touch-icon-144x144-precomposed.png">
	<meta name="msapplication-TileColor" content="#222222">

	<!-- CSS -->
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/atmosphere.css">
	<!-- + Skeleton -->
	<link rel="stylesheet" href="<?php echo SKELETON; ?>stylesheets/base.css"/>
	<link rel="stylesheet" href="<?php echo SKELETON; ?>stylesheets/skeleton.css"/>
	<link rel="stylesheet" href="<?php echo SKELETON; ?>stylesheets/layout.css"/>
	<!-- + Mmenu -->
	<link rel="stylesheet" href="css/mmenu.css"/>

	<!-- Media query dependent CSS -->
	<link  rel="stylesheet" href="css/mobile-nav.css">
	<?php

//	TODO Add media queries when stable
//	<link  rel="stylesheet" href="css/mobile-nav.css" media="screen and (min-width: 320px) and (max-width: 1024px)">
//	<link  rel="stylesheet" href="css/smartphone.css" media="screen and (min-width:320px) and (max-width:480px)">
//	<link  rel="stylesheet" href="css/tablet.css" media="screen and (min-width: 481px) and (max-width: 767px)">
//	<link  rel="stylesheet" href="css/ipad.css" media="screen and (min-width: 768px) and (max-width: 1024px)">
//	<link  rel="stylesheet" href="css/desktop.css" media="screen and (min-width: 1025px)">

	?>

	<!-- Libraries -->
	<script type="text/javascript" src="js/vendor/jquery-1.7.2.min.js"></script>

	<script type="text/javascript" src="js/vendor/modernizr-2.6.2.min.js"></script>
	<script type="text/javascript" src="js/vendor/jquery.hoverIntent.js"></script>
	<script type="text/javascript" src="js/vendor/jquery.mmenu.min.js"></script>
	<script type="text/javascript" src="js/vendor/overthrow.js"></script>
	<script type="text/javascript" src="js/helper.js"></script>
	<script type="text/javascript" src="js/main.js"></script>

	<!-- Model representation in Javascript -->
	<script type="text/javascript" src="js/model/User.js"></script>
	<script type="text/javascript" src="js/model/Universe.js"></script>
	<script type="text/javascript" src="js/model/Search.js"></script>
	<script type="text/javascript" src="js/model/Publisher.js"></script>
	<script type="text/javascript">
		var user = new User("<?php echo $rodinSession->getUserName(); ?>");
		user.setRealName("<?php echo $rodinSession->getUserRealName(); ?>");

		var universe = new Universe("<?php echo $rodinSession->getUniverseId(); ?>");
		universe.setName("<?php echo $rodinSession->getUniverseName(); ?>");
	</script>
</head>
