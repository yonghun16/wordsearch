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
  const colorArray = ["#F9A19A", "#79C5BE", "#B39CDB", "#90CAF9", "#9FA8DA", "#BCAAA3", "#FFCB7F", "#AFBEC5", "#E6DF94", "#C6E1A4"];
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
// 새로운 게임 생성
export async function handleCreateWord(rows, cols) {
  const res = await fetch("/create")
  const jsonRes = await res.json();
  const [word_search_grid_word, word_search_grid_num] = jsonRes;

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
  const word_search_grid = [word_search_grid_word, word_search_grid_num];
  return word_search_grid;
}

