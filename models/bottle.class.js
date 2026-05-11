/**
 * Class representing a collectable salsa bottle.
 * @extends MovableObject
 */
class Bottle extends MovableObject {

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 15,
        bottom: 15,
        left: 25,
        right: 25
    };

    /**
     * Creates an instance of a salsa bottle on the ground.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 80;
        this.animate();
    }

    /**
     * Animates the bottle by alternating its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}
