let deckId

const newDeck = document.getElementById("new-deck")
const drawCards = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const resultEl = document.getElementById("result")
let noOfCards
const remainingCards = document.getElementById("remaining-cards")
const computer = document.getElementById("computer-score")
const player = document.getElementById("player-score")

let computerScore = 0
let playerScore = 0


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            drawCards.disabled = false
            console.log(data)
            deckId = data.deck_id
            noOfCards = data.remaining
            renderRemainingCards()
        })
}

newDeck.addEventListener("click", handleClick)

drawCards.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {

            noOfCards = noOfCards - 2
            renderRemainingCards()

            document.getElementById("card-container1").innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            document.getElementById("card-container2").innerHTML =`
            <img src=${data.cards[1].image} class="card" />`
            
            getWinner(data.cards[0], data.cards[1])

            computer.textContent = `Computer Score: ${computerScore}`
            player.textContent = `My Score: ${playerScore}`
            
            if(noOfCards <= 0){
                drawCards.disabled = true
                
                if(playerScore > computerScore){
                    resultEl.textContent = "You won the game!"
                }
                else if(computerScore > playerScore){
                    resultEl.textContent = "The computer won the game!"
                }
                else{
                    resultEl.textContent = "The game is tied"
                }
            }
        })
})


function getWinner(card1, card2){
    const cardOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    
    let card1Index
    let card2Index
    
    for(let i = 0; i<cardOrder.length; i++){
        if(card1.value === cardOrder[i]){
            card1Index = i
        }
        if(card2.value === cardOrder[i]){
            card2Index = i
        }
    }
    
    let resultText

    if(card1Index > card2Index){
        resultText = "Computer Wins!"
        computerScore++
    }
    else if(card2Index > card1Index){
        resultText = "You Win!"
        playerScore++
    }
    else{
        resultText = "War!"
    }

    resultEl.textContent = resultText
}

function renderRemainingCards(){
    remainingCards.textContent = `Remaining Cards: ${noOfCards}`
}