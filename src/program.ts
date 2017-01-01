
class Program {
	mainCanvas: HTMLCanvasElement;
	constructor() {
		this.mainCanvas = Program.createCanvas("mainCanvas", 3);
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