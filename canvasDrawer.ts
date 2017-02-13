
abstract class CanvasDrawer {
	x: number;
	y: number;
	protected canvas: HTMLCanvasElement;
	protected context: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.x = parseInt(this.canvas.style.left);
		this.y = parseInt(this.canvas.style.top);
	}

	changeCanvas(left: number, top: number, width: number, height: number): void {
		this.canvas.style.left = left + "px";
		this.canvas.style.top = top + "px";
		this.canvas.width = width;
		this.canvas.height = height;
		this.x = left;
		this.y = top;
	}
}