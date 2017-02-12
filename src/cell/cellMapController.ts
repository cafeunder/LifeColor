
interface CellProperty {
	cellSize: number;
	gridWidth: number;
}

class CellMapController {
	private static cell_property_array = [{
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
	private pause: boolean;
	private alternationSetter: CellMapAlternationSetter;

	constructor() {
		this.alternationCount = 0;
		this.alternationInterval = null;

		this.cellProperty = CellMapController.cell_property_array[0];
		this.cellMap = new CellMap(
			Math.floor(global.domController.container.offsetWidth / this.cellProperty.cellSize),
			Math.floor(global.domController.container.offsetHeight / this.cellProperty.cellSize),
		);
		this.cellMapView = new CellMapView(this.cellMap, this.cellProperty);
		this.cellMapView.drawCell();
		this.cellMapView.setVisibleGrid(true);
		this.pause = false;
		this.alternationSetter = new CellMapAlternationSetter(this);
		this.alternationSetter.setIndex(3);
	}

	update(): void {
		if (!this.pause) {
			++this.alternationCount;
		}
		if (this.alternationCount >= this.alternationInterval) {
			this.cellMap.alternate();
			this.cellMapView.drawDifferenceCell();
			this.alternationCount = 0;
		}
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

	clear(): void {
		this.cellMap.clear();
		this.cellMapView.drawCell();
	}

	randomize(): void {
		this.cellMap.randomize();
		this.cellMapView.drawCell();
	}

	saveMap(): void {
		this.cellMap.save();
	}

	loadMap(): void {
		this.cellMap.load();
		this.cellMapView.drawCell();
	}

	canLoadMap(): boolean {
		return this.cellMap.canLoad();
	}

	setPause(pause: boolean): void {
		this.pause = pause;
		if (this.pause) {
			this.alternationCount = 0;
		}
	}

	getAlternationSetter(): CellMapAlternationSetter {
		return this.alternationSetter;
	}

	setAlternationInterval(alternationInterval): void {
		this.alternationInterval = alternationInterval;
	}

	setCellPropertyIndex(index: number): void {
		if (index < 0) {
			index = 0;
		}
		if (index >= CellMapController.cell_property_array.length) {
			index = CellMapController.cell_property_array.length - 1;
		}

		this.cellProperty = CellMapController.cell_property_array[index];
		const xNum = Math.floor(global.domController.container.offsetWidth / this.cellProperty.cellSize);
		const yNum = Math.floor(global.domController.container.offsetHeight / this.cellProperty.cellSize);
		this.cellMap.setCellNum(xNum, yNum);
		this.cellMapView.setCellProperty(this.cellProperty, xNum, yNum);
		this.reset();
	}

	getVisibleGrid(): boolean {
		return this.cellMapView.getVisibleGrid();
	}

	setVisibleGrid(visible: boolean): void {
		this.cellMapView.setVisibleGrid(visible);
	}
}