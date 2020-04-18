//Array of colours
const buttonColours = ["red", "blue", "green", "yellow"];
//Defines game pattern
var gamePattern = [];
//Defines userClickedPattern
var userClickedPattern = [];
//Selecting all elements with the class .btn
var btn = document.getElementsByClassName("btn");

// Select button colour
var btnColour = document.getElementsByClassName("btn");

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;



// Sequence code: This generates random numbers between 0 and 3

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    // this line returns the color in the buttonColour array corresponding to the randon number
    var randomChosenColour = buttonColours[randomNumber];

    //This pushes the randomly chosen color into the gamePattern array
    gamePattern.push(randomChosenColour);

    var btnSelect = document.getElementById(randomChosenColour);
    btnSelect.classList.add("pressed");

    setTimeout(() => {
        btnSelect.classList.remove("pressed");
    }, 100);



    playSound(randomChosenColour);

    level++
    document.querySelector("h1").innerHTML = "Level " + level;



}

function playSound(name) {

    if (name === "green") {
        var green = new Audio(".../sounds/green.mp3")
        green.play();
    }
    if (name === "red") {
        var red = new Audio(".../sounds/red.mp3")
        red.play();
    }
    if (name === "yellow") {
        var yellow = new Audio(".../sounds/yellow.mp3")
        yellow.play();
    }
    if (name === "blue") {
        var blue = new Audio(".../sounds/blue.mp3")
        blue.play();
    }
}

// Button flash animation
for (i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function animatePress() {
        this.classList.add("pressed");

        setTimeout(() => {
            this.classList.remove("pressed");
        }, 100);

        playSound(this.classList[1]);

    })
}




for (i = 0; i < btn.length; i++) {
    btnColour[i].addEventListener("click", function() {

        var userChosenColour = this.classList[1];


        userClickedPattern.push(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);




    })
}

document.querySelector("a").addEventListener("click", function() {

    document.querySelector("a").innerHTML = "start"
    document.querySelector("h1").innerHTML = "Level " + level;

    if (!started) {

        setTimeout(() => {
            nextSequence();
            userClickedPattern = [];
        }, 1000);
        started = true;


    }



});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {

        var wrong = new Audio(".../sounds/wrong.mp3")
        wrong.play();

        document.querySelector("a").innerHTML = "reset"
        document.getElementsByTagName("h1")[0].innerHTML = "Game Over, Click the reset button to Restart";

        document.querySelector("body").classList.add("game-over");

        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();

    }


}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}