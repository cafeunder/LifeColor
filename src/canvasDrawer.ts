
interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
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

	reflesh(): void {
		this.context.putImageData(this.imageData, 0, 0);
	}

	drawRect(
		x: number,
		y: number,
		width: number,
		height: number,
		color: Color
	): void {
		const bitmap = this.imageData.data;
		for (var dy = 0; dy < height; ++dy) {
			for (var dx = 0; dx < width; ++dx) {
				const base = ((x + dx) + (y + dy) * this.canvas.width) * 4;
				bitmap[base] = color.r;
				bitmap[base + 1] = color.g;
				bitmap[base + 2] = color.b;
				bitmap[base + 3] = color.a;
			}
		}
	}
}