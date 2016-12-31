(function(){
	'use strict';
	//jQuery Controller for scroll to top anchor 
	$(document).ready(function() {
/*
		$('.back-to-top').css({'display': 'none'});
//set when anchor will disappear/reappear
		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$('.back-to-top').fadeIn(duration);
			}else {
				$('.back-to-top').fadeOut(duration);
			}
		});
//set what happens when anchor is clicked 	 
		$('.back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;	//stops propogation
		})
 */
 		var navEl = $('.mainNavEl');	//not a goodidea, maybe selecting from parent
 		//need to think of a way to work around the nth child of these elements
		
	});
}());