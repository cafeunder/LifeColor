
class DOMController {
	body: HTMLBodyElement;
	container: HTMLElement;
	controlCanvas: HTMLCanvasElement;

	initialize(): void {
		this.container = document.getElementById("canvasContainer");
		this.controlCanvas = this.createCanvas("controlCanvas", 0);
		this.body = <HTMLBodyElement>document.getElementById('lifeBody');
	}

	setupNormalMode(): void {
		document.getElementById("mainDiv").style.display = "block";
		document.getElementById("copyright").style.display = "block";
		this.body.style.overflow = "auto";
		this.container.style.position = "relative";
		this.container.style.width = 960 + "px";
		this.container.style.height = 768 + "px";
	}

	createCanvas(id: string, zIndex: number): HTMLCanvasElement {
		const canvas = document.createElement("canvas");
		canvas.style.position = "absolute";
		canvas.style.display = "block";
		canvas.id = id;
		canvas.style.zIndex = zIndex+"";
		document.getElementById("canvasContainer").appendChild(canvas);
		return canvas;
	}
}