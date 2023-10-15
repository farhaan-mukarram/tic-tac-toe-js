import "./style.css";

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
};

document.querySelector("#app").innerHTML = gridMarkup;

document.querySelector(".grid").addEventListener("click", handleClick);
