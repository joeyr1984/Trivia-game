var wholeGame = [
    {
        question: "DOM stands for?",
        choice: ["Document orientation mode", "Document object model", "Develop object method", "Determine object Model"],
        answer: "b"
    },
    {
        question: "What is a Boolean?",
        choice: ["a cube of spices for soup broth", "a number", "a text string ", "Any data type that is true or false "],
        answer: "d"
    },
    {
        question: "Of the examples below, which is the correct way to write Camel Case?",
        choice: ["CAMEL.CASE", "Camelcase", "camelCase ", "camelCASE"],
        answer: "c"
    },
    {
        question: "Items in an Array start with 1?",
        choice: ["True", "False"],
        answer: "b"
    },
    {
        question: "Which item below is an example of a Javascript operator?",
        choice: ["*", "=", "+", "all of the above"],
        answer: "d"
    }
];
var abcd = ["a", "b", "c", "d"];
var startButton = document.getElementById("start-trivia");
var startScreen = document.getElementById("start");
var triviaScreen = document.getElementById("trivia");
var choiceArea = document.getElementById("choice");
var questionArea = document.getElementById("question");
var timeArea = document.querySelector('.timer');
var currentCorrectAnswer = 0;
var totalRightAnswer = 0;
var currentQuestion = 0;
var timerInterval;

function startGame() {
    startScreen.style.display = "none";
    triviaScreen.style.display = "block";
    timeArea.style.display = "block";
    loadQuestion();
    startTimer();
}
function checkAnswer(e) {
    currentCorrectAnswer = wholeGame[currentQuestion].answer;
    if (e.srcElement.id == currentCorrectAnswer) {
        e.srcElement.classList.add("correct");
        currentCorrectAnswer++;
    } else {
        e.srcElement.classList.add("wrong");
        removeOneMinute();
    }
    currentQuestion++;
    setTimeout(loadQuestion, 1000);
}
function loadQuestion() {
    questionArea.innerHTML = wholeGame[currentQuestion].question;
    choiceArea.innerHTML = "";

    for (let index = 0; index < wholeGame[currentQuestion].choice.length; index++) {
        const element = wholeGame[currentQuestion].choice[index];
        var response = document.createElement("li");
        response.setAttribute("id", abcd[index]);
        response.classList.add("btn", "answer");
        response.innerHTML = element;
        response.addEventListener("click", checkAnswer);
        choiceArea.appendChild(response);
    }
    currentCorrectAnswer = wholeGame[currentQuestion].answer;
}
function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        clearInterval(timerInterval);
        alert("quiz is over");
    }

    document.getElementById('timer').innerHTML = m + ":" + s;
    timerInterval = setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}
startButton.addEventListener("click", startGame);
function removeOneMinute() {
    clearInterval(timerInterval);
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = timeArray[1];
    document.getElementById('timer').innerHTML = (m - 1) + ":" + s;
    startTimer();
}