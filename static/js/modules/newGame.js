import { randomTheme } from "./randomTheme.js";
import { createWordSearchGrid } from "./wordSearch.js";


/*--- functions ---*/
// 빈 격자에 랜덤한 알파벳 채우기
function fillBlinkGridWord(word_search_grid_word, rows, cols) {
  for (let i = 0; i < rows; i++) {
    const rowBlank = document.querySelector(`.row-${i}`);
    for (let j = 0; j < cols; j++) {
      const columnBlank = rowBlank.querySelector(`[data-index-row="${i}"][data-index-col="${j}"]`);
      if (word_search_grid_word[i][j] === "_") {
        word_search_grid_word[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        columnBlank.style.backgroundColor = "#FEFFFC";
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


/*--- handlers ---*/

/*
// Post create 새로운 게임 생성(theme, words, rows, cols)
export async function handleCreateWord() {
  const [choiceTheme, words] = randomTheme();
  const [rows, cols] = [12, 12]
  const res = await fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: {
        choiceTheme: choiceTheme,
        words: words,
        gridSize: [rows, cols]
      }
    }),
  });
}
*/

// 게임 생성
export async function handleReadWord() {

  //handleCreateWord();
  const [rows, cols] = [12, 12];
  const [choiceTheme, words] = randomTheme();
  const gridSize = [rows, cols];

  const [word_search_grid_word, word_search_grid_num] = createWordSearchGrid(words, gridSize);

  fillBlinkGridWord(word_search_grid_word, rows, cols);
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
    word_search_grid_word,  // 0
    word_search_grid_num,   // 1
    choiceTheme,            // 2
    words,                  // 3
    rows,                   // 4
    cols                    // 5
  ];
  return word_search_grid;
}


