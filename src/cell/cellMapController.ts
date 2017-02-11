
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
	}];

	private alternationCount: number;
	private alternationInterval: number;
	private cellMap: CellMap;
	private cellMapView: CellMapView;
	private cellProperty: CellProperty;

	constructor() {
		this.alternationCount = 0;
		this.alternationInterval = null;

		this.cellProperty = CellMapController.CELL_PROPERTY_ARRAY[0];
		this.cellMap = new CellMap(
			Math.floor(global.domController.container.offsetWidth / this.cellProperty.cellSize),
			Math.floor(global.domController.container.offsetHeight / this.cellProperty.cellSize),
		);
		this.cellMapView = new CellMapView(this.cellMap, this.cellProperty);
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

		this.cellProperty = CellMapController.CELL_PROPERTY_ARRAY[index];
		const xNum = Math.floor(global.domController.container.offsetWidth / this.cellProperty.cellSize);
		const yNum = Math.floor(global.domController.container.offsetHeight / this.cellProperty.cellSize);
		this.cellMap.setCellNum(xNum, yNum);
		this.cellMapView.setCellProperty(this.cellProperty, xNum, yNum);
		this.reset();
	}

	resize(): void {
		const xNum = Math.floor(global.domController.container.offsetWidth / this.cellProperty.cellSize);
		const yNum = Math.floor(global.domController.container.offsetHeight / this.cellProperty.cellSize);
		this.cellMap.setCellNum(xNum, yNum);
		this.cellMapView.setCellProperty(this.cellProperty, xNum, yNum);
		this.cellMapView.drawCell();
		this.cellMapView.drawGrid();
	}

	reset(): void {
		this.alternationCount = 0;
		this.cellMap.randomize();
		this.cellMapView.drawCell();
		this.cellMapView.drawGrid();
	}

	getInterface(): CellMapInterface {
		return new CellMapInterface(this, this.cellMap);
	}
}