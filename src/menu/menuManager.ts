
/**
 * 画面上にある各種メニューを管理するクラス
 */
class MenuManager {
	static outer_margin = 10;
	static bitween_menu = 5;

	windowModeMenu: WindowModeMenu;
	cellSizeConfigMenu: CellSizeConfigMenu;
	mainMenu: MainMenu;
	private visible: boolean;

	constructor(cellMapController: CellMapController, cellPlanter: CellPlanter) {
		// ウィンドウモードメニュー
		this.windowModeMenu = new WindowModeMenu(
			global.domController.getWidth() - MenuManager.outer_margin,
			MenuManager.outer_margin,
		);
		// セルサイズメニュー
		// ウィンドウモードメニューに対する相対位置に配置する
		this.cellSizeConfigMenu = new CellSizeConfigMenu(
			global.domController.getWidth() - (this.windowModeMenu.width + MenuManager.outer_margin + MenuManager.bitween_menu),
			MenuManager.outer_margin,
			cellMapController
		);
		// メインメニュー
		this.mainMenu = new MainMenu(cellMapController, cellPlanter);
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
	}

	update(): void {
		if (this.visible) {
			this.cellSizeConfigMenu.update();
			this.windowModeMenu.update();
			this.mainMenu.update();
		}

		if (global.keyboard.check(Keyboard.KEY_M) == 1) {
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
			|| this.mainMenu.judgeEnteredMouse()
		);
	}
}
