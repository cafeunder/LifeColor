
class CellMapView {
	domController: DOMController;
	cellMap: CellMap;
	cellCanvas: HTMLCanvasElement;
	cellCanvasDrawer: CanvasDrawer;
	gridCanvas: HTMLCanvasElement;
	gridCanvasDrawer: CanvasDrawer;

	cellSize: number;

	constructor(cellMap: CellMap, cellSize: number, domController: DOMController) {
		this.cellSize = cellSize;
		this.domController = domController;
		this.cellMap = cellMap;

		this.cellCanvas = domController.createCanvas("cellCanvas", 1);
		this.gridCanvas = domController.createCanvas("gridCanvas", 2);
		this.cellCanvasDrawer = new CanvasDrawer(this.cellCanvas);
		this.gridCanvasDrawer = new CanvasDrawer(this.gridCanvas);

		var width = this.cellSize * Math.floor(this.domController.container.offsetWidth / this.cellSize);
		var height = this.cellSize * Math.floor(this.domController.container.offsetHeight / this.cellSize);
		var left = Math.floor((this.domController.container.offsetWidth - width) / 2);
		var top = Math.floor((this.domController.container.offsetHeight - height) / 2);
		this.cellCanvasDrawer.changeCanvas(left, top, width, height);
		this.gridCanvasDrawer.changeCanvas(left, top, width, height);
	}

	draw(): void {
		for (var y = 0; y < this.cellMap.yNum; ++y) {
			for (var x = 0; x < this.cellMap.xNum; ++x) {
				const cell = this.cellMap.map[y][x];
				switch (cell) {
				case CellStatus.ALIVE:
					this.cellCanvasDrawer.drawRect(
						x * this.cellSize,
						y * this.cellSize,
						this.cellSize,
						this.cellSize,
						{
							r: 255,
							g: 255,
							b: 255,
							a: 255
						}
					);
					break;
				case CellStatus.BIRTH:
					this.cellCanvasDrawer.drawRect(
						x * this.cellSize,
						y * this.cellSize,
						this.cellSize,
						this.cellSize,
						{
							r: 255,
							g: 255,
							b: 255,
							a: 255
						}
					);
					break;
				case CellStatus.DIE:
					this.cellCanvasDrawer.drawRect(
						x * this.cellSize,
						y * this.cellSize,
						this.cellSize,
						this.cellSize,
						{
							r: 0,
							g: 0,
							b: 0,
							a: 0
						}
					);
					break;
				case CellStatus.DEAD:
					this.cellCanvasDrawer.drawRect(
						x * this.cellSize,
						y * this.cellSize,
						this.cellSize,
						this.cellSize,
						{
							r: 0,
							g: 0,
							b: 0,
							a: 0
						}
					);
					break;
				}
			}
		}
		this.cellCanvasDrawer.reflesh();
	}
}