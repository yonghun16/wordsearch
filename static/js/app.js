import { newGame_desktop, newGame_mobile } from "./header-menu.js";
import "./footer-copyright.js";
import "./modules/darkmode.js";
import { createGridLine } from "./modules/gridLine.js";
import { handleReadWord } from "./modules/newGame.js";
import { Stack } from "./modules/stack.js";
import { blopSound, correctSound, applauseSound } from "./modules/sounds.js";

let rows;
let cols;
let theme;
let words = [];
let word_search_grid_num;
let word_search_start_point;
let prevCharNum;
let success;               // 정답 제출 차수 (단어 수 만큼 성공하면 게임 클리어)

let stackSize;             // 철자 위치 스택 크기
let rowsStack;             // 철자 위치 스택row
let colsStack;             // 철자 위치 스택col
let colorStack;            // 철자 배경색 스택
let valueStack;

const colorArray = [      // 철자 배경색
  "#F9A19A", "#79C5BE", "#B39CDB", "#90CAF9",
  "#9FA8DA", "#BCAAA3", "#FFCB7F", "#AFBEC5",
  "#E6DF94", "#C6E1A4"
];
let currentColor;          // 현재 클릭한 철자 배경색


/* --- APP start --- */
function appStart() {

  // 게임 격자 생성 및 초기화
  async function createWord() {
    const word_search_grid = await handleReadWord();
    word_search_grid_num = word_search_grid[1];
    theme = word_search_grid[2];
    words = word_search_grid[3];
    rows = word_search_grid[4];
    cols = word_search_grid[5];
    word_search_start_point = word_search_grid[6];

    currentColor = 0;
    prevCharNum = 9999999;
    success = 0;    // 정답 제출 차수 (단어 수 만큼 성공하면 게임 클리어)
    stackSize;
    rowsStack = new Stack();
    colsStack = new Stack();
    colorStack = new Stack();
    valueStack = new Stack();

    const themeElement = document.querySelector(".theme");
    themeElement.innerHTML = theme;

    const wordsContainer = document.querySelector(".words");
    wordsContainer.innerHTML = ""; // 기존 요소들 제거
    let i = 0;
    words.forEach(word => {
        const wordItem = document.createElement("div");
        wordItem.classList.add("words__item");
        wordItem.setAttribute("data-index-wordnum", `${i++}`);
        wordItem.textContent = word;
        wordsContainer.appendChild(wordItem);
    });
  }

  // 모든 스택 비우기
  function clearStack() {
    rowsStack.clear();
    colsStack.clear();
    colorStack.clear();
    valueStack.clear();
  }

  // 효과음 재생
  function audioPlay(audioNum) {
    const audioList = [blopSound, correctSound, applauseSound];
    audioList.forEach(audio => {
      if (audio.playing) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    audioList[audioNum].play();
  }


  // 맞출 단어 클릭
  function handleWordClick(event) {
    if (!event.target.dataset.indexWordnum) {
      return;
    }
    const wordIndex = event.target.dataset.indexWordnum;
    const firstWordX = word_search_start_point[1][wordIndex];
    const firstWordY = word_search_start_point[2][wordIndex];

    const columnElement = document.querySelector(`[data-index-row="${firstWordY}"][data-index-col="${firstWordX}"]`);
    columnElement.style.backgroundColor = `#FFCD9B`;
    columnElement.style.border = `#FF9933 3px solid`;

    setTimeout(function() {
      columnElement.style.backgroundColor = '#FEFFFC';
      columnElement.style.border = '#DEDEDD 1px solid';
    }, 1000);
  }
    

  // 철자 클릭
  function handleBlockClick(event) {
    audioPlay(0);
    const blockRow = event.target.dataset.indexRow;
    const blockCol = event.target.dataset.indexCol;

    /* 단어 클릭 시 배경색 칠하기 */
    // 철자 요소 선택
    const columnElement = document.querySelector(`[data-index-row="${blockRow}"][data-index-col="${blockCol}"]`);
    const currentCharNum = word_search_grid_num[blockRow][blockCol];
    // 클릭한 철자정보 스택에 push
    rowsStack.push(blockRow);
    colsStack.push(blockCol);
    colorStack.push(columnElement.style.backgroundColor);
    valueStack.push(currentCharNum)
    //철자 바탕색 칠하기
    columnElement.style.backgroundColor = `${colorArray[currentColor]}`;
    word_search_grid_num[blockRow][blockCol] = 0;  // grid_num을 0으로 바꾸기 (중복 선택해도 의미 없도록)

    // 이전 단어와 '다른 단어의 철자'를 선택한 경우
    if (currentCharNum !== prevCharNum) {
      prevCharNum = currentCharNum;
      stackSize = rowsStack.size();

      if (stackSize > 1) {
        for (let i = 0; i < stackSize; i++) {
          const row = rowsStack.pop();
          const col = colsStack.pop();
          const color = colorStack.pop();
          const value = valueStack.pop();
          const columnAnswer = document.querySelector(`[data-index-row="${row}"][data-index-col="${col}"]`);
          word_search_grid_num[row][col] = value;
          columnAnswer.style.backgroundColor = color;
        }
        clearStack();
      }
    }
    // 이전 단어와 '같은 단어의 철자'를 선택한 경우
    else if (currentCharNum === prevCharNum) {
      prevCharNum = currentCharNum;
      stackSize = rowsStack.size();

      let currentCharWordLength = 0   // default 0 (오답 단어의 철자를 선택한 경우) 

      // 정답 단어의 철자 길이 구하기
      if (currentCharNum !== 0) {
        const currentCharWord = words[currentCharNum - 1];
        currentCharWordLength = currentCharWord.length;   // eg. currentCharWordLength <- 3(BMW), 5(TESLA)
      }

      // 스텍크기가 단어의 철자의 길이와 같다면,(최소 3은 넘어야 하고)
      if (stackSize > 2 && stackSize === currentCharWordLength) {
        //console.log("Correct");
        const correctElement = document.querySelector(`[data-index-wordnum="${currentCharNum-1}"]`);
        correctElement.style.color = "#838383";
        correctElement.style.textDecoration = "line-through";
        correctElement.style.textDecorationThickness = "3px";
        correctElement.style.textDecorationColor = `${colorArray[currentColor]}`;
        audioPlay(1);
        currentColor += 1;
        clearStack();
        success += 1;
        if (success === words.length) {
          audioPlay(2);
          alert("Success!");
          currentColor = 0;
        }
      }

      // 선택한 단어 길이보다 스택크기가 많다면(최소 2는 넘어야 하고) -> 선택한 단어 외에 엉뚱한 철자를 선택한 경우
      else if (stackSize > 1 && stackSize >= currentCharWordLength) {
        //console.log("inCorrect");
        for (let i = 0; i < stackSize; i++) {
          const row = rowsStack.pop();
          const col = colsStack.pop();
          const color = colorStack.pop();
          const value = valueStack.pop();
          const columnAnswer = document.querySelector(`[data-index-row="${row}"][data-index-col="${col}"]`);
          word_search_grid_num[row][col] = value;
          columnAnswer.style.backgroundColor = color;
        }
        clearStack();
      }
    }
  }

  /* --- event handlers --- */

  // 격자 생성
  createGridLine(12, 12);
  createWord();

  // 새로운 게임
  const newGameDesktop = newGame_desktop;
  const newGameMobile = newGame_mobile;
  newGameDesktop.addEventListener("click", () => {
    createWord()
  });
  newGameMobile.addEventListener("click", () => {
    createWord()
  });

  // 격자(철자) 클릭
  const gridBlocks = document.querySelectorAll('.search-grid');
  gridBlocks.forEach(block => block.addEventListener('click', handleBlockClick));

  // 단어 클릭
  const wordBlocks = document.querySelectorAll('.words');
  wordBlocks.forEach(block => block.addEventListener('click', handleWordClick));
}


appStart();
