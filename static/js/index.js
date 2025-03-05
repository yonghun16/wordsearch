import "./main.js";
import "./footer.js";

async function createWord() {
  const res = await fetch("/create")
  const jsonRes = await res.json();
  console.log(jsonRes);
}

createWord();


