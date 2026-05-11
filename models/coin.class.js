/**
 * Class representing a collectable coin.
 * @extends MovableObject
 */
class Coin extends MovableObject {

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 45,
        bottom: 45,
        left: 45,
        right: 45
    };
    /**
     * Creates an instance of a coin on the ground.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @constructor
     */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 120;
        this.animate();
    }

    /**
     * Animates the coin by alternating its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}
