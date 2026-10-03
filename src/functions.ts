export type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export function assertDefined<T>(
    value: T | null | undefined,
    message: string
): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(message);
    }
}

export function getImage(id: string): HTMLImageElement {
    const foundImage: HTMLImageElement | null = document.querySelector('img#' + id);
    if (!foundImage) {
        throw new Error(`L'image ${id} n'a pas pu être trouvée`);
    }
    return foundImage;
}

export function getAudio(id: string): HTMLAudioElement {
    const foundAudio: HTMLAudioElement | null = document.querySelector('audio#' + id);
    if (!foundAudio) {
        throw new Error(`L'audio ${id} n'a pas pu être trouvé`);
    }
    return foundAudio;
}

export function collides (r1: Rect, r2: Rect): boolean {
    if (r1.x > r2.x + r2.w) {
        return false;
    }
    if (r1.x + r1.w < r2.x) {
        return false;
    }
    if (r1.y > r2.y + r2.h) {
        return false;
    }
    if (r1.y + r1.h < r2.y) {
        return false;
    }
    return true;
}

export function dist(r1: Rect, r2: Rect): number {
    const dx = Math.max(0, Math.max(r1.x - r2.x + r2.w, r2.x - r1.x + r1.w));
    const dy = Math.max(0, Math.max(r1.y - r2.y + r2.h, r2.y - r1.y + r1.h));
    return Math.sqrt(dx**2 + dy**2);
}

export function extractImgFromSprite(sprite: HTMLImageElement, x: number, y: number, width: number, height: number): HTMLImageElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    assertDefined(ctx, 'Impossible de récupérer le contexte 2D du canvas');

    ctx.drawImage(sprite, x, y, width, height, 0, 0, width, height);
    
    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    return img;
}

export class Vector2D {
    constructor(
        public x: number,
        public y: number
    ) {}

    toRect(): Rect {
        return {x: this.x, y: this.y, w: 0, h: 0};
    }

    normalize(): Vector2D {
        if (this.length() === 0) {
            return new Vector2D(0, 0);
        }

        return new Vector2D(
            this.x / this.length(),
            this.y / this.length()
        )
    }

    length(): number {
        return Math.sqrt(this.x **2 + this.y **2);
    }

    add(v: Vector2D): Vector2D {
        return new Vector2D(
            this.x + v.x,
            this.y + v.y
        )
    }

    amplify(scalar: number): Vector2D {
        return new Vector2D(
            this.x * scalar,
            this.y * scalar
        );
    }
}