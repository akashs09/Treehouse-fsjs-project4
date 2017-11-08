var gameModule = (function(){

//set up a dom ready fcn that shows screen-start
  $(function() {
    $('.screen-start').show();
    $('#board').hide();
    $('#finish').hide();
  });

//playerInfo object that updates as turns are made
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

  //active object to if it is player 1 and player 2 turns
  const currActive = {
    one: false,
    two: false
  };

//attacch click event hanndler to either start game or get a new one
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

//mouseover event handler that adds/removes classes for enabling hover of svg images
      $('.box').mouseover((e)=>{
        console.log("mouseover");
        let selected = e.target;
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

      function isOccupied(clicked){

        if ($(clicked).hasClass('box-filled-1') || $(clicked).hasClass('box-filled-2')){
            return false;
        }
        else {
            return true;
        }
      }
//click event on the class box that when enabled does adds the svg img
      $('.box').click((e)=> {
          let clicked = e.target;
          let occupy = isOccupied(clicked);
        if((currActive.one === true) && occupy){
          $(clicked).addClass(playerInfo.one.turn);
          currActive.one = false;
          currActive.two = true;
          playerInfo.one.moves++;
            //checks win functions
            if (playerInfo.one.moves >=3 && playerInfo.one.moves < 5){
              horizontalWin(playerInfo.one);
              verticalWins(playerInfo.one);
              diagonalWin(playerInfo.one);
            } //the fifth move for player 1 will guarantee a tie so bring the screen-win-tie
            else if (playerInfo.one.moves === 5){
              $('#board').hide();
              $('#finish').show();
              $('#finish').addClass('screen-win-tie');
              $('h1').after('<h2>It\'s is a draw</h2>');
            }

            deactivate1();
          }
        else if ((currActive.two === true) && occupy){
          $(clicked).addClass(playerInfo.two.turn);
          currActive.two = false;
          currActive.one = true;
          playerInfo.two.moves++;
          if (playerInfo.two.moves >=3){
            horizontalWin(playerInfo.two);
            verticalWins(playerInfo.two);
            diagonalWin(playerInfo.two);
          }
          deactivate2();
        }
        else {
        alert("Occupied");}
      });

// these deactivate functions just switch the active states from 1 to 2, from 2 to 1 respect.
      function deactivate1(){
        $(playerInfo.one.id).removeClass('active');
        $(playerInfo.two.id).addClass('active');
      }
      function deactivate2(){
        $(playerInfo.one.id).addClass('active');
        $(playerInfo.two.id).removeClass('active');
      }
//checks to see of any players has same across the board
    function horizontalWin(active){
          let g = document.querySelectorAll('.box');
          if(g[0].classList.contains(active.turn)
            && g[1].classList.contains(active.turn)
            && g[2].classList.contains(active.turn)) {
            Winner(active);
          }

          if(g[3].classList.contains(active.turn)
            && g[4].classList.contains(active.turn)
            && g[5].classList.contains(active.turn)) {
            Winner(active);
          }

          if(g[6].classList.contains(active.turn)
            && g[7].classList.contains(active.turn)
            && g[8].classList.contains(active.turn)) {
            Winner(active);
          }
        }
//checks to see if the player has down the board
  function verticalWins(active){
    let g = document.querySelectorAll('.box');
    if(g[0].classList.contains(active.turn)
      && g[3].classList.contains(active.turn)
      && g[6].classList.contains(active.turn)) {
      Winner(active);
    }

    if(g[1].classList.contains(active.turn)
      && g[4].classList.contains(active.turn)
      && g[7].classList.contains(active.turn)) {
      Winner(active);
    }

    if(g[2].classList.contains(active.turn)
      && g[5].classList.contains(active.turn)
      && g[8].classList.contains(active.turn)) {
      Winner(active);
    }
  }
//checks to see if player has same diagonally across
  function diagonalWin(active){
    let g = document.querySelectorAll('.box');
    if(g[0].classList.contains(active.turn)
      && g[4].classList.contains(active.turn)
      && g[8].classList.contains(active.turn)) {
      Winner(active);
    }

    if(g[2].classList.contains(active.turn)
      && g[4].classList.contains(active.turn)
      && g[6].classList.contains(active.turn)) {
      Winner(active);
    }
  }
//once winner has been determined change screen state the respective winner
function Winner(active){
    $('#board').hide();
    $('#finish').show();
    $('#finish').append('<h2>Winner</h2>');
    if (active.turn === 'box-filled-1') {
      $('#finish').addClass('screen-win-one');
      playerInfo.one.hasWon = false;
    } else if(active.turn === 'box-filled-2'){
      $('#finish').addClass('screen-win-two');
      playerInfo.two.hasWon = false;
    }
  }
//reset board to start new game again
    function resetBoard(){
      playerInfo.one.moves = 0;
      playerInfo.two.moves = 0;
      $('#finish').removeClass('screen-win-one');
      $('#finish').removeClass('screen-win-two');
      $('.box').removeClass(playerInfo.one.hover);
      $('.box').removeClass(playerInfo.one.turn);
      $('.box').removeClass(playerInfo.two.hover);
      $('.box').removeClass(playerInfo.two.turn);
    }
})();
