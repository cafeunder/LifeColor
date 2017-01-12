
interface CellProperty {
	cellSize: number;
	gridWidth: number;
}

class CellMapController {
	cellPropertyArray: CellProperty[];
	alternationCount: number;
	alternationInterval: number;
	cellMap: CellMap;
	cellMapView: CellMapView;
	cellPropertyIndex: number;

	constructor(domController: DOMController) {
		this.cellPropertyArray = [{
			cellSize: 16,
			gridWidth: 2
		}, {
			cellSize: 8,
			gridWidth: 1,
		}, {
			cellSize: 4,
			gridWidth: 0
		}]

		this.alternationCount = 0;
		this.alternationInterval = null;
		this.cellPropertyIndex = 0;

		const cellProperty = this.cellPropertyArray[this.cellPropertyIndex];
		this.cellMap = new CellMap(
			Math.floor(domController.container.offsetWidth / cellProperty.cellSize),
			Math.floor(domController.container.offsetHeight / cellProperty.cellSize),
		);
		this.cellMapView = new CellMapView(this.cellMap, cellProperty, domController);
		this.cellMapView.drawCell();
		this.cellMapView.drawGrid();
	}

	update(): void {
		++this.alternationCount;
		if (this.alternationCount >= this.alternationInterval) {
			this.cellMap.alternate();
			this.cellMapView.drawDifferenceCell();
			this.alternationCount = 0;
		}
	}

	setAlternationInterval(alternationInterval): void {
		// スピードダウンのときは，移行状態を許さない
		this.alternationInterval = alternationInterval;
	}
}