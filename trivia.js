var wholeGame = [
    {
        question:"DOM stands for?", 
        choice: ["Document orientation mode", "Document object model", "Develop object method", "Determine object Model"],
        answer: "b"
    },
    {
        question:"What is a Boolean?", 
        choice: ["a cube of spices for soup broth", "a number", "a text string ", "Any data type that is true or false "],
        answer: "d"
    },
    {
        question:"Of the examples below, which is the correct way to write Camel Case?", 
        choice: ["CAMEL.CASE", "Camelcase", "camelCase ", "camelCASE"],
        answer: "c"
    },
    {
        question:"Items in an Array start with 1?", 
        choice: ["True", "False"],
        answer: "b"
    },
    {
        question:"Which item below is an example of a Javascript operator", 
        choice: ["*", "=", "+", "all of the above"],
        answer: "d"
    }
];

var startButton = document.getElementById("start-trivia");
var startScreen = document.getElementById("start");
var triviaScreen = document.getElementById("trivia");
function startGame() {
        startScreen.style.display="none";
        triviaScreen.style.display="block";
    
}
startButton.addEventListener("click", startGame);
