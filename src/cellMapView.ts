
class CellMapView {
	domController: DOMController;
	cellMap: CellMap;
	cellCanvas: HTMLCanvasElement;
	cellCanvasDrawer: CanvasDrawer;
	gridCanvas: HTMLCanvasElement;
	gridCanvasDrawer: CanvasDrawer;

	cellProperty: CellProperty;
	cellColor: Color;

	constructor(cellMap: CellMap, cellProperty: CellProperty, domController: DOMController) {
		this.cellProperty = cellProperty;
		this.domController = domController;
		this.cellMap = cellMap;

		this.cellCanvas = domController.createCanvas("cellCanvas", 2);
		this.gridCanvas = domController.createCanvas("gridCanvas", 1);
		this.cellCanvasDrawer = new CanvasDrawer(this.cellCanvas);
		this.gridCanvasDrawer = new CanvasDrawer(this.gridCanvas);

		const cellSize = this.cellProperty.cellSize;
		var width = cellSize * Math.floor(this.domController.container.offsetWidth / cellSize);
		var height = cellSize * Math.floor(this.domController.container.offsetHeight / cellSize);
		var left = Math.floor((this.domController.container.offsetWidth - width) / 2);
		var top = Math.floor((this.domController.container.offsetHeight - height) / 2);
		this.cellCanvasDrawer.changeCanvas(left, top, width, height);
		this.gridCanvasDrawer.changeCanvas(left, top, width, height);
		this.cellColor = {
			r: 10,
			g: 250,
			b: 66,
			a: 255
		};
	}

	drawCell(): void {
		for (var y = 0; y < this.cellMap.yNum; ++y) {
			for (var x = 0; x < this.cellMap.xNum; ++x) {
				if (this.cellMap.map[y][x]) {
					this.cellCanvasDrawer.drawRect(
						this.getRect(x, y),
						this.cellColor
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
							this.cellColor
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
}