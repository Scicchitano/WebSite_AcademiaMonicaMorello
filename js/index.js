document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
        indicators:true
    });
    });

    $('.carousel').carousel();
  setInterval(function() {
    $('.carousel').carousel('next');
  }, 2000); // every 2 seconds

    // Or with jQuery

    $(document).ready(function(){
      $('.carousel').carousel();
    });


    var instance = M.Carousel.init({
        fullWidth: true
      });
    
      // Or with jQuery
    
      $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });



      
    