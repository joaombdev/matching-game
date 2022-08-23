/*
    Some things I couldn't do:
    - the click counter
    - a better alert that show the player name and the time
        I tried:
        - alert(`Parabéns, ${Player.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
        - alert('Parabéns ' + player + '! Seu tempo foi de: ' + timer);
*/

const container = document.querySelector('.container');
const Player = document.querySelector('.player');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
let ponto;
const clicks = document.querySelector('.clicks');

const languages = [
    'css',
    'html',
    'js-logo',
    'php',
    'python',
    'react-logo',
    'swift',
    'typescript',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 16) {
        clearInterval(this.loop);
        setTimeout(function () {
            alert('Meus parabéns, você venceu o jogo!');
        }, 200);
    }
}

const checkCards = () => {
    const firstLanguage = firstCard.getAttribute('data-language');
    const secondLanguage = secondCard.getAttribute('data-language');

    if (firstLanguage == secondLanguage) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        ponto++;
        score.innerHTML = ponto;

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500)
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (language) => {
    const card = createElement('div', 'card');
    const frontFace = createElement('div', 'face front-face');
    const backFace = createElement('div', 'face back-face');

    frontFace.style.backgroundImage = `url(../images/${language}.svg)`;

    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-language', language);

    return card;
}

const loadGame = () => {

    const duplicateLanguages = [...languages, ...languages];

    const shuffledArray = duplicateLanguages.sort(() => Math.random() - 0.5);

    duplicateLanguages.forEach((language) => {
        const card = createCard(language);
        container.appendChild(card);
    });

    ponto = 0;
    score.innerHTML = ponto;
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTimer = +timer.innerHTML;
        timer.innerHTML = currentTimer + 1;
    }, 1200);
}

window.onload = () => {
    Player.innerHTML = localStorage.getItem('player');

    startTimer();

    // startClicks();

    loadGame();
}