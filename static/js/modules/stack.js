export class Stack {
  constructor() {
    this.items = []; // 스택을 저장할 배열
  }

  // 스택에 요소 추가
  push(element) {
    this.items.push(element);
  }

  // 스택에서 요소 제거 및 반환
  pop() {
    if (this.isEmpty()) {
      throw new Error("스택이 비었습니다");
    }
    return this.items.pop();
  }

  // 스택의 최상단 요소 확인 (제거하지 않음)
  peek() {
    if (this.isEmpty()) {
      throw new Error("스택이 비었습니다");
    }
    return this.items[this.items.length - 1];
  }

  // 스택이 비어있는지 확인
  isEmpty() {
    return this.items.length === 0;
  }

  // 스택의 크기 반환
  size() {
    return this.items.length;
  }

  // 스택 내용 출력 (디버깅용)
  print() {
    console.log(this.items.join(" <- "));
  }

  // 스택 비우기
  clear() {
    this.items = [];
  }
}
