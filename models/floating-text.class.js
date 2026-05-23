/**
 * Class representing a floating text effect (e.g. for healing).
 */
class FloatingText {
    text;
    x;
    y;
    alpha = 1;
    speedY = 2;

    /**
     * Creates an instance of a floating text.
     * @param {string} text - The text to display.
     * @param {number} x - The starting x-coordinate.
     * @param {number} y - The starting y-coordinate.
     */
    constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
    }

    /**
     * Draws the text onto the canvas and updates its position.
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    draw(ctx) {
        if (this.alpha <= 0) return;
        
        ctx.save();
        ctx.font = 'bold 36px "Zabla", Arial';
        ctx.fillStyle = `rgba(0, 255, 0, ${this.alpha})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = 4;
        
        ctx.strokeText(this.text, this.x, this.y);
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
        
        this.y -= this.speedY;
        this.alpha -= 0.02;
    }
}
