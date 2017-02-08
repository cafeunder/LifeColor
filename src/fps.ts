
class FPS {
	static sampleFract = 10;
	drawing = false;
	private value = 0;
	private start = 0;
	private sampleNum = 0;
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	constructor() {
		this.canvas = global.domController.createCanvas("fpsCanvas", 100);
		this.canvas.width = 60;
		this.canvas.height = 30;
		this.context = this.canvas.getContext("2d");
		this.context.font = "16px 'Noto Sans Japanese'";
		this.context.fillStyle = "rgba(255,255,255,1.0)";
	}

	update(): void {
		if (this.sampleNum == 0) {
			this.start = +new Date();
		}
		if (this.sampleNum == FPS.sampleFract) {
			var end = +new Date();
			this.value = 1000.0 / ((end - this.start)/FPS.sampleFract);
			this.sampleNum = 0;
		} else ++this.sampleNum;
	}

	draw(): void {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.drawing) {
			this.context.beginPath();

			var rounded = Math.round(this.value * 100) / 100;
			this.context.fillText(rounded + "", 10, 18);
		}
	}
}