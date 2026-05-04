let canvas;
let world;
let keyboard = new KeyBoard();
let gamePaused = false;

const WIN_IMAGES = [
    'img/You won, you lost/You Win A.png',
    'img/You won, you lost/You Won B.png',
    'img/You won, you lost/You win B.png',
    'img/You won, you lost/You won A.png'
];

const LOSE_IMAGES = [
    'img/9_intro_outro_screens/game_over/game over!.png',
    'img/9_intro_outro_screens/game_over/game over.png',
    'img/9_intro_outro_screens/game_over/oh no you lost!.png',
    'img/9_intro_outro_screens/game_over/you lost.png',
    'img/You won, you lost/Game Over.png',
    'img/You won, you lost/Game over A.png',
    'img/You won, you lost/You lost b.png',
    'img/You won, you lost/You lost.png'
];

function init(){
    canvas = document.getElementById('canvas');
}

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('pauseScreen').classList.add('d-none');
    document.getElementById('gameUI').classList.remove('d-none');
    
    gamePaused = false;
    initLevel(); // Erstellt das Level neu
    world = new World(canvas, keyboard);
}

function gameOver() {
    let randomImg = LOSE_IMAGES[Math.floor(Math.random() * LOSE_IMAGES.length)];
    let screen = document.getElementById('gameOverScreen');
    screen.style.backgroundImage = `url('${randomImg}')`;
    screen.classList.remove('d-none');
    document.getElementById('gameUI').classList.add('d-none');
    clearAllIntervals();
}

function winGame() {
    let randomImg = WIN_IMAGES[Math.floor(Math.random() * WIN_IMAGES.length)];
    let screen = document.getElementById('winScreen');
    screen.style.backgroundImage = `url('${randomImg}')`;
    screen.classList.remove('d-none');
    document.getElementById('gameUI').classList.add('d-none');
    clearAllIntervals();
}

function restartGame() {
    clearAllIntervals();
    startGame();
}

function togglePause() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        document.getElementById('pauseScreen').classList.remove('d-none');
    } else {
        document.getElementById('pauseScreen').classList.add('d-none');
    }
}

function backToMenu() {
    clearAllIntervals();
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('pauseScreen').classList.add('d-none');
    document.getElementById('gameUI').classList.add('d-none');
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener('keydown', (event) =>{
    if(event.keyCode ==  32){
        keyboard.SPACE = true;
    }

    if(event.keyCode == 37){
        keyboard.LEFT = true;
    }

    if(event.keyCode == 39){       
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 38){
        keyboard.UP = true;
    }

    if(event.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(event.keyCode == 68){
        keyboard.D = true;
    }
    if(event.keyCode == 80 || event.keyCode == 27){
        togglePause();
    }
});

window.addEventListener('keyup', (event) =>{
    if(event.keyCode ==  32){
        keyboard.SPACE = false;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = false;
    }
        
    if(event.keyCode == 39){       
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 38){
        keyboard.UP = false;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(event.keyCode == 68){
        keyboard.D = false;
    }
});