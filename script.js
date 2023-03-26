const Game = (() => {
  let gameboard = Array.from(Array(9));
  let turn = 0;
  let player;


  return {gameboard, turn, player}
})();

const displayController = (() => {
  const spot = document.querySelectorAll('.spot');  
  spot.forEach(spot => spot.addEventListener('click', updateGame, {once: true}));
  spot.forEach(spot => spot.addEventListener('click', x => {spot.textContent = `${Game.player}`}, {once: true}));
  function updateGame(event) {
    if (Game.turn % 2) {
        Game.player = 'X'
    } else {
        Game.player = 'O'
    }
    Game.gameboard[parseInt(event.target.id)] = `${Game.player}`;
    Game.turn++;
    console.table(Game.gameboard);
    console.log(Game.turn);
    console.log(Game.player);    
  }
  

})();

// const Player = name => {

// }

