import "./style.css";

const NUMBER_OF_CELLS = 9;

let hasGameEnded = false;
const playerSymbols = { 0: "O", 1: "X" };

let currentPlayer = Math.floor(Math.random());

document.querySelector(".message").innerHTML = `Player ${
  currentPlayer + 1
} starts`;

let numberOfEmptyCells = NUMBER_OF_CELLS;

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

function checkIfCurrentPlayerHasWon() {
  // check 1st row
  if (
    grid[0][0] === currentPlayer &&
    grid[0][1] === currentPlayer &&
    grid[0][2] === currentPlayer
  ) {
    return true;
  }

  // check 2nd row
  if (
    grid[1][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[1][2] === currentPlayer
  ) {
    return true;
  }

  // check 3rd row
  if (
    grid[2][0] === currentPlayer &&
    grid[2][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    return true;
  }

  // check 1st col
  if (
    grid[0][0] === currentPlayer &&
    grid[1][0] === currentPlayer &&
    grid[2][0] === currentPlayer
  ) {
    return true;
  }

  // check 2nd col
  if (
    grid[0][1] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][1] === currentPlayer
  ) {
    return true;
  }

  // check 3rd col
  if (
    grid[0][2] === currentPlayer &&
    grid[1][2] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    return true;
  }

  // check leading diagonal
  if (
    grid[0][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    return true;
  }

  // check other diagonal
  if (
    grid[2][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[0][2] === currentPlayer
  ) {
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
    clickedEl.innerHTML = playerSymbol;
    grid[row][col] = currentPlayer;
    numberOfEmptyCells -= 1;

    const hasCurrentPlayerWon = checkIfCurrentPlayerHasWon();

    if (hasCurrentPlayerWon) {
      document.querySelector(".message").innerHTML = `Player ${
        currentPlayer + 1
      } Wins!`;

      hasGameEnded = true;
      return;
    }

    if (numberOfEmptyCells === 0) {
      document.querySelector(".message").innerHTML = `It's a tie!`;
      console.log(`It's a tie!`);
      hasGameEnded = true;
      return;
    }

    // Toggle between players
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.querySelector(".message").innerHTML = `Player ${
      currentPlayer + 1
    }'s turn`;
  }
}

document.querySelector(".grid").addEventListener("click", handleClick);
