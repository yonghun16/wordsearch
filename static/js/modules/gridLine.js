/*--- elements ---*/
const search_grid = document.querySelector('.search-grid');

export function createGridLine(rows, columns) {
  for (let i = 0; i < rows; i++) {
      // 행(row) 생성
      const row = document.createElement("div");
      row.classList.add("grid-row", `row-${i}`);

      for (let j = 0; j < columns; j++) {
          // 열(column) 생성
          const column = document.createElement("div");
          column.classList.add("grid-column");
          column.setAttribute("data-index-row", `${i}`);
          column.setAttribute("data-index-col", `${j}`);
          row.appendChild(column); // 행에 열 추가
      }

      // 완성된 row를 부모 컨테이너에 추가
      search_grid.appendChild(row);
  }
}
