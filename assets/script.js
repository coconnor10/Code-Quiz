// accessing elements by id
var contentEl = document.getElementById("content");
var highscoresEl = document.getElementById("highscores");
var timerEl = document.getElementById("timer");
var startButtonEl = document.getElementById("start-button");
var questionTitleEl = document.getElementById("questionTitle");
var questionOptionsEl = document.getElementById("questionOptions");
var optionAEl = document.getElementById("optionA");
var optionBEl = document.getElementById("optionB");
var optionCEl = document.getElementById("optionC");
var optionDEl = document.getElementById("optionD");
var answerResponseEl = document.getElementById("answerResponse");
var scoreButtonEl = document.getElementById("scoreButton");
var initialsEl = document.getElementById("initialsInput");
var hsInitialsEl = document.getElementById("hs-intials");

// other variables
var secondsLeft = 75;
var score = 0;
var lastSelectedAnswer = "";
var timerInterval = "";
var questionIndex = 0;

// buttons hidden at first
hsInitialsEl.hidden = true;
questionOptionsEl.hidden = true;
scoreButtonEl.hidden = true;
initialsEl.hidden = true;

// questions variable
var questions = [
  {
    question: "1. Commonly used data types DO NOT include",
    a: "A. strings",
    b: "B. booleans",
    c: "C. alerts",
    d: "D. numbers",
    correct: "C. alerts",
  },

  {
    question:
      "2. The condition in an if / else statement is enclosed within _____.",
    a: "A. quotes",
    b: "B. curly branches",
    c: "C. parentheses",
    d: "D. square brackets",
    correct: "C. parentheses",
  },

  {
    question: "3. Arrays in Javascript can be used to store _____.",
    a: "A. numbers and strings",
    b: "B. other arrays",
    c: "C. booleans",
    d: "D. all of the above",
    correct: "D. all of the above",
  },

  {
    question:
      "4. String values must be enclosed within ____ when being assigned to variables.",
    a: "A. commas",
    b: "B. curly brackets",
    c: "C. quotes",
    d: "D. parentheses",
    correct: "C. quotes",
  },

  {
    question:
      "5. A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "A. JavaScript",
    b: "B. terminal / bash",
    c: "C. for loops",
    d: "D. console log",
    correct: "D. console log",
  },
];

// Timer and start button event listener
startButtonEl.addEventListener("click", function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  questionTitleEl.hidden = true;
  startButtonEl.hidden = true;
  questionOptionsEl.hidden = false;

  showQuiz();
});

// start quiz
function showQuiz() {
  //   var q = questions[questionIndex];

  questionTitleEl.hidden = false;
  questionTitleEl.innerHTML = questions[questionIndex].question;
  optionAEl.innerHTML = questions[questionIndex].a;
  optionBEl.innerHTML = questions[questionIndex].b;
  optionCEl.innerHTML = questions[questionIndex].c;
  optionDEl.innerHTML = questions[questionIndex].d;

  optionAEl.addEventListener("click", function (event) {
    checkAnswer(event);
  });
  optionBEl.addEventListener("click", function (event) {
    checkAnswer(event);
  });
  optionCEl.addEventListener("click", function (event) {
    checkAnswer(event);
  });
  optionDEl.addEventListener("click", function (event) {
    checkAnswer(event);
  });
}

// check if answer is correct
function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.innerHTML;
  var correctAnswer = null;

  if (questions[questionIndex].correct === answer) {
    correctAnswer = answer;
  }

  if (answer === correctAnswer) {
    answerResponseEl.textContent = "Correct!";
  } else {
    answerResponseEl.textContent = "Wrong!";
    secondsLeft -= 10;
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
  }

  if (questions.length === questionIndex + 1) {
    showFinalScore();
    return;
  }

  questionIndex++;
  showQuiz();
}

// final score
function showFinalScore() {
  hsInitialsEl.hidden = false;
  questionOptionsEl.hidden = true;
  answerResponseEl.hidden = true;
  scoreButtonEl.hidden = false;
  initialsEl.hidden = false;
  questionTitleEl.textContent = "Your final Score is " + secondsLeft;
}

// high scores
var highScoreArray = [];

function showHighScores() {
  hsInitialsEl.hidden = false;
  questionOptionsEl.hidden = true;
  answerResponseEl.hidden = true;
  scoreButtonEl.hidden = true;
  initialsEl.hidden = true;

  var getInitials = document.getElementById("initialsInput").value;

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];

  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray);
  localStorage.setItem("highScore", JSON.stringify(highScoreArray));

  var highScores = getInitials + ": " + secondsLeft;

  questionTitleEl.textContent = highScores;
}

// event listener on score button to show high scores
scoreButtonEl.addEventListener("click", function () {
  showHighScores();
});

// event listener on "View Highscores" to show high scores
highscoresEl.addEventListener("click", function () {
  showHighScores();
});
