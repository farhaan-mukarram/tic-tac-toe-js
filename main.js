const messageElement = document.querySelector(".message");
const lineElement = document.querySelector(".line");
const overlayElement = document.querySelector(".overlay");
const gridElement = document.querySelector(".grid");
const resetBtn = document.getElementById("reset-btn");

const NUMBER_OF_CELLS = 9;
const playerSymbols = { 0: "O", 1: "X" };

let hasGameEnded = false;
let currentPlayer = Math.round(Math.random());
let numberOfEmptyCells = NUMBER_OF_CELLS;

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

setMessage(`${playerSymbols[currentPlayer]} starts`);

function initializeGame() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
  });

  lineElement.className = "line";
  overlayElement.style.display = "none";

  hasGameEnded = false;

  currentPlayer = Math.round(Math.random());

  setMessage(`${playerSymbols[currentPlayer]} starts`);

  numberOfEmptyCells = NUMBER_OF_CELLS;

  grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
}

function checkIfCurrentPlayerHasWon() {
  // check 1st row
  if (
    grid[0][0] === currentPlayer &&
    grid[0][1] === currentPlayer &&
    grid[0][2] === currentPlayer
  ) {
    lineElement.className = "line row row-1";
    return true;
  }

  // check 2nd row
  if (
    grid[1][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[1][2] === currentPlayer
  ) {
    lineElement.className = "line row row-2";
    return true;
  }

  // check 3rd row
  if (
    grid[2][0] === currentPlayer &&
    grid[2][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    lineElement.className = "line row row-3";

    return true;
  }

  // check 1st col
  if (
    grid[0][0] === currentPlayer &&
    grid[1][0] === currentPlayer &&
    grid[2][0] === currentPlayer
  ) {
    lineElement.className = "line col col-1";

    return true;
  }

  // check 2nd col
  if (
    grid[0][1] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][1] === currentPlayer
  ) {
    lineElement.className = "line col col-2";
    return true;
  }

  // check 3rd col
  if (
    grid[0][2] === currentPlayer &&
    grid[1][2] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    lineElement.className = "line col col-3";

    return true;
  }

  // check leading diagonal
  if (
    grid[0][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[2][2] === currentPlayer
  ) {
    lineElement.className = "line diagonal leading";

    return true;
  }

  // check other diagonal
  if (
    grid[2][0] === currentPlayer &&
    grid[1][1] === currentPlayer &&
    grid[0][2] === currentPlayer
  ) {
    lineElement.className = "line diagonal other";

    return true;
  }

  return false;
}

function setMessage(message) {
  messageElement.innerHTML = message;
}

function swapTurns() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  setMessage(`${playerSymbols[currentPlayer]}'s turn`);
}

function insertSymbol(clickedElement) {
  const playerSymbol = playerSymbols[currentPlayer];
  const el = document.createElement("div");

  el.innerHTML = playerSymbol;
  el.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], {
    duration: 300,
    iterations: 1,
  });

  clickedElement.appendChild(el);
}

function takeTurn(row, col, clickedEl) {
  if (grid[row][col] === -1) {
    grid[row][col] = currentPlayer;
    numberOfEmptyCells -= 1;

    // Insert player symbol with an animation
    insertSymbol(clickedEl);

    const hasCurrentPlayerWon = checkIfCurrentPlayerHasWon();

    // Handle win
    if (hasCurrentPlayerWon) {
      setMessage(`🎉 ${playerSymbols[currentPlayer]} Wins 🎉`);
      hasGameEnded = true;
      overlayElement.style.display = "flex";

      return;
    }

    // Handle draw
    if (numberOfEmptyCells === 0) {
      setMessage("It's a tie!");
      overlayElement.style.display = "flex";
      hasGameEnded = true;

      return;
    }

    // Toggle between players
    swapTurns();
  }
}

function handleClick(event) {
  if (hasGameEnded) return;

  const clickedEl = event?.target;

  const cellId = Number(clickedEl?.dataset?.cellId);
  const row = Math.floor(cellId / 3);
  const col = cellId % 3;

  // Take a turn
  takeTurn(row, col, clickedEl);
}

gridElement.addEventListener("click", handleClick);
resetBtn.addEventListener("click", initializeGame);
