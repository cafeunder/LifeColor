
interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}

class CanvasDrawer {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private imageData: ImageData;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.imageData = this.context.createImageData(
			this.canvas.width,
			this.canvas.height
		);
	}

	changeCanvas(left: number, top: number, width: number, height: number): void {
		this.canvas.style.left = left + "px";
		this.canvas.style.top = top + "px";
		this.canvas.width = width;
		this.canvas.height = height;
		this.imageData = this.context.createImageData(
			this.canvas.width,
			this.canvas.height
		);
	}

	reflesh(): void {
		this.context.putImageData(this.imageData, 0, 0);
	}

	drawRect(
		rect: Rect,
		color: Color
	): void {
		const bitmap = this.imageData.data;
		for (var dy = 0; dy < rect.height; ++dy) {
			for (var dx = 0; dx < rect.width; ++dx) {
				const base = ((rect.x + dx) + (rect.y + dy) * this.canvas.width) * 4;
				bitmap[base] = color.r;
				bitmap[base + 1] = color.g;
				bitmap[base + 2] = color.b;
				bitmap[base + 3] = color.a;
			}
		}
	}

	getPixel(x: number, y: number, offset: number): number {
		return this.imageData.data[(x + y * this.canvas.width) * 4 + offset];
	}
}