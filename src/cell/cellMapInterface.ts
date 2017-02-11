
class CellMapInterface {
	private cellMapController: CellMapController;
	private cellMap: CellMap;

	constructor(cellMapController: CellMapController, cellMap: CellMap) {
		this.cellMap = cellMap;
		this.cellMapController = cellMapController;
	}

	clear(): void {
		this.cellMap.clear();
	}

	setCellPropertyIndex(index: number): void {
		this.cellMapController.setCellPropertyIndex(index);
	}
}
