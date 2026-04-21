class cloud extends MovableObject{
    y=50;
    height = 250;
    width = 500;
constructor(){
        super();
        this.loadImage("../img/5_background/layers/4_clouds/1.png");
        this.x = Math.random()* 500;
    }

    animate(){
        setInterval(() =>{
            this.x -= 0,5;
        }, 1000/100);
    }
}