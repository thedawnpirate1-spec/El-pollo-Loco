class ChickenSmall extends MovableObject {
    height = 50;
    width = 50;
    y = 380; // Adjusted for small chicken

    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    offset = {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10
    };

    constructor() {
        super();
        this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages([this.IMAGE_DEAD]);
        this.x = 600 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    hit() {
        super.hit();
        if (this.isDead()) {
            audioHub.playSound('img/sounds/chicken/chickenDead2.mp3');
        }
    }

    animate() {
        setInterval(() => {
            if (gamePaused) return;
            if (!this.isDead()) {
                this.moveLeft();
                this.otherDirection = false;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (gamePaused) return;
            if (this.isDead()) {
                this.img = this.imageCache[this.IMAGE_DEAD];
            } else {
                this.playAnimation(this.IMAGE_WALKING);
            }
        }, 200);
    }
}
