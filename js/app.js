// If Alphabet letter is clicked and the letter is part of the word then the letter appears in place of the underscore, Else 1 point is subtracted
// Guess attempts need to be displayed
// Wrong letters guessed need to be displayed
// Total of 6 guesses before the game ends
// User wins game if guessed within 6 attempts

// push the correct letter into the DOM without the commas
//

// GET API request
const request = new XMLHttpRequest();
request.open('GET', 'http://app.linkedin-reach.io/words');
request.onload = handleSuccess;
request.onerror = handleError;
request.send();


// global variables
const word = document.getElementById('word');
const buttons = document.getElementById('buttons');
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'
];

let rightLetter = [];
let wrongLetter = [];
let underscore = [];
let blanksAndSuccesses = [];
let docUnderscore = document.getElementById('word');
let testing;

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

// If API successfully loads
function handleSuccess() {
    let words = this.responseText;

    // creates an array out of the API Call
    let wordsArray = words.split('\n');

    // generates random word from the array
    let randomNum = Math.floor(Math.random() * wordsArray.length);
    let chosenWord = wordsArray[randomNum];
    console.log(chosenWord);

    // split the chosen word into individual letters
    let chosenLetters = chosenWord.split('');
    console.log(chosenLetters);

    // number of blanks 
    numBlanks = chosenLetters.length;
    console.log(numBlanks);


    // generate underscore
    let generateUnderscore = () => {

        for (let i = 0; i < chosenWord.length; i++) {
            underscore.push('_');
            // add underscore to the DOM
            docUnderscore.innerHTML = underscore.join(' ');
        }
    }
    console.log(generateUnderscore());



    // button event lister 
    buttons.addEventListener('click', (event) => {
        let target = event.target;
        let buttonClick = target.innerHTML;

        // check that buttonClick is a single letter
        if (buttonClick.length === 1) {

            // if user guess is right
            if (chosenWord.indexOf(buttonClick) > -1) {
                rightLetter.push(buttonClick);

                underscore[chosenWord.indexOf(buttonClick)] = buttonClick;

                // if entire word is right, win game
                if (underscore.join('') == chosenWord) {
                    alert('you win');
                }
                docUnderscore.innerHTML = underscore.join(' ');
                console.log(underscore);

                console.log(rightLetter);

                // if user guess is wrong
            } else {
                wrongLetter.push(buttonClick);
                console.log(wrongLetter);
            }
        }

    });

}




// If there is an error
function handleError() {
    console.log('An error occurred');
}