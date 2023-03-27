let turn = 0;

const Player = (name, marker) => {

  const getMarker = () => marker;
  const getName = () => name;
  
  function setName(newName) {
    name = newName;
  }
   

  return {getMarker, getName, setName}
}

const Game = (() => {
  let gameboard = Array.from(Array(9));
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');


  let setNames = document.getElementById('setNames');
  setNames.addEventListener('click', setName);
  function setName(){
    player1.setName(prompt('Player 1 name: ', 'Player 1'));
    document.getElementById('player1').textContent = player1.getName();
    player2.setName(prompt("Player 2 Name: ", "Player 2"));
    document.getElementById('player2').textContent = player2.getName();
    displayController.clearBoard.clear();
  }
  

  function resetGame() {
    gameboard.fill(null);
    turn = 0;
  }

  function checkWinner() {
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
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return gameboard[index] === currentPlayer.getMarker();
      })
    });
  }

  function checkDraw() {
    return (!gameboard.includes(null));
  }
  function updateGame(x){
    if (turn % 2) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    gameboard[x] = `${currentPlayer.getMarker()}`;
    console.table(gameboard);
    if (checkWinner() == true) {
      displayController.displayWinner(`${currentPlayer.getName()} wins`);
      displayController.clearBoard.gameOver();
    }
    if (checkDraw() == true) {
      displayController.displayWinner('issa draw');
    }
    turn++;
  }

  return {updateGame, resetGame}
})();

const displayController = (() => {
  const spot = document.querySelectorAll('.spot');
  const winner = document.getElementById('winner');
  const clearBoard = (() => {
    function clear () {     
      spot.forEach(spot => spot.addEventListener('click', playRound, {once: true}));
      spot.forEach(spot => spot.textContent = '');
      Game.resetGame();
      winner.style.display = 'none';
    }

    function gameOver(){
      spot.forEach(spot => spot.removeEventListener('click', playRound, {once: true}));
      Game.resetGame();
    }

    return {clear, gameOver}
  })();
  clearBoard.clear();

  function displayWinner(win){
    winner.style.display = 'grid';
    winner.textContent = `${win}`;
  }

  function playRound(event){
    let choice = parseInt(event.target.id.slice(4));
    if (turn % 2) {
      event.target.textContent = 'O';
    } else {
      event.target.textContent = 'X';
    }
    Game.updateGame(choice);
  }
  
  const clear = document.getElementById('clearBoard');
  clear.addEventListener('click', clearBoard.clear);

  return {spot, clearBoard, displayWinner}
})();



