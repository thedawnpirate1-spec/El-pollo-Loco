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
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }
    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndboss();
            this.checkGameStatus();
        }, 50); // Increased frequency for accurate collisions
    }
    
    checkGameStatus() {
        if (this.isGameOver) return;
        
        if (this.character.isDead()) {
            this.isGameOver = true;
            setTimeout(() => {
                if(typeof gameOver === 'function') gameOver();
            }, 1000); // Wait 1 sec for death animation
        }
        
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
            if (this.character.x > 2000) {
                endboss.hadFirstContact = true;
            }
        }
    }
    checkThrowObjects() {
        if(this.keyboard.D){
            if (this.character.bottles > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.bottles -= 20;
                this.bottleBar.setPercentage(this.character.bottles);
                this.keyboard.D = false; // Prevent machine-gun throwing
            }
        }
    }
    checkCollisions() {
        this.level.coins.forEach(function(coin, index) {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        }.bind(this));

        this.level.bottles.forEach(function(bottle, index) {
            if (this.character.isColliding(bottle)) {
                if(this.character.bottles < 100) {
                    this.character.collectBottle();
                    this.bottleBar.setPercentage(this.character.bottles);
                    this.level.bottles.splice(index, 1);
                }
            }
        }.bind(this));

        this.level.enemies.forEach(function(enemy, index) {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    if (!enemy.isDead()) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                } else if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy.isDead()) {
                    // Jump on chicken to kill
                    enemy.energy = 0; 
                    this.character.jump(); // bounce off
                    setTimeout(() => {
                        let i = this.level.enemies.indexOf(enemy);
                        if (i > -1) this.level.enemies.splice(i, 1);
                    }, 1000);
                } else if (!enemy.isDead()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        }.bind(this));

        this.throwableObjects.forEach(function(bottle) {
            this.level.enemies.forEach(function(enemy, index) {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    // Enemy hit! We could remove the enemy and the bottle
                    enemy.energy = 0; // Enemy dies
                    
                    // Only remove standard enemies from array after 1 second
                    if (!(enemy instanceof Endboss)) {
                        setTimeout(() => {
                            let i = this.level.enemies.indexOf(enemy);
                            if (i > -1) this.level.enemies.splice(i, 1);
                        }, 1000);
                    }
                }
            }.bind(this));
        }.bind(this));
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

//   if(character.x + character.width > chicken.x && 
//     character.y + character.height > chicken.y &&
//     character.x < chicken.x &&
//     character.y < chicken.y + chicken.height
//   )

//   isCollsion(mo){
//     return this.x + this.width > mo.x &&
//     this.y + this.height > mo.y && 
//     this.x < mo.x && 
//     this.y < mo.y + mo.height;
//   }
}