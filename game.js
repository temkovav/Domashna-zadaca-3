let startButton = document.getElementById("start-button");

let seconds = 00;
let appendSeconds = document.getElementById("seconds");
let interval;

let appendTScore = document.getElementById("turtle-score");
let appendRScore = document.getElementById("rabbit-score");

let rabbitTrack = document.querySelectorAll(".squares");
let turtleTrack = document.querySelectorAll(".squares");

let appendMessage = document.querySelector('.message');
let appendMessageCard = document.querySelector(".message-card");

let turtlePosition = {
    current: 1,
    previous: 1
}

let rabbitPosition = {
    current: 1,
    previous: 1
}

function Timer() {
    seconds++;
    appendSeconds.innerHTML = "Elapsed time: " + seconds;
}

function generateNumber() {
    return Math.floor(Math.random() * 10);
}

function changeTurtlePosition() {

    if(turtlePosition.current < 70) {

        turtleTrack[turtlePosition.previous - 1].style.backgroundColor = 'white';
        turtleTrack[turtlePosition.current - 1].style.backgroundColor = 'azure ';

        turtlePosition.previous = turtlePosition.current;
    }
}

function changeRabbitPosition() {

    if(rabbitPosition.current < 70) {

        rabbitTrack[rabbitPosition.previous - 1].style.backgroundColor = 'white';
        rabbitTrack[rabbitPosition.current - 1].style.backgroundColor = 'bisque';

        rabbitPosition.previous = rabbitPosition.current;
    }
}

function getTurtlePosition(randomNumber) {

    if(randomNumber >= 0 && randomNumber <= 4) {
        return 3;
    }

    if(randomNumber == 5 || randomNumber == 6) {
        return -6;
    }

    if(randomNumber >= 7 && randomNumber <= 9) {
        return 1;
    }
}

function getRabbitPosition(randomNumber) {

    if(randomNumber == 0 || randomNumber == 1) {
        return 0;
    }

    if(randomNumber == 2 || randomNumber == 3) {
        return 9;
    }

    if(randomNumber == 4) {
        return -12;
    }

    if(randomNumber >=5 && randomNumber <= 7) {
        return 1;
    }

    if(randomNumber == 8 || randomNumber == 9) {
        return -2;
    }
}

function overlap() {

    turtleTrack[turtlePosition.previous - 1].style.backgroundColor = 'white';
    turtleTrack[turtlePosition.current - 1].style.backgroundColor = 'black';

    rabbitTrack[rabbitPosition.previous - 1].style.backgroundColor = 'white';
    rabbitTrack[rabbitPosition.current - 1].style.backgroundColor = 'black';

    rabbitPosition.previous = rabbitPosition.current;
    turtlePosition.previous = turtlePosition.current;
}

function updateScore() {
    appendTScore.innerHTML = turtlePosition.current;
    appendRScore.innerHTML = rabbitPosition.current;
}

function getWinner() {

    if(rabbitPosition.current >= 70) {
        return "rabbit";
    }
    else if(turtlePosition.current >= 70) {
        return "turtle";
    }
}

function main() {

    clearInterval(interval);
    interval = setInterval(Timer, 1000);

    let game = setInterval(() => {

        let rndNumber = generateNumber();

        turtlePosition.current += getTurtlePosition(rndNumber);
        rabbitPosition.current += getRabbitPosition(rndNumber);

        updateScore();

        if(turtlePosition.current === rabbitPosition.current) {

            overlap();
            appendMessageCard.innerHTML = "OVERLAPED";
            appendMessage.classList.add('reveal');
            setTimeout(() => appendMessage.classList.remove('reveal'), 2000);
        }
        else {
            changeTurtlePosition();
            changeRabbitPosition();
        }

        let winner = getWinner();

        if(winner) {
            appendMessageCard.innerHTML = "The winner is the " + winner;

            appendMessage.classList.add('reveal');
            setTimeout(() => appendMessage.classList.remove('reveal'), 5000);

            clearInterval(interval);
            clearInterval(game);
        }
    }, 1000)
}

startButton.addEventListener('click', main, false);

