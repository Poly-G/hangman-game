let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Create a request variable and assign a new XMLHttpRequest object to it.
let request = new XMLHttpRequest();


// add the alphabet to the DOM
function createButtons() {
    buttons = document.getElementById('buttons');
    ul = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
        ul.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];

        buttons.appendChild(ul);
        ul.appendChild(list);
    }
}
createButtons();






// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === 4) {
//         console.log(this.responseText);
//     }
// });

// xhr.open("GET", "http://app.linkedin-reach.io/words");
// xhr.setRequestHeader("Cache-Control", "no-cache");

// xhr.send();

function handleSuccess() {
    console.log(this.responseText);
}

function handleError() {
    console.log('An error occurred');
}

const request = new XMLHttpRequest();
request.open('GET', 'http://app.linkedin-reach.io/words');
request.onload = handleSuccess;
request.onerror = handleError;
request.send();
