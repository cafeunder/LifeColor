
class CellMapAlternationSetter {
	private static alternation_interval_array = [
		1, 5, 12, 20, 30, 40
	];

	private index: number;
	private cellMapController: CellMapController;
	constructor(cellMapController: CellMapController) {
		this.cellMapController = cellMapController;
		this.index = 0;
	}

	getIndex(): number {
		return this.index;
	}
	setIndex(index: number): void {
		this.index = index;
		this.cellMapController.setAlternationInterval(
			CellMapAlternationSetter.alternation_interval_array[this.index]
		);
	}

	canUp(): boolean {
		return this.index < (CellMapAlternationSetter.alternation_interval_array.length - 1);
	}
	canDown(): boolean {
		return this.index > 0;
	}
}