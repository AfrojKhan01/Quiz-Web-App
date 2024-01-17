const questions = [
  {
    question: "Which one of the following is a prime number ?",
    options: ["161", "221", "373", "437"],
    correctAnswer: 3, 
  },
  {
    question: "If 2994 ÷ 14.5 = 172, then 29.94 ÷ 1.45 = ?",
    options: ["0.172", "1.72", "17.2", "172"],
    correctAnswer: 2,
  },
  {
    question: "Sachin is younger than Rahul by 7 years. If their ages are in the respective ratio of 7 : 9, how old is Sachin?",
    options: ["16 years", "18 years", "28 years", "24.5 years"],
    correctAnswer: 3,
  },
  {
    question: "If m and n are whole numbers such that mn = 121, the value of (m - 1)n + 1 is:",
    options: ["1", "10", "121", "1000"],
    correctAnswer: 3,
  },
  {
    question: "X can do a piece of work in 40 days. He works at it for 8 days and then Y finished it in 16 days. How long will they together take to complete the work?",
    options: ["40/3 days", "15 days", "20 days", "26 days"],
    correctAnswer: 3,
  },
  {
    question: "Gauri went to the stationers and bought things worth Rs. 25, out of which 30 paise went on sales tax on taxable purchases. If the tax rate was 6%, then what was the cost of the tax free items?",
    options: ["Rs. 15", "Rs. 15.70", "Rs. 19.70", "Rs. 20"],
    correctAnswer: 2,
  },
  {
    question: "A train speeds past a pole in 15 seconds and a platform 100 m long in 25 seconds. Its length is:",
    options: ["50 m", "150 m", "200 m", "Data inadequate"],
    correctAnswer: 3,
  },
  {
    question: "A man can row three-quarters of a kilometre against the stream in 11(1/4) minutes and down the stream in 7(1/2) minutes. The speed (in km/hr) of the man in still water is:",
    options: ["2", "3", "4", "5"],
    correctAnswer: 3,
  },
  {
    question: "The length of a rectangle is halved, while its breadth is tripled. What is the percentage change in area?",
    options: ["25% increase", "50% increase", "50% decrease", "75% decrease"],
    correctAnswer: 1,
  },
  {
    question: "What is the freezing point of water in Fahrenheit?",
    options: ["0°F", "32°F", "100°F", "212°F"],
    correctAnswer: 1,
  },
];

let currentQuestion = 0;
let score = 0;

const questionCounter = document.getElementById("question-counter");
const scoreCounter = document.getElementById("score");
const questionText = document.getElementById("question-text");
const options = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-button");
const scoreboard = document.querySelector(".scoreboard");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const Finishbutton = document.getElementById("Finish-button");

const startQuizButton = document.getElementById("start-quiz-button");
const quizContainer = document.querySelector(".MainContainer");

startQuizButton.addEventListener("click", () => {
  startQuizButton.parentElement.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
  startTimer();
});


let timeInSeconds = 300;
let intervalId;

document.getElementById('timer').innerText = formatTime(timeInSeconds);

function startTimer() {
  clearInterval(intervalId);

  intervalId = setInterval(function() {
    timeInSeconds--;
    document.getElementById('timer').innerText = formatTime(timeInSeconds);

    if (timeInSeconds <= 0) {
      clearInterval(intervalId); 
      alert("Time's up!"); 
        scoreboard.style.display = "block";
        finalScore.textContent = score;
        optionClicked = false; 
        nextButton.style.display = "none";
        Finishbutton.style.display = "none";
        quizContainer.style.display = "none";
    } else if(Finishbutton === true){
      scoreboard.style.display = "none";
      optionClicked = true; 
      nextButton.style.display = "block";
      Finishbutton.style.display = "block";
      quizContainer.style.display = "block";
    } 
  }, 1000);
}

function restartTimer() {
  timeInSeconds = 300;

  startTimer();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


nextButton.disabled = true;

let optionClicked = false;

function loadQuestion() {
 if (currentQuestion < questions.length) {
    questionCounter.textContent = `Question ${currentQuestion + 1}/${
      questions.length
    }`;
    questionText.textContent = questions[currentQuestion].question;

    options.forEach((option, index) => {
      option.textContent = questions[currentQuestion].options[index];
      option.style.backgroundColor = "white"; 
      option.style.pointerEvents = "auto"; 
      option.onclick = function () {
        handleOptionClick(index);
      };
    });
    nextButton.disabled = !optionClicked;
  }
  else {
    showScoreboard();
    quizContainer.style.display = "none";
  }
}

function handleOptionClick(selectedOptionIndex) {
  const correctAnswerIndex = questions[currentQuestion].correctAnswer;


  options.forEach((option) => {
    option.style.pointerEvents = "none";
    option.onclick = null;
  });

  if (selectedOptionIndex === correctAnswerIndex) {
    options[selectedOptionIndex].style.backgroundColor = "#78ff78";
    score++;
    scoreCounter.textContent = `Score: ${score}`;
  } else {
    options[selectedOptionIndex].style.backgroundColor = "#ff5f5f";
    options[correctAnswerIndex].style.backgroundColor = "#78ff78";
  }

  optionClicked = true; 
  nextButton.disabled = false;
  Finishbutton.disabled = false;
}

function showScoreboard() {
  scoreboard.style.display = "block";
  finalScore.textContent = score;
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  optionClicked = false; 
  nextButton.disabled = true;
  loadQuestion();
  if(currentQuestion === (questions.length -1)){
    nextButton.style.display = "none";
  }  
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreboard.style.display = "none";
  loadQuestion();
  scoreCounter.textContent = "Score: 0";
  optionClicked = false; 
  quizContainer.style.display = "block";
  nextButton.style.display = "block";
  Finishbutton.style.display = "block";
  restartTimer();
});

loadQuestion();


Finishbutton.addEventListener("click", () => {
  if(currentQuestion === (questions.length - 1)){
      scoreboard.style.display = "block";
      finalScore.textContent = score;
      optionClicked = false; 
      quizContainer.style.display = "none";
  }
  else if (confirm("Do You Really Want To Finish The Quiz")) {
      scoreboard.style.display = "block";
      finalScore.textContent = score;
      optionClicked = false; 
      quizContainer.style.display = "none";
  }
  else {
      scoreboard.style.display = "none";
      optionClicked = true; 
      nextButton.style.display = "block";
      Finishbutton.style.display = "block";
      quizContainer.style.display = "block";
  }
})