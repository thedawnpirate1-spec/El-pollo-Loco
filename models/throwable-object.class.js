class ThrowableObject extends MovableObject {


    constructor(x, y){
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = 100;
        this.y = 100;
        this.height = 50;
        this.width = 50;
        this.speedY = 10;
        this.acceleration = 0.5;
        this.throw(100, 100);
        
    }


    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
    }


}