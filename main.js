let currentWord = null;
let showGerman = true;
let activeWords = []; 
let shuffledWords = [];
let currentIndex = 0;

// функция перемешивания (Фишера-Йетса)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function prepareLessonWords() {
  if (activeWords.length === 0) {
    shuffledWords = [];
    return;
  }
  shuffledWords = shuffle([...activeWords]); // копия + перемешка
  currentIndex = 0;
}

function selectLesson() {
  const select = document.getElementById("lessonSelect");
  const choice = select.value;

  if (choice === "all") {
    activeWords = Object.values(lessons).flat();
  } else {
    activeWords = lessons[choice] || [];
  }

  prepareLessonWords();
  document.getElementById("word").innerText = "Нажми \"Новое слово\"";
  document.getElementById("translation").style.display = "none";
  currentWord = null;
}

function newWord() {
  if (activeWords.length === 0) {
    document.getElementById("word").innerText = "Выбери лекцию!";
    return;
  }

  if (shuffledWords.length === 0 || currentIndex >= shuffledWords.length) {
    prepareLessonWords(); // новый круг
  }

  currentWord = shuffledWords[currentIndex];
  currentIndex++;

  // твой "мешок" для выбора направления
  const modes = ["ru","ru","ru","ru","ru","ru","ru","ru","ru","de"];
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
