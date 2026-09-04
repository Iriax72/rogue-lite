export class Player {
    x;
    y;
    WIDTH = 10;
    HEIGHT = 16;
    SPEED = 0.1; // pixels / ms

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update(deltaTime, keys) {
        this.move(deltaTime, keys);
    }

    move(deltaTime, keys) {
        let v = {x: 0, y: 0};

        if (keys['ArrowUp'] || keys['w'])
            { v.y -= 1; }
        if (keys['ArrowDown'] || keys['s'])
            { v.y += 1; }
        if (keys['ArrowLeft'] || keys['a'])
            { v.x -= 1; }
        if (keys['ArrowRight'] || keys['d'])
            { v.x += 1; }

        const length = Math.sqrt(v.x **2 + v.y **2);
        if (length > 0) {
            v.x /= length;
            v.y /= length;
        }

        v.x *= this.SPEED;
        v.y *= this.SPEED;

        this.x += v.x * deltaTime;
        this.y += v.y * deltaTime;
    }
}