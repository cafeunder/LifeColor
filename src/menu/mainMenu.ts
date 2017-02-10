
class MainMenu {
	private static line_width = 2;
	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;
	static width = 838;
	static height = 76;

	messageBox: MessageBox;
	mainTopMenu: MainTopMenu;
	mainStampMenu: MainItemMenu;

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
		this.mainTopMenu = new MainTopMenu();
		this.mainStampMenu = new MainItemMenu(
			[
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",
				"stamp_block",

				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
				"stamp_tab",
			]
		);
	}

	update(): void {
		this.mainStampMenu.update(this.canvasDrawer);
		// this.mainTopMenu.update(this.canvasDrawer);
	}

	draw(): void {
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect(
			{x: 0, y: 0, width: MainMenu.width, height: MainMenu.height},
			{r: 10, g: 10, b: 10, a: 230}
		);
		this.canvasDrawer.drawRect(
			{x: 0, y: 0, width: MainMenu.width, height: MainMenu.height},
			{r: 128, g: 128, b: 128, a: 255},
			false,
			MainMenu.line_width
		);

		this.messageBox.draw();
		this.mainStampMenu.draw(this.canvasDrawer);
		// this.mainTopMenu.draw(this.canvasDrawer);
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