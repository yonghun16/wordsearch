
export function createWordSearchGrid(words, gridSize) {
  const [gridRows, gridCols] = gridSize;

  let wordSearchGrid = [
    Array.from({ length: gridRows }, () => Array(gridCols).fill('_')),
    Array.from({ length: gridRows }, () => Array(gridCols).fill(0)),
    Array.from({ length: 3 }, () => Array(words.length).fill(0))
  ];

  // 단어 배치
  inputWord(wordSearchGrid, gridSize, words);

  return wordSearchGrid;
}

function printWordSearchGrid(wordSearchGrid) {
  wordSearchGrid[0].forEach(row => console.log(row.join(' ')));
  console.log();
  wordSearchGrid[1].forEach(row => console.log(row.join(' ')));
}

function inputWord(grid, gridSize, words) {
  const [gridRows, gridCols] = gridSize;
  let count = 1;
  const maxAttempts = 200; // 최대 시도 횟수 설정

  let attempt = 0;
  let allWordsPlaced = false;

  while (attempt < maxAttempts && !allWordsPlaced) {
    attempt++;
    grid[0] = Array.from({ length: gridRows }, () => Array(gridCols).fill('_')); // 초기화
    grid[1] = Array.from({ length: gridRows }, () => Array(gridCols).fill(0)); // 카운트 배열 초기화

    let placedWords = 0;
    for (let word of words) {
      let placed = false;
      let wordAttempts = 0;

      while (!placed && wordAttempts < maxAttempts) {
        wordAttempts++;
        const direction = Math.floor(Math.random() * 8);
        // 방향 포인트            (0.좌상↖️ ,  1.상⬆️ , 2.우상↗️ , 3.우➡️ , 4.우하↘️ , 5.하⬇️ , 6.좌하↙️ , 7좌⬅️ )
        const directionMovePoint = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
        const [dr, dc] = directionMovePoint[direction];

        const [startX, startY] = setStartPoint(direction, word, gridRows, gridCols);

        let check = true;
        for (let i = 0; i < word.length; i++) {
          const newY = startY + i * dc;
          const newX = startX + i * dr;

          // 해당 위치가 비어있는지 확인
          //const isBlanked = grid[0][newY]?.[newX] === '_' || grid[0][newY]?.[newX] === word[i];
          const isBlanked = grid[0][newY]?.[newX] === '_';

          if (!isBlanked) {
            check = false;
            break;
          }
        }

        if (check) {
          for (let i = 0; i < word.length; i++) {
            grid[0][startY + i * dc][startX + i * dr] = word[i];
            grid[1][startY + i * dc][startX + i * dr] = count;
            grid[2][0][count-1] = count;
            grid[2][1][count-1] = startX;
            grid[2][2][count-1] = startY;
          }
          count++;
          placed = true;
          placedWords++;
        }
      }

      if (!placed) {
        console.warn(`"${word}" 단어를 ${maxAttempts}번 시도 후에도 배치할 수 없습니다.`);
      }
    }

    if (placedWords === words.length) {
      allWordsPlaced = true; // 모든 단어가 배치되었으면 종료
    }
  }

  if (!allWordsPlaced) {
    console.error("모든 단어를 배치할 수 없습니다. 다시 시도해주세요.");
  }
}

function setStartPoint(direction, word, gridRows, gridCols) {
  let startX = 0, startY = 0;
  const lenWord = word.length;

  switch (direction) {
    case 0:
      startX = randInt(lenWord - 1, gridRows - 1);
      startY = randInt(lenWord - 1, gridCols - 1);
      break;
    case 1:
      startX = randInt(0, gridRows - 1);
      startY = randInt(lenWord - 1, gridCols - 1);
      break;
    case 2:
      startX = randInt(0, gridRows - lenWord);
      startY = randInt(lenWord - 1, gridCols - 1);
      break;
    case 3:
      startX = randInt(0, gridRows - lenWord);
      startY = randInt(0, gridCols - 1);
      break;
    case 4:
      startX = randInt(0, gridRows - lenWord);
      startY = randInt(0, gridCols - lenWord);
      break;
    case 5:
      startX = randInt(0, gridRows - 1);
      startY = randInt(0, gridCols - lenWord);
      break;
    case 6:
      startX = randInt(lenWord - 1, gridRows - 1);
      startY = randInt(0, gridCols - lenWord);
      break;
    case 7:
      startX = randInt(lenWord - 1, gridRows - 1);
      startY = randInt(0, gridCols - 1);
      break;
  }
  return [startX, startY];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

