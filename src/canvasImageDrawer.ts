
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
		rect: Rect,
		color: Color,
		fill: boolean = true,
		lineWidth: number = 2
	): void {
		var dx = Math.floor(rect.x);
		var dy = Math.floor(rect.y);

		if (lineWidth % 2 != 0) {
			dx -= 0.5;
			dy -= 0.5;
		}

		if (!fill) {
			dx += Math.ceil(lineWidth / 2);
			dy += Math.ceil(lineWidth / 2);
			rect.width -= lineWidth;
			rect.height -= lineWidth;
		}

		const rgba = "rgba("+color.r+","+color.g+","+color.b+","+(color.a/255)+")";
		if (fill) {
			this.context.fillStyle = rgba;
			this.context.fillRect(dx, dy, Math.floor(rect.width), Math.floor(rect.height));
		} else {
			this.context.lineWidth = lineWidth;
			this.context.strokeStyle = rgba;
			this.context.strokeRect(dx, dy, Math.floor(rect.width), Math.floor(rect.height));
		}
	}

	clear(): void {
		this.context.clearRect(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	}
}