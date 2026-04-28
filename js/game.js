let canvas;
let world;
let keyboard = new KeyBoard();

function init(){
    canvas = document.getElementById('canvas');
}

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    
    initLevel(); // Erstellt das Level neu
    world = new World(canvas, keyboard);
}

function gameOver() {
    document.getElementById('gameOverScreen').classList.remove('d-none');
    clearAllIntervals();
}

function winGame() {
    document.getElementById('winScreen').classList.remove('d-none');
    clearAllIntervals();
}

function restartGame() {
    clearAllIntervals();
    startGame();
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