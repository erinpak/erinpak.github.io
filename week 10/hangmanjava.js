


(function () {
    "use strict";
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, dude, letters, tries, currentWord, numLettersMatched, messages;

    function setup() {
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        tries = 5;
        words = ["apple", "mango", "strawberry", "blueberry", "raspberry", "passionfruit", "lychee", "banana", "papaya", "peach", "persimmon"];
        messages = {
            win: 'yay u saved him! :D',
            lose: 'game over',
            guessed: 'u already guessed that letter',
            validLetter: 'please enter a letter from a-z',
        };

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;

        /* choose word function*/
        currentWord = words[Math.floor(Math.random() * words.length)];

        output = document.getElementById("output");
        dude = document.getElementById("stickfigure");
        guessInput = document.getElementById("letter");

        dude.innerHTML = 'you have ' + tries + ' tries remaining';
        output.innerHTML = '';

        document.getElementById("letter").value = '';

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        /* set up display of letters in current word */
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
            /*currentWord = letters.replaceAll(".", yourSymbol);*/
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    /* functions: start, restart , restart guess letter, guess */
    window.onload = setup();
    document.getElementById("restart").onclick = setup;
    guessInput.onclick = function () {
        this.value = '';
    };

    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        if (guess) {
            if (availableLetters.indexOf(guess) > -1) {
                /* already guessed */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '' + '' + messages.guessed;
                    output.classList.add("warning");
                }
                /* correct guess, go uppercase */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* checks if letter appears multiple times in word */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                /* incorrect, reduce lives */
                else {
                    lettersGuessed += guess;
                    tries--;
                    dude.innerHTML = 'You have ' + tries + ' lives remaining';
                    if (tries === 0) gameOver(); /* game over */ {
                        dude.innerHTML = 'you' + lose;
                    }
                }
            }
            /* invalid non-abc character error */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        /* blank submission error */
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());


// pop up function

function popupFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }