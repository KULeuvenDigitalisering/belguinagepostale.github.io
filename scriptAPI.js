const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request  = new XMLHttpRequest();
var stepValue = 10;
var cityValue = 'begijnhof';
var queryString = 'http://resolver.q.icts.kuleuven.be/search?query=' + cityValue + ':32LIBIS*%20genre:Post%20cards&institution=KUL&step=' + stepValue;


request.open('GET', queryString, true);
request.onload = function() {


    //accessing JSON data here

    var pcards = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        pcards.data.forEach(data => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const p = document.createElement('p');
            p.textContent = data.creationdate


            var url = data.links.thumbnail;
            var img = document.createElement( 'img' );
            pcardsimage = ('src', url);
            img.setAttribute( 'src', url );
            document.getElementsByTagName('body')[0].appendChild(img);


            console.log(pcardsimage);

            container.appendChild(card)
            card.appendChild(p)


        });
    }

}

request.send();

