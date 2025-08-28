let currentWord = null;
let showGerman = true;
let lastIndex = -1;
let activeWords = []; // сюда загружаются слова в зависимости от выбора

function selectLesson() {
  const select = document.getElementById("lessonSelect");
  const choice = select.value;

  if (choice === "all") {
    // объединяем все лекции
    activeWords = Object.values(lessons).flat();
  } else {
    activeWords = lessons[choice] || [];
  }

  document.getElementById("word").innerText = "Нажми \"Новое слово\"";
  document.getElementById("translation").style.display = "none";
  lastIndex = -1;
  currentWord = null;
}

function newWord() {
  if (activeWords.length === 0) {
    document.getElementById("word").innerText = "Выбери лекцию!";
    return;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * activeWords.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  currentWord = activeWords[randomIndex];

  // «шляпа» с вариантами
  const modes = ["ru", "ru", "ru", "ru", "ru", "ru", "ru", "ru", "ru", "de"];
  // тут 9 раз ru и 1 раз de → 90% против 10%
  const choice = modes[Math.floor(Math.random() * modes.length)];

  showGerman = (choice === "de");

  document.getElementById("word").innerText = showGerman ? currentWord.de : currentWord.ru;
  document.getElementById("translation").style.display = "none";
}


function showAnswer() {
  if (currentWord) {
    document.getElementById("translation").innerText = showGerman ? currentWord.ru : currentWord.de;
    document.getElementById("translation").style.display = "block";
  }
}
