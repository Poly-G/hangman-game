
// Length of word needs to be displayed as underscores
// If Alphabet letter is clicked and the letter is part of the word then the letter appears in place of the underscore, Else 1 point is subtracted
// Guess attempts need to be displayed
// Wrong letters guessed need to be displayed
// Total of 6 guesses before the game ends
// User wins game if guessed within 6 attempts


const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

buttons = document.getElementById('buttons');

// add the alphabet to the DOM
function createButtons() {
    
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

buttons.addEventListener('click', (event) => {
    let target = event.target;
    let buttonClick = target.innerHTML;
    
console.log(buttonClick);


});


// If API successfully loads
function handleSuccess() {
    let words = this.responseText;

    // creates an array out of the API Call
    let wordsArray = words.split('\n');

    // generates random word from the array
    let randomNum = Math.floor(Math.random() * wordsArray.length);
    let chosenWord = wordsArray[randomNum];
    console.log(chosenWord);

    // generate underscore
    let underscore = [];
    let generateUnderscore = () => {
        for (let i = 0; i < chosenWord.length; i++) {
            underscore.push('_');
        }
        return underscore;
    }
    
    console.log(generateUnderscore());

    
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
