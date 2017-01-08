
class Program {
	cellMapView: CellMapView;
	cellMapController: CellMapController;
	domController: DOMController;

	constructor() {
		this.domController = new DOMController();
		this.domController.initialize();
		this.domController.setupNormalMode();

		this.cellMapController = new CellMapController(this.domController);
		this.cellMapController.setAlternationInterval(20);
		setInterval(() => {
			this.cellMapController.update();
		}, 33);
	}
}

var program = new Program();