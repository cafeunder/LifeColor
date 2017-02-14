
/**
 * セルの描画情報を表すインターフェイス。
 */
interface CellDrawProperty {
	cellSize: number;
	gridWidth: number;
}

/**
 * CellMapControllerのセルサイズ/グリッドサイズに関する状態を更新するメソッド。
 */
class CellMapDrawPropertySetter {
	private static cell_property_list = [{
		cellSize: 16,
		gridWidth: 2
	}, {
		cellSize: 8,
		gridWidth: 1,
	}, {
		cellSize: 4,
		gridWidth: 0
	}];

	private index: number;
	private cellMapController: CellMapController;

	constructor(cellMapController: CellMapController) {
		this.cellMapController = cellMapController;
		this.index = 0;
	}

	getProperty(): CellDrawProperty {
		return CellMapDrawPropertySetter.cell_property_list[this.index];
	}

	getIndex(): number {
		return this.index;
	}

	setIndex(index: number): void {
		this.index = index;
		this.cellMapController.setCellDrawProperty(
			CellMapDrawPropertySetter.cell_property_list[this.index]
		);
	}
}