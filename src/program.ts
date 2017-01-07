
class Program {
	cellMap: CellMap;
	cellMapView: CellMapView;
	cellMapController: CellMapController;

	constructor() {
		this.cellMap = new CellMap(100, 100);
		this.cellMapView = new CellMapView(
			this.cellMap,
			Program.createCanvas("cellCanvas", 1),
			Program.createCanvas("gridCanvas", 2)
		);
		this.cellMapController = new CellMapController(this.cellMap, this.cellMapView);
		this.cellMapController.setAlternationInterval(20);
		setInterval(() => {
			this.cellMapController.update();
		}, 33);
	}

	static createCanvas(id: string, zIndex: number): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		canvas.style.position = "absolute";
		canvas.style.display = "block";
		canvas.id = id;
		canvas.style.zIndex = zIndex+"";
		document.getElementById("canvasContainer").appendChild(canvas);
		return canvas;
	}
}

var program = new Program();