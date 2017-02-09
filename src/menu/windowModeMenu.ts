
class WindowModeMenu {
	private static element_size = 28;
	private static margin = 8;

	width: number;
	height: number;
	private element: MenuElement;
	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;

	constructor(rx: number, y: number) {
		this.element = new MenuElement(
			global.imageManager.getImageList(["window_full", "window_normal"]),
			WindowModeMenu.margin,
			WindowModeMenu.margin,
			WindowModeMenu.element_size,
			WindowModeMenu.element_size,
			(self: MenuElement) => {
				if (self.status == 0) {
					global.domController.setupFullScreenMode();
				} else {
					global.domController.setupNormalMode();
				}
			},
			(global.domController.fullScreen) ? 1 : 0
		);
		this.width = WindowModeMenu.element_size + WindowModeMenu.margin * 2;
		this.height = WindowModeMenu.element_size + WindowModeMenu.margin * 2;

		this.canvas = global.domController.createCanvas("windowModeMenuCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.canvasDrawer.changeCanvas(
			rx - this.width,
			y,
			this.width,
			this.height
		);
	}

	update(): void {
		if (global.mouse.judgeEntered({
			x: this.canvasDrawer.x + this.element.x,
			y: this.canvasDrawer.y + this.element.y,
			width: this.element.width,
			height: this.element.height
		})) {
			this.element.mouseover = true;
			if (global.mouse.pointCount == 1) {
				this.element.action(this.element);
			}
		} else {
			this.element.mouseover = false;
		}
	}

	draw(): void {
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect({x: 0, y: 0, width: this.width, height: this.height}, {r: 10, g: 10, b: 10, a: 230});
		this.canvasDrawer.drawRect({x: 1, y: 1, width: this.width - 1, height: this.height - 1}, {r: 128, g: 128, b: 128, a: 255}, false, 1)
		this.canvasDrawer.drawImage(
			(Array.isArray(this.element.img)) ? this.element.img[this.element.status] : this.element.img,
			this.element.x,
			this.element.y
		);

		if (this.element.mouseover) {
			this.canvasDrawer.drawRect({
				x: this.element.x - 2,
				y: this.element.y - 2,
				width: this.element.width + 4,
				height: this.element.height + 4},
				{r: 0, g: 255, b: 160, a: 150}
			);
		}
	}

	clearCanvas(): void {
		this.canvasDrawer.clear();
	}

	changeCanvas(rx: number, y: number): void {
		this.canvasDrawer.changeCanvas(
			rx - this.width,
			y,
			this.width,
			this.height
		);
		this.draw();
	}

	judgeEnteredMouse(): boolean {
		return global.mouse.judgeEntered({
			x: this.canvasDrawer.x,
			y: this.canvasDrawer.y,
			width: this.width,
			height: this.height
		});
	}

	syncWindowMode(): void {
		this.element.status = (global.domController.fullScreen) ? 1 : 0;
	}
}