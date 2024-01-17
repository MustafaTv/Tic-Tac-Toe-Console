// script //

// find player symbol and name
const Player = function(symbol, name) {
  function getSymbol() {
    return symbol;
  }

  function getName() {
    return name;
  }

  return {getName, getSymbol};
}

// create gameboard, validate spots, reset board
const Gameboard = (function () {
  const gameBoardSize = 9;
  let array = new Array(gameBoardSize).fill('');

  function isSpotValid(spot) {
    return array[spot] === '' ? true : false;
  }

  function addMarkToBoard(spot, mark) {
    if (array[spot] === '') {
      array[spot] = mark;
    }
  }

  function resetBoard() {
    for (let i = 0; i < array.length; i++) {
      array[i] = '';
    };
  };

  return {array, addMarkToBoard, isSpotValid, resetBoard}
})();

// declare round, winning, losing and tie logic
const Round = (function() {
  const player1 = Player('X', 'player1');
  const player2 = Player('O', 'player2');
  let isPlayerOneTurn = true;
  let roundWinner = null;

  function getCurrentPlayer() {
    return isPlayerOneTurn ? player1 : player2;
  }

  function setNextPlayer() {
    isPlayerOneTurn = !(isPlayerOneTurn);
  }

  function isRoundOver() {
    let ar = Gameboard.array;
    switch(true) {
      case ar[0] === ar[1] && ar[1] === ar[2] && ar[0] !== '':
          setRoundWinner(ar[0]);
          return true;
      case ar[3] === ar[4] && ar[4] === ar[5] && ar[3] !== '':
          setRoundWinner(ar[3]);
          return true;
      case ar[6] === ar[7] && ar[7] === ar[8] && ar[6] !== '':
          setRoundWinner(ar[6]);
          return true;
      case ar[0] === ar[3] && ar[3] === ar[6] && ar[0] !== '':
          setRoundWinner(ar[0]);
          return true;
      case ar[1] === ar[4] && ar[4] === ar[7] && ar[1] !== '':
          setRoundWinner(ar[1]);
          return true;
      case ar[2] === ar[5] && ar[5] === ar[8] && ar[2] !== '':
          setRoundWinner(ar[2]);
          return true;
      case ar[0] === ar[4] && ar[4] === ar[8] && ar[0] !== '':
          setRoundWinner(ar[0]);
          return true;
      case ar[2] === ar[4] && ar[4] === ar[6] && ar[2] !== '':
          setRoundWinner(ar[2]);
          return true;    
  }
  for (let i = 0; i < ar.length; i++) {
    if (ar[i] === '') {
      return false;
    };
  };
  setRoundWinner('tie');
  return true;
  }

  function resetRound() {
    isPlayerOneTurn = true;
    roundWinner = null;
  }

  function setRoundWinner(playerSymbol) {
    if (playerSymbol === 'tie') {
      roundWinner = playerSymbol;
    } else {
      roundWinner = player1.getSymbol() === playerSymbol ? player1 : player2
    };
  }

  function getRoundWinner() {
    return roundWinner;
  }

  return {getCurrentPlayer, isRoundOver, resetRound, getRoundWinner, setNextPlayer}
})();

// Vizualise the game
(function() {
  const gameBoardMessage = document.querySelector('.turn');
  const cells = document.querySelectorAll('.cell');
  const resetBtn = document.querySelector('#restart');

  cells.forEach((cell) => {
    cell.onclick = (e) => {
      const cellID = e.target.classList.contains('.player-symbol') ?
        e.target.parentElement.id :
        e.target.id;
      if (Gameboard.isSpotValid(cellID) && (Round.getRoundWinner() === null || Round.getRoundWinner === 'tie')) {
        Gameboard.addMarkToBoard(cellID, Round.getCurrentPlayer().getSymbol());
        renderCurrentGameboard(Gameboard.array);
        if (Round.isRoundOver()) {
          renderRoundEndMessage(Round.getRoundWinner());
        } else {
          Round.setNextPlayer();
          renderPlayerTurnMessage(Round.getCurrentPlayer().getSymbol());
        }
      }
    }
  })

  resetBtn.onclick = () => {
    Gameboard.resetBoard();
    Round.resetRound();
    renderPlayerTurnMessage(Round.getCurrentPlayer().getSymbol());
    renderCurrentGameboard(Gameboard.array);
  };

  function renderCurrentGameboard(array) {
      for (let i = 0; i < cells.length; i++) {
          const playerSymbolPlaceholderElement = cells[i].firstChild;
          playerSymbolPlaceholderElement.textContent = array[i];
      };
  };

  function renderRoundEndMessage(player) {
    if (player === 'tie') {
      gameBoardMessage.textContent = "It's a draw!";
    } else {
      gameBoardMessage.textContent = `Player ${player.getSymbol()} won!`;
    };
  }

  function renderPlayerTurnMessage(playerSymbol) {
    gameBoardMessage.textContent = `Player ${playerSymbol}'s Turn`;
  }

  renderPlayerTurnMessage(Round.getCurrentPlayer().getSymbol());
  renderCurrentGameboard(Gameboard.array);

})();