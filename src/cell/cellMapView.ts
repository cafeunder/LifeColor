
/**
 * マップの描画を行うクラス
 */
class CellMapView {
	private cellMap: CellMap;
	private cellCanvas: HTMLCanvasElement;
	private cellCanvasDrawer: CanvasBitmapDrawer;
	private gridCanvas: HTMLCanvasElement;
	private gridCanvasDrawer: CanvasBitmapDrawer;

	private visibleGrid: boolean;
	private visibleGradation: boolean;
	private cellProperty: CellDrawProperty;
	private cellColorMap: Color[];

	constructor(cellMap: CellMap, cellProperty: CellDrawProperty) {
		this.cellMap = cellMap;

		this.cellCanvas = global.domController.createCanvas("cellCanvas", 2);
		this.gridCanvas = global.domController.createCanvas("gridCanvas", 1);
		this.cellCanvasDrawer = new CanvasBitmapDrawer(this.cellCanvas);
		this.gridCanvasDrawer = new CanvasBitmapDrawer(this.gridCanvas);
		this.visibleGradation = true;

		this.setCellDrawProperty(cellProperty, cellMap.xNum, cellMap.yNum);
	}

	/**
	 * すべてのセルを描画する。
	 * 計算コストが非常に高いため、通常の世代交代で呼び出してはいけない。
	 */
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

	/**
	 * マップの差分のみを描画する。
	 * 通常の世代交代が行われたときのみ呼び出してよい。
	 */
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
		if (this.cellProperty.gridWidth == 0) { return; }
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

	setCellDrawProperty(cellProperty: CellDrawProperty, cellXNum: number, cellYNum: number): void {
		this.cellProperty = cellProperty;
		const cellSize = this.cellProperty.cellSize;
		const width = cellSize * cellXNum;
		const height = cellSize * cellYNum;
		const left = Math.floor((global.domController.container.offsetWidth - width) / 2);
		const top = Math.floor((global.domController.container.offsetHeight - height) / 2);
		this.cellCanvasDrawer.changeCanvas(left, top, width, height);
		this.gridCanvasDrawer.changeCanvas(left, top, width, height);
		if (this.visibleGradation) {
			this.cellColorMap = ColorMap.createCOCKTAIL_CYAN(this.cellMap.xNum, this.cellMap.yNum);
		} else {
			this.cellColorMap = ColorMap.createALLGREEN(this.cellMap.xNum, this.cellMap.yNum);
		}
	}

	getVisibleGrid(): boolean {
		return this.visibleGrid;
	}

	setVisibleGrid(visible: boolean): void {
		this.visibleGrid = visible;
		if (this.visibleGrid) {
			this.drawGrid();
		} else {
			this.gridCanvasDrawer.clear();
		}
	}

	getVisibleGradation(): boolean {
		return this.visibleGradation;
	}

	setVisibleGradation(visible: boolean): void {
		this.visibleGradation = visible;
		if (this.visibleGradation) {
			this.cellColorMap = ColorMap.createCOCKTAIL_CYAN(this.cellMap.xNum, this.cellMap.yNum);
		} else {
			this.cellColorMap = ColorMap.createALLGREEN(this.cellMap.xNum, this.cellMap.yNum);
		}
		this.drawCell();
	}

	getCanvasRect(): Rect {
		return {
			x: this.cellCanvasDrawer.x,
			y: this.cellCanvasDrawer.y,
			width: this.cellCanvas.width,
			height: this.cellCanvas.height
		};
	}
}
