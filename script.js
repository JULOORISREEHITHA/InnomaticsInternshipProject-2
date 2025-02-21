const categories = {
    fruits: ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥭', '🍍'],
    emojis: ['😀', '😂', '😍', '😎', '😜', '🤩', '🥳', '😇'],
    animals: ['🐶', '🐱', '🦁', '🐯', '🐸', '🐼', '🐨', '🐰'],
    planets: ['🪐', '🌍', '🌕', '🌞', '⭐', '🌠', '☄', '🌑'],
    flags: [
        '🇺🇸', '🇬🇧', '🇮🇳', '🇩🇪', '🇨🇦', '🇯🇵', '🇧🇷', '🇫🇷'
    ]
};

// 🔊 Sound Effects
const flipSound = new Audio("sound/flipcard-91468.mp3");
const matchSound = new Audio("sound/mixkit-achievement-bell-600.wav");
const gameOverSound = new Audio("sound/game-over-80141.mp3");
const WinSound=new Audio("sound/tadaa-47995.mp3");

let firstCard, secondCard, lockBoard, score, timer,toalMatches,matchedPairs;

function startGame(category) {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    score = 0;
    matchedPairs=0;
    toalMatches=categories[category].length;
    document.getElementById('score').innerText = score;
    startTimer();
    generateCards(category);
}
function generateCards(category) {
    let grid = document.getElementById('grid');
    grid.innerHTML = '';

    let items = [...categories[category], ...categories[category]];
    items.sort(() => Math.random() - 0.5);

    items.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;
        card.addEventListener('click', handleCardClick);
        grid.appendChild(card);
    });
}

function handleCardClick() {
    if (lockBoard || this.classList.contains('flipped')) return;

    flipSound.play(); // 🔊 Play flip sound
    this.innerText = this.dataset.value;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchSound.play(); // 🔊 Play match sound
        score += 10;
        matchedPairs++;
        document.getElementById('score').innerText = score;
        
        firstCard = secondCard = null;
        lockBoard = false;
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.innerText = secondCard.innerText = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            lockBoard = false;
            firstCard = secondCard = null;
        }, 1000);
    }
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft === 0) {
             clearInterval(timer);
            checkLoss();
        }
    }, 1000);
}

function checkWin(){
    if(matchedPairs==toalMatches){
        clearInterval(timer);
        WinSound.play();
        setTimeout(()=> {
            alert(`🥳Congratulations🎊!\nYou won🎉🍾!\nFinal score: ${score}`);
            location.reload();

        },500
        );
    }
}
function checkLoss(){
    if(matchedPairs<toalMatches){
        gameOverSound.play();
        setTimeout(()=>{
            alert(`Game Over❌!\nYou lost😔!\nFinal score: ${score}`);
            location.reload();
        },500);
    }
}
function restartGame() {
    location.reload();
}
