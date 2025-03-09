const mediaQuery = window.matchMedia("(max-width: 768px)");

//게임 시작버튼 
export const newGame_desktop = document.querySelector(".new");
export const newGame_mobile = document.querySelector(".new-sub");

// 메뉴버튼 클릭
const btnMenu = document.querySelector(".btn-menu");
btnMenu.addEventListener("click", () => {
  const mobileSubmenu = document.querySelector(".mobile-submenu-list");
  mobileSubmenu.classList.toggle("active");
  btnMenu.style.display = "none";
});

// 서브메뉴 X버튼 클릭
const mobileSubmenu = document.querySelector(".mobile-submenu-list");
const btnSubmenuClose = document.querySelector(".btn-submenu-close");
btnSubmenuClose.addEventListener("click", () => {
  mobileSubmenu.classList.remove("active");
  btnMenu.style.display = "block";
});


// 미디어 쿼리 함수
function handleMediaChange(event) {
    if (event.matches) {
        //console.log("화면이 768px 이하입니다.");
        btnMenu.style.display = "block";
    } else {
        //console.log("화면이 768px 초과입니다.");
        btnMenu.style.display = "none";
        mobileSubmenu.classList.remove("active");
    }
}

// 초기 상태 체크
handleMediaChange(mediaQuery);

// 미디어 쿼리 변화 감지 및 리스너 등록
mediaQuery.addEventListener("change", handleMediaChange);
