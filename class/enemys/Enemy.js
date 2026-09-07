export class Enemy {
    x;
    y;
    width;
    height;
    health;
    lootValue;
    image;
    isDead = false;

    constructor (x, y, width, height, lootValue, health, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.lootValue = lootValue
        this.image = image
    }

    move() {}

    update(deltaTime) {
        if (this.health <= 0) {
            this.die();
            return;
        }
        this.move();
    }

    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    die() {
        this.isDead = true;
        console.log('L\'ennemi est mort');
    }
}