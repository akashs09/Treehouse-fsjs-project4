var gameModule = (function(){

//set up a dom ready fcn that shows screen-start
  $(function() {
    $('.screen-start').show();
    $('#board').hide();
    $('#finish').hide();
    $(this).startInstance;


  });
    startInstance: $('.button').on('click',function(event) {
      console.log("startInstance");
      $('.screen-start').hide();
      $('#board').show();
      $('#finish').hide();
      $('#player1').addClass('active');
      $(this).player1Turn;
    });

    // player1Turn: $('.box').each(function(index, el) {
    //       $(this).css('background-image', url(/Users/akashsharma/Documents/tic-tac-toe-v3/img/o.svg);
    //   });
    player1Turn: $('.box').hover(function() {
      $(this).css({'background-image': 'url('../img/o.svg')'});

    }, function() {
      $(this).css({'background-image': 'url('../img/o.svg')'});
    } )
  console.log("global run");
  }());
