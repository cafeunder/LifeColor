
class CellMapController {
	alternationCount: number;
	alternationInterval: number;
	cellMap: CellMap;
	cellMapView: CellMapView;

	constructor(cellMap: CellMap, cellMapView: CellMapView) {
		this.alternationCount = 0;
		this.alternationInterval = null;
		this.cellMap = cellMap;
		this.cellMapView = cellMapView;
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