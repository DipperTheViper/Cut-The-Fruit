var playing = false;
var score = 0;
var trielsLeft;
var step;
var action;


$(function(){ //press start btn
    $("#startreset").click(function(){
        if(playing == true){ //we are playing!
            location.reload(); //reload
        }else{
            playing = true; // we are not playing so we want to..
            score = 0; //set score to 0
            $("#scorevalue").html(score);
            
            $("#trialsLeft").show(); //show life
            trielsLeft = 3;
            addHeart();
            $("#gameOver").hide();
            
            $("#startreset").html("Reset Game");

            startAction(); //start droping
        }
    }); 

    $("#fruit1").mouseover(function(){
        score ++;
        $("#scorevalue").html(score);
        document.getElementById("cutSound").play();
        // stopAction();
        // or
        clearInterval(action);
        $("#fruit1").hide("explode",300);
        
        setTimeout(startAction , 500);

        
    });


//function
    function addHeart(){
        $("#trialsLeft").empty();
        for(i = 0; i<trielsLeft;i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    };

    function startAction(){
        // $("#fruitsContainer").append('<img src="images/fruit.png" class="fruit">');
        $("#fruit1").show();
        setFruit(); //put a fruit in img
        $("#fruit1").css({'left' : Math.round(550* Math.random()) , 'top' : -50});

        step = 1 + Math.round(5 * Math.random());

        action = setInterval( function(){
            $("#fruit1").css('top' , $("#fruit1").position().top + step);
            if(($("#fruit1").position().top) > ($("#fruitsContainer").height())){
                if(trielsLeft > 1){
                    $("#fruit1").show();
                    setFruit(); //put a fruit in img
                    $("#fruit1").css({'left' : Math.round(550* Math.random()) , 'top' : -50});
                    step = 1 + Math.round(5 * Math.random());
                    trielsLeft--;
                    addHeart();

                }else{ //game over
                    playing = false;
                    $("#startreset").html("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over!</p><p>your score is " + score + " </p>");
                    $("#trialsLeft").hide();
                    stopAction();

                }
            }
        } , 10)
    };

    function setFruit(){
        $("#fruit1").attr('src' , 'images/fruit.png')
        
    }

    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});