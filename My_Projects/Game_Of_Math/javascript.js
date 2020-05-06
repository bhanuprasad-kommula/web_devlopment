//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var cr=0;
var wr=0;

			//if we click on the start/reset
			
document.getElementById("startreset").onclick = function(){
    
		if(playing != true)		//if we are not playing
		{
			
        playing = true; 
		
        score = 0;				//set score to 0
		document.getElementById("scorevalue").innerHTML = score;
     
        show("timeremaining");	//show countdown box 
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
		hide("gameOver");		//hide game over box
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown 
        startCountdown();
        
        //generate a new Q&A
        generateQA();
		
    }
	
	else{location.reload();}	//reloads the page
    
}

//start counter
function startCountdown()
{
	
		action = setInterval(
		function()
	{
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
		
        if(timeremaining == 0)	// game over
		{
            stopCountdown();
        }
	}
	, 1000);    
}


//generate question and multiple answers
function generateQA(){
    var x = 1+ Math.round(19*Math.random());
    var y = 1+ Math.round(19*Math.random());
	var op=["*","+","-","%"]
	var ele = op[Math.floor(Math.random()*op.length)];
	if(ele == '*'){
		correctAnswer = x*y ;
	}
	else if(ele == '+') {
		correctAnswer = x+y ;
	}
	else if(ele == '-') {
		correctAnswer = x-y ;
	}
    else if (ele == '%') {
		correctAnswer = x%y ;
	}
	
    document.getElementById("question").innerHTML = x +ele  + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
//Clicking on an answer box

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //check if we are playing     
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            cr++;
            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
        //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
			wr++;
			generateQA();
        }
    }
}   
}

//stop counter
function stopCountdown(){
		clearInterval(action);  
		show("gameOver");
        document.getElementById("gameOver").innerHTML = "<p>Game over! <br> crct attempts:"+ cr +" wrong attempts:"+ wr+ "</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";	
}
//hide an element

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}





