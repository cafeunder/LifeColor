
/**
 * CellMapとCellMapViewの機能を外部に提供するクラス。
 */
class CellMapController {
	private alternationCount: number;
	private alternationInterval: number;
	private cellMap: CellMap;
	private cellMapView: CellMapView;
	private cellDrawProperty: CellDrawProperty;
	private pause: boolean;
	private alternationSetter: CellMapAlternationSetter;
	private drawPropertySetter: CellMapDrawPropertySetter;

	constructor() {
		this.alternationCount = 0;
		this.alternationInterval = null;

		this.alternationSetter = new CellMapAlternationSetter(this);
		this.alternationSetter.setIndex(2);
		this.drawPropertySetter = new CellMapDrawPropertySetter(this);
		this.cellDrawProperty = this.drawPropertySetter.getProperty();

		this.cellMap = new CellMap(
			Math.floor(global.domController.container.offsetWidth / this.cellDrawProperty.cellSize),
			Math.floor(global.domController.container.offsetHeight / this.cellDrawProperty.cellSize),
		);
		this.cellMapView = new CellMapView(this.cellMap, this.cellDrawProperty);
		this.cellMapView.drawCell();
		this.cellMapView.setVisibleGrid(true);
		this.pause = false;
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
		const xNum = Math.floor(global.domController.container.offsetWidth / this.cellDrawProperty.cellSize);
		const yNum = Math.floor(global.domController.container.offsetHeight / this.cellDrawProperty.cellSize);
		this.cellMap.setCellNum(xNum, yNum);
		this.cellMapView.setCellDrawProperty(this.cellDrawProperty, xNum, yNum);
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
		this.alternationCount = 0;
		this.cellMap.clear();
		this.cellMapView.drawCell();
	}

	randomize(): void {
		this.alternationCount = 0;
		this.cellMap.randomize();
		this.cellMapView.drawCell();
	}

	saveMap(): void {
		this.cellMap.save();
	}

	loadMap(): void {
		this.alternationCount = 0;
		this.cellMap.load();
		this.cellMapView.drawCell();
	}

	canLoadMap(): boolean {
		return this.cellMap.canLoad();
	}

	getPause(): boolean {
		return this.pause;
	}

	setPause(pause: boolean): void {
		this.pause = pause;
		if (this.pause) {
			this.alternationCount = 0;
		}
	}

	setCell(x: number, y: number, cell: boolean): void {
		this.cellMap.setCell(x, y, cell);
		this.cellMapView.drawCell();
	}

	getAlternationSetter(): CellMapAlternationSetter {
		return this.alternationSetter;
	}

	getDrawPropertySetter(): CellMapDrawPropertySetter {
		return this.drawPropertySetter;
	}

	setAlternationInterval(alternationInterval): void {
		this.alternationInterval = alternationInterval;
	}

	getCellDrawProperty(): CellDrawProperty {
		return this.cellDrawProperty;
	}

	setCellDrawProperty(property: CellDrawProperty): void {
		this.cellDrawProperty = property;
		global.domController.resize();
		this.reset();
	}

	getVisibleGrid(): boolean {
		return this.cellMapView.getVisibleGrid();
	}

	setVisibleGrid(visible: boolean): void {
		this.cellMapView.setVisibleGrid(visible);
	}

	getVisibleGradation(): boolean {
		return this.cellMapView.getVisibleGradation();
	}

	setVisibleGradation(visible: boolean): void {
		this.cellMapView.setVisibleGradation(visible);
	}

	getCanvasRect(): Rect {
		return this.cellMapView.getCanvasRect();
	}

	setTemplate(template: number[][], leftAlignment: boolean = false): void {
		this.alternationCount = 0;
		this.cellMap.setTemplate(template, leftAlignment);
		this.cellMapView.drawCell();
	}

	plantStamp(stampMap: number[][], x0: number, y0: number): void {
		this.cellMap.plantStamp(stampMap, x0, y0);
		this.cellMapView.drawCell();
	}

	getXNum(): number {
		return this.cellMap.xNum;
	}

	getYNum(): number {
		return this.cellMap.yNum;
	}
}
