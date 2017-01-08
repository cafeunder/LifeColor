
class CellMapController {
	alternationCount: number;
	alternationInterval: number;
	cellMap: CellMap;
	cellMapView: CellMapView;
	cellSize: number;

	constructor(domController: DOMController) {
		this.alternationCount = 0;
		this.alternationInterval = null;
		this.cellSize = 16;

		this.cellMap = new CellMap(
			Math.floor(domController.container.offsetWidth / this.cellSize),
			Math.floor(domController.container.offsetHeight / this.cellSize),
		);
		this.cellMapView = new CellMapView(this.cellMap, this.cellSize, domController);
	}

	update(): void {
		++this.alternationCount;
		if (this.alternationCount >= this.alternationInterval) {
			this.cellMap.alternate();
			this.cellMapView.draw();
			this.alternationCount = 0;
		}
	}

	setAlternationInterval(alternationInterval): void {
		// スピードダウンのときは，移行状態を許さない
		if (this.alternationInterval > alternationInterval) {
			this.cellMap.completeStatus();
		}
		this.alternationInterval = alternationInterval;
	}
}