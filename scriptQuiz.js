
var canvas;
var context;
var img;
var request  = new XMLHttpRequest();
var stepValue = 10;
var cityValue = 'begijnhof';
var queryString = 'https://resolver.icts.kuleuven.be/search?query=' + cityValue + ':%22post%20cards%22%20resource_type:images&institution=KUL' + stepValue;
var randomAnswer;


//accessing the API
request.open('GET', queryString, false);
request.onload = function() {

    //accessing JSON data here
    pcards = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        pcards.data.forEach(data => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

        });
    }

}

request.send();
var randomValue = Math.floor(Math.random() * stepValue);
//var url = pcards.data[randomValue].links.thumbnail[0];

canvas = document.getElementById("myCanvas");
context = canvas.getContext('2d');

img = new Image();

var pcardsdate = pcards.data[randomValue].creationdate[0]; //that retrieves the year of the postcard
var thumbnailArray = pcards.data[randomValue].links.thumbnail;



while((pcardsdate.length) > 8 || (!thumbnailArray[0])){

    randomValue = Math.floor(Math.random() * stepValue);
    pcardsdate = pcards.data[randomValue].creationdate[0];
    thumbnailArray = pcards.data[randomValue].links.thumbnail;

}

img.src =  pcards.data[randomValue].links.thumbnail[0]; //that retrieves the image  of the postcard


// img.src =  pcards.data[randomValue].links.thumbnail[0]; //that retrieves the image  of the postcard
// var pcardsdate = pcards.data[randomValue].creationdate[0]; //that retrieves the year of the postcard



// img.onerror = function() {
//     swal({   //it shows an alert in case the image does not exist
//         title: "Something got wrong",
//         buttons: {
//             catch: "Refresh",
//         }
//
//     }).then((value) => {
//         switch(value) {
//             case "catch":
//                 window.location.href = "quiz.html";
//                 break;
//
//             case "default":
//                 break;
//         }
//     });
// };

//to display the image in the canvas
img.onload = function(){
    context.drawImage(img, 0, 0);
}


console.log(pcardsdate);
console.log(pcardsdate);

// the Quiz


if (pcardsdate.length > 8){
    pcardsdate = "unknown";
} else {

};


var myQuestions = [
    {
        question: "When was this picture taken?",
        answers: {
            a: 'ca. 1955',
            b: 'ca. 1930',
            c:  pcardsdate,
            d: 'ca. 1908'
        },
        correctAnswer: 'c'
    },




];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){

        var output = [];
        var answers;
        randomAnswer = Math.floor(Math.random() * 5);

        for(var i=0; i<questions.length; i++){

            answers = [];
            for(letter in questions[i].answers){

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }


        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer){


        var answerContainers = quizContainer.querySelectorAll('.answers');

        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                answerContainers[i].style.color = 'darkgreen';
                function toggleButton() {
                    document.getElementById("buttonEnd").className = 'show';
                } toggleButton();

            }
            else{
                answerContainers[i].style.color = 'red';
                function toggleButton() {
                    document.getElementById("button").className = 'show';
                } toggleButton();

                var button = document.getElementById('button')
                button.addEventListener('click',hideshow,false);

                function hideshow() {
                    document.getElementById('button').style.display = 'block';
                    this.style.display = 'none'
                }

            }
        }
    }


    // show questions right away
    showQuestions(questions, quizContainer);

    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}
