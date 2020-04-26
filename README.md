# Trivia-game

For This Assignment we were tasked with creating a JavaScript Quiz

Decided to have a little fun with this one. I Created a fake company called "DEWEY" like dewey decimal system that is a online repo for tutorials , quizes , etc for baby web developers. 

## The App includes:

* symantic HTML
* bootstrap for resonsiveness 
* javascript functionality that dynamicly updates the DOM with a timer and lets the user know when they got an answer wrong and local storage to display high scores. 

## An example of how i managed to get my timer to work 

```javascript
function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        clearInterval(timerInterval);
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
    clearInterval(timerInterval);
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = timeArray[1];
    document.getElementById('timer').innerHTML = (m - 1) + ":" + s;
    startTimer();
}
```
 ## Preview of the App 
 
 ![DEWEYBRANDLOGO](./images/Triviagame.gif)

 