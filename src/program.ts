
class Program {
	private cellMapView: CellMapView;
	private cellMapController: CellMapController;
	private cellSizeConfigMenu: CellSizeConfigMenu;

	constructor() {
		global.domController = new DOMController();
		global.mouse = new Mouse();
		global.imageManager = new ImageManager();
		global.fps = new FPS();

		// this.domController.setupNormalMode();
		global.domController.setupFullScreenMode();
		global.fps.drawing = true;

		this.cellMapController = new CellMapController();
		this.cellMapController.setAlternationInterval(20);
		setInterval(() => {
			global.mouse.update();
			global.fps.update();
			this.cellSizeConfigMenu.update();
			this.cellMapController.update();

			this.cellSizeConfigMenu.draw();
			global.fps.draw();
		}, 33);

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

		global.imageManager.load();
		var check = setInterval(() => {
			if (global.imageManager.checkLoadCompleted()) {
				clearInterval(check);
				this.cellSizeConfigMenu = new CellSizeConfigMenu(this.cellMapController);
				this.cellSizeConfigMenu.draw();
			}
		}, 10);
	}
}

var program = new Program();