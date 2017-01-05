
class AlternateController {
	alternationCount: number;
	alternationInterval: number;
	cellMap: CellMap;

	constructor(cellMap: CellMap) {
		this.alternationCount = 0;
		this.alternationInterval = null;
		this.cellMap = cellMap;
	}

	update(): void {
		++this.alternationCount;
		if (this.alternationCount >= this.alternationInterval) {
			this.cellMap.alternate();
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