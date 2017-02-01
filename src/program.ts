
class Program {
	cellMapView: CellMapView;
	cellMapController: CellMapController;
	cellSizeConfigMenu: CellSizeConfigMenu;
	domController: DOMController;

	constructor() {
		this.domController = new DOMController();
		this.domController.initialize();
		// this.domController.setupNormalMode();
		this.domController.setupFullScreenMode();

		this.cellMapController = new CellMapController(this.domController);
		this.cellMapController.setAlternationInterval(20);
		setInterval(() => {
			Mouse.update();
			this.cellMapController.update();
		}, 33);

		var queue = null;
		window.addEventListener("resize", () => {
			if (!this.domController.fullScreen) { return; }
			clearTimeout(queue);
			queue = setTimeout(() => {
				this.domController.setupFullScreenMode();
				this.cellMapController.resize();
				this.cellSizeConfigMenu.changeCanvas();
			}, 60 );
		}, false );

		ImageManager.load();
		var check = setInterval(() => {
			if (ImageManager.checkLoadCompleted()) {
				clearInterval(check);
				this.cellSizeConfigMenu = new CellSizeConfigMenu(this.cellMapController, this.domController);
				this.cellSizeConfigMenu.draw();
			}
		}, 10);

		Mouse.setEventListener(this.domController);
	}
}

var program = new Program();