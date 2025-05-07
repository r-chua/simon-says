var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

$(document).on('keypress', function () {
    if (!gameStart) {
        startGame();
    }
});

function startGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = true;
    $("#level-title").text(`Level ${level}`);
    nextSequence();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playGamePattern();
}

function playGamePattern() {
    let delay = 0;
    gamePattern.forEach((color, index) => {
        setTimeout(() => {
            $("#" + color).animate({ opacity: '0.1' }, 150).animate({ opacity: '1' }, 150);
            playSound(color);
        }, delay);
        delay += 600; // Delay between each color
    });
}

function playSound(name) {
    var audioFeedback = new Audio(`./sounds/${name}.mp3`);
    audioFeedback.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () {
    if (!gameStart) return;

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        $(".btn").off("click"); // Disable button clicks
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameStart = false;
}
