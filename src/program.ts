
class Program {
	private cellMapView: CellMapView;
	private cellMapController: CellMapController;
	private menuManager: MenuManager;

	constructor() {
		// グローバル要素の生成と初期設定
		global.domController = new DOMController();
		global.mouse = new Mouse();
		global.keyboard = new Keyboard();
		global.imageManager = new ImageManager();
		global.fps = new FPS();
		global.fps.drawing = true;
		global.domController.setupNormalMode();
		global.imageManager.load();

		// セルマップの生成と初期設定
		this.cellMapController = new CellMapController();
		this.cellMapController.setAlternationInterval(20);

		global.domController.resize = () => {
			this.cellMapController.resize();
			this.menuManager.changeCanavs();
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

		var check = setInterval(() => {
			// 画像読み込みの監視
			if (global.imageManager.checkLoadCompleted()) {
				clearInterval(check);
				this.menuManager = new MenuManager(this.cellMapController.getInterface());

				// 画像の読み込みが完了したらメインループ開始
				setInterval(() => {
					global.fps.update();
					global.mouse.update();
					global.keyboard.update();
					this.cellMapController.update();
					this.menuManager.update();

					this.menuManager.draw();
					global.fps.draw();
				}, 33);
			}
		}, 10);
	}
}

var program = new Program();