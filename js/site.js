$(document).ready(function() {

  var site = (function () {

    //
    //
    function addAnimatedScrollingToAllAnchors() {
      $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate( {
          'scrollTop': $target.offset().top-0
        }, 1000, 'swing', function () {
          window.location.hash = target;
        });
      });
    }

    //
    //
    // function handleResize() {
      // var h = $(window).height();
      // $('section').css({'height': h + 'px'});
    // }

    return {
      animatedScrolling: addAnimatedScrollingToAllAnchors
      // resize: handleResize
    };

  })();

  site.animatedScrolling();
  // site.resize();

});
