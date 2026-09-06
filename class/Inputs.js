export class Inputs {
    canvas;
    keys = {};
    mouse = {x: 0, y: 0, down: false}

    constructor(canvas) {
        this.canvas = canvas;

        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse.down = true;
        });
        this.canvas.addEventListener('mouseup', (e) => {
            this.mouse.down = false;
        });
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }

    /*
    getKeys() {
        return this.keys;
    }
    */
}