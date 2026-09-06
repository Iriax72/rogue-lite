export class Arrow {
    x;
    y;
    dir;
    image = document.querySelector('img#arrow-img');
    WIDTH = 15;
    HEIGHT = 5;
    SPEED = 0.3; // pixel / ms

    constructor (x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }

    update (deltaTime) {
        this.x += Math.cos(this.dir) * deltaTime * this.SPEED;
        this.y += Math.sin(this.dir) * deltaTime * this.SPEED;
    }

    draw (canvas) {
        const ctx = canvas.getContext('2d');
        
        ctx.save();
        ctx.translate(this.x + this.WIDTH / 2, this.y + this.HEIGHT / 2);
        ctx.rotate(this.dir);
        ctx.drawImage(this.image, -this.WIDTH / 2, -this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
        ctx.restore();
    }
}