// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score


// needs ~4 buttons per page (or buttons that overwrite themselves)
// needs a timer
//needs a sum = sum array.length or similar (code drill 4, module 3) to store points
//needs a second array to store high score
//needs a game start/ game over screen
//needs away to determine correct answers (conditional button pushes)
//needs to have the timer be edited in the quiz (incorrect answers) likely in the if statement
// needs to have event delegation as part of the buttons listen to the arent and from there figuring it out.


// Timer Begin!!
var displayStart = document.getElementById("form","question");
var startQuiz = document.getElementById("start");

displayStart.style.display ="none";

function start(){
    displayStart.style.display="block";
    startQuiz.style.display="none";
    startTimer();
}


startQuiz.addEventListener("click", start);


//Timer code

var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
// var inputs = document.querySelector(".inputs")
var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Working";
var interval;
playButton.style.display="none";
workMinutesInput.style.display="none";
restMinutesInput.style.display="none";
/* One thing to distinguish here is that not all functions are created equal.
   Some functions just change settings, some functions just call other functions,
   some functions just format strings or numbers, etc. */
// This launches the app by calling setTime() and renderTime()
getTimePreferences();
// These two functions are just for making sure the numbers look nice for the html elements
function getFormattedMinutes() {
  //
  var secondsLeft = totalSeconds - secondsElapsed;
  var minutesLeft = Math.floor(secondsLeft / 60);
  var formattedMinutes;
  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }
  return formattedMinutes;
}
function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  var formattedSeconds;
  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }
  return formattedSeconds;
}
/* This function retrieves the values from the html input elements; Sort of
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
function setTime() {
  var minutes;
  if (status === "Working") {
    minutes = workMinutesInput.value.trim();
  } else {
    minutes = restMinutesInput.value.trim();
  }
  clearInterval(interval);
  totalSeconds = minutes * 60;
}
// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();
 // ..and then checks to see if the time has run out
  if (secondsElapsed >= totalSeconds) {
   
    stopTimer();
  }
}
// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  setTime();
  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;
        // So renderTime() is called here once every second.
        renderTime();
      }, 1000);
  } else {
    alert("Minutes of work/rest must be greater than 0.")
  }
}
/* This function stops the setInterval() set in startTimer but does not
   reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
function pauseTimer() {
  clearInterval(interval);
  displayStart.style.display="none";
  startQuiz.style.display="inline";
  renderTime();
}
/* This function stops the interval and also resets secondsElapsed
   and calls "setTime()" which effectively reset the timer
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}
/* Our timer is fancy enough to handle 2 different settings at once this toggle
   function basically just specifies which of our 2 timer settings to use. */
function toggleStatus(event) {
  var checked = event.target.checked;
  if (checked) {
    status = "Working";
  } else {
    status = "Resting";
  }
  statusSpan.textContent = status;
  secondsElapsed = 0;
  setTime();
  renderTime();
}
function getTimePreferences() {
  /* Here we check to see if any preferences have
     been set in the local storage via "setTimePreferences()" */
  var preferences = JSON.parse(localStorage.getItem("preferences"));
  // If preferences have been set then use any value available
  if (preferences) {
    if (preferences.workMinutes) {
      workMinutesInput.value = preferences.workMinutes;
    }
  }
  // This is where the app is really kicked-off, setTime and renderTime are the two main routines.
  setTime();
  renderTime();
}
function setTimePreferences() {
  localStorage.setItem(
    "preferences",
    JSON.stringify({
      workMinutes: workMinutesInput.value.trim(),
    })
  );
}
playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
// statusToggle.addEventListener("change", toggleStatus);
// inputs.addEventListener("change", setTimePreferences);
// inputs.addEventListener("keyup", setTimePreferences);


var Questions = { "One":"Who, due to her work in building the Analytical Enginge and born in 1815 is considered to be the 1st programer?", 
                 "Two":"What famous whistle-blower who shared information on the collection of data related to the Patriot Act currently resides in Russia?",
                 "Three":"What was the first functioning programming languages designed to communicate instructions to a computer and written in the early 1950s by  John Backus? A. Short Code wrong: auto code, machine code, assembly code",
                 "Four": "When was the first computer game invented? A. 1961?",
                 Five: "Why did Guido van Rossum name his language 'Python? A. He was reading 'Monty Pythons Flying Circis'",
                 Six: "What coding language took the US to the moon? A. assembly language and in an interpretive language, in reverse Polish",
                 Seven: "What language became popular due to its early integration with Netscape Navigator",
                 Eight: "What general-purpose language, invented by Bjarne Stroutstrup in 1985 and was designed with a bias toward system programming and embedded, resource-constrained software and large systems, with performance, efficiency, and flexibility of use as its design highlights. A. C++ ",
                 Nine: "What type of software  has  source code is released under a license in which the copyright holder grants users the rights to use, study, change, and distribute the software to anyone and for any purpose. ",
                 Ten: "What machine was the first operating system, GMOS created for? A. IBM's 701"
                };

 var questionText = document.querySelector("h4");
    // questionText.value = Questions["One"];
// document.getElementById("question").value = Questions[One];
// }
questionText.textContent = Questions.One;
// for(i=0; i <Questions.length; i++){
// if(button pushed=== Answers[0]){
//     move to next question
//switchQuestions();
     


// } else {
//     subtract time then move to next question
// switchQuestions();
// }
// }
function switchQuestions () {
    var i =0;
    Questions[i]; i++
};

//Answers
var Answers = { One: ["Ada Lovelace", "Grace Hopper", "Edith Clarke", "Sister Mary Kenneth Keller"]}