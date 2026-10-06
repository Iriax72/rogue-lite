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