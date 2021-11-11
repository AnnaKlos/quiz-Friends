const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "W którym mieście toczy się akcja serialu Przyjaciele?",
    choice1: "Nowy Jork",
    choice2: "Miami",
    choice3: "Los Angeles",
    choice4: "Seattle",
    answer: 1,
  },
  {
    question: "Jakie zwierzę miał Ross?",
    choice1: "Królika o imieniu Lancelot",
    choice2: "Psa o imieniu Keith",
    choice3: "Małpę o imieniu Marcel",
    choice4: "Jaszczurkę o imieniu Alistair",
    answer: 3,
  },
  {
    question: "Jak ma na imię pingwin Joey'a?",
    choice1: "Snowflake",
    choice2: "Bob",
    choice3: "Waddle",
    choice4: "Hugsy",
    answer: 4,
  },
  {
    question: "Z jakiej piosenki najbardziej znana jest Phoebe?",
    choice1: "Smelly Rat",
    choice2: "Smelly Cat",
    choice3: "Smelly Dog",
    choice4: "Smelly Worm",
    answer: 2,
  },
  {
    question: "Do kogo był adresowany magazyn telewizyjny Chandlera?",
    choice1: "Chanandler Bong",
    choice2: "Chanandler Beng",
    choice3: "Chanandler Bing",
    choice4: "Bongo Chanandlera",
    answer: 1,
  },
  {
    question: "Jaką pracę ma Ross?",
    choice1: "Fotograf",
    choice2: "Archeolog",
    choice3: "Paleontolog",
    choice4: "Agent ubezpieczeniowy",
    answer: 3,
  },
];

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incremetScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incremetScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
