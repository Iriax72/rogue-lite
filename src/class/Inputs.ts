export class Inputs {
    canvas: HTMLCanvasElement;
    keys: {[key: string]: boolean} = {};
    mouse = {x: 0, y: 0, down: false}

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        window.addEventListener('keydown', (e: KeyboardEvent): void => {
            this.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e: KeyboardEvent): void => {
            this.keys[e.key] = false;
        });

        this.canvas.addEventListener('mousedown', (e: MouseEvent): void => {
            this.mouse.down = true;
        });
        this.canvas.addEventListener('mouseup', (e: MouseEvent): void => {
            this.mouse.down = false;
        });
        this.canvas.addEventListener('mousemove', (e: MouseEvent): void => {
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