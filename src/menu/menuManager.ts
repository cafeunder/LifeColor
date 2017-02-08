
class MenuManager {
	static outer_margin = 10;
	static bitween_menu = 5;
	windowModeMenu: WindowModeMenu;
	cellSizeConfigMenu: CellSizeConfigMenu;

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

		this.windowModeMenu.syncWindowMode();
	}

	update(): void {
		this.cellSizeConfigMenu.update();
		this.windowModeMenu.update();
	}

	draw(): void {
		this.cellSizeConfigMenu.draw();
		this.windowModeMenu.draw();
	}

	judgeMouseOnMenu(): boolean {
		return (
			this.cellSizeConfigMenu.judgeEnteredMouse()
			|| this.windowModeMenu.judgeEnteredMouse()
		);
	}
}