
class MessageBox {
	private static element_size = 60;
	private static line_width = 2;
	static width = MainMenu.width;
	static height = 32;

	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;
	private message: string;

	constructor() {
		this.canvas = global.domController.createCanvas("messageBoxCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MessageBox.width / 2),
			(global.domController.getHeight() - MessageBox.height),
			MessageBox.width,
			MessageBox.height
		);
		this.message = "";
	}

	draw(): void {
		this.canvasDrawer.setFont("17px MyFont");
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect(
			{x: 0, y: 0, width: MessageBox.width, height: MessageBox.height},
			{r: 10, g: 10, b: 10, a: 245}
		);
		this.canvasDrawer.drawRect(
			{x: 0, y: 0, width: MessageBox.width, height: MessageBox.height},
			{r: 128, g: 128, b: 128, a: 255},
			false,
			MessageBox.line_width
		);

		var color = {r: 255, g: 255, b: 255, a: 255};
		var dx = 6;
		for(var i = 0; i < this.message.length; ++i){
			var c = this.message.charAt(i);

			if(c == "#"){
				++i;
				switch(this.message.charAt(i)){
				case "c":
					color = {r: 0, g: 255, b: 160, a: 255};
					break;
				case "w":
					color = {r: 255, g: 255, b: 255, a: 255};
					break;
				}
				continue;
			}

			this.canvasDrawer.drawText(c, dx, 8, color);
			dx += this.canvasDrawer.getStringTextWidth(c);
		}
	}

	clearCanvas(): void {
		this.canvasDrawer.clear();
	}

	changeCanvas(): void {
		this.canvasDrawer.changeCanvas(
			(global.domController.getWidth() / 2 - MessageBox.width / 2),
			(global.domController.getHeight() - MessageBox.height),
			MessageBox.width,
			MessageBox.height
		);
		this.draw();
	}

	setMessage(message: string): void {
		if (!message) { return; }
		this.message = message;
	}

	judgeEnteredMouse(): boolean {
		return global.mouse.judgeEntered({
			x: this.canvasDrawer.x,
			y: this.canvasDrawer.y,
			width: MessageBox.width,
			height: MessageBox.height
		});
	}
}