/**
 * Class representing a small enemy chicken.
 * @extends MovableObject
 */
class ChickenSmall extends Chicken {
    height = 50;
    width = 50;
    y = 380; 
    offset = {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10
    };
    IMAGE_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    deadSound = 'img/sounds/chicken/chickenDead2.mp3';

    /**
     * Creates an instance of ChickenSmall.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages([this.IMAGE_DEAD]);
        this.x = 600 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.5;
    }
}
