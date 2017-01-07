
class Program {
	cellMap: CellMap;
	cellMapView: CellMapView;
	alternateController: AlternateController;

	constructor() {
		this.cellMap = new CellMap(10, 10);
		this.alternateController = new AlternateController(this.cellMap);
		this.alternateController.setAlternationInterval(20);
		this.cellMapView = new CellMapView(
			this.cellMap,
			Program.createCanvas("cellCanvas", 1),
			Program.createCanvas("gridCanvas", 2)
		);
		setInterval(() => {
			this.alternateController.update();
			this.cellMapView.draw();
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