/**
 * Class representing a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    /**
     * Creates a new background object.
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }

}