var gameModule = (function(){

//set up a dom ready fcn that shows screen-start
// let resetBoard = ($('.boxes')[0].outerHTML);
  $(function() {
    $('.screen-start').show();
    $('#board').hide();
    $('#finish').hide();
  });

  const playerInfo = {
    one: {
      id: '#player1',
      hover:'highlight1',
      turn: 'box-filled-1',
      active: false,
      moves: 0,
      hasWon: false
    },
    two: {
      id: '#player2',
      hover: 'highlight2',
      turn: 'box-filled-2',
      active: false,
      moves: 0,
      hasWon: false
    }
  };
  const currActive = {
    one: false,
    two: false
  };

  $('.button').on('click', function(event) {
    let name = event.target.textContent;
    if (name === 'Start game'){
      $('.screen-start').hide();
      $('#board').show();
      $('#finish').hide();
      $(playerInfo.one.id).addClass('active');
      currActive.one = true;
    }
    else if (name === 'New game'){
      $('#finish').hide();
      $('h2').remove();
      $('#finish').removeClass('screen-win-one');
      resetBoard();
      $('#board').show();
      $(playerInfo.one.id).addClass('active');
      $(playerInfo.two.id).removeClass('active');
      currActive.one = true;
    }
  });

      $('.box').mouseover((e)=>{
        console.log("mouseover");
        let selected = e.target;
          //this box gets 'active player' hover state
          // console.log(x+'.hover');
          $(selected).addClass(playerInfo.one.hover);
          if (currActive.one === true) {
            $(selected).addClass(playerInfo.one.hover);
          }
          else if (currActive.two === true){
            $(selected).addClass(playerInfo.two.hover);
          }
        });
      $('.box').mouseleave(function(e) {
        let deselected = e.target;
        if (currActive.one === true) {
          $(deselected).removeClass(playerInfo.one.hover);
        }
        if (currActive.two === true) {
          $(deselected).removeClass(playerInfo.two.hover);
      }});

      $('.box').click((e)=> {

          let clicked = e.target;
    // assign this box to this active player
        if(currActive.one === true){
          $(clicked).addClass(playerInfo.one.turn);
          currActive.one = false;
          currActive.two = true;
          playerInfo.one.moves++;
          if (playerInfo.one.moves >=3){
            horizontalWin(playerInfo.one);
            verticalWins(playerInfo.one);
          }

          deactivate1();
        }
        else if (currActive.two === true){
          $(clicked).addClass(playerInfo.two.turn);
          currActive.two = false;
          currActive.one = true;
          playerInfo.two.moves++;
          if (playerInfo.two.moves >=3){
            horizontalWin(playerInfo.two);
            verticalWins(playerInfo.two);
          }
          deactivate2();
        }});


      function deactivate1(){
        $(playerInfo.one.id).removeClass('active');
        $(playerInfo.two.id).addClass('active');
      }
      function deactivate2(){
        $(playerInfo.one.id).addClass('active');
        $(playerInfo.two.id).removeClass('active');
      }

    // function getActivated(){
    //   for (const prop in currActive){
    //       if (currActive[prop]===true) {
    //         return `${'playerInfo.'+[prop]}`
    //       }}}

    function horizontalWin(active){
      let g = document.querySelectorAll('.box');
      // console.log(g[0].classList.contains(active.turn));
      for (let i =0; i < 3; i++) {
        if (g[i].classList.contains(active.turn)){
          active.hasWon = true;

        }
        else {
          active.hasWon = false;
        }
      }
      Winner(active);
      for (let i=3; i<6; i++){
        if (g[i].classList.contains(active.turn)){
          active.hasWon = true;
      }
      else {
        active.hasWon = false;
      }
    }
    Winner(active);
    for (let i =6; i < 9; i++){
      if (g[i].classList.contains(active.turn)){
        active.hasWon = true;
    }
    else {
        active.hasWon = false;
    }
  }
  Winner(active);
}
function verticalWins(active){
  let g = document.querySelectorAll('.box');
  for(let i =0; i<=6; i+=3){
    console.log(i);
    if (g[i].classList.contains(active.turn)) {
      active.hasWon = true;
    }
    else {
      active.hasWon = false;
    }
  }
  Winner(active);
  for (let i = 1; i <=7; i+=3) {
    if (g[i].classList.contains(active.turn)) {
      active.hasWon = true;
  }
  else {
    active.hasWon = true;
  }
}
Winner(active);
for (let i = 2; i <=8; i+=3) {
  if (g[i].classList.contains(active.turn)) {
    active.hasWon = true;
}
else {
  active.hasWon = true;
}
}
  Winner(active);
}

  function Winner(active){
      if (active.turn === 'box-filled-1' && active.hasWon ===true)
      {
        $('#board').hide();
        $('#finish').show();
        $('#finish').addClass('screen-win-one');
        $('#finish').append('<h2>Winner</h2>');
        playerInfo.one.hasWon = false;
      }
      else if(active.turn === 'box-filled-2' && active.hasWon ===true){
        $('#board').hide();
        $('#finish').show();
        $('#finish').addClass('screen-win-two');
        $('#finish').append('<h2>Winner</h2>');
        playerInfo.two.hasWon = false;
    }}
    // check for winning
    //   check activePlayer array for current points on the board
    //   if this array contains 3 matching points
    //     player 1 wins and advance to player 1 screen
    //     else does player 1 have 5 turns and did not win
    //       advance to tie
    //
    // //think of this code changing turns
    // if(player 1 has active Class){
    //   activePlayer=playerInfo.two
    // } else{
    //   activePlayer=playerInfo.two
    // }
    // remove event listeners from this box
    //   (mouseover,mouseout,click)
    function resetBoard(){
      $('.box').removeClass(playerInfo.one.hover);
      $('.box').removeClass(playerInfo.one.turn);
      $('.box').removeClass(playerInfo.two.hover);
      $('.box').removeClass(playerInfo.two.turn);
    }
})();



    // function playerHover(player){
    //   $('.box').hover(function() {
    //      $(this).addClass(player.hover);
    //    }, function() {
    //      $(this).removeClass(player.hover);
    // })
    // if(player.hover==='highlight1'){
    // playerTurnClick(playerInfo.one);}
    // else if (player.hover==='highlight2'){
    //   playerTurnClick(playerInfo.two);}
    // };

 //   function playerTurnClick(player){
 //     $('.box').on('click',function(event) {
 //       let clicked = event.target;
 //         $(clicked).addClass(player.turn);
 //         $(player.id).removeClass('active');
 //         changeTurn(player);
 // })};
 // function changeTurn(player){
 //   let curr = player.turn;
 //   if(curr === 'box-filled-1'){
 //     console.log("1");
 //     $(playerInfo.two.id).addClass('active');
 //     playerHover(playerInfo.two);
 //   }
 //   else if (curr === 'box-filled-2'){
 //     console.log("2");
 //     $(playerInfo.one.id).addClass('active');
 //     playerHover(playerInfo.one);
 //   }
 // }
