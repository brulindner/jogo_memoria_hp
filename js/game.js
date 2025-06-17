const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')
const restartButton = document.querySelector('.restart-button');


const characters = [
    'arthur','draco','dumbledore','fred','george','ginny','hagrid','hermione','luna','lupin','minerva','molly','ron','sirius','snape','voldemort'
];

let firstCard = '';
let secondCard = '';

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 32) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi ${timer.innerHTML} segundos.`);
        restartButton.classList.add('show');
    }
}



const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
       firstCard.firstChild.classList.add('disabled-card');
       secondCard.firstChild.classList.add('disabled-card');

       firstCard = '';
       secondCard = '';

       checkEndGame();
      
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 700);
    }
}

const revealCard = ({ target }) => {
    const card = target.parentNode;

    if (card.classList.contains('reveal-card')) return;
    if (firstCard && secondCard) return;

    card.classList.add('reveal-card');

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.setAttribute('data-character', character);
    card.addEventListener('click', revealCard);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () =>{
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime +1;
    }, 1000);
}

restartButton.addEventListener('click', () => {
    restartButton.classList.remove('show');
    clearInterval(this.loop);
    grid.innerHTML = '';
    timer.innerHTML = '0';
    firstCard = '';
    secondCard = '';
    loadGame();
    startTimer();
});



window.onload = () => {

    const playerName = localStorage.getItem('player');

    spanPlayer.innerHTML = playerName

    loadGame();
    startTimer();
}

