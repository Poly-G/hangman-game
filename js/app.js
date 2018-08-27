// Word has to be picked from API and shuffled
// Length of word needs to be displayed as underscores
// If Alphabet letter is clicked and the letter is part of the word then the letter appears in place of the underscore, Else 1 point is subtracted
// Guess attempts need to be displayed
// Wrong letters guessed need to be displayed
// Total of 6 guesses before the game ends
// User wins game if guessed within 6 attempts


const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];


// add the alphabet to the DOM
function createButtons() {
    buttons = document.getElementById('buttons');
    ul = document.createElement('ul');

    for (let i = 0; i < alphabet.length; i++) {
        ul.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];

        buttons.appendChild(ul);
        ul.appendChild(list);
    }
}
createButtons();


// If API successfully loads
function handleSuccess() {
    let words = this.responseText;
    let wordsArray = words.split('\n');
    let randomNum = Math.floor(Math.random() * wordsArray.length);
    let chosenWord = wordsArray[randomNum];
    console.log(chosenWord);
    
}

// If there is an error
function handleError() {
    console.log('An error occurred');
}

// GET API request
const request = new XMLHttpRequest();
request.open('GET', 'http://app.linkedin-reach.io/words');
request.onload = handleSuccess;
request.onerror = handleError;
request.send();
