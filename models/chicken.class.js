class chicken extends MovableObject{
    height = 70;
    width = 70;
    constructor(){
        super();
        this.loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.x = 200 +Math.random()* 500;
        this.y = 360;
    }
}