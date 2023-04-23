
var buttonColours= ["red", "blue", "green", "yellow"]
var gamePattern= [];
var userClickedPattern= [];
var started = false;
var level =0;



//console.log(randomColor);
$(document).keydown(function(){
 
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){

    var userChosenColour= $(this).attr("id")
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.round( (Math.random()*3));
    var randomColor= buttonColours[randomNumber];
    gamePattern.push(randomColor);
    
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
   
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }

}else{
    console.log("wrong");
    gameOver();
    startOver();
    
    
}

}

function playSound(name){
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();
  }

  function animatePress(currentColour){

    var activeButton = $("." +currentColour);
    
    activeButton.addClass("pressed");

    setTimeout(function(){
 
        activeButton.removeClass("pressed");
}, 100);
  }

  function gameOver(){

    $("h1").text("Game Over, Press Any Key to Restart");
    var overbutton = $("body");
    
    overbutton.addClass("game-over");

    setTimeout(function(){
 
        overbutton.removeClass("game-over");
}, 200);

    playSound('wrong');
  }

  function startOver(){
  gamePattern= [];
  started = false;
  level =0;
  }

