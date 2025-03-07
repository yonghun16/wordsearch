import "./main.js";
import "./footer.js";

// new game button
const newGame = document.querySelector(".new");


function fillBlinkGrid(jsonRes, rows, cols) {
  for (let i = 0; i < rows; i++) {
    const row = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const column = row.querySelector(`[data-index="${i}${j}"]`);
      if (jsonRes[i][j] === "_") {
        jsonRes[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        column.style.backgroundColor = "#FEFFFC";
      }
      else {
        column.style.backgroundColor = "skyblue";
      }
    }
  }
}



async function createWord() {
  const res = await fetch("/create")
  const jsonRes = await res.json();
  const rows = 12;
  const cols = 12;

  console.log(jsonRes);
  fillBlinkGrid(jsonRes, rows, cols);
  console.log(jsonRes);

  for (let i = 0; i < rows; i++) {
    const row = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const column = row.querySelector(`[data-index="${i}${j}"]`);
      column.innerHTML = jsonRes[i][j];
    }
  }
}

newGame.addEventListener("click", createWord)
