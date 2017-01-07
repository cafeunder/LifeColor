
class CellMapView {
	cellMap: CellMap;
	cellCanvas: HTMLCanvasElement;
	cellContext: CanvasRenderingContext2D;
	cellImageData: ImageData;
	gridCanvas: HTMLCanvasElement;
	gridContext: CanvasRenderingContext2D;

	constructor(cellMap: CellMap, cellCanvas: HTMLCanvasElement, gridCanvas: HTMLCanvasElement) {
		this.cellMap = cellMap;

		this.cellCanvas = cellCanvas;
		this.cellCanvas.style.width = "960px";
		this.cellCanvas.style.height = "768px";
		this.cellContext = this.cellCanvas.getContext("2d");
		this.cellImageData = this.cellContext.createImageData(
			this.cellCanvas.width,
			this.cellCanvas.height
		);

		this.gridCanvas = gridCanvas;
		this.gridCanvas.style.width = "960px";
		this.gridCanvas.style.height = "768px";
		this.gridContext = this.gridCanvas.getContext("2d");
	}

	draw(): void {
		for (var y = 0; y < this.cellMap.yNum; y++) {
			for (var x = 0; x < this.cellMap.xNum; x++) {
				const cell = this.cellMap.map[y][x];
				const base = (x + y * this.cellMap.xNum) * 4;
				switch (cell) {
				case CellStatus.ALIVE:
					this.cellImageData.data[base] = 255;
					this.cellImageData.data[base + 1] = 255;
					this.cellImageData.data[base + 2] = 255;
					this.cellImageData.data[base + 3] = 255;
				case CellStatus.BIRTH:
					this.cellImageData.data[base] = 255;
					this.cellImageData.data[base + 1] = 255;
					this.cellImageData.data[base + 2] = 255;
					this.cellImageData.data[base + 3] = 255;
				case CellStatus.DIE:
					this.cellImageData.data[base] = 0;
					this.cellImageData.data[base + 1] = 0;
					this.cellImageData.data[base + 2] = 0;
					this.cellImageData.data[base + 3] = 0;
				case CellStatus.DEAD:
					this.cellImageData.data[base] = 0;
					this.cellImageData.data[base + 1] = 0;
					this.cellImageData.data[base + 2] = 0;
					this.cellImageData.data[base + 3] = 0;
				}
			}
		}
		this.cellContext.putImageData(this.cellImageData, 0, 0);
	}
}