import "./style.css";

const NUMBER_OF_CELLS = 9;

const playerSymbols = { 0: "O", 1: "X" };

let currentPlayer = Math.floor(Math.random());

let numberOfEmptyCells = NUMBER_OF_CELLS;

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

let gridMarkup = `
<div class="grid">
`;

for (let index = 0; index < NUMBER_OF_CELLS; index++) {
  gridMarkup += `
  <div class="cell" data-cell-id="${index}">
  </div>
  `;
}

gridMarkup += `
</div>
`;

const handleClick = (event) => {
  if (numberOfEmptyCells === 0) return;

  const clickedEl = event?.target;

  const cellId = Number(clickedEl?.dataset?.cellId);
  const row = Math.floor(cellId / 3);
  const col = cellId % 3;

  if (grid[row][col] === -1) {
    const playerSymbol = playerSymbols[currentPlayer];
    clickedEl.innerHTML = playerSymbol;
    grid[row][col] = 0;
    numberOfEmptyCells -= 1;

    // Toggle between players
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  }
};

document.querySelector("#app").innerHTML = gridMarkup;

document.querySelector(".grid").addEventListener("click", handleClick);
