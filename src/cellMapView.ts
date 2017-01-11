
class CellMapView {
	domController: DOMController;
	cellMap: CellMap;
	cellCanvas: HTMLCanvasElement;
	cellCanvasDrawer: CanvasDrawer;
	gridCanvas: HTMLCanvasElement;
	gridCanvasDrawer: CanvasDrawer;

	cellSize: number;
	cellColor: Color;

	constructor(cellMap: CellMap, cellSize: number, domController: DOMController) {
		this.cellSize = cellSize;
		this.domController = domController;
		this.cellMap = cellMap;

		this.cellCanvas = domController.createCanvas("cellCanvas", 1);
		this.gridCanvas = domController.createCanvas("gridCanvas", 2);
		this.cellCanvasDrawer = new CanvasDrawer(this.cellCanvas);
		this.gridCanvasDrawer = new CanvasDrawer(this.gridCanvas);

		var width = this.cellSize * Math.floor(this.domController.container.offsetWidth / this.cellSize);
		var height = this.cellSize * Math.floor(this.domController.container.offsetHeight / this.cellSize);
		var left = Math.floor((this.domController.container.offsetWidth - width) / 2);
		var top = Math.floor((this.domController.container.offsetHeight - height) / 2);
		this.cellCanvasDrawer.changeCanvas(left, top, width, height);
		this.gridCanvasDrawer.changeCanvas(left, top, width, height);
		this.cellColor = {
			r: 10,
			g: 250,
			b: 66,
			a: 255
		};
	}

	draw(): void {
		for (var y = 0; y < this.cellMap.yNum; ++y) {
			for (var x = 0; x < this.cellMap.xNum; ++x) {
				if (this.cellMap.map[y][x]) {
					// 描画左上ピクセルのアルファ値がゼロ = 未描画なら描画
					if (this.cellCanvasDrawer.getPixel(x * this.cellSize, y * this.cellSize, 3) == 0) {
						this.cellCanvasDrawer.drawRect(
							x * this.cellSize,
							y * this.cellSize,
							this.cellSize,
							this.cellSize,
							this.cellColor
						);
					}
				} else {
					// 描画左上ピクセルのアルファ値が非ゼロ = 描画済ならクリア
					if (this.cellCanvasDrawer.getPixel(x * this.cellSize, y * this.cellSize, 3) != 0) {
						this.cellCanvasDrawer.drawRect(
							x * this.cellSize,
							y * this.cellSize,
							this.cellSize,
							this.cellSize,
							{
								r: 0,
								g: 0,
								b: 0,
								a: 0
							}
						);
					}
				}
			}
		}
		this.cellCanvasDrawer.reflesh();
	}
}