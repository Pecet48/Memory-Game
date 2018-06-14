/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var openCards = new Array;
var cardsValue = new Array;
var count = 0;
var moves = 0;

function afterWinGame() {
    document.querySelector('.win-container').style.display = 'block';
    document.querySelector('.score-panel').style.display = 'none';
    document.querySelector('.deck').style.display = 'none';
    document.querySelector('#show-moves').textContent = moves;
}


function showCard(x) {
    if(x.className === 'card'){
        x.className = 'card open show';
        openCards.push(x);
        cardsValue.push(x.firstChild.nextSibling.className);
    }
}

function checkMatch() {
    var firstCard = cardsValue[0];
    var secondCard = cardsValue[1];
    moves++;
    document.querySelector('.moves').textContent = moves;

    if(firstCard == secondCard) {
        count++;
        openCards[0].className = 'card match';
        openCards[1].className = 'card match';
        openCards = [];
        cardsValue = [];

    } else {
        setTimeout(function(){
            openCards[0].className = 'card';
            openCards[1].className = 'card';
            openCards = [];
            cardsValue = [];
         }, 500);
    }

    if(count == 8) {
        afterWinGame();
    }
}

function checkList(){
    if(openCards.length >= 2){
        checkMatch();
    }
}

var card = document.querySelectorAll(".card");
var resetButton = document.querySelector(".restart");
var newGameButton = document.querySelector("#play-again");

function resetGame() {
    for(var i=0; i<card.length; i++){
        card[i].className = 'card';
        count = 0;
        moves = 0;
        openCards = [];
        cardsValue = [];
        document.querySelector('#show-moves').textContent = moves;
    }
}

resetButton.addEventListener("click", resetGame);

function newGame() {
    resetGame();
    document.querySelector('.win-container').style.display = 'none';
    document.querySelector('.score-panel').style.display = 'block';
    document.querySelector('.deck').style.display = 'flex';
}

newGameButton.addEventListener("click", newGame);

for(var i=0; i<card.length; i++){
    card[i].addEventListener("click", function(){
        if(openCards.length < 2 && cardsValue.length < 2){
            showCard(this);
            checkList();
        }
    });
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
