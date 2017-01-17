
class DOMController {
	private static min_screen_width = 960;
	private static min_screen_height = 786;
	body: HTMLBodyElement;
	container: HTMLElement;
	controlCanvas: HTMLCanvasElement;
	fullScreen: boolean;

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
		this.container.style.width = DOMController.min_screen_width + "px";
		this.container.style.height = DOMController.min_screen_height + "px";
		this.fullScreen = false;
	}

	setupFullScreenMode(): void {
		document.getElementById("mainDiv").style.display = "none";
		document.getElementById("copyright").style.display = "none";

		this.container.style.margin = "0em";
		if (window.innerWidth < DOMController.min_screen_width
			|| window.innerHeight < DOMController.min_screen_height) {
			this.body.style.overflow = "auto";
			this.container.style.position = "static";
		} else {
			this.body.style.overflow = "hidden";
			this.container.style.position = "fixed";
		}

		this.container.style.width = Math.max(window.innerWidth, DOMController.min_screen_width) + "px";
		this.container.style.height = Math.max(window.innerHeight, DOMController.min_screen_height) + "px";
		this.fullScreen = true;
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