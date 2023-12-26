let gameInstance = (function() {
    let game = {
        emptyBoard: [['','',''],['','',''],['','','']],
        board: this.emptyBoard,
        currentTurn: 'X',
        gameState: 'idle',
        init: function(){
            
        },
        startGame: function(){
            this.gameState = 'playing';
            this.board = this.emptyBoard;
            this.currentTurn = Math.random() < 0.5 ? "X" : "O";
        },
        playTurn: function(position){
            //position is an array ex: [x,y]
            this.board[position[0]][position[1]] = this.currentTurn;
            console.log(this.board);
            this.checkState();
        },
        checkState: function(){

        }
    }

    return game;
})()