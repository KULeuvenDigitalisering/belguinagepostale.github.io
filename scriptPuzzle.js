//API request
window.onload = imageRetr;



var request  = new XMLHttpRequest();
var stepValue = 40;
var cityValue = 'begijnhof';
var queryString = 'https://resolver.q.icts.kuleuven.be/search?query=' + cityValue + ':32LIBIS*%20genre:Post%20cards&institution=KUL&step=' + stepValue;
var pcards;


//puzzle designing
var can;    //canvas
var ctx;
var img;
var clickX;
var clickY;
var selected1;
var selected2;
var blockSizeH;   //this represents the size of the puzzle pieces height
var blockSizeW;   //this represents the size of the puzzle pieces width
var horizontalSquares = 4; //the number of the horizontal blocks
var verticalSquares = 3; //the number of the vertical blocks

var piecesArray = new Array();
var correctOrder = new Array();
var counter;
var score;




function startTimer(){

    counter = 60;
    setInterval(function() {
        counter--;
        if (counter >= 0) {
            button = document.getElementById("count");
            button.innerHTML = counter;
        }
        if (counter === 0) {
            swal({
                title: "Puzzle not completed!",
                text: "You lose. Try again!",
                buttons: {
                    catch: "OK",
                }

            }).then((value) => {
                switch(value) {
                    case "catch":
                        window.location.href = "puzzle.html";
                        break;

                    case "default":
                        break;
                }
            });
        }

    }, 1000);
}


function stopCountdown() {
    clearInterval(counter);
}



function imageRetr() {

    request.open('GET', queryString, false);
    request.onload = function () {


        pcards = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            pcards.data.forEach(data => {

            });


        }

    }

    request.send();

    can = document.getElementById('myCanvas');
    ctx = can.getContext('2d');
    img = new Image();
    img.onload = ImageAdapter;


    var randomValue = Math.floor(Math.random() * 10);
    //img.src = "postcard.jpg";
    pimage = pcards.data[randomValue].links.thumbnail[0];
    img.src = pimage ;
    document.getElementById('preview').src = pcards.data[randomValue].links.thumbnail[0];

    while((imm.length) > 8 || (!thumbnailArray[0])){

        randomValue = Math.floor(Math.random() * stepValue);
        pimage = pcards.data[randomValue].clinks.thumbnail[0]; //that retrieves the year of the postcard
        thumbnailArray = pcards.data[randomValue].links.thumbnail;

    }


}



function ImageAdapter()
{

    can.width = img.width;
    can.height = img.height;
    blockSizeH = img.height / verticalSquares;
    blockSizeW = img.width / horizontalSquares;

    var r;
    for(var i = 0; i < horizontalSquares; i++)
    {
        for(var j = 0; j < verticalSquares; j++)
        {
            r = new Rectangle(i * blockSizeW, j * blockSizeH,
                i*blockSizeW + blockSizeW, j * blockSizeH + blockSizeH);
            piecesArray.push(r);
            correctOrder.push(r);
        }
    }

    blockMixer(piecesArray, 30);
    imgDisplay();
}


function Rectangle(left, top, right, bottom)
{
    this.left = left;
    this.top  = top;
    this.right = right;
    this.bottom = bottom;

    this.width = right - left;
    this.height = bottom - top;
}



function blockMixer(ar, times)
{
    var count = 0;
    var temp;
    var index1;
    var index2;

    while(count < times)
    {
        index1 = Math.floor(Math.random()*piecesArray.length);
        index2 = Math.floor(Math.random()*piecesArray.length);

        temp = piecesArray[index1];
        piecesArray[index1] = piecesArray[index2];
        piecesArray[index2] = temp;

        count++;
    }
}



function checkWinner()
{
    score = 0;
    var match = true;


    for(var i = 0; i < piecesArray.length; i++)
    {
        if(piecesArray[i] != correctOrder[i])
        {
            match = false;
        }
    }


    if(match)
    {
        score += 5;
        document.getElementById('score').innerHTML = score;
        stopCountdown();

      function toggleButton() {
          document.getElementById("buttonEnd").className = 'show';


      } toggleButton();

        console.log(score);
        console.log("puzzle complete!");

    }
    else
    {
        console.log('not complete');

    }
}



function imgDisplay()
{
    var r;
    for(var i = 0; i < horizontalSquares; i++)
    {
        for(var j = 0; j < verticalSquares; j++)
        {
            r = piecesArray[i*verticalSquares+j];
            ctx.drawImage(img, r.left, r.top, r.width, r.height,
                i*blockSizeW, j*blockSizeH, blockSizeW, blockSizeH);
        }
    }
}

//it draws a highlighted border around the piece the user has currently selected
function highlightRect(drawX, drawY)
{
    ctx.beginPath();
    ctx.moveTo(drawX, drawY);
    ctx.lineTo(drawX + blockSizeW, drawY);
    ctx.lineTo(drawX + blockSizeW, drawY + blockSizeH);
    ctx.lineTo(drawX, drawY + blockSizeH);
    ctx.lineTo(drawX, drawY);
    ctx.lineWidth = 2;

    // set line color
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();
}

function swapRects(r1, r2)
{
    var index1;
    var index2;
    var temp = r1;

    index1 = piecesArray.indexOf(r1);
    index2 = piecesArray.indexOf(r2);

    piecesArray[index1] = r2;
    piecesArray[index2] = temp;

    checkWinner();

}

function onCanvasClick(evt)
{
    clickX = evt.offsetX;
    clickY = evt.offsetY;

    var drawX         = Math.floor(clickX / blockSizeW);
    var drawY         = Math.floor(clickY / blockSizeH);
    var index         = drawX * verticalSquares + drawY;
    var targetRect    = piecesArray[index];
    var drawHighlight = true;

    drawX *= blockSizeW;
    drawY *= blockSizeH;

    ctx.clearRect(0, 0, 640, 413);

    if(selected1 != undefined && selected2 != undefined)
    {
        selected1 = selected2 = undefined;
    }

    if(selected1 == undefined)
    {
        selected1 = targetRect;
    }
    else
    {
        selected2 = targetRect;
        swapRects(selected1, selected2);
        drawHighlight = false;
    }

    imgDisplay();

    if(drawHighlight)
        highlightRect(drawX, drawY);
}






