const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const qImg2 = document.getElementById("qImg2");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const form = document.getElementById("form");

const correct = document.getElementById("correct");


let questions = [
    {
        question : "Is this transcription correct?",
        imgSrc : "V_1.png",
        imgSrc2 : "R_1.png",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    },{
        question : "Is this transcription correct?",
        imgSrc : "V_2.png",
        imgSrc2 : "R_2.png",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    },{
        question : "Is this transcription correct?",
        imgSrc : "V_3.png",
        imgSrc2 : "R_3.png",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    },
    {
        question : "Is this transcription correct?",
        imgSrc : "V_5.png",
        imgSrc2 : "R_5_false.png",
        choiceA : "True",
        choiceB : "False",
        correct : "B"
    },
    {
        question : "Is this transcription correct?",
        imgSrc : "V_10.png",
        imgSrc2 : "R_10_false.png",
        choiceA : "True",
        choiceB : "False",
        correct : "B"
    },
    {
        question : "Is this transcription correct?",
        imgSrc : "V_9.png",
        imgSrc2 : "R_9.png",
        choiceA : "True",
        choiceB : "False",
        correct : "A"
    }
];


var randomValue;


function renderQuestion(){

    randomValue = Math.floor(Math.random() * 4);
    var q = questions[randomValue];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    qImg2.innerHTML = "<img src="+ q.imgSrc2 +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    //correct.innerHTML = q.correct;
}


function checkAnswer(answer){
    if(answer === questions[randomValue].correct && answer === "A")
    {
        // answer is correct
        //alert("Correct");
        function toggleButton() {
            document.getElementById("buttonEnd2").className = 'show';
        } toggleButton();
        answerIsCorrect();
    }else if(answer === questions[randomValue].correct && answer === "B"){

        answerIsCorrect();
        form.removeAttribute("hidden");
        function toggleButton() {
            document.getElementById("buttonEnd").className = 'show';
        } toggleButton();

    }else{
        // answer is wrong

        //alert("Wrong");
        answerIsWrong();
        //form.removeAttribute("hidden");
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById("A").style.borderColor = "darkgreen";
    document.getElementById("B").style.borderColor = "darkgreen";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById("A").style.borderColor = "#f00";
    document.getElementById("B").style.borderColor = "#f00";
}

renderQuestion();

