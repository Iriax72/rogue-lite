export class Enemy {
    x;
    y;
    width;
    height;
    health;
    lootValue;
    image;
    dropLoot;
    isDead = false;
    shoots;

    constructor (x, y, width, height, lootValue, health, image, dropLoot, shoots) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.lootValue = lootValue;
        this.image = image;
        this.dropLoot = dropLoot;
        this.shoots = shoots;
    }

    move(deltaTime) {}

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
        this.move(deltaTime);
    }

    draw(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    die() {
        if (this.isDead) {
            return;
        }
        this.dropLoot(this.x, this.y, this.lootValue);
        this.isDead = true;
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