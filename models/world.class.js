/**
 * Class representing the game world and its logic.
 */
class World {
    character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    floatingTexts = [];
    lastThrowTime = 0;

    isGameOver = false;

    /**
     * Creates the game world instance.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {KeyBoard} keyboard - The keyboard instance for controls.
     * @constructor
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.enemies = level1.enemies;
        this.clouds = level1.clouds;
        this.backgroundObjects = level1.backgroundObjects;
        
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference in the character.
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * Starts the main game loop checking collisions and status.
     */
    run(){
        setInterval(() => {
            if (gamePaused) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndboss();
            this.checkGameStatus();
            this.checkHealInput();
        }, 50);
    }
    
    /**
     * Checks the win/loss status of the game.
     */
    checkGameStatus() {
        if (this.isGameOver) return;
        this.checkDeath();
        this.checkWin();
    }

    checkDeath() {
        if (this.character.isDead()) {
            this.isGameOver = true;
            setTimeout(() => {
                if(typeof gameOver === 'function') gameOver();
            }, 1000);
        }
    }

    checkWin() {
        let endboss = this.level.enemies.find(function(e) { return e instanceof Endboss; });
        if (endboss && endboss.isDead()) {
            this.isGameOver = true;
            setTimeout(() => {
                if(typeof winGame === 'function') winGame();
            }, 1000);
        }
    }
    
    checkEndboss() {
        let endboss = this.level.enemies.find(function(e) { return e instanceof Endboss; });
        if(endboss && !endboss.hadFirstContact) {
            if (this.character.x > 5000) {
                endboss.hadFirstContact = true;
                audioHub.playSound('img/sounds/endboss/endbossApproach.wav');
                this.spawnBossBottles();
                document.querySelector('.game-container').classList.add('boss-mode');
            }
        }
    }

    spawnBossBottles() {
        let newBottles = [
            new Bottle(1700, 360),
            new Bottle(1850, 360),
            new Bottle(2000, 360),
            new Bottle(2150, 360),
            new Bottle(2300, 360),
            new Bottle(4700, 360),
            new Bottle(4850, 360),
            new Bottle(5000, 360),
            new Bottle(5150, 360),
            new Bottle(5300, 360)
        ];
        this.level.bottles.push(...newBottles);
    }
    checkThrowObjects() {
        if(this.keyboard.D){
            if (this.isThrowCooldownActive()) return;
            if (this.character.bottles > 0) {
                this.executeThrow();
            }
        }
    }

    isThrowCooldownActive() {
        let timeNow = new Date().getTime();
        this.lastThrowTime = this.lastThrowTime || 0;
        if (timeNow - this.lastThrowTime < 1000) {
            this.keyboard.D = false;
            return true;
        }
        return false;
    }

    executeThrow() {
        let bottleX = this.character.otherDirection ? this.character.x + 20 : this.character.x + 40;
        let bottle = new ThrowableObject(bottleX, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.character.bottles -= 20;
        this.bottleBar.setPercentage(this.character.bottles);
        this.keyboard.D = false;
        this.lastThrowTime = new Date().getTime();
    }
    /**
     * Checks for all object collisions in the game.
     */
    checkCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
        this.checkThrowableCollisions();
    }

    checkCoinCollisions() {
        this.level.coins.forEach(function(coin, index) {
            if (this.character.isColliding(coin) && this.character.coins < 100) {
                this.handleCoinCollection(coin, index);
            }
        }, this);
    }

    handleCoinCollection(coin, index) {
        audioHub.playSound('img/sounds/collectibles/collectSound.wav');
        this.character.collectCoin();
        this.coinBar.setPercentage(this.character.coins);
        this.level.coins.splice(index, 1);
    }

    checkHealInput() {
        if (this.keyboard.H && this.character.coins >= 100 && this.character.energy < 180 && !this.character.isDead()) {
            this.healCharacter();
            this.keyboard.H = false;
        }
    }

    healCharacter() {
        this.character.energy = 180;
        this.character.coins = 0;
        this.statusBar.setPercentage(this.character.energy / 1.8);
        this.coinBar.setPercentage(this.character.coins);

        audioHub.playSound('img/sounds/heal sound/funkelndes_geraeusch.wav');
        let textX = this.character.x + this.character.width / 2 - 80;
        let textY = this.character.y + 50;
        this.floatingTexts.push(new FloatingText("+ FULL HEALTH !", textX, textY));
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
                audioHub.playSound('img/sounds/collectibles/bottleCollectSound.wav');
                this.character.collectBottle();
                this.bottleBar.setPercentage(this.character.bottles);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.handleEnemyContact(enemy);
            }
        });
    }

    handleEnemyContact(enemy) {
        if (enemy instanceof Endboss) {
            this.handleBossContact(enemy);
        } else if (this.character.isFalling && !enemy.isDead()) {
            this.killEnemy(enemy);
        } else if (!enemy.isDead()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy / 1.8);
        }
    }

    handleBossContact(enemy) {
        if (!enemy.isDead()) {
            this.character.hit(200);
            this.statusBar.setPercentage(this.character.energy / 1.8);
        }
    }

    killEnemy(enemy) {
        enemy.energy = 0;
        if (enemy instanceof Chicken) {
            audioHub.playSound('img/sounds/chicken/chickenDead.mp3');
        } else if (enemy instanceof ChickenSmall) {
            audioHub.playSound('img/sounds/chicken/chickenDead2.mp3');
        }
        this.character.jump();
        setTimeout(() => {
            let i = this.level.enemies.indexOf(enemy);
            if (i > -1) this.level.enemies.splice(i, 1);
        }, 1000);
    }

    checkThrowableCollisions() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasSplashed && bottle.y >= 360 && !bottle.isRemoving) {
                bottle.isRemoving = true;
                this.removeBottleDelayed(bottle);
            }
            this.level.enemies.forEach((enemy) => {
                if (!bottle.hasSplashed && bottle.isColliding(enemy) && !enemy.isDead()) {
                    bottle.isRemoving = true;
                    this.hitEnemyWithBottle(bottle, enemy);
                }
            });
        });
    }

    hitEnemyWithBottle(bottle, enemy) {
        bottle.splash();
        if (enemy instanceof Endboss) {
            enemy.hit();
            this.endbossBar.setPercentage(enemy.energy);
        } else {
            enemy.energy = 0;
            if (enemy instanceof Chicken) {
                audioHub.playSound('img/sounds/chicken/chickenDead.mp3');
            } else if (enemy instanceof ChickenSmall) {
                audioHub.playSound('img/sounds/chicken/chickenDead2.mp3');
            }
            this.removeEnemyDelayed(enemy);
        }
        this.removeBottleDelayed(bottle);
    }

    removeEnemyDelayed(enemy) {
        setTimeout(() => {
            let i = this.level.enemies.indexOf(enemy);
            if (i > -1) this.level.enemies.splice(i, 1);
        }, 1000);
    }

    removeBottleDelayed(bottle) {
        setTimeout(() => {
            let i = this.throwableObjects.indexOf(bottle);
            if (i > -1) this.throwableObjects.splice(i, 1);
        }, 300);
    }

    draw(){
        this.clearCanvas();
        this.drawWorldObjects();
        this.drawFixedUI();
        this.scheduleNextFrame();
    };

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawWorldObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.floatingTexts.forEach(text => text.draw(this.ctx));
        this.floatingTexts = this.floatingTexts.filter(t => t.alpha > 0);

        this.ctx.translate(-this.camera_x, 0);
    }

    drawFixedUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.showEndbossBar()) {
            this.addToMap(this.endbossBar);
        }
    }

    scheduleNextFrame() {
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(function(object) {
            this.addToMap(object);
        }.bind(this));
    };

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        } 
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    };

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    }

    showEndbossBar() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        return endboss && endboss.hadFirstContact;
    }
}