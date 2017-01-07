
class CellMapView {
	cellMap: CellMap;
	cellCanvas: HTMLCanvasElement;
	cellCanvasDrawer: CanvasDrawer;
	gridCanvas: HTMLCanvasElement;
	gridCanvasDrawer: CanvasDrawer;

	cellSize: number;

	constructor(cellMap: CellMap, cellCanvas: HTMLCanvasElement, gridCanvas: HTMLCanvasElement) {
		this.cellMap = cellMap;

		this.cellCanvas = cellCanvas;
		this.cellCanvas.width = 960;
		this.cellCanvas.height = 768;
		this.cellCanvasDrawer = new CanvasDrawer(this.cellCanvas);

		this.gridCanvas = gridCanvas;
		this.gridCanvas.width = 960;
		this.gridCanvas.height = 768;
		this.gridCanvasDrawer = new CanvasDrawer(this.gridCanvas);

		this.cellSize = 16;
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