class World {
    character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

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
    }

    setWorld(){
        this.character.world = this;
    }
    run(){
        setInterval(() => {
            this.checkCollisions();
        }, 200);
    }
    checkCollisions(){
        setInterval(() => {
                this.level.enemies.forEach((enemy)=> {
                    if (this.character.isColliding(enemy)) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                });
        }, 200);
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // -----Space for fixed objects like-----
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    };

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });
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