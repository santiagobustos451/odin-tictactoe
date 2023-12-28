let gameInstance = (function () {
  let emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  let board = emptyBoard.map((row) => [...row]);
  let currentTurn = 'X';
  let gameState = 'idle';
  let message = 'Click the board to start the game';

  let startGame = () => {
    gameState = 'playing';
    board = emptyBoard.map((row) => [...row]);
    currentTurn = Math.random() < 0.5 ? 'X' : 'O';

    console.table(board);

    message = `Game started. Now it's ${currentTurn}'s turn`;

    return;
  };

  let toggleTurn = () => {
    currentTurn == 'X' ? (currentTurn = 'O') : (currentTurn = 'X');
  };

  let playTurn = (position) => {
    if (gameState != 'playing') return 'Game not started';
    if (board[position[0]][position[1]]) return 'Position taken';
    //position is an array ex: [x,y]
    board[position[0]][position[1]] = currentTurn;
    toggleTurn();
    getBoard();

    let winner = checkState();
    let result = '';

    if (winner) {
      gameState = 'ended';
      result = `The winner is ${winner}!`;
      if (winner == 'draw') result = 'The result is a draw!';

      message = `The game has ended. ${result}`;
      return;
    }
    message = `Turn played. Now it's ${currentTurn}'s turn`;
    return;
  };

  let checkState = () => {
    let horWin = false;
    let verWin = false;
    let diagWin = false;
    let freeSpace = false;
    let result = '';

    board.forEach((row) => {
      row.forEach((column) => {
        if (column == '') freeSpace = true;
      });
    });

    for (let i = 0; i < 3; i++) {
      horWin =
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2] &&
        board[i][i] != '';
      verWin =
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i] &&
        board[i][i] != '';

      if (horWin || verWin) {
        result = board[i][i];
      }
    }
    diagWin =
      (board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
      (board[0][2] == board[1][1] && board[1][1] == board[2][0]);
    if (diagWin) result = board[1][1];

    if (result == '' && !freeSpace) return 'draw';

    return result != '' ? result : false;
  };

  let getBoard = () => {
    console.table(board);
    return board;
  };

  let getGameState = () => {
    return gameState;
  };

  let getMessage = () => {
    return message;
  };

  let getCurrentTurn = () => {
    return currentTurn;
  };

  return {
    startGame,
    playTurn,
    getBoard,
    getGameState,
    getMessage,
    getCurrentTurn,
    checkState,
  };
})();

let gui = (function () {
  let boardGui;
  let messageGui;
  let init = () => {
    cacheDom();
    bindEvents();
    render();
  };
  let cacheDom = () => {
    boardGui = document.querySelector('#board');
    messageGui = document.querySelector('#message');
  };
  let bindEvents = () => {
    boardGui.addEventListener('click', handleClick);
  };
  let handleClick = (e) => {
    cell = e.target.closest('.cell');
    position = cell.getAttribute('data-position');

    switch (gameInstance.getGameState()) {
      case 'idle':
      case 'ended':
        gameInstance.startGame();
        break;
      case 'playing':
        gameInstance.playTurn([position[0], position[1]]);
        break;
    }

    render();
  };
  let render = () => {
    messageGui.innerHTML = gameInstance.getMessage();
    boardState = gameInstance.getBoard();

    boardState.forEach((row, rowIndex) => {
      row.forEach((position, colIndex) => {
        cellGui = boardGui.querySelector(
          `.cell[data-position="${rowIndex}${colIndex}"]`
        );
        cellValue = boardState[rowIndex][colIndex];
        symbolX = cellGui.querySelector('.symbol-x');
        symbolO = cellGui.querySelector('.symbol-o');

        switch (cellValue) {
          case '':
            symbolX.classList.remove('set');
            symbolO.classList.remove('set');
            if (gameInstance.getGameState() == 'playing') {
              console.log(gameInstance.getGameState());
              if (gameInstance.getCurrentTurn() == 'X') {
                symbolO.classList.add('unset');
                symbolX.classList.remove('unset');
              } else {
                symbolX.classList.add('unset');
                symbolO.classList.remove('unset');
              }
            } else {
              symbolX.classList.remove('set');
              symbolO.classList.remove('set');
              symbolX.classList.add('unset');
              symbolO.classList.add('unset');
            }

            break;
          case 'X':
            symbolX.classList.add('set');
            symbolO.classList.add('unset');
            break;
          case 'O':
            symbolO.classList.add('set');
            symbolX.classList.add('unset');
            break;
        }
      });
    });
  };

  init();
})();
