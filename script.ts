const board = document.getElementsByClassName("item");
let movesPlayed = Array(9).fill(null);
let winner: any = null;

for (let i = 0; i < board.length; i++)
	board[i].addEventListener("click", () => makeMove(i));



const getRandomIntInclusive = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const render = (id: number) => {
	board[id].textContent = movesPlayed[id];
};

const checkWinner = (player: string) => {
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
		document.body.insertBefore(winnerTitle, document.getElementById("title")!.nextSibling);
	}
	else if (!movesPlayed.includes(null)) {
		let drawTitle = document.createElement("h2");
		drawTitle.textContent = `This is a draw !!`;
		document.body.insertBefore(drawTitle, document.getElementById("title")!.nextSibling);
	}
};

const botMove = () => {
	let id = getRandomIntInclusive(0, 8);
	while (movesPlayed[id]) {
		id = getRandomIntInclusive(0, 8);
		console.log("generating an other index ...");
	}

	movesPlayed[id] = 'O';
	render(id);
	checkWinner('O');
};

const makeMove = (id: number) => {
	if (!movesPlayed[id] && !winner) {
		movesPlayed[id] = 'X';

		render(id);
		checkWinner('X');

		botMove();
	}
};
