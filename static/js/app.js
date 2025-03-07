import { createGridLine } from "./modules/gridLine.js";
import { handleCreateWord } from "./modules/newGame.js";
import "./modules/copyright.js";


const [rows, cols] = [12, 12];
const newGame = document.querySelector(".new");  // new game button
const words = ["BMW", "TESLA", "KIA", "BENZ", "HYUNDAI", "FERRARI"];
let word_search_grid_word, word_search_grid_num;
let prevChar = 0;
let chain = 0;
const colorArray = ["#F9A19A", "#79C5BE", "#B39CDB", "#90CAF9", "#9FA8DA", "#BCAAA3", "#FFCB7F", "#AFBEC5", "#E6DF94", "#C6E1A4"];

// app 시작
function appStart() {

  // 게임 생성
  async function createWord() {
    let word_search_grid = await handleCreateWord(rows, cols);
    word_search_grid_word = word_search_grid[0];
    word_search_grid_num = word_search_grid[1];
    //console.log(word_search_grid_num);
  }

  // 단어 클릭
  function handleBlockClick(event) {
    const blockRow = event.target.dataset.indexRow;
    const blockCol = event.target.dataset.indexCol;
    //console.log("row, col", blockRow, blockCol);
    //console.log(word_search_grid_num[blockRow][blockCol]);
    //console.log(word_search_grid_word[blockRow][blockCol]);


    const currentChar = word_search_grid_num[blockRow][blockCol];
    if (currentChar === 0) {
      prevChar = currentChar;
      chain = 0;
      return;
    }
    else {
      const currentCharWord = words[currentChar - 1];
      const currentCharWordLength = currentCharWord.length;

      if (prevChar !== currentChar) {
        prevChar = currentChar;
        chain = 1;
        return;
      }
      else if (prevChar === currentChar) {
        prevChar = currentChar;
        chain++;

        //console.log("hit");
        //const columnAnswer = document.querySelector(`[data-index-row="${blockRow}"][data-index-col="${blockCol}"]`);
        ////columnAnswer.style.backgroundColor = `${colorArray[currentChar - 1]}`;
        //columnAnswer.style.backgroundColor = `tomato`;

        if (chain === currentCharWordLength) {
          alert("correct");
          return;
        }
      }
    }
  }


  /* --- event handlers --- */
  createGridLine(rows, cols);   // 격자 생성
  newGame.addEventListener("click", createWord);  // 게임 생성

  const gridBlocks = document.querySelectorAll('.search-grid');
  gridBlocks.forEach(block => block.addEventListener('click', handleBlockClick));
}

appStart();
