
var canvas;
var context;
var img;
var request  = new XMLHttpRequest();
var stepValue = 40;
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
var randomValue = Math.floor(Math.random() * 30);
//var url = pcards.data[randomValue].links.thumbnail[0];

canvas = document.getElementById("myCanvas");
context = canvas.getContext('2d');

img = new Image();
img.src =  pcards.data[randomValue].links.thumbnail[0]; //that retrieves the image  of the postcard
var pcardsdate = pcards.data[randomValue].title[0]; //that retrieves the location of the postcard
var p = pcardsdate.substring(0,17)  //it limits the number of the characters

while((pcardsdate.length) > 8 || (!thumbnailArray[0])){

    randomValue = Math.floor(Math.random() * stepValue);
    pcardsdate = pcards.data[randomValue].creationdate[0]; //that retrieves the year of the postcard
    thumbnailArray = pcards.data[randomValue].links.thumbnail;

}



//to display the image in the canvas
img.onload = function(){
    context.drawImage(img, 0, 0);
}

console.log(pcardsdate);
console.log(pcardsdate);

// the Quiz


var myQuestions = [
    {
        question: "Where was this picture taken?",
        answers: {
            a: p,
            b: 'Bruxelles. Bèguinage',
            c: 'Leuven. Begijnhof',
            d: 'Antwerp. Begijnhof'
        },
        correctAnswer: 'a'
    },




];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;
        randomAnswer = Math.floor(Math.random() * 5);

        // for each question...
        for(var i=0; i<questions.length; i++){

            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                    + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer){

        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[i].style.color = 'darkgreen';


//it shows the alert if the puzzle is completed
                swal({
                    title: "Right answer!",
                    text: "Great! You've completed the games!",
                    buttons: {
                        catch: "Receive your certificate",
                    }

                }).then((value) => {
                    switch(value) {
                        case "catch":
                            document.getElementById("buttonEnd").className = 'show';
                            break;

                        case "default":
                            break;
                    }
                });


            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
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

