let turn = 0;

const Game = (() => {
  let gameboard = Array.from(Array(9));
  const winningCombinations = [
    [0,1,2], 
    [3,4,5],
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8],
    [2,4,6]
  ]

  function resetGame() {
    gameboard.fill(null);
    turn = 0;
  }

  function checkWinner() {
    let xPositions = [];
    let oPositions = [];
    gameboard.filter(function(x, index){
      if (x == 'X') {
        xPositions.push(index);
      } else if (x == 'O') {
        oPositions.push(index);
      }
    });
   
    console.log(`x pos: ${xPositions}`);
    console.log(`o pos: ${oPositions}`);
  }

  function updateGame(x){
    gameboard[x] = `${Player().marker}`;
    turn++;
    checkWinner();
    
    // console.table(gameboard);
    // console.log(turn);
  }

  return {updateGame, resetGame}
})();

const displayController = (() => {
  const spot = document.querySelectorAll('.spot');
  const clearBoard = (() => {
    function clear () {     
      spot.forEach(spot => spot.addEventListener('click', playRound, {once: true}));
      spot.forEach(spot => spot.textContent = '');
      Game.resetGame();
    }
    return {clear}
  })();
  clearBoard.clear();

  function playRound(event){
    let choice = parseInt(event.target.id);
    event.target.textContent = `${Player().marker}`
    Game.updateGame(choice);
  }


  // function updateGame(event) {
  //   if (Game.turn % 2) {
  //       Game.player = 'O'
  //   } else {
  //       Game.player = 'X'
  //   }
  //   Game.gameboard[parseInt(event.target.id)] = `${Game.player}`;
  //   Game.turn++;
  //   console.table(Game.gameboard);
  //   console.log(Game.turn);
  //   console.log(Game.player);
  // }
  
  const clear = document.getElementById('clearBoard');
  clear.addEventListener('click', clearBoard.clear);

})();

const Player = () => {
  let marker;
  if (turn % 2) {
    marker = 'O';
  } else {
    marker = 'X';
  }

  return {marker}
}

