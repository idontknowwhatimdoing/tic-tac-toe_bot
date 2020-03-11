"use strict";
const render = (id) => {
    board[id].textContent = movesPlayed[id];
};
const checkWinner = (player) => {
    if (movesPlayed[0] === player && movesPlayed[1] === player && movesPlayed[2] === player ||
        movesPlayed[3] === player && movesPlayed[4] === player && movesPlayed[5] === player ||
        movesPlayed[6] === player && movesPlayed[7] === player && movesPlayed[8] === player ||
        movesPlayed[0] === player && movesPlayed[3] === player && movesPlayed[6] === player ||
        movesPlayed[1] === player && movesPlayed[4] === player && movesPlayed[7] === player ||
        movesPlayed[2] === player && movesPlayed[5] === player && movesPlayed[8] === player ||
        movesPlayed[0] === player && movesPlayed[4] === player && movesPlayed[8] === player ||
        movesPlayed[6] === player && movesPlayed[4] === player && movesPlayed[2] === player) {
        winner = player;
        let winnerTitle = document.createElement("h2");
        winnerTitle.textContent = `And the winner is .... ${winner} !!`;
        document.body.insertBefore(winnerTitle, document.getElementById("title").nextSibling);
    }
    else if (!movesPlayed.includes(null)) {
        let drawTitle = document.createElement("h2");
        drawTitle.textContent = `This is a draw !!`;
        document.body.insertBefore(drawTitle, document.getElementById("title").nextSibling);
    }
};
const makeMove = (id) => {
    if (!movesPlayed[id] && !winner) {
        let player = xIsNext ? 'X' : 'O';
        movesPlayed[id] = player;
        xIsNext = !xIsNext;
        render(id);
        checkWinner(player);
    }
};
const board = document.getElementsByClassName("item");
let movesPlayed = Array(9).fill(null);
let xIsNext = true;
let winner = null;
for (let i = 0; i < board.length; i++)
    board[i].addEventListener("click", () => makeMove(i));
