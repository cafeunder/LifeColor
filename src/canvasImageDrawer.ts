
class CanvasImageDrawer extends CanvasDrawer {
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
	}

	drawImage(
		image: HTMLImageElement,
		x: number,
		y: number,
		alpha?: number
	): void {
		if (alpha) this.context.globalAlpha = alpha;
		this.context.drawImage(image, x, y);
		if (alpha) this.context.globalAlpha = 1.0;
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

	drawText(
		text: string,
		x: number,
		y: number,
		color: Color,
	): void {
		this.context.textAlign = "left";
		this.context.textBaseline = "top";
		this.context.fillStyle = "rgba("+color.r+","+color.g+","+color.b+","+(color.a/255)+")";
		this.context.beginPath();
		this.context.fillText(text, x, y);
	}

	clear(): void {
		this.context.clearRect(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	}

	getStringTextWidth(text: string): number {
		return this.context.measureText(text).width;
	}

	setFont(font: string): void {
		this.context.font = font;
	}
}