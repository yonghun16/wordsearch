import "./main.js";
import "./footer.js";

const newGame = document.querySelector(".new");


async function createWord() {
  const res = await fetch("/create")
  const jsonRes = await res.json();
  console.log(jsonRes);

  const rows = 12;
  const cols = 12;
  for (let i = 0; i < rows; i++) {
    const row = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const column = row.querySelector(`[data-index="${i}${j}"]`);
      column.innerHTML = jsonRes[i][j];
    }
  }

}

newGame.addEventListener("click", createWord)




