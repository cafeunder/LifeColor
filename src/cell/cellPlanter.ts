
class CellPlanter {
	private cellMapController: CellMapController;
	private cellMapView: CellMapView;
	private menuOnMouse: () => boolean;

	constructor(cellMapController: CellMapController, cellMapView: CellMapView) {
		this.cellMapController = cellMapController;
		this.cellMapView = cellMapView;
	}

	update(): void {
		if (this.menuOnMouse()) return;
		const canvasRect = this.cellMapView.getCanvasRect();
		const cx = Math.floor((global.mouse.x - canvasRect.x) / this.cellMapView.getCellSize());
		const cy = Math.floor((global.mouse.y - canvasRect.y) / this.cellMapView.getCellSize());

		if (global.mouse.pointCount > 0) {
			this.cellMapController.plant(cx, cy, true);
			this.cellMapController.setPause(true);
		}
	}

	setMenuOnMouse(menuOnMouse: () => boolean): void {
		this.menuOnMouse = menuOnMouse;
	}
}