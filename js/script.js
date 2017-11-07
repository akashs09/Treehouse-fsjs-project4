var gameModule = (function(){

//set up a dom ready fcn that shows screen-start
  $(function() {
    $('.screen-start').show();
    $('#board').hide();
    $('#finish').hide();
  });
    startInstance: $('.button').on('click',function(event) {
      $('.screen-start').hide();
      $('#board').show();
      $('#finish').hide();
      $('#player1').addClass('active');
      playerHover(playerInfo.one);
    });
      const playerInfo = {
        one: {
          id: '#player1',
          hover:'highlight1',
          turn: 'box-filled-1'
        },
        two: {
          id: '#player2',
          hover: 'highlight2',
          turn: 'box-filled-2'
        }
      };
    function playerHover(player){
      $('.box').hover(function() {
        console.log(player.hover);
         $(this).addClass(player.hover);
       }, function() {
         $(this).removeClass(player.hover);
    })
    if(player.hover==='highlight1'){
    playerTurnClick(playerInfo.one);}
    else if (player.hover==='highlight2'){
      playerTurnClick(playerInfo.two);}
    };

   function playerTurnClick(player){
     $('.box').on('click',function(event) {
       let clicked = event.target;
         $(clicked).addClass(player.turn);
         $(player.id).removeClass('active');
         changeTurn(player);
 })};
 function changeTurn(player){
   let curr = player.turn;
   console.log(curr);
   if(curr === 'box-filled-1'){
     $(playerInfo.two.id).addClass('active');
     playerHover(playerInfo.two);
   }
   else if (curr === 'box-filled-2'){
     $(playerInfo.one.id).addClass('active');
     playerHover(playerInfo.one);
   }
 }
//    function player2TurnHover() {
//       $('.box').hover(function() {
//     $(this).addClass('highlight2');
//     }, function() {
//     $(this).removeClass('highlight2');
//   })
//   player2TurnClick();
// };
// function player2TurnClick(){
//  $('.box').on('click',function(event) {
//   let clicked = event.target;
//
//   if (!$(clicked).hasClass('box-filled-2')){
//     $(clicked).addClass('box-filled-2');
//     console.log($(this));
//     $('#player2').removeClass('active')
//     $('#player1').addClass('active');
//     gameModule.player1TurnHover;
//   }
//   else {
//     alert("Already Occupied!")
// }
// })};




  }());
