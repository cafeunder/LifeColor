
class MainMenu {
	private static element_size = 60;
	private static line_width = 2;
	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;
	static width = 838;
	static height = 76;

	messageBox: MessageBox;

	constructor() {
		this.canvas = global.domController.createCanvas("mainMenuCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MainMenu.width / 2),
			(global.domController.getHeight() - (MainMenu.height + MessageBox.height - MainMenu.line_width)),
			MainMenu.width,
			MainMenu.height
		);
		this.messageBox = new MessageBox();
	}

	draw(): void {
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect({
			x: 0,
			y: 0,
			width: MainMenu.width,
			height: MainMenu.height
		}, {r: 10, g: 10, b: 10, a: 230});
		this.canvasDrawer.drawRect({
			x: Math.floor(MainMenu.line_width / 2),
			y: Math.floor(MainMenu.line_width / 2),
			width: MainMenu.width - MainMenu.line_width,
			height: MainMenu.height - MainMenu.line_width
		}, {r: 128, g: 128, b: 128, a: 255}, false, MainMenu.line_width);

		this.messageBox.draw();
	}

	clearCanvas(): void {
		this.canvasDrawer.clear();
		this.messageBox.clearCanvas();
	}

	changeCanvas(): void {
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MainMenu.width / 2),
			(global.domController.getHeight() - (MainMenu.height + MessageBox.height - MainMenu.line_width)),
			MainMenu.width,
			MainMenu.height
		);
		this.messageBox.changeCanvas();
		this.draw();
	}
}