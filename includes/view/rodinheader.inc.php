<header role="banner" class="clearfix">
	<div class="container">
		<h1 id="rodin-title" class="four column">RODIN</h1>

		<?php

		if ($rodinSession->isUserLoggedIn()) {

			?>

			<nav>
				<a data-toggle="collapse" class="btn btn-navbar">
					<span class="icon-user"></span>
				</a>

				<section id="menu" class="four column">
					<header>Settings for <u><?php echo $rodinSession->getUserRealName(); ?></u></header>
					<ul id="menu" class="overthrow">
						<li>
							<a href="#" tabindex="1">Parameters</a>
							<ul>
								<li><a href="#">Name</a></li>
								<li><a href="#">Password</a></li>
								<li><a href="#" >Language</a></li>
							</ul>
						</li>
						<li class="last-child"><a href="#" onclick="window.location.href = 'index.php?action=logout';" tabindex="2">Logout</a></li>
					</ul>
				</section>
			</nav>
		</div>

		<div class="universe-options">
			<div class="container header">
				<a href="#menu-left"></a>
				<span id="header-universe-name"><?php echo $rodinSession->getUniverseName(); ?></span>
				<a href="#menu-right" class="friends right"></a>
			</div>

			<nav id="menu-left">
				<ul>
					<li class="Label">Universe selection</li>
					<li class="Selected"><a href="#">Test</a></li>
					<li><a href="#">Economy</a></li>
				</ul>
			</nav>

			<nav id="menu-right">
				<ul>
					<li class="Label">Universe configuration</li>
					<li>
						<span>Datasources</span>
						<ul>
							<li><a href="#">Swissbib</a></li>
							<li><a href="#">ArXiv</a></li>
						</ul>
					</li>
					<li>
						<span>LOD</span>
						<ul>
							<li><a href="#">Source A</a></li>
							<li><a href="#">Source B</a></li>
						</ul>
					</li>
				</ul>
			</nav>

			<?php

		}

		?>
	</div>

</header>
