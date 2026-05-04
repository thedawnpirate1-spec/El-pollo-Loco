let canvas;
let world;
let keyboard = new KeyBoard();
let gamePaused = false;
let isMuted = false;

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
    loadMuteState();
}

function loadMuteState() {
    let muted = localStorage.getItem('isMuted');
    if (muted === 'true') {
        isMuted = true;
        updateMuteUI();
    }
}

function startGame() {
    hideAllScreens();
    document.getElementById('gameUI').classList.remove('d-none');
    gamePaused = false;
    initLevel(); 
    world = new World(canvas, keyboard);
}

function hideAllScreens() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('pauseScreen').classList.add('d-none');
}

function gameOver() {
    let screen = document.getElementById('gameOverScreen');
    setRandomBackground(screen, LOSE_IMAGES);
    screen.classList.remove('d-none');
    document.getElementById('gameUI').classList.add('d-none');
    clearAllIntervals();
}

function winGame() {
    let screen = document.getElementById('winScreen');
    setRandomBackground(screen, WIN_IMAGES);
    screen.classList.remove('d-none');
    document.getElementById('gameUI').classList.add('d-none');
    clearAllIntervals();
}

function setRandomBackground(element, images) {
    let randomImg = images[Math.floor(Math.random() * images.length)];
    element.style.backgroundImage = `url('${randomImg}')`;
}

function restartGame() {
    clearAllIntervals();
    startGame();
}

function togglePause() {
    gamePaused = !gamePaused;
    let screen = document.getElementById('pauseScreen');
    if (gamePaused) screen.classList.remove('d-none');
    else screen.classList.add('d-none');
    }

function backToMenu() {
    clearAllIntervals();
    hideAllScreens();
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('gameUI').classList.add('d-none');
}

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    updateMuteUI();
}

function updateMuteUI() {
    let icon = document.getElementById('muteIcon');
    icon.src = isMuted ? 'img/mute.png' : 'img/volume.png';
    }

function toggleFullscreen() {
    let container = document.querySelector('.game-container');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert(`Error: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function mobileKeyPress(key) {
    keyboard[key] = true;
}

function mobileKeyRelease(key) {
    keyboard[key] = false;
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