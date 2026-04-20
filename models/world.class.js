class World {
    character = new Character();
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw(){
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
    }
}