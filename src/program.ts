
class Program {
	cellMapView: CellMapView;
	cellMapController: CellMapController;
	cellSizeConfigMenu: CellSizeConfigMenu;

	constructor() {
		global.domController = new DOMController();
		global.mouse = new Mouse();
		global.imageManager = new ImageManager();

		// this.domController.setupNormalMode();
		global.domController.setupFullScreenMode();

		this.cellMapController = new CellMapController();
		this.cellMapController.setAlternationInterval(20);
		setInterval(() => {
			global.mouse.update();
			this.cellMapController.update();
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