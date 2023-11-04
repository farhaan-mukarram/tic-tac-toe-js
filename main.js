import "./style.css";

const NUMBER_OF_CELLS = 9;

let hasGameEnded = false;
const playerSymbols = { 0: "O", 1: "X" };

let currentPlayer = Math.round(Math.random());

document.querySelector(
  ".message"
).innerHTML = `${playerSymbols[currentPlayer]} starts`;

let numberOfEmptyCells = NUMBER_OF_CELLS;

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

function checkIfCurrentPlayerHasWon() {
  const line = document.querySelector(".line");
  // check 1st row
  if (
    grid[0][0] === currentPlayer &&
    grid[0][1] === currentPlayer &&
    grid[0][2] === currentPlayer
  ) {
    line.className = "line row row-1";
    return true;
  }

  // check 2nd row
  if (
    grid[1][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[1][2] === currentPlayer
  ) {
    line.className = "line row row-2";
    return true;
  }

  // check 3rd row
  if (
    grid[2][0] === currentPlayer &&
    grid[2][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    line.className = "line row row-3";

    return true;
  }

  // check 1st col
  if (
    grid[0][0] === currentPlayer &&
    grid[1][0] === currentPlayer &&
    grid[2][0] === currentPlayer
  ) {
    line.className = "line col col-1";

    return true;
  }

  // check 2nd col
  if (
    grid[0][1] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][1] === currentPlayer
  ) {
    line.className = "line col col-2";
    return true;
  }

  // check 3rd col
  if (
    grid[0][2] === currentPlayer &&
    grid[1][2] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    line.className = "line col col-3";

    return true;
  }

  // check leading diagonal
  if (
    grid[0][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    line.className = "line diagonal leading";

    return true;
  }

  // check other diagonal
  if (
    grid[2][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[0][2] === currentPlayer
  ) {
    line.className = "line diagonal other";

    return true;
  }

  return false;
}

function handleClick(event) {
  if (hasGameEnded) return;

  const clickedEl = event?.target;

  const cellId = Number(clickedEl?.dataset?.cellId);
  const row = Math.floor(cellId / 3);
  const col = cellId % 3;

  if (grid[row][col] === -1) {
    const playerSymbol = playerSymbols[currentPlayer];
    const el = document.createElement("div");
    el.innerHTML = playerSymbol;
    el.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], {
      duration: 300,
      iterations: 1,
    });
    clickedEl.appendChild(el);
    grid[row][col] = currentPlayer;
    numberOfEmptyCells -= 1;

    const hasCurrentPlayerWon = checkIfCurrentPlayerHasWon();

    if (hasCurrentPlayerWon) {
      document.querySelector(
        ".message"
      ).innerHTML = `🎉 ${playerSymbols[currentPlayer]} Wins 🎉`;

      hasGameEnded = true;
      return;
    }

    if (numberOfEmptyCells === 0) {
      document.querySelector(".message").innerHTML = `It's a tie!`;
      hasGameEnded = true;
      return;
    }

    // Toggle between players
    currentPlayer = currentPlayer === 0 ? 1 : 0;

    document.querySelector(
      ".message"
    ).innerHTML = `${playerSymbols[currentPlayer]}'s turn`;
  }
}

document.querySelector(".grid").addEventListener("click", handleClick);
