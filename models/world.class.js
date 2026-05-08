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
    endbossIcon = new DrawableObject();
    throwableObjects = [];

    isGameOver = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.enemies = level1.enemies;
        this.clouds = level1.clouds;
        this.backgroundObjects = level1.backgroundObjects;
        
        // Setup Endboss Icon
        this.endbossIcon.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        this.endbossIcon.x = 450;
        this.endbossIcon.y = 15;
        this.endbossIcon.width = 50;
        this.endbossIcon.height = 50;

        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            if (gamePaused) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndboss();
            this.checkGameStatus();
        }, 50);
    }
    
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
            if (this.character.bottles > 0) {
                let bottleX = this.character.otherDirection ? this.character.x + 20 : this.character.x + 40;
                let bottle = new ThrowableObject(bottleX, this.character.y + 100, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.character.bottles -= 20;
                this.bottleBar.setPercentage(this.character.bottles);
                this.keyboard.D = false; // Prevent machine-gun throwing
            }
        }
    }
    checkCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
        this.checkThrowableCollisions();
    }

    checkCoinCollisions() {
        this.level.coins.forEach(function(coin, index) {
            if (this.character.isColliding(coin)) {
                audioHub.playSound('img/sounds/collectibles/collectSound.wav');
                this.character.collectCoin();
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        }, this);
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
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    handleBossContact(enemy) {
        if (!enemy.isDead()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
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
            this.endbossBar.setPercentage(enemy.energy / 140 * 100);
        } else {
            enemy.energy = 0; // Kill instant
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // -----Space for fixed objects like-----
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.showEndbossBar()) {
            this.addToMap(this.endbossBar);
            this.addToMap(this.endbossIcon);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    };

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