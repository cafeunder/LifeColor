
class CanvasImageDrawer extends CanvasDrawer {
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
	}

	drawImage(
		image: HTMLImageElement,
		x: number,
		y: number,
	): void {
		this.context.drawImage(image, x, y);
	}

	drawRect(
		x: number,
		y: number,
		width: number,
		height: number,
		lineWidth: number,
		color: Color,
		fill: boolean = false
	): void {
		var dx = Math.floor(x);
		var dy = Math.floor(y);

		if (lineWidth %2 != 0) {
			dx -= 0.5;
			dy -= 0.5;
		}

		const rgba = "rgba("+color.r+","+color.g+","+color.b+","+(color.a/255)+")";
		console.log(rgba);
		if (fill) {
			this.context.fillStyle = rgba;
			this.context.fillRect(dx, dy, Math.floor(width), Math.floor(height));
		} else {
			this.context.lineWidth = lineWidth;
			this.context.strokeStyle = rgba;
			this.context.strokeRect(dx, dy, Math.floor(width), Math.floor(height));
		}
	}

	clear(): void {
		this.context.clearRect(
			0,
			0,
			parseInt(this.canvas.style.width),
			parseInt(this.canvas.style.height)
		);
	}
}