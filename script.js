
const playerScore = document.querySelector(".player-score p");
const computerScore = document.querySelector(".computer-score p");
const winner = document.querySelector(".winner");
const overText = document.querySelector('.over')
const options = document.querySelectorAll(".options button");
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const hands = document.querySelectorAll(".hands img");
const againBtn = document.querySelector('.again');
const playBtn = document.querySelector(".intro button");
const introScreen = document.querySelector(".intro");
const match = document.querySelector(".match");

let playing
const game = () => {
    let pScore = 0;
    let cScore = 0;
    playing = true;

    //Start the Game
    const startGame = () => {


        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };
    //Play Match

    const playMatch = () => {

        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                this.style.animation = "";
            });
        });
        //Computer Options
        const computerOptions = ["rock", "paper", "scissors"];

        if (playing) {
            options.forEach(option => {
                option.addEventListener("click", function () {
                    //Computer Choice
                    const computerNumber = Math.floor(Math.random() * 3);
                    const computerChoice = computerOptions[computerNumber];

                    setTimeout(() => {
                        //Here is where we call compare hands
                        compareHands(this.textContent, computerChoice);
                        //Update Images
                        playerHand.src = `./assets/${this.textContent}.png`;
                        computerHand.src = `./assets/${computerChoice}.png`;
                    }, 2000);
                    //Animation
                    playerHand.style.animation = "shakePlayer 2s ease";
                    computerHand.style.animation = "shakeComputer 2s ease";
                });
            });

        }
    };

    const updateScore = () => {

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;

        gameOver()

    };

    const compareHands = (playerChoice, computerChoice) => {
        //Update Text

        //Checking for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }
        //Check for Rock
        if (playerChoice === "rock") {
            if (computerChoice === "scissors") {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Paper
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if (playerChoice === "scissors") {
            if (computerChoice === "rock") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }

    };
    const gameOver = () => {
        if (pScore === 3 || cScore === 3) {
            playing = false;
            overText.textContent = 'Game over🎉'
            againBtn.classList.add('show')
            againBtn.addEventListener('click', resetGame);


        }

    }
    const resetGame = () => {
        cScore = 0;
        pScore = 0;
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
        winner.textContent = "Choose an option";
        overText.textContent = "";
        playerHand.src = "./assets/rock.png";
        computerHand.src = "./assets/rock.png";
        againBtn.classList.remove('show')

    }

    //Is call all the inner function
    startGame();
    playMatch()
};

game();
