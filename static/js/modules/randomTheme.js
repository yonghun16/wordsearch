// 랜덤 [테마, 단어들]를 반환하는 함수
export function randomTheme() {
  const themes = ['Car Brands', 'Animals', 'Fruits', 'New Jeans', 'Elements', 'Avengers', 'Evangelion']
  const carBrands = ["BMW", "TESLA", "KIA", "BENZ", "HYUNDAI", "FERRARI", "AUDI", "TOYOTA", "NISSAN"];
  const animals = ["CAT", "DOG", "BIRD", "HORSE", "ELEPHANT", "RABBIT", "LION", "TIGER", "ZEBRA"];
  const fruits = ["APPLE", "BANANA", "CHERRY", "GRAPE", "KIWI", "MELON", "ORANGE", "MANGO", "KIWI"];
  const newJeans = ["MINJI", "HANNI", "DANIELLE", "HAERIN", "HYEIN"];
  const elements = [ "HYDROGEN", "HELIUM", "LITHIUM", "BERYLLIUM", "BORON", "CARBON", "NITROGEN", "OXYGEN", "FLUORINE" ];
  const avengers = [ "IRONMAN",  "THOR", "BLACKWIDOW", "HAWKEYE", "HULK", "SPIDERMAN", "VISION", "NICKFURY"];
  const evangelion = [ "SHINJI", "REI", "ASUKA", "MISATO", "GENDO", "KAORU", "TOJI", "KAWORU" ];

  const choiceTheme = themes[Math.floor(Math.random() * 7)];

  let words;
  if (choiceTheme === 'Car Brands') {
    words = carBrands
  } else if (choiceTheme === 'Animals') {
    words = animals
  } else if (choiceTheme === 'Fruits') {
    words = fruits
  } else if (choiceTheme === 'New Jeans') {
    words = newJeans
  } else if (choiceTheme === 'Elements') {
    words = elements
  } else if (choiceTheme === 'Avengers') {
    words = avengers
  } else if (choiceTheme === 'Evangelion') {
    words = evangelion
  }

  return [choiceTheme, words];
}
