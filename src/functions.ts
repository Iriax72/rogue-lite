type Rect = {
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