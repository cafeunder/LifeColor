
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
	changedPanel: boolean;

	constructor(cellMapController: CellMapController, cellPlanter: CellPlanter) {
		this.canvas = global.domController.createCanvas("mainMenuCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MainMenu.width / 2),
			(global.domController.getHeight() - (MainMenu.height + MessageBox.height - MainMenu.line_width)),
			MainMenu.width,
			MainMenu.height
		);
		this.messageBox = new MessageBox();

		// トップページパネル
		this.topPagePanel = new TopPagePanel(cellMapController, cellPlanter, this.messageBox);
		// スタンプパネル
		this.stampPanel = new ItemPanel(
			StampPattern.makeItemPanelElementData(),
			(self: MenuElement, name: string) => {
				self.selected = name == cellPlanter.getStampName();
			},
			(name: string) => {
				cellPlanter.setDrawingTool(DrawingTool.STAMP, name, StampPattern.list[name].map);
			},
			this.messageBox
		);
		// テンプレートパネル
		this.templatePanel = new ItemPanel(
			TemplatePattern.makeItemPanelElementData(),
			() => {},
			(name: string) => {
				cellMapController.setTemplate(
					TemplatePattern.list[name].map,
					TemplatePattern.list[name].leftAlignment
				);
			},
			this.messageBox
		);

		this.visiblePanel = this.topPagePanel;
		this.changedPanel = false;
	}

	update(): void {
		this.messageBox.setMessage("キーボードのMキーでメニューの表示/非表示を切り替えることができます。");

		this.changedPanel = true;
		switch(this.visiblePanel.update(this.canvasDrawer)) {
		case MainMenuChangeStatus.HOLD_PANEL:
			this.changedPanel = false;
			break;
		case MainMenuChangeStatus.GO_TOP_PANEL:
			this.visiblePanel = this.topPagePanel;
			break;
		case MainMenuChangeStatus.GO_STAMP_PANEL:
			this.visiblePanel = this.stampPanel;
			break;
		case MainMenuChangeStatus.GO_TEMPLATE_PANEL:
			this.visiblePanel = this.templatePanel;
			break;
		}
	}

	draw(): void {
		if (this.changedPanel) return;
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect(
			{x: 0, y: 0, width: MainMenu.width, height: MainMenu.height},
			{r: 10, g: 10, b: 10, a: 245}
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

	judgeEnteredMouse(): boolean {
		return this.messageBox.judgeEnteredMouse() || global.mouse.judgeEntered({
			x: this.canvasDrawer.x,
			y: this.canvasDrawer.y,
			width: MainMenu.width,
			height: MainMenu.height
		});
	}
}