import { handleCreateWord } from "./modules/newGame.js";
import { createGridLine } from"./modules/gridLine.js";
import "./footer.js";


/*--- elements ---*/
const [rows, cols] = [12, 12];
const newGame = document.querySelector(".new");


/*--- functions ---*/
// 격자 생성
createGridLine(rows, cols);


/*--- events ---*/
// 게임 생성
newGame.addEventListener("click", () => handleCreateWord(rows, cols));

