

class CellSizeConfigMenu {
	private static element_size = 34;
	private static element_between_space = 5;
	private static inner_margin = 5;
	private static element_imagename_list = [
		"cellSize_big",
		"cellSize_mid",
		"cellSize_small"
	];

	private cellMapController: CellMapController;
	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;
	private elementList: MenuElement[];
	private selectedElement: MenuElement;
	private width: number;
	private height: number;

	constructor(rx: number, y: number, cellMapController: CellMapController) {
		this.cellMapController = cellMapController;
		this.canvas = global.domController.createCanvas("cellSizeConfigMenuCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);

		this.createMenuElement();
		this.canvasDrawer.changeCanvas(
			rx - this.width,
			y,
			this.width,
			this.height
		);

		this.selectElement(this.elementList[0], false);
	}

	update(): void {
		this.elementList.forEach((elm: MenuElement) => {
			if (global.mouse.judgeEntered({
				x: this.canvasDrawer.x + elm.x,
				y: this.canvasDrawer.y + elm.y,
				width: elm.width,
				height: elm.height
			})) {
				elm.mouseover = true;
				if (global.mouse.pointCount == 1) {
					this.selectElement(elm);
				}
			} else {
				elm.mouseover = false;
			}
		});
	}

	draw(): void {
		this.canvasDrawer.clear();
		this.canvasDrawer.drawRect({x: 0, y: 0, width: this.width, height: this.height}, {r: 10, g: 10, b: 10, a: 230});
		this.canvasDrawer.drawRect({x: 0, y: 0, width: this.width, height: this.height}, {r: 128, g: 128, b: 128, a: 255}, false, 1)
		this.elementList.forEach((elm: MenuElement) => {
			this.canvasDrawer.drawImage(
				elm.getImage(),
				elm.x + Math.floor(elm.width / 2 - elm.getImage().width / 2),
				elm.y + Math.floor(elm.height / 2 - elm.getImage().height / 2)
			);

			if (elm.mouseover) {
				this.canvasDrawer.drawRect({x: elm.x, y: elm.y, width: elm.width, height: elm.height}, {r: 0, g: 255, b: 160, a: 150});
			}
			if (elm.selected) {
				this.canvasDrawer.drawRect({x: elm.x, y: elm.y, width: elm.width, height: elm.height}, {r: 0, g: 250, b: 160, a: 255}, false, 2);
			}
		});
	}

	clearCanvas(): void {
		this.canvasDrawer.clear();
	}

	selectElement(element: MenuElement, doAction: boolean = true): void {
		if (element == this.selectedElement) return;
		if (this.selectedElement) {
			this.selectedElement.selected = false;
		}

		element.selected = true;
		this.selectedElement = element;
		if (doAction) element.action(element);
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

	private createMenuElement(): void {
		this.elementList = [];
		var count: number = 0;
		CellSizeConfigMenu.element_imagename_list.forEach((imgname: string) => {
			var index = count;
			this.elementList.push(
				new MenuElement(
					Array.isArray(imgname) ? global.imageManager.getImageList(imgname) : global.imageManager.imageMap[imgname],
					CellSizeConfigMenu.inner_margin + (CellSizeConfigMenu.element_size + CellSizeConfigMenu.element_between_space) * count,
					CellSizeConfigMenu.inner_margin,
					CellSizeConfigMenu.element_size,
					CellSizeConfigMenu.element_size,
					() => {
						this.cellMapController.setCellPropertyIndex(index);
					}
				)
			);
			++count;
		})

		this.width =
			CellSizeConfigMenu.inner_margin * 2
			+ CellSizeConfigMenu.element_size * count
			+ CellSizeConfigMenu.element_between_space * (count - 1);
		this.height =
			CellSizeConfigMenu.inner_margin * 2
			+ CellSizeConfigMenu.element_size;
	}
}
