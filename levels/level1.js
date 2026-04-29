let level1;
function initLevel() {
    level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719*2),
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0,),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
    ],
    [
        new Coin(300, 200),
        new Coin(450, 150),
        new Coin(600, 200),
        new Coin(900, 100),
        new Coin(1200, 150),
        new Coin(1500, 200),
        new Coin(1800, 150),
        new Coin(2100, 100),
        new Coin(2400, 200)
    ],
    [
        new Bottle(200, 360),
        new Bottle(400, 360),
        new Bottle(700, 360),
        new Bottle(1000, 360),
        new Bottle(1300, 360),
        new Bottle(1600, 360),
        new Bottle(1900, 360),
        new Bottle(2200, 360),
        new Bottle(2500, 360),
    ]
    );
}