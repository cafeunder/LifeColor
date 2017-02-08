
class Program {
	private cellMapView: CellMapView;
	private cellMapController: CellMapController;
	private cellSizeConfigMenu: CellSizeConfigMenu;
	private windowModeMenu: WindowModeMenu;

	constructor() {
		// グローバル要素の生成と初期設定
		global.domController = new DOMController();
		global.mouse = new Mouse();
		global.imageManager = new ImageManager();
		global.fps = new FPS();
		global.domController.setupNormalMode();
		// global.domController.setupFullScreenMode();
		global.fps.drawing = true;
		global.imageManager.load();

		// セルマップの生成と初期設定
		this.cellMapController = new CellMapController();
		this.cellMapController.setAlternationInterval(20);

		global.domController.resize = () => {
			this.cellMapController.resize();
			this.windowModeMenu.changeCanvas(
				global.domController.getWidth() - 10,
				10,
			);
			this.cellSizeConfigMenu.changeCanvas(
				global.domController.getWidth() - this.windowModeMenu.width - 15,
				10,
			);
			this.windowModeMenu.syncWindowMode();
		};

		// リサイズ時の動作を定義
		var queue = null;
		window.addEventListener("resize", () => {
			if (!global.domController.fullScreen) { return; }
			clearTimeout(queue);
			queue = setTimeout(() => {
				global.domController.setupFullScreenMode();
			}, 60 );
		}, false );

		// 画像読み込みの監視
		var check = setInterval(() => {
			if (global.imageManager.checkLoadCompleted()) {
				clearInterval(check);
				this.windowModeMenu = new WindowModeMenu(
					global.domController.getWidth() - 10,
					10,
				);
				this.cellSizeConfigMenu = new CellSizeConfigMenu(
					global.domController.getWidth() - this.windowModeMenu.width - 15,
					10,
					this.cellMapController
				);

				// 画像の読み込みが完了したらメインループ開始
				setInterval(() => {
					global.mouse.update();
					global.fps.update();
					this.cellSizeConfigMenu.update();
					this.cellMapController.update();
					this.windowModeMenu.update();

					this.windowModeMenu.draw();
					this.cellSizeConfigMenu.draw();
					global.fps.draw();
				}, 33);
			}
		}, 10);
	}
}

var program = new Program();