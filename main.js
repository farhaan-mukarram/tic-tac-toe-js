import "./style.css";

let grid = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

let gridMarkup = `
<div class="grid">
`;

for (let index = 0; index < 9; index++) {
  gridMarkup += `
  <div class="cell" data-cell-id="${index}">
  </div>
  `;
}

gridMarkup += `
</div>
`;

const handleClick = (event) => {
  const clickedEl = event?.target;

  const cellId = Number(clickedEl?.dataset?.cellId);
  const row = Math.floor(cellId / 3);
  const col = cellId % 3;

  if (grid[row][col] === -1) {
    clickedEl.innerHTML = "X";
    grid[row][col] = 0;
  }
};

document.querySelector("#app").innerHTML = gridMarkup;

document.querySelector(".grid").addEventListener("click", handleClick);
