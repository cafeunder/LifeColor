
class MenuElement {
	/**
	 * 画像オブジェクト
	 */
	img: HTMLImageElement | HTMLImageElement[];

	/**
	 * メニューキャンバス左上座標からの相対位置x
	 */
	x: number;
	/**
	 * メニューキャンバス左上座標からの相対位置y
	 */
	y: number;
	/**
	 * xからの横幅
	 */
	width: number;
	/**
	 * yからの縦幅
	 */
	height: number;

	/**
	 * 状態を複数持つ場合の状態番号（状態が1つなら不要）
	 */
	status?: number;

	/**
	 * 選択されたか？
	 */
	selected: boolean;

	constructor(
		img: HTMLImageElement | HTMLImageElement[],
		x: number,
		y: number,
		width: number,
		height: number,
		status?: number
	) {
		this.img = img;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.status = status;
		this.selected = false;
	}
}

class CellSizeConfigMenu {
	private static element_size = 28;
	private static element_between_space = 8;
	private static inner_margin = 8;
	private static outer_margin = 10;
	private static element_imagename_list = [
		"cellSize_big",
		"cellSize_mid",
		"cellSize_small",
		["window_full", "window_normal"]
	];

	private cellMapController: CellMapController;
	private canvas: HTMLCanvasElement;
	private canvasDrawer: CanvasImageDrawer;
	private elementList: MenuElement[];
	private width: number;
	private height: number;
	private domController: DOMController

	constructor(cellMapController: CellMapController, domController: DOMController) {
		this.cellMapController = cellMapController;
		this.canvas = domController.createCanvas("cellSizeConfigMenuCanvas", 4);
		this.canvasDrawer = new CanvasImageDrawer(this.canvas);
		this.domController = domController;

		this.createMenuElement();
		this.canvasDrawer.changeCanvas(
			domController.getWidth() - (this.width + CellSizeConfigMenu.outer_margin),
			CellSizeConfigMenu.outer_margin,
			this.width,
			this.height
		);

		this.selectElement(0);
	}

	draw(): void {
		this.canvasDrawer.drawRect(0, 0, this.width, this.height, 0, {r: 10, g: 10, b: 10, a: 230}, true);
		this.elementList.forEach((elm: MenuElement) => {
			this.canvasDrawer.drawImage(
				(Array.isArray(elm.img)) ? elm.img[elm.status] : elm.img,
				elm.x,
				elm.y
			);

			if (elm.selected) {
				this.canvasDrawer.drawRect(elm.x-2, elm.y-2, elm.width+4, elm.height+4, 2, {r: 0, g: 250, b: 160, a: 255}, false);
			}
		});
	}

	selectElement(index: number): void {
		this.elementList.forEach((element: MenuElement) => {
			element.selected = false;
		});
		this.elementList[index].selected = true;
	}

	private createMenuElement(): void {
		this.elementList = [];
		var count: number = 0;
		CellSizeConfigMenu.element_imagename_list.forEach((imgname: string | string[]) => {
			this.elementList.push(
				new MenuElement(
					Array.isArray(imgname) ? ImageManager.getImageList(imgname) : ImageManager.imageMap[imgname],
					CellSizeConfigMenu.inner_margin + (CellSizeConfigMenu.element_size + CellSizeConfigMenu.element_between_space) * count,
					CellSizeConfigMenu.inner_margin,
					CellSizeConfigMenu.element_size,
					CellSizeConfigMenu.element_size,
					0
				)
			);
			++count;
		})

		this.width =
			CellSizeConfigMenu.inner_margin * 2
			+ CellSizeConfigMenu.element_size * count
			+ CellSizeConfigMenu.element_between_space * (count - 1);
		this.height =
			CellSizeConfigMenu.inner_margin * 2
			+ CellSizeConfigMenu.element_size;
	}

	changeCanvas(): void {
		this.canvasDrawer.changeCanvas(
			this.domController.getWidth() - (this.width + CellSizeConfigMenu.outer_margin),
			CellSizeConfigMenu.outer_margin,
			this.width,
			this.height
		);
		this.draw();
	}
}
