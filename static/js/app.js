import { createGridLine } from"./modules/gridLine.js";
import { handleCreateWord } from "./modules/newGame.js";
import "./modules/copyright.js";


/*--- elements ---*/
const [rows, cols] = [12, 12];
const newGame = document.querySelector(".new");  // new game button


/*--- events ---*/
// 격자 생성
createGridLine(rows, cols);

// 게임 생성
newGame.addEventListener("click", () => handleCreateWord(rows, cols));

