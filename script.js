const questions = [
    { question: "Who created Apple?", answers: ["Bill Gates", "Steve Jobs", "Elon Musk", "Mark Zuckerberg"], correct: 1 },
    { question: "What is used to style a webpage?", answers: ["HTML", "CSS", "JavaScript", "SQL"], correct: 1 },
    { question: "What does the logical operator 'or' mean?", answers: ["and", "either", "not", "equals"], correct: 1 },
    { question: "The main character of the anime Naruto?", answers: ["Naruto", "Sasuke", "Itachi", "Kakashi"], correct: 0 },
    { question: "The most titled footballer in history?", answers: ["Pelé", "Messi", "Dani Alves", "Cristiano Ronaldo"], correct: 2 },
    { question: "The type of guitar with 4 thick heavy strings?", answers: ["Acoustic", "Electric", "Bass", "Classical"], correct: 2 },
    { question: "Which country won the last Olympic volleyball championship?", answers: ["Brazil", "USA", "Italy", "France"], correct: 3 },
    { question: "The footballer with the most goals in football history?", answers: ["Pelé", "Cristiano Ronaldo", "Messi", "Romário"], correct: 1 },
    { question: "What is an array in JavaScript?", answers: ["A single value", "A collection of values", "A function", "An object"], correct: 1 },
    { question: "What is a server?", answers: ["A storage device", "A network hardware", "A system providing services", "A computer"], correct: 2 },
    { question: "The lead singer of Nirvana?", answers: ["Kurt Cobain", "Dave Grohl", "Krist Novoselic", "Eddie Vedder"], correct: 0 },
    { question: "The main character of the anime Dragon Ball?", answers: ["Goku", "Vegeta", "Gohan", "Piccolo"], correct: 0 }
];

let shuffledQuestions;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("timer");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => checkAnswer(index));
        answersEl.appendChild(button);
    });

    startTimer();
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        score++;
        scoreEl.textContent = `Score: ${score}`;
    } else {
        feedbackEl.textContent = "Incorrect!";
        feedbackEl.style.color = "red";
    }

    currentQuestionIndex++;
    setTimeout(() => {
        feedbackEl.textContent = "";
        showQuestion();
    }, 1000);
}

function startTimer() {
    timeLeft = 30;
    timerEl.textContent = `Time left: ${timeLeft} seconds`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            restartQuiz("Time's up!");
        }
    }, 1000);
}

function endQuiz() {
    questionEl.textContent = `Quiz completed! Your score: ${score}`;
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    restartBtn.style.display = "block";
    clearInterval(timer);
}

function restartQuiz(message = "") {
    alert(message);
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    restartBtn.style.display = "none";
    shuffledQuestions = [...questions];
    shuffleArray(shuffledQuestions);
    showQuestion();
}

restartBtn.addEventListener("click", () => restartQuiz());
shuffledQuestions = [...questions];
shuffleArray(shuffledQuestions);
showQuestion();
