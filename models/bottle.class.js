class Bottle extends MovableObject {

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    };

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

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}
