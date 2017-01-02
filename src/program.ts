class Program {
	mainCanvas: HTMLCanvasElement;
	cellMap: CellMap;
	constructor() {
		this.mainCanvas = Program.createCanvas("mainCanvas", 3);
		this.cellMap = new CellMap(10, 10);
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