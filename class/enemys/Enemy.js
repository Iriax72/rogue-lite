export class Enemy {
    x;
    y;
    width;
    height;
    health;
    lootValue;
    image;
    isDead = false;
    shoots;

    constructor (x, y, width, height, lootValue, health, image, shoots) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.lootValue = lootValue;
        this.image = image;
        this.shoots = shoots;
    }

    move() {}

    update(deltaTime) {
        this.shoots.forEach((shoot) => {
            if (this.collides(shoot.getRect())) {
                this.health -= shoot.strength;
                this.shoots.filter(s => s !== shoot);
            }
        })
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

    collides(rect) {
        if (this.x + this.width < rect.x) {
            return false;
        }
        if (this.x > rect.x + rect.w) {
            return false;
        }
        if (this.y + this.height < rect.y) {
            return false;
        }
        if (this.y > rect.y + rect.h) {
            return false;
        }
        return true;
    }
}