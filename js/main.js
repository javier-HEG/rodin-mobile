/*
 * Personalized scripts are to be copied and modified directly in this file
 */

// Temporally keeping this variable until the broker is ready to take on all AJAX calls
var rodinResources = 'http://localhost:8080/rodin_server/resources/';

/**
 * Starts a global search after the user has entered one
 * @returns {void}
 */
function startGlobalSearch() {
	globalSearch = new Search($('#globalSearchQuery').val());

	// - Create the JS search object
	//   + Attach an observer
	//   + Launch an update in the object
	// - The observer should update the view when search object changes status
	//   + If DONE then get & show results
}

/*
 * Extends jQuery: jquery.dropdown.js
 * Apply sexy dropdowns on any ul with child ul.
 * Depends on: jquery.hoverIntent.js
 */
$.fn.dropdown = function(options) {
	var defaults = {};
	var opts = $.extend(defaults, options);

	// Apply class=hasChildren on those items with children
	// - Adds a span to decorate children with children
	this.each(function() {
		$(this).find('li').each(function() {
			if ($(this).find("ul").length > 0) {
				$(this).addClass("hasChildren");
				$(this).find('> a').wrapInner("<span></span>");
			}
		});
	});

	// Apply class=hover on all list items
	$(this).find("li").on('hover', function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
};

/*
 * And when the DOM is ready
 */
$(function() {
	// Calling the jquery dropdown
	$('nav').dropdown();

	/*
	 *	Applicable only to Desktop version of the Navigation
	 */
	// For IE versions 7 or less, make the navigation appear on hover.
	if ($.browser.msie && $.browser.version.substr(0, 1) < 7) {
		$('li').has('ul').mouseover(function() {
			$(this).children('ul').show();
		}).mouseout(function() {
			$(this).children('ul').hide();
		});
	}

	/*
	 *	Applicable only to Mobile-nav
	 */
	// Checking if the top-right button is visible.
	if ($("nav a.btn-navbar").is(":visible")) {
		// Making the dropdown magically appear onclick/touch.
		$('nav a.btn-navbar').on('click', function() {

			$('section#menu').slideToggle('fast', function() {
				// The height must be fixed for the native scrolling on iOS
				// - But we don't want the height of the nav to exceed the viewport.
				$('section#menu').css({
					'height': $(this).height() + 1,
					'max-height': $(window).height() + 20
				});
				$('ul#menu').css({
					'height': $(this).height(),
					'max-height': $(window).height() + 20
				});
			});

			$(this).toggleClass('active');

		});

		// Making the children appear on click/touch
		$('ul#menu li.hasChildren a').on('click', function() {
			$(this).parent().children('ul').slideToggle('fast', function() {
				// Resetting the height to auto in order to expand/contract the menu upon interaction.
				// - The height of the nav should not exceed the viewport
				$('section#menu').css({
					'height': 'auto',
					'max-height': $(window).height() + 20
				});
				$('ul#menu').css({
					'height': 'auto',
					'max-height': $(window).height() + 20
				});
			});
		});
	}
});

/*
 * Mmenu activation
 */
//	The menu on the left
$(function() {
	$('nav#menu-left').mmenu();
});


//	The menu on the right
$(function() {
	$('nav#menu-right').mmenu({
		position: 'right'
	});
});

