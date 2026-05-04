class Chicken extends MovableObject{
    height = 70;
    width = 70;
    y = 360;

    IMAGE_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };
    constructor(){
        super();
        this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGE_WALKING);
        this.x = 500 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();

    }

    animate(){
        setInterval(() => {
            if(!this.isDead()){
                this.moveLeft();
                this.otherDirection = false;
            }
        }, 1000/60);
        
        setInterval(() => {
            if(this.isDead()){
                this.loadImage(this.IMAGE_DEAD);
            } else {
                this.playAnimation(this.IMAGE_WALKING);
            }
        }, 200);
    }
}