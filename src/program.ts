
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
		// this.domController.setupNormalMode();
		global.domController.setupFullScreenMode();
		global.fps.drawing = true;
		global.imageManager.load();

		// セルマップの生成と初期設定
		this.cellMapController = new CellMapController();
		this.cellMapController.setAlternationInterval(20);

		// リサイズ時の動作を定義
		var queue = null;
		window.addEventListener("resize", () => {
			if (!global.domController.fullScreen) { return; }
			clearTimeout(queue);
			queue = setTimeout(() => {
				global.domController.setupFullScreenMode();
				this.cellMapController.resize();
				this.cellSizeConfigMenu.changeCanvas();
			}, 60 );
		}, false );

		// 画像読み込みの監視
		var check = setInterval(() => {
			if (global.imageManager.checkLoadCompleted()) {
				clearInterval(check);
				this.cellSizeConfigMenu = new CellSizeConfigMenu(this.cellMapController);
				this.windowModeMenu = new WindowModeMenu();

				// 画像の読み込みが完了したらメインループ開始
				setInterval(() => {
					global.mouse.update();
					global.fps.update();
					this.cellSizeConfigMenu.update();
					this.cellMapController.update();

					this.cellSizeConfigMenu.draw();
					global.fps.draw();
				}, 33);
			}
		}, 10);
	}
}

var program = new Program();