"use strict";
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const render = (id) => {
    board[id].textContent = movesPlayed[id];
};
const checkWinner = (player) => {
    if ((movesPlayed[0] === player &&
        movesPlayed[1] === player &&
        movesPlayed[2] === player) ||
        (movesPlayed[3] === player &&
            movesPlayed[4] === player &&
            movesPlayed[5] === player) ||
        (movesPlayed[6] === player &&
            movesPlayed[7] === player &&
            movesPlayed[8] === player) ||
        (movesPlayed[0] === player &&
            movesPlayed[3] === player &&
            movesPlayed[6] === player) ||
        (movesPlayed[1] === player &&
            movesPlayed[4] === player &&
            movesPlayed[7] === player) ||
        (movesPlayed[2] === player &&
            movesPlayed[5] === player &&
            movesPlayed[8] === player) ||
        (movesPlayed[0] === player &&
            movesPlayed[4] === player &&
            movesPlayed[8] === player) ||
        (movesPlayed[6] === player &&
            movesPlayed[4] === player &&
            movesPlayed[2] === player)) {
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
const analyzeRow = (idStart) => {
    let xCount = 0;
    for (let i = idStart; i <= idStart + 2; i++)
        if (movesPlayed[i] === 'X')
            xCount++;
    return xCount;
};
const analyzeColumn = (idStart) => {
    let xCount = 0;
    for (let i = idStart; i <= idStart + 6; i += 3)
        if (movesPlayed[i] === 'X')
            xCount++;
    return xCount;
};
const analyzeDiagonal = (idStart) => {
    let xCount = 0;
    if (idStart === 0) {
        for (let i = 0; i <= 8; i += 4)
            if (movesPlayed[i] === 'X')
                xCount++;
    }
    else if (idStart === 2) {
        for (let i = 2; i <= 6; i += 2)
            if (movesPlayed[i] === 'X')
                xCount++;
    }
    return xCount;
};
const pickIdInRow = (movesAvailable, idStart) => {
    for (let i = 0; i < movesAvailable.length; i++)
        if (movesAvailable[i] >= idStart && movesAvailable[i] <= idStart + 2)
            return movesAvailable[i];
};
const pickIdInColumn = (movesAvailable, idStart) => {
    for (let i = 0; i < movesAvailable.length; i++)
        if (movesAvailable[i] === idStart || movesAvailable[i] === idStart + 3 || movesAvailable[i] === idStart + 6)
            return movesAvailable[i];
};
const pickIdInDiagonal = (movesAvailable, idStart) => {
    if (idStart === 0) {
        for (let i = 0; i < movesAvailable.length; i++)
            if (movesAvailable[i] === 0 || movesAvailable[i] === 4 || movesAvailable[i] === 8)
                return movesAvailable[i];
    }
    else if (idStart === 2) {
        for (let i = 0; i < movesAvailable.length; i++)
            if (movesAvailable[i] === 2 || movesAvailable[i] === 4 || movesAvailable[i] === 6)
                return movesAvailable[i];
    }
};
const botMove = () => {
    let id;
    let movesAvailable = [];
    for (let i = 0; i < movesPlayed.length; i++)
        if (!movesPlayed[i])
            movesAvailable.push(i);
    for (let i = 0; i <= 6; i += 3)
        if (analyzeRow(i) === 2) {
            id = pickIdInRow(movesAvailable, i);
            break;
        }
    if (id === undefined) {
        for (let i = 0; i <= 2; i++)
            if (analyzeColumn(i) === 2) {
                id = pickIdInColumn(movesAvailable, i);
                break;
            }
    }
    if (id === undefined) {
        if (analyzeDiagonal(0) === 2)
            id = pickIdInDiagonal(movesAvailable, 0);
        else if (analyzeDiagonal(2) === 2)
            id = pickIdInDiagonal(movesAvailable, 2);
    }
    if (id === undefined) {
        let index = getRandomIntInclusive(0, movesAvailable.length - 1);
        id = movesAvailable[index];
    }
    movesPlayed[id] = "O";
    render(id);
    checkWinner("O");
};
const makeMove = (id) => {
    if (!movesPlayed[id] && !winner) {
        movesPlayed[id] = "X";
        render(id);
        checkWinner("X");
        if (!winner)
            botMove();
    }
};
const board = document.getElementsByClassName("item");
let movesPlayed = Array(9).fill(null);
let winner = null;
for (let i = 0; i < board.length; i++)
    board[i].addEventListener("click", () => makeMove(i));
