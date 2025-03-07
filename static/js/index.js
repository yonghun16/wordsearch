import "./main.js";
import "./footer.js";

/*--- elements ---*/
const newGame = document.querySelector(".new");

/*--- functions ---*/
// 빈 격자에 랜덤한 알파벳 채우기
function fillBlinkGrid(jsonRes, rows, cols) {
  for (let i = 0; i < rows; i++) {
    const rowBlank = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const columnBlank = rowBlank.querySelector(`[data-index="${i}${j}"]`);
      if (jsonRes[i][j] === "_") {
        jsonRes[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        columnBlank.style.backgroundColor = "#FEFFFC";
      }
    }
  }
}
// 정답 격자에 배경색 채우기
function fillAnswerGrid(jsonRes, rows, cols) {
  const colorArray = ["#F9A19A", "#79C5BE", "#B39CDB", "#90CAF9", "#9FA8DA", "#BCAAA3", "#FFCB7F", "#AFBEC5", "#E6DF94", "#C6E1A4"];
  for (let i = 0; i < rows; i++) {
    const rowAnswer = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const columnAnswer = rowAnswer.querySelector(`[data-index="${i}${j}"]`);
      if (jsonRes[i][j] !== 0) {
        columnAnswer.style.backgroundColor = `${colorArray[jsonRes[i][j] - 1]}`;
      }
    }
  }
}

/*--- functions ---*/
// 격자판 생성
async function handleCreateWord() {
  const res = await fetch("/create")
  const jsonRes = await res.json();
  const rows = 12;
  const cols = 12;

  fillBlinkGrid(jsonRes[0], rows, cols);
  fillAnswerGrid(jsonRes[1], rows, cols);

  for (let i = 0; i < rows; i++) {
    const row = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const column = row.querySelector(`[data-index="${i}${j}"]`);
      column.innerHTML = jsonRes[0][i][j];
    }
  }
}

/*--- event listeners ---*/
newGame.addEventListener("click", handleCreateWord)
