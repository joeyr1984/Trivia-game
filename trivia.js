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
var currentCorrectAnswer;
var totalRightAnswer = 0;
var currentQuestion = 0;
var timerInterval;
var endGame = document.getElementById("test-results");
var scoreBoard = [];
var finalScoreArea = document.getElementById("final-score");
var saveScoreButton = document.getElementById("save-score-button");
var playAgainButton = document.getElementById("play-again");
var scoreList = document.getElementById("high-score-history");

function readyToStart() {
    document.getElementById('timer').innerHTML = "5:00";
    totalRightAnswer = 0;
    currentQuestion = 0;
    startScreen.style.display = "block";
    triviaScreen.style.display = "none";
    timeArea.style.display = "none";
    playAgainButton.style.display ="none";
    endGame.style.display = "none";
    scoreList.style.display = "none"; 
}
function startGame() {
    startScreen.style.display = "none";
    triviaScreen.style.display = "block";
    timeArea.style.display = "block";
    playAgainButton.style.display ="none";
    endGame.style.display = "none";
    scoreList.style.display = "none";
    loadQuestion();
    startTimer();
}
function checkAnswer(e) {
    currentCorrectAnswer = wholeGame[currentQuestion].answer;
    if (e.srcElement.id == currentCorrectAnswer) {
        e.srcElement.classList.add("correct");
        totalRightAnswer++;
    } else {
        e.srcElement.classList.add("wrong");
        removeOneMinute();
    }
    currentQuestion++;
    //console.log(totalRightAnswer);
    setTimeout(loadQuestion, 500);
}
function loadQuestion() {
    if (currentQuestion < wholeGame.length) {
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
    } else {
        clearTimeout(timerInterval);
        displayScore();

    }

}
//Starts Timer adds penalty for wrong answers
function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        clearTimeout(timerInterval);
        displayScore();
    }

    document.getElementById('timer').innerHTML = m + ":" + s;
    timerInterval = setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; 
    if (sec < 0) { sec = "59" };
    return sec;
}
function removeOneMinute() {
    clearTimeout(timerInterval);
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = timeArray[1];
    document.getElementById('timer').innerHTML = (m - 1) + ":" + s;
    startTimer();
}
//scoreboard
function displayScore() {
    triviaScreen.style.display = "none";
    timeArea.style.display = "none";
    endGame.style.display = "block";
    playAgainButton.style.display ="block";

    finalScoreArea.innerHTML = totalRightAnswer * 5;
}
function saveHighScore(e) {
    e.preventDefault();
    var newEntry = {
        name: document.getElementById("user-name").value,
        score: finalScoreArea.innerHTML
    };
    if (typeof (Storage) !== "undefined") {
        if (localStorage.highScores) {
            var savedScores = JSON.parse(localStorage.highScores);
            savedScores.push(newEntry);
            localStorage.highScores = JSON.stringify(savedScores);
            //console.log(JSON.stringify(savedScores));
        } else {
            scoreBoard.push(newEntry);
            localStorage.highScores = JSON.stringify(scoreBoard);
            //console.log(scoreBoard);
        }
    }
    viewHighScores();
}
function viewHighScores() {
    endGame.style.display = "none";
    scoreList.style.display = "block";
    
    var getScoreList = document.getElementById("high-score-area");
    getScoreList.innerHTML = "";
    if (typeof (Storage) !== "undefined") {
        if (localStorage.highScores) {
            var savedScores = JSON.parse(localStorage.highScores);
            for (let index = 0; index < savedScores.length; index++) {
                const element = savedScores[index];
                var player = document.createElement("li");
                player.innerHTML = element.name + ": " + element.score;
                getScoreList.appendChild(player);
            }
        }
    }
}
//replay game - save scores
startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", readyToStart);
saveScoreButton.addEventListener("click", saveHighScore);

