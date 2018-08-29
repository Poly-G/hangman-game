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
const modal = document.querySelector('.modal');
const playAgainButton = document.querySelector('.play-again');
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

function openModal() {
    modal.style.display = 'block';
}

function reloadPage() {
    location.reload();
}

playAgainButton.addEventListener('click', function () {
    reloadPage();
})

// If API successfully loads
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


    // generate underscore
    let generateUnderscore = () => {

        for (let i = 0; i < chosenWord.length; i++) {
            underscore.push('_');
            // add underscore to the DOM
            docUnderscore.innerHTML = underscore.join(' ');
        }
    }
    generateUnderscore();

    function once() {
        console.log("Done.");
        buttons.removeEventListener("click", once);
    }

    // button event lister 
    buttons.addEventListener('click', (event) => {
        let target = event.target;
        // buttonClick is the letter of the button
        let buttonClick = target.innerHTML;

        // check if buttonClick is a single letter
        if (buttonClick.length === 1) {

            // if user guess is right
            if (chosenWord.indexOf(buttonClick) > -1) {

                // makes sure letter only gets added once
                if (rightLetter.indexOf(buttonClick) == -1) {
                    rightLetter.push(buttonClick);
                    wrongNum = 0;

                    // changes the underscore to the buttonClick
                    underscore[chosenWord.indexOf(buttonClick)] = buttonClick;
                    

                    // add the underscores + correct letters to DOM
                    docUnderscore.innerHTML = underscore.join(' ');
                    console.log(underscore);
                    
                }
                

                // if user guess is wrong
            } else {
                if (wrongLetter.indexOf(buttonClick) == -1) {
                    wrongLetter.push(buttonClick);
                    wrongLettersDOM.innerHTML = wrongLetter.join(' , ');
                    console.log(wrongLetter);
                    wrongNum++;
                    
                }
                
                console.log(wrongNum);
                
                
            }

            // if entire word is right, win game
            if (underscore.join('') == chosenWord) {
                alert('you win');
            // if there are 6 wrong letters, game over    
            } if (wrongLetter.length === 6) {
                openModal();
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

// If there is an error
function handleError() {
    console.log('An error occurred');
}

/* bugs */
// double letters dont populate 
// stars get removed on every click, not just wrong guesses
