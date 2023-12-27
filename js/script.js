let gameInstance = (function () {
  let emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  let board = emptyBoard.map((row) => [...row]);
  let currentTurn = 'X';
  let gameState = 'idle';

  let startGame = () => {
    gameState = 'playing';
    board = emptyBoard.map((row) => [...row]);
    currentTurn = Math.random() < 0.5 ? 'X' : 'O';

    console.table(board);

    return `Game started. Now it's ${currentTurn}'s turn`;
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

      return `The game has ended. ${result}`;
    }
    return `Turn played. Now it's ${currentTurn}'s turn`;
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

  return {
    startGame,
    playTurn,
    getBoard,
    checkState,
  };
})();

let gui = (function () {})();
