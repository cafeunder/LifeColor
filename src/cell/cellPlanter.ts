
const enum DrawingTool {
	PEN,
	ERASER,
	STAMP
}

class CellPlanter {
	private cellMapController: CellMapController;
	private menuOnMouse: () => boolean;

	private drawingTool: DrawingTool;
	private guideCanvas: HTMLCanvasElement;
	private guideCanvasDrawer: CanvasImageDrawer;

	constructor(cellMapController: CellMapController) {
		this.cellMapController = cellMapController;
		this.guideCanvas = global.domController.createCanvas("guideCanvas", 3);
		this.guideCanvasDrawer = new CanvasImageDrawer(this.guideCanvas);
		const rect = this.cellMapController.getCanvasRect();
		this.guideCanvasDrawer.changeCanvas(rect.x, rect.y, rect.width, rect.height);
		this.drawingTool = DrawingTool.PEN;
	}

	update(): void {
		if (this.menuOnMouse()) return;
		const cellSize = this.cellMapController.getCellProperty().cellSize;
		const cx = Math.floor((global.mouse.x - this.guideCanvasDrawer.x) / cellSize);
		const cy = Math.floor((global.mouse.y - this.guideCanvasDrawer.y) / cellSize);

		if (global.mouse.pointCount > 0) {
			if (this.drawingTool == DrawingTool.STAMP) {

			} else {
				this.cellMapController.setCell(cx, cy, this.drawingTool == DrawingTool.PEN);
				this.cellMapController.setPause(true);
			}
		}
	}

	draw(): void {
		this.guideCanvasDrawer.clear();

		if (this.menuOnMouse()) return;
		const cellProperty = this.cellMapController.getCellProperty();
		const cellSize = cellProperty.cellSize;
		const gridWidth = cellProperty.gridWidth;
		const cx = Math.floor((global.mouse.x - this.guideCanvasDrawer.x) / cellSize);
		const cy = Math.floor((global.mouse.y - this.guideCanvasDrawer.y) / cellSize);

		if (this.drawingTool == DrawingTool.STAMP) {

		} else {
			if (gridWidth < 2) {
				const color = (this.drawingTool == DrawingTool.PEN) ? {r: 0, g: 128, b: 0, a: 255}: {r: 128, g: 0, b: 0, a: 255};
				this.guideCanvasDrawer.drawRect({
					x: cx * cellSize + gridWidth,
					y: cy * cellSize + gridWidth,
					width: cellSize - gridWidth * 2,
					height: cellSize - gridWidth * 2,
				}, color);
			} else {
				const color = (this.drawingTool == DrawingTool.PEN) ? {r: 0, g: 255, b: 0, a: 255}: {r: 255, g: 0, b: 0, a: 255};
				this.guideCanvasDrawer.drawRect({
					x: cx * cellSize,
					y: cy * cellSize,
					width: cellSize,
					height: cellSize
				}, color, false, gridWidth);

				this.guideCanvasDrawer.drawRect({
					x: cx * cellSize + gridWidth,
					y: cy * cellSize + gridWidth,
					width: cellSize - gridWidth * 2,
					height: cellSize - gridWidth * 2
				}, {r: 0, g: 0, b: 0, a: 150}, true, gridWidth);
			}
		}
	}

	setDrawingTool(drawingTool: DrawingTool): void {
		this.drawingTool = drawingTool;
	}

	setMenuOnMouse(menuOnMouse: () => boolean): void {
		this.menuOnMouse = menuOnMouse;
	}

	changeCanvas(): void {
		const rect = this.cellMapController.getCanvasRect();
		this.guideCanvasDrawer.changeCanvas(rect.x, rect.y, rect.width, rect.height);
	}
}