//we have to make sure everytime we restart the game, every variable must go to default

const cards = document.querySelectorAll('.memory-card');

let hasFLippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numTries = 0; 
let cardWons = 0;
let memoryGameCardCount = (document.getElementById('memory-game').childElementCount) / 2;
const resultDisplay = document.querySelector('#result')


function restart(){
    //remove flip effect!!!
    console.log("restart clicked");
    hasFLippedCard = false;
    lockBoard = false;
    firstCard, secondCard = null;
    numTries = 0; 
    cardWons = 0;
    unflipAllCards();
    // we need delay for all card to unflip first
    setTimeout(()=>{
        reshuffle()
    },600) 
    resultDisplay.textContent = 0;

}

function flipCard() {
    if(lockBoard) return ;
    if(this === firstCard) return;
    // this will activate css effect "flip"
    this.classList.add('flip');
    console.log('I was clicked');
    console.log(this);

    if (!hasFLippedCard) {
        // first click
        hasFLippedCard = true;
        firstCard = this;
        console.log({ hasFLippedCard, firstCard });
        return;
    }
        // second click
        hasFLippedCard = false;
        secondCard = this;
        console.log({ hasFLippedCard, secondCard });
        console.log(firstCard.dataset.framework);
        console.log(secondCard.dataset.framework);
        numTries++;
        resultDisplay.textContent = numTries;
        console.log("Number of tries is " + numTries);
        checkForMatch();

}

function checkForMatch() {
    //do cards match 
    if (firstCard.dataset.framework ===
        secondCard.dataset.framework) {
        //it's a match!!
        disableCards();
    } else {
        //not a match
        unflipCards()
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardWons++;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        //lockBoard = false;
        resetBoard();
    }, 800)
}

function resetBoard() {
    [hasFLippedCard,lockBoard] = [false, false];
    [firstCard,secondCard] = [null,null];
    if(cardWons == memoryGameCardCount){
        win();
    }
}

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
    resultDisplay.textContent = 0;
})()

function unflipAllCards(){
    cards.forEach(card=>{
        card.classList.remove('flip');
        card.addEventListener('click',flipCard);
    })
}

function reshuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}

function win(){
    Swal.fire({
        title: 'Congratulation!',
        text: "You have won the game with " + numTries + " tries",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restart !'
      }).then((result) => {
        if (result.isConfirmed) {
          restart();
        }
      })
}

cards.forEach(card => card.addEventListener('click', flipCard))