
class CellMapView {
	domController: DOMController;
	cellMap: CellMap;
	cellCanvas: HTMLCanvasElement;
	cellCanvasDrawer: CanvasBitmapDrawer;
	gridCanvas: HTMLCanvasElement;
	gridCanvasDrawer: CanvasBitmapDrawer;

	cellProperty: CellProperty;
	cellColorMap: Color[];

	constructor(cellMap: CellMap, cellProperty: CellProperty, domController: DOMController) {
		this.domController = domController;
		this.cellMap = cellMap;

		this.cellCanvas = domController.createCanvas("cellCanvas", 2);
		this.gridCanvas = domController.createCanvas("gridCanvas", 1);
		this.cellCanvasDrawer = new CanvasBitmapDrawer(this.cellCanvas);
		this.gridCanvasDrawer = new CanvasBitmapDrawer(this.gridCanvas);

		this.setCellProperty(cellProperty, cellMap.xNum, cellMap.yNum);
	}

	drawCell(): void {
		for (var y = 0; y < this.cellMap.yNum; ++y) {
			for (var x = 0; x < this.cellMap.xNum; ++x) {
				if (this.cellMap.map[y][x]) {
					this.cellCanvasDrawer.drawRect(
						this.getRect(x, y),
						this.cellColorMap[y][x]
					);
				} else {
					this.cellCanvasDrawer.drawRect(
						this.getRect(x, y),
						{ r: 0, g: 0, b: 0, a: 0 }
					);
				}
			}
		}
		this.cellCanvasDrawer.reflesh();
	}

	drawDifferenceCell(): void {
		for (var y = 0; y < this.cellMap.yNum; ++y) {
			for (var x = 0; x < this.cellMap.xNum; ++x) {
				if (this.cellMap.map[y][x]) {
					if (!this.cellMap.alternateMap[y][x]) {
						this.cellCanvasDrawer.drawRect(
							this.getRect(x, y),
							this.cellColorMap[y][x]
						);
					}
				} else {
					if (this.cellMap.alternateMap[y][x]) {
						this.cellCanvasDrawer.drawRect(
							this.getRect(x, y),
							{ r: 0, g: 0, b: 0, a: 0 }
						);
					}
				}
			}
		}
		this.cellCanvasDrawer.reflesh();
	}

	drawGrid(): void {
		for (var y = 0; y < this.cellMap.yNum; ++y) {
			for (var x = 0; x < this.cellMap.xNum; ++x) {
				this.gridCanvasDrawer.drawRect(
					this.getRect(x, y),
					{ r: 30, g: 30, b: 30, a: 255 }
				);
			}
		}
		this.gridCanvasDrawer.reflesh();
	}

	getRect(cx: number, cy: number): Rect {
		return {
			x: cx * this.cellProperty.cellSize + this.cellProperty.gridWidth,
			y: cy * this.cellProperty.cellSize + this.cellProperty.gridWidth,
			width: this.cellProperty.cellSize - this.cellProperty.gridWidth * 2,
			height: this.cellProperty.cellSize - this.cellProperty.gridWidth * 2,
		}
	}

	setCellProperty(cellProperty: CellProperty, cellXNum: number, cellYNum: number): void {
		this.cellProperty = cellProperty;
		const cellSize = this.cellProperty.cellSize;
		const width = cellSize * cellXNum;
		const height = cellSize * cellYNum;
		const left = Math.floor((this.domController.container.offsetWidth - width) / 2);
		const top = Math.floor((this.domController.container.offsetHeight - height) / 2);
		this.cellCanvasDrawer.changeCanvas(left, top, width, height);
		this.gridCanvasDrawer.changeCanvas(left, top, width, height);
		this.cellColorMap = ColorMap.createCOCKTAIL(cellXNum, cellYNum);
	}
}