var buttonColours = ["red", "yellow", "green", "blue"];

var gamePattern = [];
var userClickedPattern = [];
var clickedColour;

var level = 0;
var highScore = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    var ranNum = Math.floor(Math.random() * 4);
    var nextColour;
    $("h1").text("Level " + level.toString());
    switch(ranNum) {
        case 0:
            nextColour = buttonColours[0];
            gamePattern.push(nextColour);
            animateButton(nextColour);
        break;

        case 1:
            nextColour = buttonColours[1];
            gamePattern.push(nextColour);
            animateButton(nextColour);
        break;

        case 2:
            nextColour = buttonColours[2];
            gamePattern.push(nextColour);
            animateButton(nextColour);
        break;

        case 3:
            nextColour = buttonColours[3];
            gamePattern.push(nextColour);
            animateButton(nextColour);
        break;
    }
};
//


function animateButton(colour) {
    var buttonColour = "#" + colour;
    playSound(colour);
    $(buttonColour).fadeOut(100).fadeIn(100);
};

$(".btn").on("click", function() {
    clickedColour = $(this).attr("id");
    userClickedPattern.push(clickedColour);
    playSound(clickedColour);
    animatePress(clickedColour);
    if(level == 0) {
        return;
    }
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if(clickedColour == gamePattern[currentLevel]) {
       console.log("pass");   
       if(userClickedPattern.length == gamePattern.length) {
           setTimeout(nextSequence, 1000);
       } 
    } else {
        
        $("h1").text("Game Over, Press Any Key to Restart")
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 100);
        if(level > highScore) {
            var highScoreText = "High-Score: " + level.toString();
            $("h2").text(highScoreText);
            highScore = level;
        }
        level = 0;
    }
}

function playSound(colour) {
    var audioColour = "sounds/" + colour + ".mp3"
    var audio = new Audio(audioColour);
    audio.play();
}

function animatePress(currColour) {
    var buttonColour = '#' + currColour;
    $(buttonColour).addClass("pressed")
    setTimeout(function() {
        $(buttonColour).removeClass("pressed")
    }, 100);
}

$(document).keypress(function() {
    if(level == 0) {
        $("h1").text("Level 0");
        nextSequence();
    }    
});
