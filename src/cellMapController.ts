
interface CellProperty {
	cellSize: number;
	gridWidth: number;
}

class CellMapController {
	static CELL_PROPERTY_ARRAY = [{
		cellSize: 16,
		gridWidth: 2
	}, {
		cellSize: 8,
		gridWidth: 1,
	}, {
		cellSize: 4,
		gridWidth: 0
	}]

	alternationCount: number;
	alternationInterval: number;
	cellMap: CellMap;
	cellMapView: CellMapView;
	domController: DOMController;

	constructor(domController: DOMController) {
		this.domController = domController;
		this.alternationCount = 0;
		this.alternationInterval = null;

		const cellProperty = CellMapController.CELL_PROPERTY_ARRAY[0];
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

	setCellPropertyIndex(index: number): void {
		if (index < 0) {
			index = 0;
		}
		if (index >= CellMapController.CELL_PROPERTY_ARRAY.length) {
			index = CellMapController.CELL_PROPERTY_ARRAY.length - 1;
		}

		const cellProperty = CellMapController.CELL_PROPERTY_ARRAY[index];
		const xNum = Math.floor(this.domController.container.offsetWidth / cellProperty.cellSize);
		const yNum = Math.floor(this.domController.container.offsetHeight / cellProperty.cellSize);
		this.cellMap.setCellNum(xNum, yNum);
		this.cellMapView.setCellProperty(cellProperty, xNum, yNum);
		this.reset();
	}

	reset(): void {
		this.cellMap.randomize();
		this.cellMapView.drawCell();
	}
}