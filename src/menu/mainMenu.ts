
const enum MainMenuChangeStatus {
	HOLD_PANEL,
	GO_TOP_PANEL,
	GO_STAMP_PANEL,
	GO_TEMPLATE_PANEL
}

class MainMenu {
	private static line_width = 2;
	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;
	static width = 838;
	static height = 76;

	messageBox: MessageBox;
	topPagePanel: TopPagePanel;
	stampPanel: ItemPanel;
	templatePanel: ItemPanel;
	visiblePanel: MainMenuPanel;

	constructor(cellMapInterface: CellMapInterface) {
		this.canvas = global.domController.createCanvas("mainMenuCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MainMenu.width / 2),
			(global.domController.getHeight() - (MainMenu.height + MessageBox.height - MainMenu.line_width)),
			MainMenu.width,
			MainMenu.height
		);
		this.messageBox = new MessageBox();
		this.topPagePanel = new TopPagePanel();
		this.stampPanel = new ItemPanel(
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
		this.templatePanel = new ItemPanel(
			[
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",
				"template_lake",

				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
				"template_bakery",
			]
		);

		this.visiblePanel = this.topPagePanel;
	}

	update(): void {
		switch(this.visiblePanel.update(this.canvasDrawer)) {
		case MainMenuChangeStatus.HOLD_PANEL:
			break;
		case MainMenuChangeStatus.GO_TOP_PANEL:
			this.visiblePanel = this.topPagePanel;
			break;
		case MainMenuChangeStatus.GO_STAMP_PANEL:
			this.visiblePanel = this.stampPanel;
			break;
		case MainMenuChangeStatus.GO_TEMPLATE_PANEL:
			this.visiblePanel = this.templatePanel;
		}
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
		this.visiblePanel.draw(this.canvasDrawer);
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