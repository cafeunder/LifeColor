
class MessageBox {
	private static element_size = 60;
	private static line_width = 2;
	static width = MainMenu.width;
	static height = 32;

	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;

	constructor() {
		this.canvas = global.domController.createCanvas("messageBoxCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MessageBox.width / 2),
			(global.domController.getHeight() - MessageBox.height),
			MessageBox.width,
			MessageBox.height
		);
	}

	draw(): void {
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect({
			x: 0,
			y: 0,
			width: MessageBox.width,
			height: MessageBox.height
		}, {r: 10, g: 10, b: 10, a: 230});
		this.canvasDrawer.drawRect({
			x: Math.floor(MessageBox.line_width / 2),
			y: Math.floor(MessageBox.line_width / 2),
			width: MessageBox.width - MessageBox.line_width,
			height: MessageBox.height - MessageBox.line_width
		}, {r: 128, g: 128, b: 128, a: 255}, false, MessageBox.line_width);
	}

	clearCanvas(): void {
		this.canvasDrawer.clear();
	}

	changeCanvas(): void {
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MessageBox.width / 2),
			(global.domController.getHeight() - MessageBox.height),
			MessageBox.width,
			MessageBox.height
		);
		this.draw();
	}
}