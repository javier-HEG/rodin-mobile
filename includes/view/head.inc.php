<head>
	<meta charset="utf-8">
	<title><?php echo PAGE_TITLE; ?></title>
	<meta name="description" content="">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="cleartype" content="on">

	<meta name="apple-mobile-web-app-capable" content="yes" />

	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/icons/rodin-144.png" />
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/icons/rodin-114.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/icons/rodin-72.png" />
	<link rel="apple-touch-icon-precomposed" href="img/icons/rodin-57.png" />
	<link rel="shortcut icon" type="image/png" href="img/icons/rodin-16.png" />

	<!-- Tile icon for Win8 (144x144 + tile color) -->
	<meta name="msapplication-TileImage" content="img/icons/rodin-144.png">
	<meta name="msapplication-TileColor" content="#000000">

	<!-- CSS -->
	<!-- + Mmenu -->
	<link rel="stylesheet" href="css/mmenu.css"/>
	<!-- + HTML5BP -->
	<link rel="stylesheet" href="css/normalize.css">
	<!-- + Responsive, styling based on media geometry -->
	<link rel="stylesheet" href="css/base.css">
	<link rel="stylesheet" href="css/atmosphere.css">
	<!--   - Media query dependent CSS -->
	<link  rel="stylesheet" href="css/mobile-nav.css" media="screen">
	<link  rel="stylesheet" href="css/smartphone.css" media="screen and (min-width:320px) and (max-width:480px)">
	<link  rel="stylesheet" href="css/tablet.css" media="screen and (min-width: 481px) and (max-width: 767px)">
	<link  rel="stylesheet" href="css/ipad.css" media="screen and (min-width: 768px) and (max-width: 1024px)">
	<!-- <link  rel="stylesheet" href="css/desktop.css" media="screen and (min-width: 1025px)"> -->

	<!-- Libraries -->
	<script src="js/vendor/jquery-1.7.2.min.js"></script>
	<script src="js/vendor/modernizr-2.6.2.min.js"></script>
	<!-- Can be used to improve the hovering in touch devices -->
	<!-- <script src="js/vendor/jquery.hoverIntent.js"></script> -->
	<script src="js/helper.js"></script>
	<!-- Messages and MBP Fixes -->
	<script src="js/view/Messages.js"></script>
	<script>
		$(function() {
			messageManager.rollMessages();
		});

		MBP.hideUrlBarOnLoad();
		MBP.preventZoom();
		MBP.scaleFix();		
	</script>

	<?php

	if ($rodinSession->isUserLoggedIn()) {

		?>
		<script>
			var rodinResources = "<?php echo $resourceBaseUrl; ?>";
		</script>
		<script src="js/vendor/jquery.mmenu.js"></script>
		<script src="js/vendor/overthrow.js"></script>
		<!-- Broker class -->
		<script src="js/Broker.js"></script>
		<!-- View class -->
		<script src="js/view/ObserverPattern.js"></script>
		<!-- Model classes -->
		<script src="js/model/User.js"></script>
		<script src="js/model/Universe.js"></script>
		<script src="js/model/Source.js"></script>
		<script src="js/model/Search.js"></script>
		<script src="js/model/Publisher.js"></script>
		<!-- Our script and the observers' instantiation -->
		<script src="js/main.js"></script>
		<!-- And our model instantiation -->
		<script>
			$(function() {
				user = new User("<?php echo $rodinSession->getUserName(); ?>");
				
				// Add universe observer to user
				user.registerObserver(userObserver);
				user.registerObserver(universeListObserver);
				user.registerObserver(currentUniverseObserver);
			});
		</script>
		
		<?php

	}

	?>

	<!-- L20n setup -->
	<link rel="localization" href="locales/manifest.json">
	<script type="application/l10n-data+json">
		{
			"relatedTermsCount": 0
		}
	</script>
	<!-- Include the dist version of L20n -->
	<script src="js/vendor/l20n.js"></script>
	<script>
		var l10nReady = false;
		var l10nLanguageSet = false;

		document.l10n.ready(function() {
			if (!l10nLanguageSet && user != null) {
				user.notifyObservers();
			}

			l10nReady = true;
		});
	</script>
</head>
