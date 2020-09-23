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


//Timer code

var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
// var stopButton = document.querySelector("#stop");
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
  totalSeconds = 75;
}
// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();
 // ..and then checks to see if the time has run out
  if (secondsElapsed >= 75) {
   
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
//   if (checked) {
//     status = "Working";
//   } else {
//     status = "Resting";
//   }
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
// stopButton.addEventListener("click", stopTimer);
// statusToggle.addEventListener("change", toggleStatus);
// inputs.addEventListener("change", setTimePreferences);
// inputs.addEventListener("keyup", setTimePreferences);

//end of timer


//begin of questions objects

// { "One":"Who, due to her work in building the Analytical Enginge in the 1800's is considered to be the 1st programer?", 
//                  "Two":"What famous whistle-blower who shared information on the collection of data in the U.S. related to the Patriot Act currently resides in Russia?",
//                  "Three":"What was the first functioning programming languages designed to communicate instructions to a computer and written in the early 1950s by  John Backus? A. Short Code wrong: auto code, machine code, assembly code",
//                  "Four": "When was the first computer game invented? A. 1961?",
//                  Five: "Why did Guido van Rossum name his language 'Python? A. He was reading 'Monty Pythons Flying Circis'",
//                  Six: "What coding language took the US to the moon? A. assembly language and in an interpretive language, in reverse Polish",
//                  Seven: "What language became popular due to its early integration with Netscape Navigator",
//                  Eight: "What general-purpose language, invented by Bjarne Stroutstrup in 1985 and was designed with a bias toward system programming and embedded, resource-constrained software and large systems, with performance, efficiency, and flexibility of use as its design highlights. A. C++ ",
//                  Nine: "What type of software  has  source code is released under a license in which the copyright holder grants users the rights to use, study, change, and distribute the software to anyone and for any purpose. ",
//                  Ten: "What machine was the first operating system, GMOS created for? A. IBM's 701"
//                 };

var Questions = [
    //first question
    {
        text:"Who, due to her work in building the Analytical Enginge in the 1800's is considered to be the 1st programer?", 
        Answers:[
                    {text:"Ada Lovelace",truthiness:true}, //Questions[0].Answers[0].text;
                    {text:"Grace Hopper",truthiness:false}, 
                    {text:"Edith Clarke",truthiness:false}, 
                    {text:"Sister Mary Kenneth Keller",truthiness:false}
                ]
   },
   //second question
   {
    text:"What famous whistle-blower who shared information on the collection of data in the U.S. related to the Patriot Act currently resides in Russia?", 
    Answers:[
                {text:"Aaron Swartz",truthiness:false}, //Questions[1].Answers[0].text;
                {text:"Julian Assange",truthiness:false}, 
                {text:"Edward Snowden",truthiness:true}, 
                {text:"Angela Merkal",truthiness:false}
            ]
},
//third question
{
    text:"What was the first functioning programming languages designed to communicate instructions to a computer and written in the early 1950s by John Backus?", 
    Answers:[
                {text:"Auto Code",truthiness:false}, //Questions[2].Answers[0].text;  A. Short Code wrong: auto code, machine code, assembly code
                {text:"Short Code",truthiness:true}, 
                {text:"Machine Code",truthiness:false}, 
                {text:"Assembly Code",truthiness:false}
            ]
},
//fourth question
{
    text:"When was the first computer game invented?", 
    Answers:[
                {text:"1955",truthiness:false}, //Questions[3].Answers[0].text;
                {text:"1975",truthiness:false}, 
                {text:"1924",truthiness:false}, 
                {text:"1961",truthiness:true}
            ]
},
 //fifth question
 {
    text:"Why did Guido van Rossum name his language 'Python?", 
    Answers:[
                {text:"He was reading 'Monty Pythons Flying Circis'",truthiness:true}, //Questions[4].Answers[0].text;
                {text:"He was a snake enthusiast and that was his favorite kind of snake",truthiness:false}, 
                {text:"He thought his language sucked and named it afte the villian in Karate Kid",truthiness:false}, 
                {text:"It was a family name and he wanted to name it after his dead uncle",truthiness:false}
            ]
},
//sixth question
{
    text:"What coding language took the US to the moon?", 
    Answers:[
                {text:"assembly language and in an interpretive language, in reverse Polish",truthiness:true}, //Questions[5].Answers[0].text;
                {text:"short code, in reverse ebonics",truthiness:false}, 
                {text:"COBAL",truthiness:false}, 
                {text:"Binary Notation",truthiness:false}
            ]
},
//seventh question
{
    text:"What language became popular due to its early integration with Netscape Navigator?", 
    Answers:[
                {text:"C++",truthiness:false}, //Questions[6].Answers[0].text;
                {text:"Https",truthiness:false}, 
                {text:"Java",truthiness:false}, 
                {text:"Javascript",truthiness:true}
            ]
},
//eigth question
{
    text:"What type of software  has  source code is released under a license in which the copyright holder grants users the rights to use, study, change, and distribute the software to anyone and for any purpose?", 
    Answers:[
                {text:"MS DOS",truthiness:true}, //Questions[7].Answers[0].text;
                {text:"Release source",truthiness:false}, 
                {text:"Opensource",truthiness:true}, 
                {text:"Open licence",truthiness:false}
            ]
},
//ninth question
{
    text:"What general-purpose language, invented by Bjarne Stroutstrup in 1985 and was designed with a bias toward system programming and embedded, resource-constrained software and large systems, with performance, efficiency, and flexibility of use as its design highlights?", 
    Answers:[
                {text:"C++",truthiness:true}, //Questions[8].Answers[0].text;
                {text:"COBAL",truthiness:false}, 
                {text:"Python",truthiness:false}, 
                {text:"C#",truthiness:false}
            ]
},
//tenth question
{
    text:"What machine was the first operating system, GMOS created for? A. IBM's 701", 
    Answers:[
                {text:"GM's Analytical Mathematic Chromatic x2",truthiness:false}, //Questions[10].Answers[0].text;
                {text:"IBM's 702",truthiness:false}, 
                {text:"IMB's 701",truthiness:true}, 
                {text:"Macy's Exothermic Monster",truthiness:false}
            ]
} 
]



//was told not use a for loop use a function

// for(i=0; i < Questions.length; i++){
// if(button pushed=== Answers[0]){
//     move to next question
//switchQuestions();
     


// } else {
//     subtract time then move to next question
// switchQuestions();
// }
// // }
// function switchQuestions () {
//     var i =0;
//     Questions[i]; i++
// };

//RENAME VARIABLES TO SOMETHING EASIER
var answerButton = [document.querySelector("#q"),
                    document.querySelector("#r"),
                    document.querySelector("#s"),
                    document.querySelector("#t")
];

//variables to keep track of which question we're on and which answer the user selects
var activeQuest = 0;
var activeAnswer = 0;
//when button is pushed
function selectAnswer01() { 
    activeAnswer = 0;
    checkTruth();
}

function selectAnswer02() { 
    activeAnswer = 1;
    checkTruth();
}

function selectAnswer03() { 
    activeAnswer = 2;
    checkTruth();
}

function selectAnswer04() { 
    activeAnswer = 3;
    checkTruth();
}
// getting my finished card for checkTruth function
var endQuiz = document.getElementById("end");
//check trenduth and load next question
score = 0;

function checkTruth(){
    console.log("answer button working");

    if(Questions[activeQuest].Answers[activeAnswer].truthiness==true){
     score= score + 1;
    }else {
        secondsElapsed= secondsElapsed+5;
        console.log(secondsElapsed);
    }
    console.log(Questions[activeQuest].Answers[activeAnswer].truthiness); //to see if answer is true or false
    //Questions[activeQuest]  to see what question we are on .Answers[activeAnswer] to see what answer 
    // having validated the user answer choice we now move to the next activeQuest
    activeQuest += 1;
    //to break chain after last question
    if (activeQuest == Questions.length || secondsElapsed >= 75) {  
        displayStart.style.display="none";
        endQuiz.style.display="inline"; 
        hideTimer.style.display ="none";// stopTimer();
        console.log(75-secondsElapsed);
        countScore();
    }; 
    var finalScore = score + (75-secondsElapsed);
        console.log(finalScore);
        

    PreguntesLoops();// loads the next question
}

score = 0;

var againQuiz = document.getElementById("end")
function countScore(){
    var initials =prompt("Enter you initials to get high score!");
    if (initials != null) {document.getElementById("h6".innerHTML = "Your Score is: " + (score +(75-secondsElapsed)))} else{
        HighScores.style.display="inline";
    }
};

answerButton[0].addEventListener("click", selectAnswer01);
answerButton[1].addEventListener("click", selectAnswer02);
answerButton[2].addEventListener("click", selectAnswer03);
answerButton[3].addEventListener("click", selectAnswer04);




//edit the answer text
var AnswerText = [ document.querySelector("#q"),// AnswerText[0]
                    document.querySelector("#r"),
                    document.querySelector("#s"),
                    document.querySelector("#t")
                ];

                //edits the questions
var questionText = document.querySelector("h4");
//removes the timer
var hideTimer =document.getElementById("hand");

//edits the cards
var displayStart = document.getElementById("form","question"); //form for questions in html
var startQuiz = document.getElementById("start"); //the start card
var againQuiz = document.getElementById("end")
//hide the things!
hideTimer.style.display ="none";
displayStart.style.display ="none";
endQuiz.style.display="none"
//main start button
//move later?
function start(){
    displayStart.style.display="block";
    startQuiz.style.display="none";
    hideTimer.style.display ="inline";
    startTimer();
    PreguntesLoops();
    score =0;
    endQuiz.style.display="none";

    
}

againQuiz.addEventListener("click", start); 
startQuiz.addEventListener("click", start);
//questions loop
function PreguntesLoops(){
    if(activeQuest == Questions.length){activeQuest=0} //commented out for now - will be used to handle resets
    questionText.textContent = Questions[activeQuest].text;
    //answers loop display
    for(i=0; i < Questions[activeQuest].Answers.length; i++){             
        AnswerText[i].textContent = Questions[activeQuest].Answers[i].text;
    }
}



// 