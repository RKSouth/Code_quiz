// Assignment Code
var generateBtn = document.querySelector("#generate");
var pass = "";
//create pw
//function is having all user prompt responses in to the generated function
function generatePassword(length, upper, lower, special, number) {
  //Creating variables to pass through random generator
  var uCase =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lCase = "abcdefghijklmnopqrstuvwxyz";
  var sChar = "!@#$%^&*()-+<>";
  var num = "0123456789";
  //setting variables to blank set if n indicated
  if (upper == 'n')  {uCase = ""};
  if (lower == 'n')  {lCase = ""};
  if (special == 'n')  {sChar = ""};
  if (number == 'n')  {num = ""};
  var chars = uCase + lCase + sChar + num;
  // var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  pass = "";
  for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
  }
}

// Write password to the #password input
function writePassword() {
  //get neccesary user inputs with variables/prompts
  //will need an if/else statement to prompt user if too many or too few characters

  //resetting hapyYet to false and using a while loop create alerts everytime a criteria isn't met

  happyYet = false;

  while (happyYet == false) {
    pwLength= parseInt(prompt("Choose a length of at least 8 characters and no more than 128 characters"));
    if (pwLength >= 8 &&  pwLength <= 128) {
      happyYet = true;
      console.log("Length selected: " + pwLength);
    } else {
      alert("Please enter a number between 8 and 128");
    }
  } 
   //resetting isAY to false and using a while loop create alerts everytime a criteria isn't met 
  isAY = false ;
  while (isAY == false) {

  happyYet = false;

  while (happyYet == false) {
    pwUpper= prompt("Would you like Upper case letters in your password (y or n)?");
    if (pwUpper == 'y'|| pwUpper =='n') {
      happyYet = true;
      console.log("Upper case letters selected: " + pwUpper);
    } else {
      alert("Please enter a y or an n");
    }
  }  

  happyYet = false;

  while (happyYet == false) {
    pwLower=prompt("Would you like Lower case letters in your password (y or n)?");
    if (pwLower == 'y'|| pwLower =='n') {
      happyYet = true;
      console.log("Lower case letters selected: " + pwLower);
    } else {
      alert("Please enter a y or an n");
    }
  }  

  happyYet = false;

  while (happyYet == false) {
    pwSpecial= prompt("Would you like special characters in your password (y or n)?");
    if (pwSpecial == 'y'|| pwSpecial =='n') {
      happyYet = true;
      console.log("Special characters selected: " + pwSpecial);
    } else {
      alert("Please enter a y or an n");
    }
  }  

  happyYet = false;

  while (happyYet == false) {
    pwNumber=prompt("Would you like numbers in your password (y or n)?");
    if (pwNumber == 'y'|| pwNumber =='n') {
      happyYet = true;
      console.log("Numbers selected: " + pwNumber );
    } else {
      alert("Please enter a y or an n");
    }
  }

  if (pwUpper == 'y' || pwLower == 'y' || pwSpecial == 'y' || pwNumber == 'y') 
  {
    isAY = true
  } else {
    alert("Please select at least one time of character with a y, unless you don't really want a password.")
  }
}
//end of while loop to see if there are y's 
  //leaving the parseInt in to remind me that prompts always return strings. 
  // pwLength= parseInt(prompt("Choose a length of at least 8 characters and no more than 128 characters"));
  // pwUpper= prompt("Would you like Upper case letters in your password (y or n)?");
  // pwLower=prompt("Would you like Lower case letters in your password (y or n)?");
  // pwSpecial= prompt("Would you like special characters in your password (y or n)?");
  // pwNumber=prompt("Would you like numbers in your password (y or n)?");

  //use generate password function with all user defined attrubites to generate password
  generatePassword(pwLength, pwUpper, pwLower, pwSpecial, pwNumber);
  //make console log more readable -made it more readable moved to real-time generation 
  // console.log("Length selected: " + pwLength);
  // console.log("Upper case letters selected: " + pwUpper);
  // console.log("Lower case letters selected: " + pwLower);
  // console.log("Special characters selected: " + pwSpecial);
  // console.log("Numbers selected: " + pwNumber );
  console.log(pass);
  document.getElementById('password').value = pass;
  // var password = generatePassword();
  // var passwordText = document.querySelector("#password");
  // passwordText.value = pass;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


