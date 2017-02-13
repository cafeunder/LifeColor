
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
	private stampName: string;
	private stampMap: number[][];
	private stampX: number;
	private stampY: number;

	constructor(cellMapController: CellMapController) {
		this.cellMapController = cellMapController;
		this.guideCanvas = global.domController.createCanvas("guideCanvas", 3);
		this.guideCanvasDrawer = new CanvasImageDrawer(this.guideCanvas);
		const rect = this.cellMapController.getCanvasRect();
		this.guideCanvasDrawer.changeCanvas(rect.x, rect.y, rect.width, rect.height);
		this.drawingTool = DrawingTool.PEN;
		this.stampName = null;
		this.stampX = null;
		this.stampY = null;
	}

	update(): void {
		if (this.menuOnMouse()) return;
		const cellSize = this.cellMapController.getCellProperty().cellSize;
		var cx: number = Math.floor((global.mouse.x - this.guideCanvasDrawer.x) / cellSize);
		var cy: number = Math.floor((global.mouse.y - this.guideCanvasDrawer.y) / cellSize);
		const xNum = this.cellMapController.getXNum();
		const yNum = this.cellMapController.getYNum();

		// 描画ツールがスタンプならガイドの位置を計算しておく（drawメソッドで使うので）
		if(this.drawingTool == DrawingTool.STAMP) {
			// スタンプの大きさが偶数なら、スタンプの中心を変える（操作性向上のため）
			if (this.stampMap.length % 2 == 0) {
				cy = Math.floor((global.mouse.y + cellSize / 2) / cellSize);
			}
			if (this.stampMap[0].length % 2 == 0) {
				cx = Math.floor((global.mouse.x + cellSize / 2) / cellSize);
			}

			// マップの外にはみ出ないように位置を調整
			var x0 = cx - Math.floor(this.stampMap[0].length / 2);
			var y0 = cy - Math.floor(this.stampMap.length / 2);
			var x1 = cx + Math.floor((this.stampMap[0].length - 1) / 2);
			var y1 = cy + Math.floor((this.stampMap.length - 1) / 2);
			if (x0 < 0) x0 = 0;
			if (y0 < 0) y0 = 0;
			if (x1 >= xNum) x0 = xNum - this.stampMap[0].length;
			if (y1 >= yNum) y0 = yNum - this.stampMap.length;

			this.stampX = x0;
			this.stampY = y0;
		}

		if (global.mouse.pointCount > 0) {
			if (this.drawingTool == DrawingTool.STAMP) {
				this.cellMapController.plantStamp(this.stampMap, this.stampX, this.stampY);
			} else {
				this.cellMapController.setCell(cx, cy, this.drawingTool == DrawingTool.PEN);
				this.cellMapController.setPause(true);
			}
		}
	}

	draw(): void {
		this.guideCanvasDrawer.clear();

		if (this.menuOnMouse()) return;
		if (!global.mouse.entered) return;
		const cellSize = this.cellMapController.getCellProperty().cellSize;
		const cx = Math.floor((global.mouse.x - this.guideCanvasDrawer.x) / cellSize);
		const cy = Math.floor((global.mouse.y - this.guideCanvasDrawer.y) / cellSize);

		if (this.drawingTool == DrawingTool.STAMP) {
			if (this.stampX == null || this.stampY == null) return;
			for(var y = this.stampY; y < this.stampY + this.stampMap.length; ++y){
				for(var x = this.stampX; x < this.stampX + this.stampMap[0].length; ++x){
					if(this.stampMap[y - this.stampY][x - this.stampX] == 1){
						this.drawGuide(x, y, {r: 0, g: 255, b: 255, a: 255}, {r: 0, g: 128, b: 128, a: 255});
					}
				}
			}
		} else if (this.drawingTool == DrawingTool.PEN) {
			this.drawGuide(cx, cy, {r: 0, g: 255, b: 0, a: 255}, {r: 0, g: 128, b: 0, a: 255});
		} else if (this.drawingTool == DrawingTool.ERASER) {
			this.drawGuide(cx, cy, {r: 255, g: 0, b: 0, a: 255}, {r: 128, g: 0, b: 0, a: 255});
		}
	}

	drawGuide(cx: number, cy: number, lightColor: Color, darkColor: Color): void {
		const cellProperty = this.cellMapController.getCellProperty();
		const cellSize = cellProperty.cellSize;
		const gridWidth = cellProperty.gridWidth;
		if (gridWidth < 2) {
			this.guideCanvasDrawer.drawRect({
				x: cx * cellSize + gridWidth,
				y: cy * cellSize + gridWidth,
				width: cellSize - gridWidth * 2,
				height: cellSize - gridWidth * 2,
			}, darkColor);
		} else {
			this.guideCanvasDrawer.drawRect({
				x: cx * cellSize,
				y: cy * cellSize,
				width: cellSize,
				height: cellSize
			}, lightColor, false, gridWidth);

			this.guideCanvasDrawer.drawRect({
				x: cx * cellSize + gridWidth,
				y: cy * cellSize + gridWidth,
				width: cellSize - gridWidth * 2,
				height: cellSize - gridWidth * 2
			}, { r: 0, g: 0, b: 0, a: 150 }, true, gridWidth);
		}
	}

	getStampName(): string {
		return this.stampName;
	}

	getDrawingTool(): DrawingTool {
		return this.drawingTool;
	}

	setDrawingTool(drawingTool: DrawingTool, stampName: string = null, stampMap: number[][] = null): void {
		this.drawingTool = drawingTool;
		this.stampName = stampName;
		this.stampMap = stampMap;
	}

	setMenuOnMouse(menuOnMouse: () => boolean): void {
		this.menuOnMouse = menuOnMouse;
	}

	changeCanvas(): void {
		const rect = this.cellMapController.getCanvasRect();
		this.guideCanvasDrawer.changeCanvas(rect.x, rect.y, rect.width, rect.height);
	}
}