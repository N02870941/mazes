(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 50) {
          $('.scrolltop:hidden').stop(true, true).fadeIn();
      } else {
          $('.scrolltop').stop(true, true).fadeOut();
      }
    });
    $('.scroll').click(function() {
  		$('html, body').animate({
        scrollTop : 0},800);
  		return false;
  	});
})();
