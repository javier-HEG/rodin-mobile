<!DOCTYPE html>
<html>
	<?php

	include_once('head.inc.php');

	?>
	<body>
		
		<div>
			<?php

			include_once('rodinheader.inc.php');

			include_once('message.inc.php');

			?>

			<div id="mediateller">Media: </div>

			<!-- The search bar -->
			<div class="rodin-content" style="background-color: tan;">
				<div class="container">
					<div class="two-thirds column">
						<form id="global-search-form" onsubmit="return false;">
							<div id="search-history">
								<button id="history-back" />
								<button id="history-forward" />
							</div>
							<input id="global-search-query" type="text" />
							<button id="global-search-button" />
						</form>
						<script>
							$('#global-search-form').on('submit', function() {
								startGlobalSearch();
								return false;
							});
						</script>
					</div>

					<div id="rodin-expansion" class="one-third column closed unavailable">
						<header><span id="rodin-expansion-count">&nbsp;</span><span id="rodin-expansion-selection"></span></header>
						<ul class="clearfix"></ul>
						<script>
							$("#rodin-expansion header").click(function() {
								if ($("#rodin-expansion").hasClass("unavailable")) {
									$("#rodin-expansion").addClass("closed");	
								} else {
									$("#rodin-expansion").toggleClass("closed");
								}
							});
						</script>
					</div>
				</div>
			</div>
			
			<!-- Where results show -->
			<!-- title, abstract, authors, date, url -->
			<div class="rodin-content">
				<div class="container">
					<div class="eight columns">
						<div class="rodin-result">
							<h1>The influence of the time delay of information flow on an economy evolution. The stock market analysis</h1>
							<p class="authors">Janusz Miskiewicz</p>
							<p class="abstract">The decision process requires information about the present state of the system, but in economy acquiring data and processing them is an expensive and time consuming process. Therefore the state of the system is measured and announced at the end of the well defined time intervals. The model of a stock market coupled with an economy is investigated and the role of the length of the time delay of information flow investigated. It is shown that increasing the time delay leads to collective behavior of agents and oscillations of autocorrelations in absolute log-returns.</p>
							<p class="publication"><span class="date">20.09.2007</span> <a href="http://arxiv.org/abs/0709.3264v1"></a></p>
						</div>
					</div>

					<div class="eight columns">
						<div class="rodin-result">
							<h1>The Convergence of European Business Cycles 1978-2000</h1>
							<p class="authors">P Ormerod, C Mounfield</p>
							<p class="abstract">The degree of convergence of the business cycles of the economies of the European Union is a key policy issue. In particular, a substantial degree of convergence is needed if the European Central Bank is to be capable of setting a monetary policy which is appropriate to the stage of the cycle of the Euro zone economies.  We consider the annual rates of real GDP growth on a quarterly basis in the large core economies of the EU (France, Germany and Italy, plus the Netherlands) over the period 1978Q1 - 2000Q3. An important empirical question is the degree to which the correlations between these growth rates contain true information rather than noise. The technique of random matrix theory is able to answer this question, and has been recently applied successfully in the physics journals to financial markets data.  We find that the correlations between the growth rates of the core EU economies contain substantial amounts of true information, and exhibit considerable stability over time. Even in the late 1970s and early 1980s, these economies moved together closely over the course of the business cycle. There was a slight loosening at the time of German re-unification, but the economies are now, if anything, even more closely correlated.  In contrast, the results obtained with a data set of the EU core plus the UK show no such trend. In the late 1970s and early 1980s, the UK economy did exhibit some degree of correlation with those of the core EU. However, there is no clear evidence to suggest that the UK business cycle has moved more closely into line with that of the core EU economies over the 1978-2000 period.</p>
							<p class="publication"><span class="date">20.09.2007</span> <a href="http://arxiv.org/abs/0709.3264v1"></a></p>
						</div>
					</div>

					<div class="eight columns">
						<div class="rodin-result">
							<h1>The influence of the time delay of information flow on an economy evolution. The stock market analysis</h1>
							<p class="authors">Janusz Miskiewicz</p>
							<p class="abstract">The decision process requires information about the present state of the system, but in economy acquiring data and processing them is an expensive and time consuming process. Therefore the state of the system is measured and announced at the end of the well defined time intervals. The model of a stock market coupled with an economy is investigated and the role of the length of the time delay of information flow investigated. It is shown that increasing the time delay leads to collective behavior of agents and oscillations of autocorrelations in absolute log-returns.</p>
							<p class="publication"><span class="date">20.09.2007</span> <a href="http://arxiv.org/abs/0709.3264v1"></a></p>
						</div>
					</div>

					<div class="eight columns">
						<div class="rodin-result">
							<h1>The Convergence of European Business Cycles 1978-2000</h1>
							<p class="authors">P Ormerod, C Mounfield</p>
							<p class="summary">The degree of convergence of the business cycles of the economies of the European Union is a key policy issue. In particular, a substantial degree of convergence is needed if the European Central Bank is to be capable of setting a monetary policy which is appropriate to the stage of the cycle of the Euro zone economies.  We consider the annual rates of real GDP growth on a quarterly basis in the large core economies of the EU (France, Germany and Italy, plus the Netherlands) over the period 1978Q1 - 2000Q3. An important empirical question is the degree to which the correlations between these growth rates contain true information rather than noise. The technique of random matrix theory is able to answer this question, and has been recently applied successfully in the physics journals to financial markets data.  We find that the correlations between the growth rates of the core EU economies contain substantial amounts of true information, and exhibit considerable stability over time. Even in the late 1970s and early 1980s, these economies moved together closely over the course of the business cycle. There was a slight loosening at the time of German re-unification, but the economies are now, if anything, even more closely correlated.  In contrast, the results obtained with a data set of the EU core plus the UK show no such trend. In the late 1970s and early 1980s, the UK economy did exhibit some degree of correlation with those of the core EU. However, there is no clear evidence to suggest that the UK business cycle has moved more closely into line with that of the core EU economies over the 1978-2000 period.</p>
							<p class="publication"><span class="date">20.09.2007</span> <a href="http://arxiv.org/abs/0709.3264v1"></a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
