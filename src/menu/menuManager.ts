
class MenuManager {
	static outer_margin = 10;
	static bitween_menu = 5;

	windowModeMenu: WindowModeMenu;
	cellSizeConfigMenu: CellSizeConfigMenu;
	mainMenu: MainMenu;
	private visible: boolean;

	constructor(cellMapController: CellMapController) {
		this.windowModeMenu = new WindowModeMenu(
			global.domController.getWidth() - MenuManager.outer_margin,
			MenuManager.outer_margin,
		);
		this.cellSizeConfigMenu = new CellSizeConfigMenu(
			global.domController.getWidth() - (this.windowModeMenu.width + MenuManager.outer_margin + MenuManager.bitween_menu),
			MenuManager.outer_margin,
			cellMapController
		);
		this.mainMenu = new MainMenu();
		this.visible = true;
	}

	changeCanavs(): void {
		this.windowModeMenu.changeCanvas(
			global.domController.getWidth() - MenuManager.outer_margin,
			MenuManager.outer_margin,
		);
		this.cellSizeConfigMenu.changeCanvas(
			global.domController.getWidth() - (this.windowModeMenu.width + MenuManager.outer_margin + MenuManager.bitween_menu),
			MenuManager.outer_margin,
		);
		this.mainMenu.changeCanvas();

		this.windowModeMenu.syncWindowMode();
	}

	update(): void {
		if (this.visible) {
			this.cellSizeConfigMenu.update();
			this.windowModeMenu.update();
			this.mainMenu.update();
		}

		if (global.keyboard.keyCountList[Keyboard.KEY_M] == 1) {
			this.visible = !this.visible;
			if (!this.visible) {
				this.cellSizeConfigMenu.clearCanvas();
				this.windowModeMenu.clearCanvas();
				this.mainMenu.clearCanvas();
			}
		}
	}

	draw(): void {
		if (!this.visible) return;
		this.cellSizeConfigMenu.draw();
		this.windowModeMenu.draw();
		this.mainMenu.draw();
	}

	judgeMouseOnMenu(): boolean {
		return this.visible && (
			this.cellSizeConfigMenu.judgeEnteredMouse()
			|| this.windowModeMenu.judgeEnteredMouse()
		);
	}
}