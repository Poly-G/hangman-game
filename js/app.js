/* GET API request */
const request = new XMLHttpRequest();
request.open('GET', 'http://app.linkedin-reach.io/words');
request.onload = handleSuccess;
request.onerror = handleError;
request.send();

/* Global variables */
const loserModal = document.querySelector('.loser-modal');
const winnerModal = document.querySelector('.winner-modal');
const loserPlayAgain = document.querySelector('.loser-play-again');
const winnerPlayAgain = document.querySelector('.winner-play-again');
const word = document.getElementById('word');
const wrongLettersDOM = document.getElementById('wrongLettersDOM');
const buttons = document.getElementById('buttons');

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'
];

let rightLetter = [];
let wrongLetter = [];
let underscore = [];
let wrongNum = 0;
let docUnderscore = document.getElementById('word');

/* Add the alphabet to the DOM */
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

/* Modal */
function openLoserModal() {
    loserModal.style.display = 'block';
}

function openWinnerModal() {
    winnerModal.style.display = 'block';
}

function reloadPage() {
    location.reload();
}

winnerPlayAgain.addEventListener('click', function () {
    reloadPage();
})

loserPlayAgain.addEventListener('click', function () {
    reloadPage();
})

/* API successful */
function handleSuccess() {
    // captures the API words
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


    /* Generate underscore */
    let generateUnderscore = () => {
        for (let i = 0; i < chosenWord.length; i++) {
            underscore.push('_');
            // add underscore to the DOM
            docUnderscore.innerHTML = underscore.join(' ');
        }
    }
    generateUnderscore();

    /* Alphabet button event lister */
    buttons.addEventListener('click', (event) => {
        let target = event.target;
        // buttonClick is the letter of the button
        let buttonClick = target.innerHTML;

        // check if buttonClick is a single letter
        if (buttonClick.length === 1) {
            // User guess is right 
            if (chosenWord.indexOf(buttonClick) > -1 ) {
                // makes sure letter only gets added once
                if (rightLetter.indexOf(buttonClick) == -1) {
                    rightLetter.push(buttonClick);
                    wrongNum = 0;

                    // changes the underscore to the buttonClick
                    for (let index = 0; index < chosenLetters.length; index++) {
                        if (chosenLetters[index] === buttonClick) {
                            underscore[index] = buttonClick
                        }
                    }

                    // add the underscores + correct letters to DOM
                    docUnderscore.innerHTML = underscore.join(' ');
                    console.log(underscore);
                }
            } else {
                // User guess is wrong
                if (wrongLetter.indexOf(buttonClick) == -1) {
                    wrongLetter.push(buttonClick);
                    wrongLettersDOM.innerHTML = wrongLetter.join(' , ');
                    wrongNum++;
                }
            }
            // if entire word is right, win game
            if (underscore.join('') == chosenWord) {
                openWinnerModal();
            // if there are 6 wrong letters, game over    
            } if (wrongLetter.length === 6) {
                openLoserModal();
            }
        }

        // removes stars on wrong guesses 
        let stars = document.querySelectorAll('.fa-star');

        if (wrongNum == 1) {
            stars[0].remove();
            wrongNum = 0;
        }
    });
}

/* Error with API request */
function handleError() {
    console.log('An error occurred');
}