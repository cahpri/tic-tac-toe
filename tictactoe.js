let player = "X";
let playing = true
const board = new Array(9);
board.fill(undefined);

// Checks whether square is valid to place X or O into
// Fails check if square's innerHTML and board array are filled for that tile or playing bool is not true
function validSquare(square) {
    if (square.innerHTML !== "" && board[square.id.slice(-1)] !== undefined || playing === false) {
        return false;
    }

    return true;
}

// Check if newly placed in square has led to a win and return the squares used for win
function checkForWin(square) {
    switch (square.id) {
        case "square0":
            if (board[1] === player && board[2] === player) return [0, 1, 2];
            if (board[3] === player && board[6] === player) return [0, 3, 6];
            if (board[4] === player && board[8] === player) return [0, 4, 8];
            break;
        case "square1":
            if (board[0] === player && board[2] === player) return [1, 0, 2];
            if (board[4] === player && board[7] === player) return [1, 4, 7];
            break;
        case "square2":
            if (board[0] === player && board[1] === player) return [2, 0, 1];
            if (board[5] === player && board[8] === player) return [2, 5, 8];
            if (board[4] === player && board[6] === player) return [2, 4, 6];
            break;
        case "square3":
            if (board[4] === player && board[5] === player) return [3, 4, 5];
            if (board[0] === player && board[6] === player) return [3, 0, 6];
            break;
        case "square4":
            if (board[3] === player && board[5] === player) return [4, 3, 5];
            if (board[1] === player && board[7] === player) return [4, 1, 7];
            if (board[0] === player && board[8] === player) return [4, 0, 8];
            if (board[2] === player && board[6] === player) return [4, 2, 6];
            break;
        case "square5":
            if (board[2] === player && board[8] === player) return [5, 2, 8];
            if (board[3] === player && board[4] === player) return [5, 3, 4];
            break;
        case "square6":
            if (board[7] === player && board[8] === player) return [6, 7, 8];
            if (board[0] === player && board[3] === player) return [6, 0, 3];
            if (board[2] === player && board[4] === player) return [6, 2, 4];
            break;
        case "square7":
            if (board[1] === player && board[4] === player) return [7, 1, 4];
            if (board[6] === player && board[8] === player) return [7, 6, 8];
            break;
        case "square8":
            if (board[6] === player && board[7] === player) return [8, 6, 7];
            if (board[2] === player && board[5] === player) return [8, 2, 5];
            if (board[0] === player && board[4] === player) return [8, 0, 4];
            break;
    }
}

// Checks if every square has been filled on the board
function checkBoardFull() {
    return board.every(element => element !== undefined);
}

// Resets gameplay
function resetGame() {
    playing = true;
    board.fill(undefined);
    document.getElementById("subtext").innerHTML = ""
    console.log(squares);
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = ""
        squares[i].style.color = "white";
    }
}

// Handles a click on square
function clickSquare(event) {
    // Check if square is valid to be placed into, return from function if no
    if (!validSquare(event.target)) return;

    // If it is, place X or O
    event.target.innerHTML = player;
    board[event.target.id.slice(-1)] = player;

    // Check if player has won
    const winningSquares = checkForWin(event.target)
    if (winningSquares !== undefined) {
        playing = false;
        document.getElementById("square" + winningSquares[0]).style.color = "green";
        document.getElementById("square" + winningSquares[1]).style.color = "green";
        document.getElementById("square" + winningSquares[2]).style.color = "green";
        document.getElementById("subtext").innerHTML = player + " Wins!"

        // Wait 5 seconds then reset game
        setTimeout(resetGame, 2500);
    } else {
        // Check if board is full
        if (checkBoardFull()) {
            document.getElementById("subtext").innerHTML = "Draw!"

            // Wait 5 seconds then reset game
            setTimeout(resetGame, 2500);
        }
    }

    // Change player to X or O
    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
}   

// Make all squares clickable
const squares = document.getElementsByClassName("square")
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", clickSquare);
}
