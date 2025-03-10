import { randomTheme } from "./randomTheme.js";
import { createWordSearchGrid } from "./wordSearch.js";


/*--- functions ---*/
// 빈 격자에 랜덤한 알파벳 채우기
function fillBlinkGridWord(word_search_grid_word, rows, cols) {
  for (let i = 0; i < rows; i++) {
    const rowBlank = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      if (word_search_grid_word[i][j] === "_") {
        word_search_grid_word[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      }
    }
  }
}

// 정답 격자에 배경색 채우기
function fillAnswerGridColor(word_search_grid_num, rows, cols) {
  const colorArray = ["#fff5f4", "#d3fffa", "#ede0ff", "#d3eeff", "#e0e6ff", "#f4e4e1", "#fff0db", "#e5f8ff", "#fffce5", "#f0ffe2"];
  for (let i = 0; i < rows; i++) {
    const rowAnswer = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const columnAnswer = rowAnswer.querySelector(`[data-index-row="${i}"][data-index-col="${j}"]`);
      if (word_search_grid_num[i][j] !== 0) {
        columnAnswer.style.backgroundColor = `${colorArray[word_search_grid_num[i][j] - 1]}`;
      }
    }
  }
}

// 배경색 채우기
function fillGridColor(word_search_grid_num, rows, cols) {
  for (let i = 0; i < rows; i++) {
    const rows = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const cols = rows.querySelector(`[data-index-row="${i}"][data-index-col="${j}"]`);
      cols.style.backgroundColor = "#FEFFFC";
    }
  }
}


// 게임 생성
export async function handleReadWord() {

  const [rows, cols] = [12, 12];
  const [choiceTheme, words] = randomTheme();
  const gridSize = [rows, cols];

  const [word_search_grid_word, word_search_grid_num, word_search_start_point] = createWordSearchGrid(words, gridSize);

  fillBlinkGridWord(word_search_grid_word, rows, cols);
  fillGridColor(word_search_grid_num, rows, cols);
  fillAnswerGridColor(word_search_grid_num, rows, cols);

  // 완성된 격자 HTML에 채우기
  for (let i = 0; i < rows; i++) {
    const row = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const column = row.querySelector(`[data-index-row="${i}"][data-index-col="${j}"]`);
      column.innerHTML = word_search_grid_word[i][j];
    }
  }
  const word_search_grid = [
    word_search_grid_word,   // 0
    word_search_grid_num,    // 1
    choiceTheme,             // 2
    words,                   // 3
    rows,                    // 4
    cols,                    // 5
    word_search_start_point  // 6
  ];
  return word_search_grid;
}


