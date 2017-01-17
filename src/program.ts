
class Program {
	cellMapView: CellMapView;
	cellMapController: CellMapController;
	domController: DOMController;

	constructor() {
		this.domController = new DOMController();
		this.domController.initialize();
		// this.domController.setupNormalMode();
		this.domController.setupFullScreenMode();

		this.cellMapController = new CellMapController(this.domController);
		this.cellMapController.setAlternationInterval(20);
		setInterval(() => {
			this.cellMapController.update();
		}, 33);

		var queue = null;
		window.addEventListener("resize", () => {
			if (!this.domController.fullScreen) { return; }
			clearTimeout(queue);
			queue = setTimeout(() => {
				this.domController.setupFullScreenMode();
				this.cellMapController.resize();
			}, 60 );
		}, false );
	}
}

var program = new Program();