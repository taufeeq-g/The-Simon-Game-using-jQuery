// alert("hello beach") //working, js and jquery is linked properly.

// Creating a colour array
var colourArray = ["red", "blue", "green", "yellow"];

// Create a empty array to store game sequence
var gamePattern = [];

// Create a empty array to store user sequence
var userPattern = [];

// tracking the level
var level = 0;

// checking if game has started
var gameRunning = false;

// Detecting the key press to start the game
$(".start").click(function () {
    if (!gameRunning) {
        $("h1").text("Level " + level);
        nextSequence();
        // Tracking the Level
        gameRunning = true;
    }
});


// storing the user colour pattern
$(".btn").click(function () {
    var userColor = this.id;
    userPattern.push(userColor);

    // Play audio of clicked tile
    var audio = new Audio("sounds/" + userColor + ".mp3");
    audio.play();

    // play press animation on clicked tile
    $("#" + userColor).addClass("pressed");

    setTimeout(function () {
        $("#" + userColor).removeClass("pressed");
    }, 100);

    checkAnswer(userPattern.length - 1);

    console.log(userPattern);
});

// Function to check answer
function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if  (userPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");

        // Play wrong audio
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        
        // Wrong answer flash animation
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press start to play again !");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

// Function to generate a new random color and sequence it (0 - 3)
function nextSequence() {
    // game started with fresh user pattern
    userPattern = [];
    // game has started on key press, so increment level
    level++;

    // update the h1 to current level
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomColor = colourArray[randomNumber];
    // console.log(randomColor);  // working, prints random number

    // add random color to game seq array
    gamePattern.push(randomColor);

    // using "#" because we are targeting an id
    // flash animation
    $("#" + randomColor)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    // play audio
    var audio = new Audio("sounds/" + randomColor + ".mp3");
    audio.play();

    console.log(gamePattern);
}

function startOver() {
    level = 0;
    gameRunning = false;
    gamePattern = [];
}
