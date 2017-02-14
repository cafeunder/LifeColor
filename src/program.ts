
/**
 * エントリーポイントとなるクラス
 */
class Program {
	private cellPlanter: CellPlanter;
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
		this.cellPlanter = new CellPlanter(this.cellMapController);

		// キャンバスリサイズ時の動作を定義
		global.domController.resize = () => {
			this.cellMapController.resize();
			this.cellPlanter.changeCanvas();
			this.menuManager.changeCanavs();
		};

		// ブラウザリサイズ時の動作を定義
		var queue = null;
		window.addEventListener("resize", () => {
			if (!global.domController.fullScreen) { return; }
			clearTimeout(queue);
			queue = setTimeout(() => {
				global.domController.setupFullScreenMode();
			}, 60 );
		}, false );

		// メインループ
		var check = setInterval(() => {
			// 画像読み込みの監視
			if (global.imageManager.checkLoadCompleted()) {
				clearInterval(check);
				this.menuManager = new MenuManager(this.cellMapController, this.cellPlanter);
				this.cellPlanter.setMenuOnMouse(this.menuManager.judgeMouseOnMenu.bind(this.menuManager));

				// 画像の読み込みが完了したらメインループ開始
				setInterval(() => {
					global.fps.update();
					global.mouse.update();
					global.keyboard.update();
					this.cellPlanter.update();
					this.cellMapController.update();
					this.menuManager.update();

					this.cellPlanter.draw();
					this.menuManager.draw();
					global.fps.draw();
				}, 33);
			}
		}, 10);
	}
}

var program = new Program();
